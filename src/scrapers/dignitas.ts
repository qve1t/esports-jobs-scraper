import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { ScraperMenagerInterface } from "../interfaces/ScraperMenager.interface";
import { JobOfferService } from "../services/JobOffer.service";

export class DignitasCompany implements CompanyScraper {
  company = "Dignitas";
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
    try {
      const response = await axios.get("https://dignitas.gg/career");

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        $("li > a").each((index, elem) => {
          !$(elem).attr("href")?.includes("/career", 0) &&
            !$(elem).attr("href")?.includes("/articles", 0) &&
            this.linksToOffers.push($(elem).attr("href") as string);
        });

        this.linksToOffers = [...new Set(this.linksToOffers)];
      }
    } catch (error) {}
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    try {
      const response = await axios.get(url);

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

      $("strong").before("\n");
      $("p").after("\n");
      $("h2").before("\n");
      $("h2").after("\n");
      $("li").before(" - ");
      $("li").after("\n");

      const jobName = $("div > p")
        .not(".styles_container")
        .first()
        .text()
        .trim();
      const jobLocation = $('div > p:contains("Job Title")')
        .first()
        .text()
        .trim()
        .split("Location:")[1]
        .split(",")[0];

      const jobDescription = $("div")
        .not(".styles_container")
        .first()
        .text()
        .trim()
        .split("Job Title")[1]
        .replace(/\n\n+/g, "\n\n");

      return {
        company: this.company,
        name: jobName,
        location: jobLocation,
        description: "Job Title" + jobDescription,
        url: url,
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
