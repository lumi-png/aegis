import { Router, Request, Response, NextFunction } from 'express';
import userController from '../controllers/user.controller';
import { authGuard } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Authenticated routes
router.get('/me', authGuard, asyncHandler(userController.getMe));

// Guest / Unauthenticated routes
router.get('/id/:id', asyncHandler(userController.getUserById));

router.get('/username/:username', asyncHandler(userController.getUserByUsername));

router.post('/', asyncHandler(userController.createUser));

router.post('/auth', asyncHandler(userController.authUser));

export default router;
