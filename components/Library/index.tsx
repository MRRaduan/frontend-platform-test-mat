"use client";
import { useState } from "react";
import { MusicEntry } from "../../types";
import SongList from "../SongList";
import { useQuery } from "@tanstack/react-query";
import AutocompleteSearch from "../AutocompleteSearch";

export const getSongs = async () => {
  const response = await fetch(`http://127.0.0.1:3000/songs`);
  const data = await response.json();
  const songs: MusicEntry[] = data.songs;
  return songs;
};

export const LoadingSkeleton = () => (
  <div className="mt-20 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-slate-700 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-700 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const Library = () => {
  const [isOnlyFavorites, setIsOnlyFavorites] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [filterBySong, setFilterBySong] = useState("");
  const toggleFavoriteSongs = () => setIsOnlyFavorites(!isOnlyFavorites);
  const toggleSort = () => setIsSort(!isSort);

  const { isPending, data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  if (isPending) {
    return <LoadingSkeleton />;
  }

  console.log("[songs]: ", songs);
  const songOptions = songs.map((song) => {
    return {
      title: song.song.title,
      value: song.id,
    };
  });

  return (
    <div className="pb-20">
      <main>
        <div className="Container px-6 min-[1152px]:px-0 w-full max-w-[1152px] mt-12 mx-auto">
          <div className="w-full md:flex justify-between">
            <div className="Title-Favorite md:flex">
              <div className="flex flex-col">
                <h1 className="text-[32px] font-bold">Your Library</h1>
                <span className="text-base text-white/[.5] inline-block mt-2.5 md:mt-5">
                  You have {songs.length} songs in your library
                </span>
              </div>
              <button
                className="mt-6 md:-mt-2 md:-ml-9 h-9 flex items-center bg-white/15 bold text-sm px-6 py-2 rounded-full"
                onClick={toggleFavoriteSongs}
              >
                <div className="heart mr-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.56859 3.87749L10.03 4.43561L10.5455 3.87749C12.3592 2.00054 15.1714 2.08784 17.0363 3.87749L17.1677 4.00844C18.9814 5.8854 18.537 9.63697 16.8076 11.5669L16.5802 11.8156L16.3269 12.083C15.3511 13.0971 13.8554 14.4856 11.8398 16.2484L10.6888 17.247C10.2916 17.5891 9.71365 17.5838 9.32246 17.2344L7.90167 15.9581L6.6367 14.8065C5.13309 13.4267 4.00446 12.3468 3.25081 11.5669C1.3939 9.64526 1.03653 5.93009 2.89345 4.00844C4.75036 2.0868 7.71167 1.95585 9.56859 3.87749Z"
                      stroke={isOnlyFavorites ? "#F8594E" : "white"}
                      strokeWidth="1.25"
                      fill={isOnlyFavorites ? "#F8594E" : "none"}
                    />
                  </svg>
                </div>
                Favorite
              </button>
            </div>
            <div className="Sort-Search flex flex-col -mt-8 md:flex-row md:items-center md:-mt-10">
              <label className="flex items-center cursor-pointer self-end md:self-center md:mr-6">
                <span className="me-3 text-sm font-bold">Sort from A-Z</span>
                <input
                  type="checkbox"
                  checked={isSort}
                  className="sr-only peer"
                  onChange={toggleSort}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00DAE8]"></div>
              </label>
              <AutocompleteSearch
                options={songOptions}
                updateFilterBySong={(songTitle) => setFilterBySong(songTitle)}
              />
            </div>
          </div>
          <div className="mt-10">
            <SongList
              songsData={songs}
              isOnlyFavorites={isOnlyFavorites}
              isSort={isSort}
              filterBySong={filterBySong}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Library;
