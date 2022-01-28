import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { CronJob } from "cron";
import path from "path";

import { infoLogger } from "./src/logger/logger";

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
import { RiotCompany } from "./src/scrapers/Riot";
import { VersionCompany } from "./src/scrapers/versionone";
import { AstralisCompany } from "./src/scrapers/astralis";
// import { TSMCompany } from "./src/scrapers/tsm";

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(JobOfferRouter);

app.use(express.static(path.join(__dirname, "./client/build")));

const scraper = new ScrapersMenager();

new G2Company(scraper);
new FnaticCompany(scraper);
new ExcelCompany(scraper);
new VitalityCompany(scraper);
new C9Company(scraper);
new TLCompany(scraper);
new ThievesCompany(scraper);
new EGCompany(scraper);
new DignitasCompany(scraper);
new ImmortalsCompany(scraper);
new ComplexityCompany(scraper);
new GoldenGuardiansCompany(scraper);
new HeroicCompany(scraper);
new NIPCompany(scraper);
new CLGCompany(scraper);
new RektGlobalCompany(scraper);
new GuildCompany(scraper);
new OveractiveCompany(scraper);
new RiotCompany(scraper);
new VersionCompany(scraper);
new AstralisCompany(scraper);
// const TSM = new TSMCompany(scraper); TSM have to be scraped manually

const cronJob = new CronJob("0 1,13 * * *", async () => {
  await scraper.scrapeData();
});

cronJob.start();

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, async () => {
  infoLogger.info(`[server]: Server is running at port ${PORT}`);
  process.env.ENV !== "production" && (await scraper.scrapeData());
});
