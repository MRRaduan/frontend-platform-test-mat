import React from "react";
import { MusicEntry } from "../../../types";
import RelatedSongs from "./RelatedSongs";
import Player from "./Player";

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await fetch(`http://127.0.0.1:3000/songs/${params.slug}`);
  const data = await response.json();
  const { song }: MusicEntry = data;
  return (
    <div
      className="relative bg-[#12303B] h-screen"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(18,48,59,1) 59%)`,
        backgroundPosition: "90% 10%",
      }}
    >
      <div
        className="Container px-6 min-[1152px]:px-0 w-full max-w-[1152px] pt-12 lg:pt-[73px] mx-auto"
        style={{
          backgroundImage: `url(/assets/images/${song.files.poster})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "90% 15%",
          backgroundAttachment: "fixed",
          backgroundSize: "30%",
          backgroundBlendMode: "screen",
        }}
      >
        <Player song={song} songId={params.slug} />
        <RelatedSongs currentSong={data.song} />
      </div>
    </div>
  );
}
