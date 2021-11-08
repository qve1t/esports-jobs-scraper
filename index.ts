import express from "express";
import "reflect-metadata";

import connectDB from "./src/db/typeorm";
import JobOfferRouter from "./src/routes/JobOffer";
import { ThievesCompany } from "./src/scrapers/100thieves";
import { C9Company } from "./src/scrapers/c9";
import { CLGCompany } from "./src/scrapers/clg";
import { ComplexityCompany } from "./src/scrapers/complexity";
import { DignitasCompany } from "./src/scrapers/dignitas";
import { EGCompany } from "./src/scrapers/evilGeniuses";
import { ExcelCompany } from "./src/scrapers/excel";
import { FnaticCompany } from "./src/scrapers/fnatic";
import { G2Company } from "./src/scrapers/g2";
import { GoldenGuardiansCompany } from "./src/scrapers/goldenGuardians";
import { HeroicCompany } from "./src/scrapers/heroic";
import { ImmortalsCompany } from "./src/scrapers/immortals";
import { NIPCompany } from "./src/scrapers/nip";
import { TLCompany } from "./src/scrapers/tl";
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
const C9 = new C9Company(scraper);
const TL = new TLCompany(scraper);
const Thieves = new ThievesCompany(scraper);
const EG = new EGCompany(scraper);
const Dignitas = new DignitasCompany(scraper);
const Immortals = new ImmortalsCompany(scraper);
const Complexity = new ComplexityCompany(scraper);
const GG = new GoldenGuardiansCompany(scraper);
const Heroic = new HeroicCompany(scraper);
const NIP = new NIPCompany(scraper);
const CLG = new CLGCompany(scraper);

// scraper.scrapeData();

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
