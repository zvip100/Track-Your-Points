import { Router } from "express";
import {
  verifyEmail,
  createOtp,
  verifyOtp,
  createUser,
} from "../models/signup.js";
import { sendEmail } from "../email/email";
import otpEmail from "../email/templates/otp-email";

const signupRouter = Router();

signupRouter.post("/verify-email", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await verifyEmail(email);

    res.json(result);
  } catch (e) {
    console.error("Error verifying email: ", e.message);
    res.sendStatus(500);
  }
});

signupRouter.post("/get-otp", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await createOtp(email);
    const { subject, content } = otpEmail(result.otp);

    const emailUser = await sendEmail(email, subject, content);

    if (emailUser) {
      console.log("Succesfully sent email to user.");
    } else {
      console.error("Error sending email to user.");
      return res.json("failed to send email with OTP");
    }

    res.json(result);
  } catch (e) {
    console.error("Error creating OTP: ", e.message);
    res.sendStatus(500);
  }
});

signupRouter.post("/verify-otp", async (req, res) => {
  try {
    const email = req.body.email;
    const OTP = req.body.otp;

    const result = await verifyOtp(email, OTP);

    if (result === "Invalid OTP") return res.json(result);

    res.json(result[0]);
  } catch (e) {
    console.error("Error verifying OTP: ", e.message);
    res.sendStatus(500);
  }
});

signupRouter.post("/sign-up", async (req, res) => {
  console.log("Sign-up body: ", req.body);
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (e) {
    console.error("Error creating account: ", e.message);
    res.sendStatus(500);
  }
});

export default signupRouter;
