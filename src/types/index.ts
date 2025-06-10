export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  playlist: string;
}

export type Wallpaper = '/images/1.png' | '/images/2.png' | '/images/3.png' | '/images/4.png' | '/images/5.png';

export interface PlayerState {
  isPlaying: boolean;
  volume: number;
  currentTrack: Track | null;
  currentWallpaper: Wallpaper | null;
} 