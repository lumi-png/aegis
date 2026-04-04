import { eq } from "drizzle-orm";
import * as argon2 from "node-argon2";
import { db } from "../../db/index";
import { users, loginSchema } from "../../db/schema";

export const authUserSchema = loginSchema.superRefine(async (data, ctx) => {
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
