import { MusicEntry } from "../../../types";
import RelatedSongs from "./RelatedSongs";

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await fetch(`http://127.0.0.1:3000/songs/${params.slug}`);
  const data = await response.json();
  const { song }: MusicEntry = data;
  return (
    <>
      <div className="Container px-6 min-[1152px]:px-0 w-full max-w-[1152px] mt-12 lg:mt-[73px] mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="Cover max-lg:w-full max-lg:flex  max-lg:justify-center">
            <img
              src={`/assets/images/${song.files.coverArt}`}
              width="204px"
              height="204px"
              alt={song.title}
              className="rounded-md"
              style={{ border: "solid 1px #666" }}
            />
          </div>
          <div className="Player max-lg:mt-9 lg:ml-9">
            <div className="flex items-center">
              <button className="size-16 bg-white rounded-full flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26 14.8453C26.8889 15.3585 26.8889 16.6415 26 17.1547L10 26.3923C9.11111 26.9055 8 26.264 8 25.2376L8 6.76239C8 5.73599 9.11111 5.09448 10 5.60768L26 14.8453Z"
                    fill="black"
                  />
                </svg>
              </button>
              <div className="ml-[38px]">
                <h1 className="text-[32px] font-bold leading-5">
                  {song.title}
                </h1>
                <span className="text-base leading-5 inline-block mt-3 text-white/[0.9]">
                  {song.artist} | {song.album.title} | {song.album.year}
                </span>
              </div>
            </div>
            <div className="relative mt-[46px] w-full lg:w-[350px] bg-white rounded-full h-[2px]">
              <div
                className="absolute -top-2 bg-white size-4 rounded-full"
                style={{ left: "30%" }}
              ></div>
            </div>
            <div className="Timers mt-2 flex justify-between">
              <span className="text-sm text-[#A8A8A8]">0.00</span>
              <span className="text-sm text-[#A8A8A8]">-3.20</span>
            </div>
          </div>
        </div>
        <RelatedSongs />
      </div>
    </>
  );
}
