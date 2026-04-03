import { ZodError } from 'zod';

export class ApiError extends Error {
  statusCode: number;
  zodError?: ZodError;
  
  constructor(message: string, statusCode: number, zodError?: ZodError) {
    super(message);
    this.statusCode = statusCode;
    this.zodError = zodError;
  }
}
