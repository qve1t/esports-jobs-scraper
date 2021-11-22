import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { ScraperMenagerInterface } from "../interfaces/ScraperMenager.interface";
import { JobOfferService } from "../services/JobOffer.service";

export class RiotCompany implements CompanyScraper {
  company = "Riot";
  mainUrl = "https://www.riotgames.com";
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
      const response = await axios.get(
        this.mainUrl + "/en/work-with-us#craft=esports"
      );

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        $("a").each((index, elem) => {
          $(elem).attr("href")?.includes("/j/", 0) &&
            $(elem).text().includes("Esports") &&
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

      $("h2").before("\n");
      $("h2").after("\n");
      $("li").before(" - ");
      $("li").after("\n");

      const jobName = $("h1").first().text().trim();
      const jobLocation = $(".page-header__subheading")
        .first()
        .text()
        .split(",")[0]
        .trim();

      const jobDescription = $(".job-description")
        .text()
        .trim()
        .replace(/\n\n+/g, "\n\n");

      return {
        company: this.company,
        name: jobName,
        location: jobLocation.includes("Singapore") ? "Singapore" : jobLocation,
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
