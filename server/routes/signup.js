import { Router } from "express";
import { createUser } from "../models/signup.js";

const signupRouter = Router();

signupRouter.post("/", async (req, res) => {
  console.log("Sign-up body: ", req.body);
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500);
  }
});

export default signupRouter;
