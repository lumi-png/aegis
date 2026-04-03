import { ApiError } from './ApiError';
import { z } from 'zod';

describe('ApiError', () => {
  it('should create an ApiError with message and statusCode', () => {
    const error = new ApiError('Not found', 404);
    
    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
    expect(error.zodError).toBeUndefined();
  });

  it('should create an ApiError with a ZodError', () => {
    const schema = z.object({
      name: z.string().min(3),
    });
    
    const result = schema.safeParse({ name: 'ab' });
    
    if (!result.success) {
      const error = new ApiError('Validation error', 400, result.error);
      
      expect(error.message).toBe('Validation error');
      expect(error.statusCode).toBe(400);
      expect(error.zodError).toBe(result.error);
    }
  });

  it('should extend Error', () => {
    const error = new ApiError('Test error', 500);
    
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);
  });
});
