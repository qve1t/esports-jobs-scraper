import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { ScraperMenagerInterface } from "../interfaces/ScraperMenager.interface";
import { JobOfferService } from "../services/JobOffer.service";

export class GoldenGuardiansCompany implements CompanyScraper {
  company = "Golden Guardians";
  mainUrl = "https://www.goldenguardians.com";
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

    try {
      const response = await axios.get(this.mainUrl + "/jobs");

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        $("a").each((index, elem) => {
          $(elem).attr("href")?.includes("/jobs/", 0) &&
            this.linksToOffers.push($(elem).attr("href") as string);
        });

        this.linksToOffers = [...new Set(this.linksToOffers)];
      }
    } catch (error) {}
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    try {
      const response = await axios.get(this.mainUrl + url);

      if (response.status !== 200) {
        return {
          company: "",
          name: "",
          location: "",
          description: "",
          url: "",
        };
      }

      const $ = cheerio.load(response.data);

      $("a").remove();
      $("strong").before("\n");
      $("strong").after("\n");
      $("li").before(" - ");

      const jobName = $("h1").first().text().trim();
      const jobLocation = "";

      $("h1").remove();

      const jobDescription = $("div")
        .not(".src")
        .first()
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
    } catch (error) {
      return {
        company: "",
        name: "",
        location: "",
        description: "",
        url: "",
      };
    }
  }

  async scrapeAllJobOffers() {
    try {
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
    } catch (error) {
      console.log(`[server]: ${this.company} scrape ERROR.`);
    }
  }
}
