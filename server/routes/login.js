import { Router } from "express";

const loginRouter = Router();

const url = `http://localhost:${process.env.PORT}/auth/login`;



export default loginRouter;
