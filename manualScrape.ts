import "dotenv/config";
import connectDB from "./src/db/typeorm";

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
import { TSMCompany } from "./src/scrapers/tsm";
import { AstralisCompany } from "./src/scrapers/astralis";

try {
  connectDB();

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
  new TSMCompany(scraper);

  const scrape = async () => {
    await scraper.scrapeData();
    console.log("scrape finished");
  };

  scrape();
  //   process.exit();
} catch (error) {
  console.log(error);
}
