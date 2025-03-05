import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { z } from 'zod';

export class APIHelper {
  constructor(private request: APIRequestContext) {}

  async get<T>(endpoint: string, schema?: z.ZodType<T>): Promise<T | T[]> {
    const response = await this.request.get(endpoint);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    if (schema) {
      try {
        if (Array.isArray(data)) {
          return z.array(schema).parse(data);
        }
        return schema.parse(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error('Validation error:', error.errors);
        }
        throw error;
      }
    }
    
    return data;
  }

  async post<T>(endpoint: string, data: any, schema?: z.ZodType<T>): Promise<T> {
    const response = await this.request.post(endpoint, {
      data
    });
    expect(response.ok()).toBeTruthy();
    const responseData = await response.json();
    
    if (schema) {
      try {
        return schema.parse(responseData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error('Validation error:', error.errors);
        }
        throw error;
      }
    }
    
    return responseData;
  }

  async put<T>(endpoint: string, data: any, schema?: z.ZodType<T>): Promise<T> {
    const response = await this.request.put(endpoint, {
      data
    });
    expect(response.ok()).toBeTruthy();
    const responseData = await response.json();
    
    if (schema) {
      try {
        return schema.parse(responseData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error('Validation error:', error.errors);
        }
        throw error;
      }
    }
    
    return responseData;
  }

  async delete(endpoint: string): Promise<APIResponse> {
    const response = await this.request.delete(endpoint);
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async validateArrayResponse<T>(response: APIResponse, schema: z.ZodType<T>): Promise<T[]> {
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    return z.array(schema).parse(data);
  }
} 