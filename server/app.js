import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { configDotenv } from "dotenv";
import fs from "fs";
import apiRouter from "./routes/api-router";

const app = express();

configDotenv();

const URL = process.env.URL;
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = path.join(__dirname, "./front-end/index.html");

try {
  let html = fs.readFileSync(htmlPath, "utf8");
  html = html.replace("##DEVELOPMENT##", "##PRODUCTION##");
  fs.writeFileSync(htmlPath, html, "utf8");
} catch (error) {
  console.error("Error modifying index.html:", error);
}

app.use("/", express.static(path.join(__dirname, "./front-end")));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(htmlPath);
});

app.listen(PORT, () => {
  console.log(`Example app listening on ${URL}:${PORT}`);
});
