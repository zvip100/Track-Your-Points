import { Router } from "express";
import {
  getAccount,
  getUsers,
  addUsers,
  addPoints,
  getPoints,
  removePoints,
  getBookings,
  confirmBooking,
  rejectBooking,
} from "../models/admin";
import { sendEmail } from "../email";

const adminRouter = Router();

adminRouter.post("/send-email", async (req, res) => {
  const { recipient, subject, content } = req.body;

  try {
    const emailSent = await sendEmail(recipient, subject, content);

    if (emailSent) {
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error in send-email route:", error);
    res.status(500).json({ message: "Server error sending email" });
  }
});

adminRouter.get("/account", async (req, res) => {
  const account = req.user?.id;
  console.log("Account: ", account);

  try {
    const result = await getAccount(account);

    if (result === "Not found") return res.json("Not found");

    res.json(result);
  } catch (e) {
    console.error("Error getting admin account: ", e.message);
    res.sendStatus(500);
  }
});

adminRouter.get("/get-users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (e) {
    console.error("Error getting users: ", e.message);
    res.sendStatus(500);
  }
});

adminRouter.post("/add-user", async (req, res) => {
  const users = req.body;
  console.log(users);

  if (!Array.isArray(users)) {
    return res.status(400).json({ error: "Input must be an array of users" });
  }

  for (const user of users) {
    if (!user.firstName || !user.lastName || !user.email) {
      return res.status(400).json({
        error: "Each user must have firstName, lastName, and email address",
      });
    }
  }

  try {
    const newUsers = await addUsers(users);
    res.json(newUsers);
  } catch (e) {
    console.error("Error adding user: ", e.message);
    res.json("already added");
  }
});

adminRouter.post("/add-points", async (req, res) => {
  const userId = req.body.userId;
  const points = req.body.points;
  try {
    const result = await addPoints(userId, points);
    res.json(result);
  } catch (e) {
    console.error("Error adding points: ", e.message);
    res.sendStatus(500);
  }
});

adminRouter.get("/points", async (req, res) => {
  try {
    const result = await getPoints();
    res.json(result);
  } catch (e) {
    console.error("Error getting points history: ", e.message);
    res.sendStatus(500);
  }
});

adminRouter.post("/remove-points", async (req, res) => {
  const userId = req.body.userId;
  const points = req.body.points;

  try {
    const result = await removePoints(userId, points);
    res.json(result);
  } catch (e) {
    console.error("Error removing points: ", e.message);
    res.sendStatus(500);
  }
});

adminRouter.get("/bookings", async (req, res) => {
  try {
    const result = await getBookings();
    res.json(result);
  } catch (e) {
    console.error("Error getting bookings: ", e.message);
    res.sendStatus(500);
  }
});

adminRouter.post("/confirm-booking", async (req, res) => {
  const userId = req.body.userId;

  try {
    const result = await confirmBooking(userId);
    res.json(result);
  } catch (e) {
    console.error("Error confirming booking: ", e.message);
    res.sendStatus(500);
  }
});

adminRouter.post("/reject-booking", async (req, res) => {
  const userId = req.body.userId;

  try {
    const result = await rejectBooking(userId);
    res.json(result);
  } catch (e) {
    console.error("Error rejecting booking: ", e.message);
    res.sendStatus(500);
  }
});

export default adminRouter;
