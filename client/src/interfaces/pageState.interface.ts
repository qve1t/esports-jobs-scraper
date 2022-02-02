export interface SearchStateInterface {
  page: number;
  limit: number;
  count: number;
  search: string;
  org: string;
}

export interface PageLoadingStateInterface {
  error: null | string;
  loading: boolean;
}
