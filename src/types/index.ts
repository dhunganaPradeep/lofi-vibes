export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  playlist: string;
}

export interface Wallpaper {
  id: string;
  url: string;
  credit: string;
}

export interface PlayerState {
  isPlaying: boolean;
  volume: number;
  currentTrack: Track | null;
  currentWallpaper: Wallpaper | null;
} 