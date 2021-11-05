import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import {
  DeleteOldOffers,
  HandleFoundJobOffer,
} from "../services/JobOffer.service";

export class ExcelCompany implements CompanyScraper {
  company = "Excel";
  mainUrl = "";
  linksToOffers: string[] = [];

  scrapeInfo() {
    console.log(
      `[server]: ${this.company} scraped. Found ${this.linksToOffers.length} offers.`
    );
  }

  async scrapeLinks() {
    this.linksToOffers = [];

    const response = await axios.get("https://xl.gg/pages/careers");

    const $ = cheerio.load(response.data);

    $("a").each((index, elem) => {
      $(elem).attr("href")?.includes("/hr.breathehr.com/", 0) &&
        this.linksToOffers.push($(elem).attr("href") as string);
    });
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    const response = await axios.get(url);
    const locationResponse = await axios.get("https://xl.gg/pages/careers");
    const $ = cheerio.load(response.data);
    const $lr = cheerio.load(locationResponse.data);

    const jobName = $(".job-title").first().text().trim();
    const jobLocation = $lr(`[href=${url}] .sub-title`).first().text().trim();

    $("strong").before("\n");
    $("strong").after("\n");
    $("li").before(" - ");

    const jobDescription = $(".vacancy-subsection-details")
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
