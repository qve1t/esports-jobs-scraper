import "dotenv/config";
import express from "express";
import "reflect-metadata";
import path from "path";

import { infoLogger } from "./src/logger/logger";

import JobOfferRouter from "./src/routes/JobOffer";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(JobOfferRouter);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, async () => {
  infoLogger.info(`[server]: Server is running at port ${PORT}`);
});
