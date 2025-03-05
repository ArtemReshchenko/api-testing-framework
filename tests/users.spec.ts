import { test, expect } from '@playwright/test';
import { APIHelper } from '../src/utils/api-helper';
import { UserSchema } from '../src/schemas/api.schemas';

let apiHelper: APIHelper;

test.beforeEach(async ({ request }) => {
  apiHelper = new APIHelper(request);
});

test.describe('Users API Tests', () => {
  test('GET /users - should return all users', async () => {
    const users = await apiHelper.get('/users', UserSchema);
    
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('address');
    expect(firstUser.address).toHaveProperty('geo');
  });

  test('GET /users/:id - should return a specific user', async () => {
    const userId = 1;
    const user = await apiHelper.get(`/users/${userId}`, UserSchema);
    
    expect(user.id).toBe(userId);
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.phone).toBe('string');
    expect(typeof user.website).toBe('string');
    expect(user.address).toBeDefined();
    expect(user.company).toBeDefined();
  });

  test('POST /users - should create a new user', async () => {
    const newUser = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      address: {
        street: 'Test Street',
        suite: 'Suite 123',
        city: 'Test City',
        zipcode: '12345-6789',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'test.website.com',
      company: {
        name: 'Test Company',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    };

    const createdUser = await apiHelper.post('/users', newUser, UserSchema);
    
    expect(createdUser.id).toBeDefined();
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.address.city).toBe(newUser.address.city);
    expect(createdUser.company.name).toBe(newUser.company.name);
  });

  test('PUT /users/:id - should update an existing user', async () => {
    const userId = 1;
    const updatedUser = {
      name: 'Updated User',
      username: 'updateduser',
      email: 'updated@example.com',
      address: {
        street: 'Updated Street',
        suite: 'Updated Suite',
        city: 'Updated City',
        zipcode: '98765-4321',
        geo: {
          lat: '40.7128',
          lng: '-74.0060'
        }
      },
      phone: '1-555-555-5555',
      website: 'updated.website.com',
      company: {
        name: 'Updated Company',
        catchPhrase: 'Updated catch phrase',
        bs: 'updated business strategy'
      }
    };

    const modifiedUser = await apiHelper.put(`/users/${userId}`, updatedUser, UserSchema);
    
    expect(modifiedUser.id).toBe(userId);
    expect(modifiedUser.name).toBe(updatedUser.name);
    expect(modifiedUser.email).toBe(updatedUser.email);
    expect(modifiedUser.address.city).toBe(updatedUser.address.city);
    expect(modifiedUser.company.name).toBe(updatedUser.company.name);
  });

  test('DELETE /users/:id - should delete a user', async () => {
    const userId = 1;
    const response = await apiHelper.delete(`/users/${userId}`);
    expect(response.status()).toBe(200);
  });
}); 