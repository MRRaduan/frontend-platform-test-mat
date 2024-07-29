"use client";

import { useEffect, useState } from "react";

type AutocompleteSearchProps = {
  options: { title: string; value: number }[];
  updateFilterBySong: (songTitle: string) => void;
};
const AutocompleteSearch = ({
  options,
  updateFilterBySong,
}: AutocompleteSearchProps) => {
  const [inputSearch, setInputSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState([]);

  const handleFilter = (e) => {
    setInputSearch(e.target.value);
    if (inputSearch !== "") {
      const newFilter = options.filter((option) => {
        return option.title.toLowerCase().includes(inputSearch.toLowerCase());
      });
      setFilterSearch(newFilter);
    }
  };

  const handleAutocomplete = (option) => {
    setInputSearch(option.title);
    setFilterSearch([]);
    updateFilterBySong(option.title);
    if (inputSearch === "") {
      clearAutocomplete();
    }
  };

  const clearAutocomplete = () => {
    setFilterSearch([]);
    setInputSearch("");
    updateFilterBySong("");
  };

  useEffect(() => {
    if (inputSearch === "") {
      setFilterSearch([]);
      clearAutocomplete();
    }
  }, [inputSearch]);

  return (
    <div>
      <label
        htmlFor="search-input"
        className="mt-5 md:mt-0 md:w-64 relative text-gray-400 focus-within:text-gray-600 block"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute top-5 transform -translate-y-1/2 left-2"
        >
          <path
            d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          id="search-input"
          placeholder="Search in your library"
          className="form-input w-full pl-9 bg-dark-grey text-white rounded-lg p-2"
          value={inputSearch}
          onChange={handleFilter}
        />
      </label>
      <div className="divide-y bg-[#2D2D2D] rounded-lg  w-full relative ">
        <ul className="text-sm mt-1 bg-[#2D2D2D] text-[#D1D1D1] rounded-lg  absolute w-full top-0 left-0">
          {filterSearch.map((option) => (
            <li
              key={option.value}
              className="p-4 relative  w-full z-10 cursor-pointer hover:bg-dark-grey rounded-lg"
              onClick={() => handleAutocomplete(option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AutocompleteSearch;
