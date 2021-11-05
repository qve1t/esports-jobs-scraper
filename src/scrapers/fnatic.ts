import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { HandleFoundJobOffer } from "../services/JobOffer.service";

export class FnaticCompany implements CompanyScraper {
  company = "Fnatic";
  mainUrl = "https://fnatic.com";
  linksToOffers: string[] = [];

  scrapeInfo() {
    console.log(
      `${this.company} scraped. Found ${this.linksToOffers.length} offers.`
    );
  }

  async scrapeLinks() {
    const response = await axios.get(this.mainUrl + "/careers");

    const $ = cheerio.load(response.data);

    $("a").each((index, elem) => {
      $(elem).attr("href")?.includes("/careers/", 0) &&
        this.linksToOffers.push($(elem).attr("href") as string);
    });
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    const response = await axios.get(this.mainUrl + url);

    const $ = cheerio.load(response.data);
    //remove images
    $(".relative").remove();
    $("h2").before("\n");
    $("h2").after("\n");
    $("li").before(" - ");
    $("li").after("\n");

    const jobName = $("h1").first().text().trim();
    const jobLocation = $("strong").first().text().trim();

    $("h1").remove();
    $("p").first().remove();
    const jobDescription = $('div[class*="prose_prose"]').text().trim();

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

    this.scrapeInfo();
  }
}
