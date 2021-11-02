import { JobOffer } from "./JobOffer.interface";

export interface CompanyScraper {
  company: string;
  mainUrl: string;
  linksToOffers: string[];

  scrapeLinks: () => Promise<void>;
  scrapeJobOffer: (url: string) => Promise<JobOffer>;
  scrapeAllJobOffers: () => Promise<void>;
}
