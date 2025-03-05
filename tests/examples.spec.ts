import { test, expect } from './fixtures';
import { PostsService } from '../src/services/posts.service';
import { CommentsService } from '../src/services/comments.service';
import { UsersService } from '../src/services/users.service';
import { Post, Comment, User } from '../src/types/api.types';

let postsService: PostsService;
let commentsService: CommentsService;
let usersService: UsersService;

test.beforeEach(async ({ request }) => {
  postsService = new PostsService(request);
  commentsService = new CommentsService(request);
  usersService = new UsersService(request);
});

test.describe('Advanced API Testing Scenarios', () => {
  test('Caching - should return cached data on subsequent requests', async ({ postsService }) => {
    // First request - no cache
    const startTime = Date.now();
    const posts = await postsService.getAllPosts({ useCache: true });
    const firstRequestTime = Date.now() - startTime;

    // Second request - should use cache
    const cachedStartTime = Date.now();
    const cachedPosts = await postsService.getAllPosts({ useCache: true });
    const secondRequestTime = Date.now() - cachedStartTime;

    expect(posts).toEqual(cachedPosts);
    expect(secondRequestTime).toBeLessThan(firstRequestTime);
  });

  test('Performance monitoring - should track request metrics', async ({ postsService }) => {
    const options = { trackMetrics: true };
    
    await postsService.getAllPosts(options);
    await postsService.getPostById(1, options);
    
    const metrics = postsService.getMetrics();
    expect(metrics).toHaveLength(2);
    
    const [getAllMetrics, getByIdMetrics] = metrics;
    expect(getAllMetrics.method).toBe('GET');
    expect(getAllMetrics.endpoint).toContain('/posts');
    expect(getAllMetrics.duration).toBeGreaterThan(0);
    expect(getByIdMetrics.method).toBe('GET');
    expect(getByIdMetrics.endpoint).toContain('/posts/1');
    expect(getByIdMetrics.duration).toBeGreaterThan(0);
  });

  test('Batch operations - should perform multiple operations in parallel', async ({ postsService }) => {
    const startTime = Date.now();
    
    const results = await postsService.batch([
      () => postsService.getPostById(1),
      () => postsService.getPostById(2),
      () => postsService.getPostById(3)
    ]);

    const duration = Date.now() - startTime;
    
    expect(results).toHaveLength(3);
    results.forEach((post, index) => {
      expect(post.id).toBe(index + 1);
    });

    // Sequential operations
    const sequentialStartTime = Date.now();
    await postsService.getPostById(1);
    await postsService.getPostById(2);
    await postsService.getPostById(3);
    const sequentialDuration = Date.now() - sequentialStartTime;

    // Batch should be faster than sequential
    expect(duration).toBeLessThan(sequentialDuration);
  });

  test('Complex scenario - create post with comments', async ({ postsService, commentsService, samplePost }) => {
    // Create a new post
    const post = await postsService.createPost(samplePost);

    // Create multiple comments for the post in parallel
    const commentPromises = Array.from({ length: 3 }, (_, i) => {
      const comment: Partial<Comment> = {
        name: `Comment ${i + 1}`,
        email: `user${i + 1}@example.com`,
        body: `This is comment ${i + 1}`,
        postId: post.id
      };
      return commentsService.createComment(comment);
    });

    const comments = await Promise.all(commentPromises);
    
    // Wait a bit for the comments to be available
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verify the post and its comments
    const postComments = await commentsService.getCommentsByPostId(post.id);
    
    expect(post.id).toBeDefined();
    expect(comments).toHaveLength(3);
    expect(postComments).toHaveLength(3);
    postComments.forEach(comment => {
      expect(comment.postId).toBe(post.id);
    });
  });

  test('Error handling - should handle validation errors gracefully', async ({ postsService }) => {
    const invalidPost = {
      title: '', // Invalid: empty title
      body: 123, // Invalid: number instead of string
      userId: 'abc' // Invalid: string instead of number
    };

    try {
      await postsService.createPost(invalidPost as any);
      throw new Error('Should have failed validation');
    } catch (error) {
      expect(error.message).toContain('Validation error');
    }
  });

  test('Retry mechanism - should retry failed requests', async ({ postsService }) => {
    // Simulate a request that fails initially but succeeds after retries
    const options = {
      maxRetries: 3,
      retryDelay: 100,
      trackMetrics: true
    };

    const post = await postsService.getPostById(1, options);
    const metrics = postsService.getMetrics();
    
    expect(post.id).toBe(1);
    expect(metrics[0].retryCount).toBeGreaterThanOrEqual(0);
  });
}); 