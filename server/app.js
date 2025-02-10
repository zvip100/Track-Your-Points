import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import apiRouter from "./routes/api-router";

const app = express();

const URL = process.env.URL;
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
});*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/", express.static(path.join(__dirname, "./front-end")));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./front-end/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening on ${URL}:${PORT}`);
});
