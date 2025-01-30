import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { data, stillNeeds } from "./data.js";
import signupRouter from "./routes/signup.js";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/", express.static(path.join(__dirname, "../client/dist/")));

app.use("/sign-up", signupRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.get("/about", (req, res) => {
  res.send(
    "Earn 90,000 points to get your 3 nights dream vacation at our beautiful villa in Tampa Florida for free!"
  );
});

app.get("/my-points", (req, res) => {
  data.needs = stillNeeds();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
