import { db, users, points, eq, and, sql } from "../database/db";

export async function login(email, password) {
  try {
    const user = await db
      .select({
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        points: sql`COALESCE(SUM(${points.amount}), 0)`,
      })
      .from(users)
      .leftJoin(points, eq(users.id, points.user))
      .where(and(eq(users.email, email), eq(users.password_hash, password)))
      .groupBy(users.id, users.first_name, users.last_name, users.email);

    if (user.length === 0) {
      return "User not found";
    }

    return user;
  } catch (e) {
    console.error(e);
    throw new Error("Error logging in: ", e);
  }
}
