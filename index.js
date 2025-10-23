import dotenv from "dotenv";
dotenv.config();
console.log("CLIENT_URL:", process.env.CLIENT_URL);

import cors from "cors";
import express from "express";

import errorHandler from "./middlewares/errorHandler.js";

import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT = process.env.CLIENT_URL;

app.set("trust proxy", true);
// app.use(rateLimiter); // Temporarily disabled for development

app.use(
  cors({
    origin: CLIENT,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/ai", aiRouter);

app.get("/", (_req, res) => {
  res.send("Running");
});

app.use("/*splat", (req, res) => {
  throw new Error("Page not found", { cause: 404 });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
