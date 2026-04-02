import { defineConfig } from 'drizzle-kit';
import { getConnectionString } from './src/db/config';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: getConnectionString(),
  },
});
