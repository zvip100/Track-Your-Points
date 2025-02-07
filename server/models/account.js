import { desc } from "drizzle-orm";
import { db, users, points, eq, sql } from "../database/db";

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
