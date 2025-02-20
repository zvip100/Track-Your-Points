import { db, users, OTP, eq, and } from "../database/db";
import { hashPass, generateOtp } from "../middlewares";

export async function verifyEmail(email) {
  try {
    const result = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) return "user not found";

    return { success: true };
  } catch (e) {
    console.error("Error checking email from DB: ", e.message);
    throw e;
  }
}

export async function createOtp(email) {
  try {
    const userId = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));

    if (userId.length === 0) throw new Error("user not found");

    const newOtp = generateOtp();

    const result = await db
      .insert(OTP)
      .values({ user: userId[0].id, OTP: newOtp })
      .returning({ id: OTP.id, otp: OTP.OTP });

    return result[0];
  } catch (e) {
    console.error("Error generating OTP from DB: ", e.message);
    throw e;
  }
}

export async function verifyOtp(email, otp) {
  try {
    const userId = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));

    if (userId.length === 0) throw new Error("user not found");

    const result = await db
      .select({ id: OTP.id })
      .from(OTP)
      .where(and(eq(OTP.user, userId[0].id), eq(OTP.OTP, otp)));

    if (result.length === 0) return "Invalid OTP";

    return result;
  } catch (e) {
    console.error("Error verifying OTP from DB: ", e.message);
    throw e;
  }
}

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
    return user[0];
  } catch (e) {
    console.error("Error creating account from DB: ", e.message);
    throw e;
  }
}
