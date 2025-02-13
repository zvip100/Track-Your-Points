import { desc } from "drizzle-orm";
import { db, users, points, eq, sql } from "../database/db";

export async function getUser(id) {
  try {
    const result = await db
      .select({
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        points: sql`COALESCE(SUM(${points.amount}), 0)`,
      })
      .from(users)
      .leftJoin(points, eq(users.id, points.user))
      .where(eq(users.id, id))
      .groupBy(users.id, users.first_name, users.last_name, users.email);

    console.log("Getting user info by token result: ", result);

    if (result.length === 0) {
      return "User not found";
    }

    return result;
  } catch (e) {
    console.error("Error getting user info by token from DB: ", e);
    throw e;
  }
}

export async function getPoints(user) {
  try {
    const result = await db
      .select({
        id: points.id,
        email: users.email,
        amount: points.amount,
        totalPoints: sql`(SELECT SUM(${points.amount}) FROM ${points} WHERE ${points.user} = ${user})`,
        date: sql`to_char(${points.added_at}, 'MM/DD/YYYY')`,
        time: sql`to_char(${points.added_at}, 'HH12:MI:SS AM')`,
      })
      .from(points)
      .leftJoin(users, eq(points.user, users.id))
      .where(eq(points.user, user))
      .orderBy(desc(points.added_at));

    console.log("Get user points from DB: ", result);

    return result;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
}
