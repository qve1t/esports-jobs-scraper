import { LoadingStateInterface } from "../../interfaces/fetch.interface";
import { PageStateInterface } from "../../interfaces/pageState.interface";

interface PaginationInterface {
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
}: PaginationInterface) => {
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
        <button
          className="px-4 py-2 rounded-md border-2 border-pink-200 bg-white text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-colors disabled:cursor-default disabled:bg-white disabled:text-pink-500 disabled:border-pink-200 disabled:opacity-50"
          disabled={pageState.page === 0}
          onClick={() => setPage(pageState.page - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 ml-2 rounded-md border-2 border-pink-200 bg-white text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-colors disabled:cursor-default disabled:bg-white disabled:text-pink-500 disabled:border-pink-200 disabled:opacity-50"
          disabled={pagesNumber < 0 || pageState.page === pagesNumber}
          onClick={() => setPage(pageState.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
