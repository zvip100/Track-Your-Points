import { createToken } from "../middlewares";
import { db, admin, eq, and } from "../database/db";

export async function login(email, password) {
  //add compare password hashing
  try {
    const result = await db
      .select({ id: admin.id, email: admin.email, createdAt: admin.created_at })
      .from(admin)
      .where(and(eq(admin.email, email), eq(admin.password_hash, password)));

    console.log("admin login result: ", result);

    if (result.length === 0) return "Not found";

    const token = createToken(result[0].id);
    console.log(token);

    result[0].token = token;

    return result;
  } catch (e) {
    console.error("Error logging as admin: ", e.message);
    throw e;
  }
}
