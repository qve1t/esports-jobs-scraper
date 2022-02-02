import Select from "react-select";
import { StandardButton } from "../Buttons";
import { useRef } from "react";
import { customStyles, customStylesDark } from "./customSelectStyles";
import { ORGS } from "./orgsList";
import { useIsDark } from "../../modules/ThemeModule";
import { useSearchState, useSetSearchState } from "../../modules/SearchModule";

const SearchComponent = () => {
  const isDark = useIsDark();
  const searchState = useSearchState();
  const setSearchState = useSetSearchState();

  const textRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<any | null>(null);
  const setText = (text: string) => {
    setSearchState({
      ...searchState,
      search: text,
      page: 0,
    });
  };

  const setOrg = (org: string) => {
    setSearchState({
      ...searchState,
      org: org,
      page: 0,
    });
  };

  const clearSearch = () => {
    (textRef.current as HTMLInputElement).value = "";
    selectRef.current.state.selectValue = [];
    setSearchState({
      ...searchState,
      search: "",
      org: "",
      page: 0,
    });
  };

  const setTextOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setText((event.target as HTMLInputElement).value);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center ">
      <div className="w-full sm:w-1/3 mb-4 sm:mr-8">
        <Select
          ref={selectRef}
          placeholder="Organization..."
          onChange={(option: any) => setOrg(option?.value)}
          defaultValue={ORGS.find((elem) => elem.value === searchState.org)}
          options={ORGS as any}
          styles={isDark ? customStylesDark : customStyles}
        />
      </div>
      <input
        ref={textRef}
        type="search"
        defaultValue={searchState.search}
        placeholder="Search..."
        className="w-full sm:w-1/2 mb-4 px-4 py-2 rounded-full border-2 dark:bg-gray-900  dark:text-gray-200 border-pink-200 dark:border-pink-700 focus:border-pink-300 dark:focus:border-pink-600 outline-none transition-colors"
        onBlur={(event) => setText(event.target.value)}
        onKeyPress={(event) => setTextOnEnter(event)}
      />
      <StandardButton
        onClick={clearSearch}
        text="Clear"
        className="mb-4 sm:ml-8"
      />
    </div>
  );
};

export default SearchComponent;
