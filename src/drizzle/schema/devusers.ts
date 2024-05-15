import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
export const devusers = pgTable('devusers', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  fullName: text('fullName').notNull(),
  email: text('email').unique().notNull(),
  created_at: timestamp('created_at').defaultNow(),
});
