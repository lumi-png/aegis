import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { getConnectionString } from './config';

const client = postgres(getConnectionString());
export const db = drizzle(client);
