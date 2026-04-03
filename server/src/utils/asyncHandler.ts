import { Request, Response, NextFunction } from 'express';

/**
 * wraps an async route handler to automatically forward errors to Express error handler.
 * eliminates the need for try/catch blocks or manual .catch(next) in route handlers.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
