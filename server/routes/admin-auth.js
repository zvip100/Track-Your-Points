import { Router } from "express";
import { login } from "../models/admin-auth";

const adminAuthRouter = Router();

adminAuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    if (result === "Not found") {
      res.json("Not found");
      return;
    }
    res.json(result);
  } catch (e) {
    console.error("error logging in as admin: ", e.message);
    res.sendStatus(500);
  }
});

export default adminAuthRouter;
