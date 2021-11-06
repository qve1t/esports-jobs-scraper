import express from "express";
import "reflect-metadata";

import connectDB from "./src/db/typeorm";
import JobOfferRouter from "./src/routes/JobOffer";
import { ExcelCompany } from "./src/scrapers/excel";
import { FnaticCompany } from "./src/scrapers/fnatic";
import { G2Company } from "./src/scrapers/g2";
import { VitalityCompany } from "./src/scrapers/vitality";
import { ScrapersMenager } from "./src/services/ScrapersMenager.service";

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(JobOfferRouter);

const scraper = new ScrapersMenager();

const G2 = new G2Company(scraper);
const Fnatic = new FnaticCompany(scraper);
const Excel = new ExcelCompany(scraper);
const Vitality = new VitalityCompany(scraper);

scraper.scrapeData();

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
