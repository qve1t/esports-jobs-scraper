import axios from "axios";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { ScraperMenagerInterface } from "../interfaces/ScraperMenager.interface";
import { JobOfferService } from "../services/JobOffer.service";
import { errorLogger } from "../logger/logger";
import { clearHtmlTags } from "../utils/clearHtmlTags";

export class OveractiveCompany implements CompanyScraper {
  company = "OverActive Media";
  mainUrl = "https://apply.workable.com/overactive-media-group/j/";
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
      const response = await axios.post(
        "https://apply.workable.com/api/v3/accounts/overactive-media-group/jobs",
        {
          department: [],
          location: [],
          query: "",
          remote: [],
          worktype: [],
        }
      );

      if (response.status === 200) {
        response.data.results.forEach((elem: any) => {
          this.linksToOffers.push(elem.shortcode);
        });

        this.linksToOffers = [...new Set(this.linksToOffers)];
      }
    } catch (error) {}
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    try {
      const response = await axios.get(
        "https://apply.workable.com/api/v2/accounts/overactive-media-group/jobs/" +
          url
      );

      if (response.status !== 200) {
        return {
          company: "",
          name: "",
          location: "",
          description: "",
          url: "",
        };
      }

      const jobName = response.data.title || "";
      const jobLocation =
        response.data.location.city +
          (response.data.remote ? ", Remote" : "") || "";
      const jobDescription =
        "Description \n" +
        clearHtmlTags(response.data.description) +
        "Requirements \n" +
        clearHtmlTags(response.data.requirements) +
        "Benefits \n" +
        clearHtmlTags(response.data.benefits).split("at <a")[0];

      return {
        company: this.company,
        name: jobName,
        location: jobLocation,
        description: jobDescription,
        url: this.mainUrl + response.data.shortcode,
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
      errorLogger.error(`[server]: ${this.company} scrape ERROR.`);
    }
  }
}
