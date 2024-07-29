"use client";
import { useEffect, useState } from "react";
import { MusicEntry } from "../../types";
import CardCover from "../CardCover";

type SongListProps = {
  songsData: MusicEntry[];
  isOnlyFavorites: boolean;
  isSort: boolean;
  filterBySong: string;
};
const SongList = ({
  songsData,
  isOnlyFavorites,
  isSort,
  filterBySong,
}: SongListProps) => {
  const [songs, setSongs] = useState(songsData);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const toggleFilterByFavoriteSongs = () => {
    if (isOnlyFavorites) {
      setSongs(favoriteSongs);
      return;
    }
    setSongs(songsData);
  };

  const removeExistedSongFromFavorites = (current: MusicEntry) => {
    const newFavorites = favoriteSongs.filter((item) => item.id !== current.id);
    const newFavoritesIds = newFavorites.map((item) => item.id);
    localStorage.setItem("favoriteSongs", JSON.stringify(newFavoritesIds));
    setFavoriteSongs(newFavorites);
  };

  const addSongToFavorites = (current: MusicEntry) => {
    const newFavoriteSong = songs.find((song) => song.id === current.id);
    const newFavorites = [...favoriteSongs, newFavoriteSong];
    setFavoriteSongs(newFavorites);
    const newFavoritesIds = [
      ...favoriteSongs.map((a) => a.id),
      newFavoriteSong.id,
    ];
    localStorage.setItem("favoriteSongs", JSON.stringify(newFavoritesIds));
  };

  const toggleFavorite = (favorite: MusicEntry) => {
    const existedSong = favoriteSongs.find((item) => item.id === favorite.id);
    if (existedSong) {
      removeExistedSongFromFavorites(favorite);
      return;
    }
    addSongToFavorites(favorite);
  };

  const syncWithLocalstorage = () => {
    const data = localStorage.getItem("favoriteSongs");
    if (data) {
      const favoriteSongsIds = JSON.parse(data);
      setFavoriteSongs(
        songs.filter((song) => favoriteSongsIds.includes(song.id)),
      );
      return;
    }
    setFavoriteSongs(JSON.parse("[]"));
  };

  const toggleSort = () => {
    if (isSort) {
      const sortedSongs = [...songs].sort((a, b) => {
        const titleA = a.song.title.toUpperCase();
        const titleB = b.song.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      setSongs(sortedSongs);
      return;
    }
    setSongs(songsData);
  };

  useEffect(() => {
    toggleSort();
  }, [isSort]);

  useEffect(() => {
    syncWithLocalstorage();
  }, []);

  useEffect(() => {
    toggleFilterByFavoriteSongs();
  }, [isOnlyFavorites]);

  useEffect(() => {
    const filteredSong = songsData.filter(
      (song) => song.song.title === filterBySong,
    );
    setSongs(filteredSong);
    if (filterBySong === "") {
      setSongs(songsData);
    }
  }, [filterBySong]);

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-5 gap-y-4 lg:gap-8 lg:auto-rows-max">
      {songs.map((song) => {
        return (
          <li key={song.id}>
            <CardCover
              song={song}
              hasFavoriteOption
              onFavorite={(song) => toggleFavorite(song)}
              isFavorite={favoriteSongs.find((item) => item.id === song.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
