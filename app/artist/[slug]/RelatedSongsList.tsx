"use client";

import { useEffect, useState } from "react";
import CardCover from "../../../components/CardCover";
import { MusicEntry, Song } from "../../../types";

type RelatedSongsListProps = {
  allSongs: MusicEntry[];
  currentSong: Song;
};

const RelatedSongsList = ({ allSongs, currentSong }: RelatedSongsListProps) => {
  console.log("[currentSong]: ", currentSong);
  const [artistSongs, setArtistSongs] = useState(
    allSongs.filter(
      (song) =>
        song.song.artist === currentSong.artist &&
        song.song.title !== currentSong.title,
    ),
  );

  if (artistSongs.length === 0) {
    return <span>There's no related musics of the same artist</span>;
  }

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-5 gap-y-4 lg:gap-8 lg:auto-rows-max">
      {artistSongs.map((song) => {
        return (
          <li key={song.id}>
            <CardCover song={song} />
          </li>
        );
      })}
    </ul>
  );
};

export default RelatedSongsList;
