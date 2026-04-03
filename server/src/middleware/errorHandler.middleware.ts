import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/error/ApiError';
import { mapZodErrors } from '../utils/mapZodErrors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const apiError = new ApiError('Validation error', 400, err);
    return res.status(apiError.statusCode).json({
      success: false,
      data: {
        message: apiError.message,
        formErrors: mapZodErrors(err)
      }
    });
  }

  if (err instanceof ApiError) {
    if (err.zodError) {
      return res.status(err.statusCode).json({
        success: false,
        data: {
          message: err.message,
          formErrors: mapZodErrors(err.zodError)
        }
      });
    }
    return res.status(err.statusCode).json({
      success: false,
      data: {
        message: err.message
      }
    });
  }

  return res.status(500).json({
    success: false,
    data: {
      message: "Internal Server Error"
    }
  });
}
