import { useState, useEffect } from "react";
import { getOffersList } from "../../api/offers";
import { SimpleJobOffer } from "../../interfaces/JobOffer.interface";
import {
  PageLoadingStateInterface,
  PageStateInterface,
} from "../../interfaces/pageState.interface";
import SearchComponent from "../Search";

import OffersListComponent from "./OffersListComponent";
import OffersWrapper from "./OffersWrapper";

const Offers = () => {
  const [offersList, setOffersList] = useState<SimpleJobOffer[]>([]);
  const [pageState, setPageState] = useState<PageStateInterface>({
    page: 0,
    count: 0,
    limit: 15,
    search: "",
  });
  const [pageLoadingState, setPageLoadingState] =
    useState<PageLoadingStateInterface>({
      error: null,
      loading: true,
    });

  useEffect(() => {
    const getOffers = async () => {
      const fetchedData = await getOffersList({
        search: pageState.search,
        limit: pageState.limit,
        page: pageState.page,
      });
      if (fetchedData.response) {
        setPageLoadingState({ loading: false, error: null });
        setPageState({
          page: pageState.page,
          search: pageState.search,
          count: fetchedData.response.count,
          limit: 15,
        });
        setOffersList(fetchedData.response.data);
      } else {
        setPageLoadingState({ loading: false, error: fetchedData.error });
      }
    };

    getOffers();
  }, [pageState.page, pageState.limit, pageState.search]);

  return (
    <OffersWrapper>
      <SearchComponent pageState={pageState} setPageState={setPageState} />
      <OffersListComponent
        pageLoadingState={pageLoadingState}
        setPageLoadingState={setPageLoadingState}
        offersList={offersList}
        pageState={pageState}
        setPageState={setPageState}
      />
    </OffersWrapper>
  );
};

export default Offers;
