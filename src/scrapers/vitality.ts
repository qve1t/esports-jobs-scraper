import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import {
  DeleteOldOffers,
  HandleFoundJobOffer,
} from "../services/JobOffer.service";

export class VitalityCompany implements CompanyScraper {
  company = "Vitality";
  mainUrl = "https://team-vitality.welcomekit.co/";
  linksToOffers: string[] = [];

  scrapeInfo() {
    console.log(
      `[server]: ${this.company} scraped. Found ${this.linksToOffers.length} offers.`
    );
  }

  async scrapeLinks() {
    this.linksToOffers = [];

    const response = await axios.get(this.mainUrl);

    const $ = cheerio.load(response.data);

    $("a").each((index, elem) => {
      $(elem).attr("href")?.includes("/jobs/", 0) &&
        $(elem).attr("href") !== "/jobs/candidatures-spontanees" &&
        this.linksToOffers.push($(elem).attr("href") as string);
    });
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    const response = await axios.get(this.mainUrl + url);

    const $ = cheerio.load(response.data);

    const jobName = $("h1").first().text().trim();
    const jobLocation = $(".sticky-header-details ul li").first().text();

    const jobDescription = $(".main-content.job-content.text-formated")
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
        HandleFoundJobOffer(offer);
      })
    );

    await DeleteOldOffers(this.company, this.mainUrl, this.linksToOffers);

    this.scrapeInfo();
  }
}
