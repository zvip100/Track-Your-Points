import express from "express";
import cors from "cors";
import { db } from "./database/db.js";
import { data, stillNeeds } from "./data.js";
import { users } from "./database/schema";
import signupRouter from "./routes/signup.js";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/sign-up", signupRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send(
    "Earn 50,000 points to get your dream vacation at our beautiful villa in Tampa Florida for free!"
  );
});

app.get("/my-points", (req, res) => {
  data.needs = stillNeeds();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
