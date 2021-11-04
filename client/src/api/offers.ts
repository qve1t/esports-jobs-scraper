import { FetchResponse } from "../interfaces/fetch.interface";
import {
  GetOffersListRequest,
  JobOffer,
  SimpleJobOfferList,
} from "../interfaces/JobOffer.interface";
import { apiResponse, fetchError } from "../utils/apiResponse";

export const getOffersList = async ({
  search,
  page,
  limit,
}: GetOffersListRequest): Promise<FetchResponse<SimpleJobOfferList | null>> => {
  try {
    const response = await fetch(
      `/api/getoffers/?search=${search}&page=${page}&limit=${limit}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      }
    );

    const jsonResponse = await response.json();
    return apiResponse(response.ok, jsonResponse);
  } catch (error) {
    return fetchError(error as Error);
  }
};

export const getOfferDetails = async (
  id: string
): Promise<FetchResponse<JobOffer | null>> => {
  try {
    const response = await fetch(`/api/offer/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    const jsonResponse = await response.json();
    return apiResponse(response.ok, jsonResponse);
  } catch (error) {
    return fetchError(error as Error);
  }
};
