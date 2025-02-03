import {
  integer,
  varchar,
  pgSchema,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const mySchema = pgSchema("points-project");

export const users = mySchema.table("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }),
  phone: varchar({ length: 20 }),
  points: integer().default(0),
  registered: boolean().default(false).notNull(),
  created_at: timestamp({ mode: "date" })
    .default(sql`TIMEZONE('America/New_York', NOW())`)
    .notNull(),
  updated_at: timestamp({ mode: "date" }),
  last_login: timestamp({ mode: "date" }),
});

export const points = mySchema.table("points", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user: integer()
    .notNull()
    .references(() => users.id),
  amount: integer().notNull().default(0),
  added_at: timestamp({ mode: "date" })
    .default(sql`TIMEZONE('America/New_York', NOW())`)
    .notNull(),
});

export const admin = mySchema.table("admin", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  created_at: timestamp({ mode: "date" })
    .default(sql`TIMEZONE('America/New_York', NOW())`)
    .notNull(),
});
