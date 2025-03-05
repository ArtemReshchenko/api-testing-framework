import { APIRequestContext } from '@playwright/test';
import { BaseService } from './base.service';
import { Todo } from '../types/api.types';
import { TodoSchema } from '../schemas/api.schemas';

export class TodosService extends BaseService {
  constructor(request: APIRequestContext) {
    super(request, '/todos');
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.getAll(TodoSchema);
  }

  async getTodoById(id: number): Promise<Todo> {
    return this.getById(id, TodoSchema);
  }

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    return this.getByFilter('userId', userId, TodoSchema);
  }

  async createTodo(todo: Partial<Todo>): Promise<Todo> {
    return this.create(todo, TodoSchema);
  }

  async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
    return this.update(id, todo, TodoSchema);
  }

  async deleteTodo(id: number): Promise<void> {
    return this.delete(id);
  }
} 