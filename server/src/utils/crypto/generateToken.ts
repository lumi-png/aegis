import { randomBytes } from 'crypto';

export default function generateToken(length: number): string {
  const bytes = Math.ceil(length * 0.75);
  return randomBytes(bytes).toString('base64url').slice(0, length);
}
