import { Router } from 'express';
import userRouter from "./user";

const router = Router();

// get server status
router.get('/status', (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      isDevelopment: process.env.NODE_ENV === "development" ? true : false
    }
  });
});

router.use('/users', userRouter);

export default router;
