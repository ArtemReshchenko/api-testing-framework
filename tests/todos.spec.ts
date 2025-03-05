import { test, expect } from '@playwright/test';
import { Todo } from '../src/types/api.types';
import { TodosService } from '@/services/todos.service';

let todosService: TodosService;

test.beforeEach(async ({ request }) => {
  todosService = new TodosService(request);
});

test.describe('Todos API Tests', () => {
  test('GET /todos - should return all todos', async () => {
    const todos = await todosService.getAllTodos();
    
    expect(Array.isArray(todos)).toBeTruthy();
    expect(todos.length).toBeGreaterThan(0);
    
    const firstTodo = todos[0];
    expect(firstTodo).toHaveProperty('id');
    expect(firstTodo).toHaveProperty('title');
    expect(firstTodo).toHaveProperty('completed');
    expect(firstTodo).toHaveProperty('userId');
  });

  test('GET /todos/:id - should return a specific todo', async () => {
    const todoId = 1;
    const todo = await todosService.getTodoById(todoId);
    
    expect(todo.id).toBe(todoId);
    expect(typeof todo.title).toBe('string');
    expect(typeof todo.completed).toBe('boolean');
    expect(typeof todo.userId).toBe('number');
  });

  test('GET /todos?userId=:id - should return todos for a specific user', async () => {
    const userId = 1;
    const todos = await todosService.getTodosByUserId(userId);
    
    expect(Array.isArray(todos)).toBeTruthy();
    expect(todos.length).toBeGreaterThan(0);
    todos.forEach(todo => {
      expect(todo.userId).toBe(userId);
    });
  });

  test('POST /todos - should create a new todo', async () => {
    const newTodo: Partial<Todo> = {
      title: 'Test Todo',
      completed: false,
      userId: 1
    };

    const createdTodo = await todosService.createTodo(newTodo);
    
    expect(createdTodo.id).toBeDefined();
    expect(createdTodo.title).toBe(newTodo.title);
    expect(createdTodo.completed).toBe(newTodo.completed);
    expect(createdTodo.userId).toBe(newTodo.userId);
  });

  test('PUT /todos/:id - should update an existing todo', async () => {
    const todoId = 1;
    const updatedTodo: Partial<Todo> = {
      title: 'Updated Test Todo',
      completed: true,
      userId: 1
    };

    const modifiedTodo = await todosService.updateTodo(todoId, updatedTodo);
    
    expect(modifiedTodo.id).toBe(todoId);
    expect(modifiedTodo.title).toBe(updatedTodo.title);
    expect(modifiedTodo.completed).toBe(updatedTodo.completed);
    expect(modifiedTodo.userId).toBe(updatedTodo.userId);
  });

  test('DELETE /todos/:id - should delete a todo', async () => {
    const todoId = 1;
    await todosService.deleteTodo(todoId);
  });
}); 