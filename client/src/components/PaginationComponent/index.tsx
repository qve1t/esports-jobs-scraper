import { LoadingStateInterface } from "../../interfaces/fetch.interface";
import { PageStateInterface } from "../../interfaces/pageState.interface";
import { StandardButton } from "../Buttons";

interface PaginationProps {
  resultsLength: number;
  pageState: PageStateInterface;
  setPageState: React.Dispatch<React.SetStateAction<PageStateInterface>>;
  setPageLoadingState: React.Dispatch<
    React.SetStateAction<LoadingStateInterface>
  >;
}

const PaginationComponent = ({
  pageState,
  resultsLength,
  setPageState,
  setPageLoadingState,
}: PaginationProps) => {
  const setPage = (page: number) => {
    setPageState({
      ...pageState,
      page: page,
    });
    setPageLoadingState({ loading: true, error: null });
  };

  const pagesNumber = Math.ceil(pageState.count / pageState.limit) - 1;

  return (
    <div className="flex justify-between border-t-2 mt-4 pt-4 items-center">
      <p className="text-sm">{`Showing ${
        pageState.page * pageState.limit + 1
      } to ${
        resultsLength === pageState.limit
          ? (pageState.page + 1) * pageState.limit
          : pageState.count
      } of ${pageState.count} results`}</p>
      <div>
        <StandardButton
          disabled={pageState.page === 0}
          onClick={() => setPage(pageState.page - 1)}
          text="Previous"
        />
        <StandardButton
          disabled={pagesNumber < 0 || pageState.page === pagesNumber}
          onClick={() => setPage(pageState.page + 1)}
          text="Next"
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
