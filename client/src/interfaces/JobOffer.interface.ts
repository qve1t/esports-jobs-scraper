export interface JobOffer {
  company: string;
  name: string;
  location: string;
  description: string;
  url: string;
}

export interface GetOffersListRequest {
  search: string;
  page: number;
  limit: number;
}

export interface SimpleJobOffer {
  company: string;
  name: string;
  location: string;
  url: string;
}

export interface SimpleJobOfferList {
  data: SimpleJobOffer[];
  count: number;
}
