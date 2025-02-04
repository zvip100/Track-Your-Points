import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { eq, and, sql } from "drizzle-orm";

export const db = drizzle(process.env.DATABASE_URL);

export const { users, points, admin } = schema;
export { eq, and, sql };
