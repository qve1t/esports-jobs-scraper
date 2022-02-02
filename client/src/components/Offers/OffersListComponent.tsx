import { useEffect, useState } from "react";
import { getOffersList } from "../../api/offers";
import { SimpleJobOffer } from "../../interfaces/JobOffer.interface";
import { PageLoadingStateInterface } from "../../interfaces/pageState.interface";
import { useSearchState, useSetSearchState } from "../../modules/SearchModule";
import EmptyDataComponent from "../EmptyDataComponent";
import ErrorComponent from "../ErrorComponent";
import LoadingComponent from "../LoadingComponent";
import PaginationComponent from "../PaginationComponent";
import SingleOffer from "./SingleOffer";

const OffersListComponent = () => {
  const [offersList, setOffersList] = useState<SimpleJobOffer[]>([]);
  const searchState = useSearchState();
  const setSearchState = useSetSearchState();

  const [pageLoadingState, setPageLoadingState] =
    useState<PageLoadingStateInterface>({
      error: null,
      loading: true,
    });

  useEffect(() => {
    const getOffers = async () => {
      const fetchedData = await getOffersList({
        search: searchState.search,
        org: searchState.org,
        limit: searchState.limit,
        page: searchState.page,
      });
      if (fetchedData.response) {
        setPageLoadingState({ loading: false, error: null });
        setSearchState({
          page: searchState.page,
          search: searchState.search,
          org: searchState.org,
          count: fetchedData.response.count,
          limit: 15,
        });
        setOffersList(fetchedData.response.data);
      } else {
        setPageLoadingState({ loading: false, error: fetchedData.error });
      }
    };

    getOffers();
  }, [
    searchState.page,
    searchState.limit,
    searchState.search,
    searchState.org,
    setSearchState,
  ]);

  if (pageLoadingState.loading) {
    return <LoadingComponent />;
  }

  if (pageLoadingState.error) {
    return <ErrorComponent error={pageLoadingState.error} />;
  }

  if (offersList.length <= 0) {
    return <EmptyDataComponent />;
  }
  return (
    <>
      {offersList.map((elem: SimpleJobOffer) => (
        <SingleOffer
          key={elem._id}
          _id={elem._id}
          company={elem.company}
          location={elem.location}
          name={elem.name}
        />
      ))}
      <PaginationComponent
        resultsLength={offersList.length}
        searchState={searchState}
        setSearchState={setSearchState}
        setPageLoadingState={setPageLoadingState}
      />
    </>
  );
};

export default OffersListComponent;
