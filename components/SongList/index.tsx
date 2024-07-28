"use client";
import { useEffect, useState } from "react";
import { MusicEntry } from "../../types";
import CardCover from "../CardCover";

type SongListProps = {
  songs: MusicEntry[];
};
const SongList = ({ songs }: SongListProps) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const toggleFavorite = (id) => {
    const existedSong = favoriteSongs.find((item) => item === id);
    if (existedSong) {
      const newFavorite = favoriteSongs.filter((item) => item !== id);
      localStorage.setItem("favoriteSongs", JSON.stringify(newFavorite));
      setFavoriteSongs(newFavorite);
      return;
    }
    const favorites = [...favoriteSongs, id];
    localStorage.setItem("favoriteSongs", JSON.stringify(favorites));
    setFavoriteSongs(favorites);
  };
  useEffect(() => {
    const data = localStorage.getItem("favoriteSongs");
    if (data) {
      setFavoriteSongs(JSON.parse(data));
      return;
    }
    setFavoriteSongs(JSON.parse("[]"));
  }, []);
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-5 gap-y-4 lg:gap-8 lg:auto-rows-max">
      {songs.map((item) => {
        const { id, song } = item;
        return (
          <li key={id}>
            <CardCover
              songId={id}
              title={song.title}
              artist={song.artist}
              coverArt={song.files.coverArt}
              hasFavoriteOption
              onFavorite={(id) => toggleFavorite(id)}
              isFavorite={favoriteSongs.find((item) => item === id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
