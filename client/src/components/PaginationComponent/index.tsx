import { LoadingStateInterface } from "../../interfaces/fetch.interface";
import { SearchStateInterface } from "../../interfaces/pageState.interface";
import { StandardButton } from "../Buttons";

interface PaginationProps {
  resultsLength: number;
  searchState: SearchStateInterface;
  setSearchState: React.Dispatch<React.SetStateAction<SearchStateInterface>>;
  setPageLoadingState: React.Dispatch<
    React.SetStateAction<LoadingStateInterface>
  >;
}

const PaginationComponent = ({
  searchState,
  resultsLength,
  setSearchState,
  setPageLoadingState,
}: PaginationProps) => {
  const setPage = (page: number) => {
    setSearchState({
      ...searchState,
      page: page,
    });
    setPageLoadingState({ loading: true, error: null });
  };

  const pagesNumber = Math.ceil(searchState.count / searchState.limit) - 1;

  return (
    <div className="flex justify-between border-t-2 mt-4 pt-4 items-center  dark:text-gray-200 dark:border-gray-900">
      <p className="text-sm">{`Showing ${
        searchState.page * searchState.limit + 1
      } to ${
        resultsLength === searchState.limit
          ? (searchState.page + 1) * searchState.limit
          : searchState.count
      } of ${searchState.count} results`}</p>
      <div>
        <StandardButton
          disabled={searchState.page === 0}
          onClick={() => setPage(searchState.page - 1)}
          text="Previous"
        />
        <StandardButton
          className="mt-2 sm:mt-0"
          disabled={pagesNumber < 0 || searchState.page === pagesNumber}
          onClick={() => setPage(searchState.page + 1)}
          text="Next"
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
