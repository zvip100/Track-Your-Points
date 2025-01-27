import { Router } from "express";
import { login } from "../models/auth.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (user === "User not found") {
      res.json("User not found" );
      return;
    }
    res.json(user);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export default authRouter;
