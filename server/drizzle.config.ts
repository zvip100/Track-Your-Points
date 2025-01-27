import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./database/drizzle",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
