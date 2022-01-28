import { CompanyScraper } from "../interfaces/CompanyScraper.interface";
import { ScraperMenagerInterface } from "../interfaces/ScraperMenager.interface";
import { infoLogger } from "../logger/logger";

export class ScrapersMenager implements ScraperMenagerInterface {
  scrapers: CompanyScraper[] = [];

  addScraper(scraper: CompanyScraper) {
    this.scrapers.push(scraper);
  }

  async scrapeData() {
    await Promise.all(
      this.scrapers.map(async (elem) => {
        await elem.scrapeAllJobOffers();
      })
    );
    infoLogger.info(
      `[server]: All data scraped at: ${
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      }`
    );
  }
}
