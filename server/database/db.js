import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { eq, and } from "drizzle-orm";

export const db = drizzle(process.env.DATABASE_URL);

export const { users } = schema;
export { eq, and };
