import { db, users, eq } from "../database/db";

export async function createUser(reqBody) {
  try {
    const { email, password } = reqBody;

    const user = await db
      .update(users)
      .set({ password_hash: password, registered: true })
      .where(eq(users.email, email))
      .returning({ email: users.email, registered: users.registered });

    console.log("create user: ", user);
    return user;
  } catch (e) {
    console.error("Error creating account: ", e.message);
    throw e;
  }
}
