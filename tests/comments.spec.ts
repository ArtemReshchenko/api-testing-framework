import { test, expect } from '@playwright/test';
import { CommentsService } from '../src/services/comments.service';
import { Comment } from '../src/types/api.types';

let commentsService: CommentsService;

test.beforeEach(async ({ request }) => {
  commentsService = new CommentsService(request);
});

test.describe('Comments API Tests', () => {
  test('GET /comments - should return all comments', async () => {
    const comments = await commentsService.getAllComments();
    
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBeGreaterThan(0);
    
    const firstComment = comments[0];
    expect(firstComment).toHaveProperty('id');
    expect(firstComment).toHaveProperty('name');
    expect(firstComment).toHaveProperty('email');
    expect(firstComment).toHaveProperty('body');
    expect(firstComment).toHaveProperty('postId');
  });

  test('GET /comments/:id - should return a specific comment', async () => {
    const commentId = 1;
    const comment = await commentsService.getCommentById(commentId);
    
    expect(comment.id).toBe(commentId);
    expect(typeof comment.name).toBe('string');
    expect(typeof comment.email).toBe('string');
    expect(typeof comment.body).toBe('string');
    expect(typeof comment.postId).toBe('number');
  });

  test('GET /comments?postId=:id - should return comments for a specific post', async () => {
    const postId = 1;
    const comments = await commentsService.getCommentsByPostId(postId);
    
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBeGreaterThan(0);
    comments.forEach(comment => {
      expect(comment.postId).toBe(postId);
    });
  });

  test('POST /comments - should create a new comment', async () => {
    const newComment: Partial<Comment> = {
      name: 'Test Comment',
      email: 'test@example.com',
      body: 'This is a test comment body',
      postId: 1
    };

    const createdComment = await commentsService.createComment(newComment);
    
    expect(createdComment.id).toBeDefined();
    expect(createdComment.name).toBe(newComment.name);
    expect(createdComment.email).toBe(newComment.email);
    expect(createdComment.body).toBe(newComment.body);
    expect(createdComment.postId).toBe(newComment.postId);
  });

  test('PUT /comments/:id - should update an existing comment', async () => {
    const commentId = 1;
    const updatedComment: Partial<Comment> = {
      name: 'Updated Test Comment',
      email: 'updated@example.com',
      body: 'This is an updated test comment body',
      postId: 1
    };

    const modifiedComment = await commentsService.updateComment(commentId, updatedComment);
    
    expect(modifiedComment.id).toBe(commentId);
    expect(modifiedComment.name).toBe(updatedComment.name);
    expect(modifiedComment.email).toBe(updatedComment.email);
    expect(modifiedComment.body).toBe(updatedComment.body);
  });

  test('DELETE /comments/:id - should delete a comment', async () => {
    const commentId = 1;
    await commentsService.deleteComment(commentId);
  });
}); 