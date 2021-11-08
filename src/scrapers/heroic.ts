import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { ScraperMenagerInterface } from "../interfaces/ScraperMenager.interface";
import { JobOfferService } from "../services/JobOffer.service";

export class HeroicCompany implements CompanyScraper {
  company = "Heroic";
  mainUrl = "https://www.heroic.gg";
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

    const response = await axios.get(this.mainUrl + "/careers");

    const $ = cheerio.load(response.data);

    $("a").each((index, elem) => {
      $(elem).attr("href")?.includes("/careers/", 0) &&
        this.linksToOffers.push($(elem).attr("href") as string);
    });

    this.linksToOffers = [...new Set(this.linksToOffers)];
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    const response = await axios.get(this.mainUrl + url);

    const $ = cheerio.load(response.data);
    //remove images
    // $(".relative").remove();
    $("p").before("\n");
    $("p").after("\n");
    $("li").before(" - ");
    $("li").after("\n");

    const jobName = $("h1").first().text().trim();
    const jobLocation = "";

    const jobDescription = $("div[class*='BlockContent'] > div")
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
