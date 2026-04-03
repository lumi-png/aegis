import { eq } from "drizzle-orm";
import * as argon2 from "node-argon2";

import { db } from "../db/index";
import { users } from "../db/schema";
import { ApiError } from "../utils/error/ApiError";
import { UserResponse } from "../utils/types";

const getUser = async (searchParam: "id" | "username", searchValue: string) => {
  if (searchParam === "id") {
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        registeredOn: users.registeredOn,
        lastSeenOn: users.lastSeenOn,
      })
      .from(users)
      .where(eq(users.id, searchValue))
      .limit(1);

    if (user.length === 0) {
      throw new ApiError("User not found", 404);
    }

    return user[0];
  } else {
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        registeredOn: users.registeredOn,
        lastSeenOn: users.lastSeenOn,
      })
      .from(users)
      .where(eq(users.username, searchValue))
      .limit(1);

    if (user.length === 0) {
      throw new ApiError("User not found", 404);
    }

    return user[0];
  }
}

const createUser = async (name: string, username: string, email: string, password: string): Promise<UserResponse> => {
  const hashedPassword = await argon2.hash(password);

  const [user] = await db
    .insert(users)
    .values({ name, username, email, password: hashedPassword })
    .returning({
      id: users.id,
      name: users.name,
      username: users.username,
      registeredOn: users.registeredOn,
      lastSeenOn: users.lastSeenOn,
    });

  return user;
}

export default { getUser, createUser };