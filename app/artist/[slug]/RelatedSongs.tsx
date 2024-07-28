import SongList from "../../../components/SongList";
import { MusicEntry } from "../../../types";

export default async function () {
  // TO DO
  // Implement related songs based on same artist
  const response = await fetch("http://127.0.0.1:3000/songs");
  const data = await response.json();
  const songs: MusicEntry[] = data.songs;
  return (
    <div className="mt-24">
      <h4 className="text-base text-white/[0.7]">Other albums</h4>
      <div className="mt-5">
        <SongList songs={songs} />
      </div>
    </div>
  );
}
