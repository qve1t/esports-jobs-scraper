import { PageStateInterface } from "../../interfaces/pageState.interface";

interface SearchListInputInterface {
  pageState: PageStateInterface;
  setPageState: React.Dispatch<React.SetStateAction<PageStateInterface>>;
}

const SearchComponent = ({
  pageState,
  setPageState,
}: SearchListInputInterface) => {
  const setText = (text: string) => {
    setPageState({
      ...pageState,
      search: text,
      page: 0,
    });
  };

  const setTextOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setText((event.target as HTMLInputElement).value);
    }
  };

  return (
    <input
      type="search"
      placeholder="Search..."
      className="w-full sm:w-1/2 mb-4 px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-300 outline-none transition-colors"
      onBlur={(event) => setText(event.target.value)}
      onKeyPress={(event) => setTextOnEnter(event)}
    />
  );
};

export default SearchComponent;
