import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPass(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function checkPass(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export function createToken(id) {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
}

export function generateOtp() {
  let otp = "";

  for (let i = 0; i < 3; i++) {
    const random = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    otp += random;
  }

  console.log("OTP: ", otp);
  return otp;
}
