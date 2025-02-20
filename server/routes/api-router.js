import { Router } from "express";
import signupRouter from "./signup.js";
import adminAuthRouter from "./admin-auth.js";
import adminRouter from "./admin.js";
import authRouter from "./auth.js";
import accountRouter from "./account.js";
import { authenticateToken } from "../middlewares.js";

const apiRouter = Router();

apiRouter.use("/create-account", signupRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/admin-auth", adminAuthRouter);
apiRouter.use("/admin", authenticateToken, adminRouter);
apiRouter.use("/account", authenticateToken, accountRouter);

export default apiRouter;
