import { db, users, eq, and } from "../database/db";

export async function login(email, password) {
  try {
    const user = await db
      .select({
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        points: users.points,
      })
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
