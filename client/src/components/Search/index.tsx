import React from "react";

const SearchComponent = React.forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <input
      ref={ref}
      type="search"
      placeholder="Search..."
      className="w-full sm:w-1/2 px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-300 outline-none transition-colors"
    />
  );
});

export default SearchComponent;
