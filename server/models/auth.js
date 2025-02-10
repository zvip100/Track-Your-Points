import { db, users, points, eq, and, sql } from "../database/db";
import { checkPass, createToken } from "../middlewares";

export async function login(email, password) {
  try {
    const user = await db
      .select({
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        passwordHash: users.password_hash,
        points: sql`COALESCE(SUM(${points.amount}), 0)`,
      })
      .from(users)
      .leftJoin(points, eq(users.id, points.user))
      .where(eq(users.email, email))
      .groupBy(users.id, users.first_name, users.last_name, users.email);

    if (user.length === 0) {
      return "User not found";
    }

    const isPasswordValid = await checkPass(password, user[0].passwordHash);

    if (!isPasswordValid) {
      return "Invalid password";
    }

    const token = createToken(user[0].id);
    console.log(token);

    user[0].token = token;

    return user;
  } catch (e) {
    console.error(e);
    throw new Error("Error logging in: ", e);
  }
}
