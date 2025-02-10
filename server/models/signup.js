import { db, users, eq } from "../database/db";
import { hashPass } from "../middlewares";

export async function createUser(reqBody) {
  const { email, password } = reqBody;
  try {
    const passwordHash = await hashPass(password);
    if (!passwordHash) throw new Error("Failed to hash password");

    const user = await db
      .update(users)
      .set({ password_hash: passwordHash, registered: true })
      .where(eq(users.email, email))
      .returning({ email: users.email, registered: users.registered });

    console.log("create user: ", user);
    return user;
  } catch (e) {
    console.error("Error creating account: ", e.message);
    throw e;
  }
}
