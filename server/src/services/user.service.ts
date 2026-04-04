import { eq } from "drizzle-orm";
import * as argon2 from "node-argon2";

import { db } from "../db/index";
import { users } from "../db/schema";
import { ApiError } from "../utils/error/ApiError";
import { UserResponse } from "../utils/types";
import { cache } from "../utils/cache";

const getUser = async (searchParam: "id" | "username", searchValue: string) => {
  const cacheKey = `user:${searchParam}:${searchValue}`;

  const cachedUser = await cache.get<UserResponse>(cacheKey);
  if (cachedUser) {
    return cachedUser;
  }

  let user: UserResponse;

  if (searchParam === "id") {
    const result = await db
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

    if (result.length === 0) {
      throw new ApiError("User not found", 404);
    }

    user = result[0];
  } else {
    const result = await db
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

    if (result.length === 0) {
      throw new ApiError("User not found", 404);
    }

    user = result[0];
  }

  await cache.set(cacheKey, user);

  return user;
}

const updateLastSeen = async (userId: string) => {
  await db
    .update(users)
    .set({ lastSeenOn: new Date() })
    .where(eq(users.id, userId));
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

export default { getUser, createUser, updateLastSeen };