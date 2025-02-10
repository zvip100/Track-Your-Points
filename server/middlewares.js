import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  "2189889856b94f8455aa5c942161267695ea4d04482d7a077e052b7eef3232515f6bd229a42b8ca3878717e3f131d0b2ce67f412f519053d3c372fff017b66b4";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

export async function hashPass(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function checkPass(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export function createToken(id) {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: hour });
  return token;
}

export function verifyToken(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}

export function setCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: false,
    secure: false,
    maxAge: 1 * hour,
    sameSite: "lax",
  });

  return;
}
