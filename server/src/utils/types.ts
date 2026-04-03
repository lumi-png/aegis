export type UserResponse = {
  id: string;
  name: string;
  username: string;
  registeredOn: Date | null;
  lastSeenOn: Date | null;
};

export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}
