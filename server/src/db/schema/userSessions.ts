import { pgTable, uuid, varchar, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const userSessions = pgTable('user_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  token: varchar('token', { length: 512 }).notNull().unique(),
  isTrusted: boolean('is_trusted').default(false).notNull(),
  duration: integer('duration').notNull(),
  issuedOn: timestamp('issued_on').defaultNow().notNull(),
});

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));
