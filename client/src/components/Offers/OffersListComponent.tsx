import { LoadingStateInterface } from "../../interfaces/fetch.interface";
import { SimpleJobOffer } from "../../interfaces/JobOffer.interface";
import { PageStateInterface } from "../../interfaces/pageState.interface";
import EmptyDataComponent from "../EmptyDataComponent";
import ErrorComponent from "../ErrorComponent";
import LoadingComponent from "../LoadingComponent";
import PaginationComponent from "../PaginationComponent";
import SingleOffer from "./SingleOffer";

interface OffersListComponentInterface {
  pageLoadingState: LoadingStateInterface;
  setPageLoadingState: React.Dispatch<
    React.SetStateAction<LoadingStateInterface>
  >;
  offersList: SimpleJobOffer[];
  pageState: PageStateInterface;
  setPageState: React.Dispatch<React.SetStateAction<PageStateInterface>>;
}

const OffersListComponent = ({
  pageLoadingState,
  setPageLoadingState,
  offersList,
  pageState,
  setPageState,
}: OffersListComponentInterface) => {
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
        pageState={pageState}
        setPageState={setPageState}
        setPageLoadingState={setPageLoadingState}
      />
    </>
  );
};

export default OffersListComponent;
