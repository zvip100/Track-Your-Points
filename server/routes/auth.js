import { Router } from "express";
import { login } from "../models/auth.js";
import { setCookie } from "../middlewares.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (user === "User not found" || user === "Invalid password") {
      res.json("User not found");
      return;
    }
    console.log("token: ", user[0].token);
    setCookie(res, user[0].token);

    const userInfo = [
      {
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        points: user[0].points,
      },
    ];
    res.json(userInfo);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export default authRouter;
