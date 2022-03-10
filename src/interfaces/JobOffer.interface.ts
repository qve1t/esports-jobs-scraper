export interface JobOffer {
  company: string;
  name: string;
  location: string | null;
  description: string;
  url: string;
}

export interface SimpleJobOffer {
  id: string;
  company: string;
  name: string;
  location: string | null;
}

export interface SimpleJobOfferList {
  data: SimpleJobOffer[];
  count: number;
}
