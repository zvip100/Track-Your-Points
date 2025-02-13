import { Router } from "express";
import { getUser, getPoints } from "../models/account";

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
    console.error(e.message);
    res.sendStatus(500);
  }
});

export default accountRouter;
