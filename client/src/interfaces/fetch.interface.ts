export interface FetchResponse<T> {
  error: null | string;
  response: T;
}

export interface LoadingStateInterface {
  error: null | string;
  loading: boolean;
}
