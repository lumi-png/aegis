import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/error/ApiError";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { createUserSchema } from "../utils/validators/createUser.validator";
import { authUserSchema } from "../utils/validators/authUser.validator";

const getUsers = async (req: Request, res: Response) => {

}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const user = await userService.getUser("id", id);

  return res.status(200).json({
    success: true,
    data: user,
  });
}

const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username as string;
  const user = await userService.getUser("username", username);

  return res.status(200).json({
    success: true,
    data: user,
  });
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult = await createUserSchema.safeParseAsync(req.body);

  if (!validationResult.success) {
    throw new ApiError(
      "Validation failed",
      400,
      validationResult.error
    );
  }

  const { name, username, email, password } = validationResult.data;
  
  const user = await userService.createUser(name, username, email, password);

  return res.status(201).json({
    success: true,
    data: user
  });
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult = await authUserSchema.safeParseAsync(req.body);

  if (!validationResult.success) {
    throw new ApiError(
      "Validation failed",
      400,
      validationResult.error
    );
  }

  const { username } = validationResult.data;

  const user = await userService.getUser("username", username);

  return res.status(200).json({
    success: true,
    data: {
      sessionToken: (await authService.createSession(user.id)).token,
      user: user
    }
  });
}

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
}

export default { getUsers, getUserById, getUserByUsername, createUser, authUser, getMe };