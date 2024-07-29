"use client";

import { useQuery } from "@tanstack/react-query";
import CardCover from "../../../components/CardCover";
import { getSongs } from "../../../components/Library";
import SongList from "../../../components/SongList";
import { MusicEntry } from "../../../types";
import { Hash } from "crypto";
import RelatedSongsList from "./RelatedSongsList";

type RelatedSongsProps = {
  currentSong: MusicEntry;
};

const RelatedSongs = ({ currentSong }: RelatedSongsProps) => {
  const { isPending, data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  if (isPending) {
    return <h1>loading</h1>;
  }

  return (
    <div className="mt-24">
      <h4 className="text-base text-white/[0.7]">Other albums</h4>
      <div className="mt-5">
        <RelatedSongsList allSongs={songs} currentSong={currentSong} />
      </div>
    </div>
  );
};

export default RelatedSongs;
