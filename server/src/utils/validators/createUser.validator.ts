import { eq } from "drizzle-orm";
import { db } from "../../db/index";
import { users, insertUserSchema } from "../../db/schema";

export const createUserSchema = insertUserSchema.superRefine(async (data, ctx) => {
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
