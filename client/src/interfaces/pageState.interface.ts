export interface PageStateInterface {
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
