import React, { createContext, useContext, useState } from "react";
import { SearchStateInterface } from "../interfaces/pageState.interface";

const SearchContext = createContext<{
  searchState: SearchStateInterface;
  setSearchState: React.Dispatch<React.SetStateAction<SearchStateInterface>>;
} | null>(null);

interface SearchContextProps {
  children: React.ReactNode;
}

export const SearchModule = ({ children }: SearchContextProps) => {
  const [searchState, setSearchState] = useState<SearchStateInterface>({
    page: 0,
    count: 0,
    limit: 15,
    search: "",
    org: "",
  });

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchState = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("SearchContext is not set!");
  }
  return context.searchState;
};

export const useSetSearchState = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("SearchContext is not set!");
  }
  return context.setSearchState;
};
