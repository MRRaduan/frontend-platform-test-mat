import { MusicEntry } from "../../types";
import CardCover from "../CardCover";

type SongListProps = {
  songs: MusicEntry[];
};
const SongList = ({ songs }: SongListProps) => {
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
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
