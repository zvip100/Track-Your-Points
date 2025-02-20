import { Router } from "express";
import { getUser, getPoints, getTotalPoints, requestBooking } from "../models/account";

const accountRouter = Router();

accountRouter.get("/user", async (req, res) => {
  const user = req.user?.id;
  console.log("user: ", user);

  try {
    const result = await getUser(user);

    if (result === "User not found") {
      res.json("User not found");
      return;
    }
    res.json(result);
  } catch (e) {
    console.error("Error getting user: ", e);
    res.sendStatus(500);
  }
});

accountRouter.get("/points", async (req, res) => {
  const user = req.user?.id;
  console.log("user: ", user);

  try {
    const result = await getPoints(user);
    console.log("Get user points result: ", result);

    res.json(result);
  } catch (e) {
    console.error("Error getting user points history: ", e.message);
    res.sendStatus(500);
  }
});

accountRouter.get("/total-points", async (req, res) => {
  const user = req.user?.id;
  console.log("user: ", user);

  try {
    const result = await getTotalPoints(user);
    console.log("Get user points-total result: ", result);

    res.json(result);
  } catch (e) {
    console.error("Error getting user points-total: ", e.message);
    res.sendStatus(500);
  }
});

accountRouter.get("/book-villa",async (req, res) => {
  const user = req.user?.id;
  console.log("user: ", user);

  try {
    const result = await requestBooking(user);
    console.log("Request-booking result: ", result);

    res.json(result);
  } catch (e) {
    console.error("Error requesting-booking: ", e.message);
    res.sendStatus(500);
  }} )

export default accountRouter;
