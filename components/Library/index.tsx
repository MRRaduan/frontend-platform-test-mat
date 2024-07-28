import { MusicEntry } from "../../types";
import CardCover from "../CardCover";
import SongList from "../SongList";

const Library = async () => {
  const response = await fetch("http://127.0.0.1:3000/songs");
  const data = await response.json();
  const songs: MusicEntry[] = data.songs;
  return (
    <div>
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
              <button className="mt-6 md:-mt-2 md:-ml-9 h-9 flex items-center bg-white/15 bold text-sm px-6 py-2 rounded-full">
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
                      stroke="white"
                      stroke-width="1.25"
                    />
                  </svg>
                </div>
                Favorite
              </button>
            </div>
            <div className="Sort-Search flex flex-col -mt-8 md:flex-row md:items-center md:-mt-10">
              <label className="flex items-center cursor-pointer self-end md:self-center md:mr-6">
                <span className="me-3 text-sm font-bold">Sort from A-Z</span>
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00DAE8]"></div>
              </label>
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
                  className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-2"
                >
                  <path
                    d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search in your library"
                  className="form-input w-full pl-9 bg-dark-grey text-white rounded-lg p-2"
                />
              </label>
            </div>
          </div>

          <div className="mt-10">
            <SongList songs={songs} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Library;
