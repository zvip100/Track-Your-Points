import { Router } from "express";
import { getPoints } from "../models/account";

const accountRouter = Router();

accountRouter.get("/:user/points", async (req, res) => {
  const user = req.params.user;
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
