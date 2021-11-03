import express from "express";

import { G2Company } from "./src/scrapers/g2";
import { FnaticCompany } from "./src/scrapers/fnatic";

import connectDB from "./src/db/mongoose";

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const G2 = new G2Company();
const Fnatic = new FnaticCompany();

G2.scrapeAllJobOffers();
Fnatic.scrapeAllJobOffers();

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
