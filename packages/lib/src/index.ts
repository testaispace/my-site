// Models using Zod for validation
import { z } from 'zod';

// User model with Zod validation
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(['user', 'admin', 'moderator']),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

// Product model with Zod validation
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string(),
  inStock: z.boolean(),
  tags: z.array(z.string()).default([]),
  createdAt: z.date(),
});

export type Product = z.infer<typeof ProductSchema>;

// API Response wrapper
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// API Client placeholder interfaces
export interface ApiClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export interface ApiClientMethods {
  get<T>(endpoint: string): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
}

// Placeholder API Client class
export class ApiClient implements ApiClientMethods {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    // TODO: Implement actual HTTP GET request
    console.warn('ApiClient.get() is not implemented yet');
    return {
      success: false,
      error: 'Not implemented',
    };
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    // TODO: Implement actual HTTP POST request
    console.warn('ApiClient.post() is not implemented yet');
    return {
      success: false,
      error: 'Not implemented',
    };
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    // TODO: Implement actual HTTP PUT request
    console.warn('ApiClient.put() is not implemented yet');
    return {
      success: false,
      error: 'Not implemented',
    };
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    // TODO: Implement actual HTTP DELETE request
    console.warn('ApiClient.delete() is not implemented yet');
    return {
      success: false,
      error: 'Not implemented',
    };
  }
}

// Export utility functions
export const validateUser = (data: unknown): User => {
  return UserSchema.parse(data);
};

export const validateProduct = (data: unknown): Product => {
  return ProductSchema.parse(data);
};

// Default API client instance placeholder
export const createApiClient = (config: ApiClientConfig): ApiClient => {
  return new ApiClient(config);
};
