import { APIRequestContext } from '@playwright/test';
import { BaseService } from './base.service';
import { Comment } from '../types/api.types';
import { CommentSchema } from '../schemas/api.schemas';

export class CommentsService extends BaseService {
  constructor(request: APIRequestContext) {
    super(request, '/comments');
  }

  async getAllComments(): Promise<Comment[]> {
    return this.getAll(CommentSchema);
  }

  async getCommentById(id: number): Promise<Comment> {
    return this.getById(id, CommentSchema);
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.getByFilter('postId', postId, CommentSchema);
  }

  async createComment(comment: Partial<Comment>): Promise<Comment> {
    return this.create(comment, CommentSchema);
  }

  async updateComment(id: number, comment: Partial<Comment>): Promise<Comment> {
    return this.update(id, comment, CommentSchema);
  }

  async deleteComment(id: number): Promise<void> {
    return this.delete(id);
  }
} 