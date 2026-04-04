import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { ApiError } from '../utils/error/ApiError';

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError('Authorization header is missing or malformed', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = await authService.validateSession(token);
    req.user = user;
    await userService.updateLastSeen(user.id);
    next();
  } catch (error) {
    next(error);
  }
};
