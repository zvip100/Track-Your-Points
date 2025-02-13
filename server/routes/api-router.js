import { Router } from "express";
import signupRouter from "./signup.js";
import adminRouter from "./admin.js";
import authRouter from "./auth.js";
import accountRouter from "./account.js";
import { authenticateToken } from "../middlewares.js";

const apiRouter = Router();

apiRouter.use("/sign-up", signupRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/account", authenticateToken, accountRouter);

export default apiRouter;
