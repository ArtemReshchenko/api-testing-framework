import { test, expect } from '@playwright/test';
import { PostsService } from '../src/services/posts.service';
import { Post } from '../src/types/api.types';

let postsService: PostsService;

test.beforeEach(async ({ request }) => {
  postsService = new PostsService(request);
});

test.describe('Posts API Tests', () => {
  test('GET /posts - should return all posts', async () => {
    const posts = await postsService.getAllPosts();
    
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  test('GET /posts/:id - should return a specific post', async () => {
    const postId = 1;
    const post = await postsService.getPostById(postId);
    
    expect(post.id).toBe(postId);
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(typeof post.userId).toBe('number');
  });

  test('GET /posts?userId=:id - should return posts for a specific user', async () => {
    const userId = 1;
    const posts = await postsService.getPostsByUserId(userId);
    
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    posts.forEach(post => {
      expect(post.userId).toBe(userId);
    });
  });

  test('POST /posts - should create a new post', async () => {
    const newPost: Partial<Post> = {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1
    };

    const createdPost = await postsService.createPost(newPost);
    
    expect(createdPost.id).toBeDefined();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
  });

  test('PUT /posts/:id - should update an existing post', async () => {
    const postId = 1;
    const updatedPost: Partial<Post> = {
      title: 'Updated Test Post',
      body: 'This is an updated test post body',
      userId: 1
    };

    const modifiedPost = await postsService.updatePost(postId, updatedPost);
    
    expect(modifiedPost.id).toBe(postId);
    expect(modifiedPost.title).toBe(updatedPost.title);
    expect(modifiedPost.body).toBe(updatedPost.body);
  });

  test('DELETE /posts/:id - should delete a post', async () => {
    const postId = 1;
    await postsService.deletePost(postId);
  });
}); 