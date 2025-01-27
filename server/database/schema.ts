import {
  integer,
  varchar,
  pgSchema,
  timestamp,
  numeric,
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
  created_at: timestamp({ mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp({ mode: "string" }),
  last_login: timestamp({ mode: "string" }),
});

/** 
export const policies = mySchema.table("policies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  policy_number: varchar({ length: 255 }).notNull(),
  value: numeric({ precision: 16, scale: 2 }),
  agent: integer()
    .notNull()
    .references(() => users.id),
  points: integer().default(0).notNull(),
  created_at: timestamp({ mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
*/