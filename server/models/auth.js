import { db, users, eq, and } from "../database/db";

export async function login(email, password) {
  try {
    const user = await db
      .select({ email: users.email })
      .from(users)
      .where(and(eq(users.email, email), eq(users.password_hash, password)));

    if (user.length === 0) {
      return "User not found";
    }

    return user;
  } catch (e) {
    console.error(e);
    throw new Error("Error logging in");
  }
}
