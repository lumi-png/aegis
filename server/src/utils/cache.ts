import { redisClient } from '../db/redis.js';

const DEFAULT_TTL = 300; // 5 minutes

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redisClient.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Cache GET error for key ${key}:`, error);
      return null;
    }
  },

  async set(key: string, value: unknown, ttl: number = DEFAULT_TTL): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      await redisClient.set(key, serialized, 'EX', ttl);
    } catch (error) {
      console.error(`Cache SET error for key ${key}:`, error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      console.error(`Cache DEL error for key ${key}:`, error);
    }
  },

  async delByPattern(pattern: string): Promise<void> {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }
    } catch (error) {
      console.error(`Cache DEL pattern error for ${pattern}:`, error);
    }
  },
};
