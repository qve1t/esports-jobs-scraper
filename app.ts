import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { CronJob } from "cron";
import path from "path";

import connectDB from "./src/db/typeorm";
import JobOfferRouter from "./src/routes/JobOffer";
import { ScrapersMenager } from "./src/services/ScrapersMenager.service";
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
import { RektGlobalCompany } from "./src/scrapers/rektGlobal";
import { GuildCompany } from "./src/scrapers/guild";
import { OveractiveCompany } from "./src/scrapers/overactive";
import { TSMCompany } from "./src/scrapers/tsm";

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(JobOfferRouter);

app.use(express.static(path.join(__dirname, "./client/build")));

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
const RektGlobal = new RektGlobalCompany(scraper);
const Guild = new GuildCompany(scraper);
const OverActive = new OveractiveCompany(scraper);
const TSM = new TSMCompany(scraper);

const cronJob = new CronJob(
  "0 1,13 * * *",
  async () => {
    await scraper.scrapeData();
  },
  null,
  false,
  "Europe/Warsaw"
);

cronJob.start();

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, async () => {
  console.log(`[server]: Server is running at port ${PORT}`);
  process.env.ENV !== "production" && (await scraper.scrapeData());
});
