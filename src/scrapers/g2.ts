import axios from "axios";
import * as cheerio from "cheerio";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import {
  DeleteOldOffers,
  HandleFoundJobOffer,
} from "../services/JobOffer.service";

export class G2Company implements CompanyScraper {
  company = "G2";
  mainUrl = "https://g2esports.com";
  linksToOffers: string[] = [];

  scrapeInfo() {
    console.log(
      `[server]: ${this.company} scraped. Found ${this.linksToOffers.length} offers.`
    );
  }

  async scrapeLinks() {
    const response = await axios.get(this.mainUrl + "/blogs/careers");

    const $ = cheerio.load(response.data);

    const linksTable = $("nav.join-table");

    linksTable.children("a").each((index, elem) => {
      this.linksToOffers.push($(elem).attr("href") as string);
    });
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    const response = await axios.get(this.mainUrl + url);

    const $ = cheerio.load(response.data);

    $("h3").remove();
    $("li").before(" - ");
    $("b").before("\n");

    const jobName = $("h1.headline-tt").text().trim();
    const jobLocation = $('li:contains("Location:")')
      .text()
      .split(":")[1]
      .trim();
    const jobDescription = $("article").first().text().trim();

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
