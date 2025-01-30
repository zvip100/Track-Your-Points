import { Router } from "express";
import { getUsers, addUsers, addPoints } from "../models/admin";

const adminRouter = Router();

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
  const user = req.body.user;
  const points = req.body.points;
  try {
    const result = await addPoints(user, points);
    res.json(result);
  } catch (e) {
    console.error("Error adding points: ", e.message);
    res.sendStatus(500);
  }
});
export default adminRouter;
