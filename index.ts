import express from "express";

import { G2Company } from "./src/scrapers/g2";
import { FnaticCompany } from "./src/scrapers/fnatic";

import connectDB from "./src/db/mongoose";
import JobOfferRouter from "./src/routes/JobOffer";
import { VitalityCompany } from "./src/scrapers/vitality";
import { ExcelCompany } from "./src/scrapers/excel";

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

const G2 = new G2Company();
const Fnatic = new FnaticCompany();
const Vitality = new VitalityCompany();
const Excel = new ExcelCompany();

G2.scrapeAllJobOffers();
Fnatic.scrapeAllJobOffers();
Vitality.scrapeAllJobOffers();
Excel.scrapeAllJobOffers();

app.use(JobOfferRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
