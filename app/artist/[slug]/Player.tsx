"use client";

import { useEffect, useRef, useState } from "react";
import { Song } from "../../../types";

type PlayerProps = {
  song: Song;
  songId: string;
};
const Player = ({ song, songId }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [elapsed, setElapsed] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioPlayer = useRef(null);
  const progressBar = useRef(null);

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const calculateTime = (value: number) => {
    const minutes =
      Math.floor(value / 60) < 10
        ? `0${Math.floor(value / 60)}`
        : Math.floor(value / 60);

    const seconds =
      Math.floor(value % 60) < 10
        ? `0${Math.floor(value % 60)}`
        : Math.floor(value % 60);

    return `${minutes}:${seconds}`;
  };

  const checkFavoriteSong = () => {
    const favoriteSongsIds = parseFavoriteFromLocalstorage();
    if (favoriteSongsIds.length <= 0) {
      return;
    }
    const currentSong = favoriteSongsIds.find((id) => id === +songId);
    if (currentSong) {
      setIsFavorite(true);
    }
  };

  const setFavoriteItemToLocalstorage = (item: number[]) => {
    localStorage.setItem("favoriteSongs", JSON.stringify(item));
  };

  const parseFavoriteFromLocalstorage = (): number[] => {
    const data = localStorage.getItem("favoriteSongs");
    const favoriteSongsIds = JSON.parse(data);
    return favoriteSongsIds;
  };

  const toggleFavoriteSong = () => {
    const favoriteSongsIds = parseFavoriteFromLocalstorage();
    if (!isFavorite) {
      const newFavoriteSongIds = [...favoriteSongsIds, +songId];
      setFavoriteItemToLocalstorage(newFavoriteSongIds);
      setIsFavorite(true);
      return;
    }
    const newFavoriteSongIds = favoriteSongsIds.filter((id) => id !== +songId);
    setFavoriteItemToLocalstorage(newFavoriteSongIds);
    setIsFavorite(false);
  };

  useEffect(() => {
    checkFavoriteSong();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        const duration = Math.floor(audioPlayer?.current?.duration);
        const elapsedTime = Math.floor(audioPlayer?.current?.currentTime);
        setDuration(duration);
        setElapsed(elapsedTime);
        progressBar.current.style.left = `${elapsedTime}%`;
        if (elapsedTime === duration) {
          setIsPlaying(false);
          audioPlayer.current.stop();
        }
      }, 100);
    }
  }, [
    audioPlayer.current?.loadedmetadata,
    audioPlayer.current?.readyState,
    isPlaying,
  ]);

  return (
    <>
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
          <audio id="player" ref={audioPlayer}>
            <source
              src={`/assets/audio/${song.files.audio}`}
              type="audio/mp3"
            />
          </audio>
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <button
              className="mt-7 lg:mt-0 size-16 bg-white rounded-full flex items-center justify-center"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <svg
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="32"
                  height="32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z"
                      fill="black"
                    />
                    <path
                      d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z"
                      fill="black"
                    />
                  </g>
                </svg>
              ) : (
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
              )}
            </button>
            <div className="ml-[38px] flex flex-col items-center lg:items-start">
              <h1 className="text-[32px] font-bold leading-5 flex items-center">
                {song.title}
                <button onClick={toggleFavoriteSong}>
                  {isFavorite ? (
                    <svg
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="#F8594E"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2"
                    >
                      <path
                        d="M8.90196 2.37743L9.36342 2.93555L9.87885 2.37743C11.6926 0.500475 14.5048 0.587775 16.3697 2.37743L16.5011 2.50838C18.3148 4.38534 17.8704 8.13691 16.141 10.0668L15.9135 10.3156L15.6603 10.5829C14.6845 11.597 13.1888 12.9855 11.1732 14.7483L10.0222 15.747C9.62502 16.0891 9.04702 16.0837 8.65583 15.7343L7.23505 14.4581L5.97008 13.3064C4.46646 11.9266 3.33783 10.8468 2.58419 10.0668C0.727272 8.1452 0.369904 4.43003 2.22682 2.50838C4.08374 0.586736 7.04505 0.455786 8.90196 2.37743Z"
                        fill="#F8594E"
                        stroke="#F8594E"
                        strokeWidth="1.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2"
                    >
                      <path
                        d="M8.90196 2.37743L9.36342 2.93555L9.87885 2.37743C11.6926 0.500475 14.5048 0.587775 16.3697 2.37743L16.5011 2.50838C18.3148 4.38534 17.8704 8.13691 16.141 10.0668L15.9135 10.3156L15.6603 10.5829C14.6845 11.597 13.1888 12.9855 11.1732 14.7483L10.0222 15.747C9.62502 16.0891 9.04702 16.0837 8.65583 15.7343L7.23505 14.4581L5.97008 13.3064C4.46646 11.9266 3.33783 10.8468 2.58419 10.0668C0.727272 8.1452 0.369904 4.43003 2.22682 2.50838C4.08374 0.586736 7.04505 0.455786 8.90196 2.37743Z"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </button>
              </h1>
              <span className="text-base leading-5 inline-block mt-3 text-white/[0.9]">
                {song.artist} | {song.album.title} | {song.album.year}
              </span>
            </div>
          </div>
          <div className="relative mt-[46px] w-full lg:w-[350px] bg-white rounded-full h-[2px]">
            <div
              className="absolute -top-2 bg-white size-4 rounded-full"
              ref={progressBar}
            ></div>
          </div>
          <div className="Timers mt-2 flex justify-between">
            <span className="text-sm text-[#A8A8A8]">
              {calculateTime(elapsed)}
            </span>
            <span className="text-sm text-[#A8A8A8]">
              {calculateTime(duration - elapsed)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
