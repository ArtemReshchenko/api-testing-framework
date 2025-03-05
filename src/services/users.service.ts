import { APIRequestContext } from '@playwright/test';
import { BaseService } from './base.service';
import { User } from '../types/api.types';
import { UserSchema } from '../schemas/api.schemas';

export class UsersService extends BaseService {
  constructor(request: APIRequestContext) {
    super(request, '/users');
  }

  async getAllUsers(): Promise<User[]> {
    return this.getAll(UserSchema);
  }

  async getUserById(id: number): Promise<User> {
    return this.getById(id, UserSchema);
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.create(user, UserSchema);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    return this.update(id, user, UserSchema);
  }

  async deleteUser(id: number): Promise<void> {
    return this.delete(id);
  }
} 