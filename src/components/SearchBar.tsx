import React from "react";

function SearchBar() {
  return (
    <div className="relative rounded-md bg-[#272727] p-2 text-white">
      <svg
        className="absolute left-3 top-3 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#fff"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <input
        className="md:w-12 lg:w-96 bg-transparent pl-10 text-sm text-white focus:outline-none"
        type="text"
        placeholder="Search Pokémon"
      />
    </div>
  );
}

export default SearchBar;
