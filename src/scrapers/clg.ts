import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { ScraperMenagerInterface } from "../interfaces/ScraperMenager.interface";
import { JobOfferService } from "../services/JobOffer.service";

export class CLGCompany implements CompanyScraper {
  company = "CLG";
  mainUrl = "";
  linksToOffers: string[] = [];

  constructor(scraperMenager: ScraperMenagerInterface) {
    scraperMenager.addScraper(this);
  }

  scrapeInfo() {
    console.log(
      `[server]: ${this.company} scraped. Found ${this.linksToOffers.length} offers.`
    );
  }

  async scrapeLinks() {
    this.linksToOffers = [];

    const response = await axios.get("https://www.clg.gg/careers");

    const $ = cheerio.load(response.data);

    $("a").each((index, elem) => {
      $(elem).attr("href")?.includes("/jobs/", 0) &&
        this.linksToOffers.push($(elem).attr("href") as string);
    });

    this.linksToOffers = [...new Set(this.linksToOffers)];
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    const response = await axios.get(this.mainUrl + url);

    const $ = cheerio.load(response.data);

    $("h2").before("\n");
    $("h2").after("\n");
    $("li").before(" - ");
    $("li").after("\n");

    const jobName = $("h1[class*='Header']").first().text().trim();
    const jobLocation = $("div[class*='header left']")
      .first()
      .text()
      .trim()
      .split("-")[2];

    $('div[class*="JobsTable"]').remove();
    $('div[class*="JobOptions"]').remove();
    $('div[class*="PageFooter"]').remove();
    $('div[class*="Logo"]').remove();
    const jobDescription = $('div[class*="JobContent"]')
      .text()
      .trim()
      .replace(/\n\n+/g, "\n\n");

    return {
      company: this.company,
      name: jobName,
      location: jobLocation,
      description: jobDescription,
      url: this.mainUrl + url,
    };
  }

  async scrapeAllJobOffers() {
    await this.scrapeLinks();

    await Promise.all(
      this.linksToOffers.map(async (elem) => {
        const offer = await this.scrapeJobOffer(elem);
        JobOfferService.HandleFoundJobOffer(offer);
      })
    );

    await JobOfferService.DeleteOldOffers(
      this.company,
      this.mainUrl,
      this.linksToOffers
    );

    this.scrapeInfo();
  }
}
