import { FetchResponse } from "../interfaces/fetch.interface";

export const apiResponse = (
  isResponseOk: boolean,
  jsonResponse: any
): FetchResponse<any> => {
  if (!isResponseOk) {
    return {
      error: jsonResponse.message,
      response: null,
    };
  }

  if (jsonResponse.error) {
    return {
      error: jsonResponse.error,
      response: null,
    };
  }

  return {
    error: null,
    response: jsonResponse,
  };
};

export const fetchError = (error: Error): FetchResponse<null> => {
  return {
    error: error.message,
    response: null,
  };
};
