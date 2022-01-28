import puppeteer from "puppeteer";
import { CompanyScraper } from "../interfaces/companyScraper.interface";
import { JobOffer } from "../interfaces/JobOffer.interface";
import { ScraperMenagerInterface } from "../interfaces/ScraperMenager.interface";
import { errorLogger } from "../logger/logger";
import { JobOfferService } from "../services/JobOffer.service";

export class TSMCompany implements CompanyScraper {
  company = "TSM";
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
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        "https://recruiting.paylocity.com/recruiting/jobs/All/65e53f76-9a77-420c-a0f0-9f70004c5120"
      );

      await page.waitForSelector("#jobsList");
      const links = await page.evaluate(() =>
        Array.from(document.getElementsByTagName("a"), (a) => a.href)
      );

      links.forEach((elem) => {
        elem.includes("Jobs") && this.linksToOffers.push(elem);
      });

      await page.close();
      await browser.close();

      this.linksToOffers = [...new Set(this.linksToOffers)];
    } catch (error) {}
  }

  async scrapeJobOffer(url: string): Promise<JobOffer> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(url);
      await page.waitForSelector(".job-preview-details");

      const jobName = await page.$eval(
        ".job-preview-title",
        (elem: any) => elem.innerText
      );
      const jobLocation = await page.$eval(
        ".preview-location > a",
        (elem: any) => elem.innerText
      );

      const jobDescription = await page.$eval(
        ".job-preview-details",
        (elem: any) => elem.innerText.replace(/\n\n+/g, "\n\n")
      );

      await page.close();
      await browser.close();

      return {
        company: this.company,
        name: jobName,
        location: jobLocation,
        description: jobDescription,
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
      errorLogger.error(`[server]: ${this.company} scrape ERROR.`);
    }
  }
}
