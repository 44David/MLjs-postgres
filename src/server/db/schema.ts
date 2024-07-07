import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const db = drizzle(sql);

export const models = pgTable(
  'model',
  {
    id: serial('id').primaryKey(),
    model_name: text('model_name').notNull(),
    size: text('size').notNull(),
    context_length: text('context_length').notNull(),
    variations: text('variations').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
);

export const Users = pgTable(
  'Users', 
  {
    id: uuid('id')
    .primaryKey()
    .defaultRandom()
    .unique()
    .notNull(),
    // get these values from Clerk authentication API 
    username: text('username').notNull(),
    openChats: text('open-chats').array(),
    installedModels: text('installed-models').array(),
    createdAt: timestamp('createdAt')
      .defaultNow()
      .notNull(),
    

  }
)
