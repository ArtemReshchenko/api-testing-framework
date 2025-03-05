import { APIRequestContext } from '@playwright/test';
import { BaseService } from './base.service';
import { Post } from '../types/api.types';
import { PostSchema } from '../schemas/api.schemas';

export class PostsService extends BaseService {
  constructor(request: APIRequestContext) {
    super(request, '/posts');
  }

  async getAllPosts(): Promise<Post[]> {
    return this.getAll(PostSchema);
  }

  async getPostById(id: number): Promise<Post> {
    return this.getById(id, PostSchema);
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return this.getByFilter('userId', userId, PostSchema);
  }

  async createPost(post: Partial<Post>): Promise<Post> {
    return this.create(post, PostSchema);
  }

  async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    return this.update(id, post, PostSchema);
  }

  async deletePost(id: number): Promise<void> {
    return this.delete(id);
  }
} 