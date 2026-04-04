import { Request, Response, NextFunction } from "express";
import * as argon2 from "node-argon2";
import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { users, insertUserSchema, loginSchema } from "../db/schema";
import { ApiError } from "../utils/error/ApiError";
import authService from "../services/auth.service";
import userService from "../services/user.service";

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

const createUserSchema = insertUserSchema.superRefine(async (data, ctx) => {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, data.username))
    .limit(1);

  if (existingUser.length > 0) {
    ctx.addIssue({
      code: "custom",
      message: "Username is already taken",
      path: ["username"],
    });
  }

  const existingEmail = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  if (existingEmail.length > 0) {
    ctx.addIssue({
      code: "custom",
      message: "Email is already registered",
      path: ["email"],
    });
  }
});

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

const authUserSchema = loginSchema.superRefine(async (data, ctx) => {
  const user = await db
    .select({ password: users.password })
    .from(users)
    .where(eq(users.username, data.username))
    .limit(1);

  if (user.length === 0) {
    ctx.addIssue({
      code: "custom",
      message: "Invalid username or password",
      path: ["username"],
    });
    ctx.addIssue({
      code: "custom",
      message: "Invalid username or password",
      path: ["password"],
    });
    return;
  }

  const isPasswordValid = await argon2.verify({ hash: user[0].password, password: data.password });

  if (!isPasswordValid) {
    ctx.addIssue({
      code: "custom",
      message: "Invalid username or password",
      path: ["username"],
    });
    ctx.addIssue({
      code: "custom",
      message: "Invalid username or password",
      path: ["password"],
    });
  }
});

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