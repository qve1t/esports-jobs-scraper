import { CompanyScraper } from "./CompanyScraper.interface";

export interface ScraperMenagerInterface {
  scrapers: CompanyScraper[];

  addScraper: (scraper: CompanyScraper) => void;
  scrapeData: () => Promise<void>;
}
