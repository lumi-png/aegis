import { db } from "../db/index";
import { userSessions, users } from "../db/schema";
import { eq, and, gt } from "drizzle-orm";
import generateToken from "../utils/crypto/generateToken";
import { UserResponse } from "../utils/types";
import { ApiError } from "../utils/error/ApiError";

const createSession = async (id: string) => {
  const [session] = await db
    .insert(userSessions)
    // TODO: once 2FA is implemented isTrusted should always be false and should only be true once 2FA is accomplished
    // standard session duration = 604800 seconds = 7 days = 1 week
    .values({ userId: id, token: generateToken(64), isTrusted: true, duration: 604800 })
    .returning({
      id: userSessions.id,
      userId: userSessions.userId,
      token: userSessions.token,
      duration: userSessions.duration,
      issuedOn: userSessions.issuedOn
    });
  
  return session;
}

const validateSession = async (token: string): Promise<UserResponse> => {
  const session = await db
    .select({
      id: userSessions.id,
      userId: userSessions.userId,
      token: userSessions.token,
      duration: userSessions.duration,
      issuedOn: userSessions.issuedOn,
    })
    .from(userSessions)
    .where(eq(userSessions.token, token))
    .limit(1);

  if (session.length === 0) {
    throw new ApiError("Invalid session token", 401);
  }

  const { issuedOn, duration } = session[0];
  const expiresAt = new Date(issuedOn.getTime() + duration * 1000);
  const now = new Date();

  if (now > expiresAt) {
    await db.delete(userSessions).where(eq(userSessions.id, session[0].id));
    throw new ApiError("Session has expired", 401);
  }

  const user = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      registeredOn: users.registeredOn,
      lastSeenOn: users.lastSeenOn,
    })
    .from(users)
    .where(eq(users.id, session[0].userId))
    .limit(1);

  return user[0];
}

export default { createSession, validateSession };