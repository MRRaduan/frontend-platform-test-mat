export interface Album {
  title: string;
  year: number;
}

export interface Files {
  coverArt: string;
  poster: string;
  audio: string;
}

export interface Song {
  album: Album;
  artist: string;
  title: string;
  files: Files;
}

export interface MusicEntry {
  id: number;
  song: Song;
  related: number[];
}
