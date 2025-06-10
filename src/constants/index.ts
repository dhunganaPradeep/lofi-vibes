import { Track } from '@/types'

export const PLAYLISTS = {
  '101': 'Chill Vibes',
  '102': 'Study Time',
  '103': 'Late Night',
  '104': 'Coffee Break',
  '105': 'Rainy Days',
} as const

export const TRACKS: Track[] = [
  // Chill Vibes (101)
  {
    id: '1',
    title: 'Lofi Girl - Chill',
    artist: 'Lofi Girl',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    playlist: '101'
  },
  {
    id: '2',
    title: 'Chillhop Radio',
    artist: 'Chillhop Music',
    url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
    playlist: '101'
  },
  // Study Time (102)
  {
    id: '3',
    title: 'Study with Me',
    artist: 'Lofi Girl',
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    playlist: '102'
  },
  {
    id: '4',
    title: 'Coding Session',
    artist: 'ChilledCow',
    url: 'https://www.youtube.com/watch?v=ceqgwo7U28Y',
    playlist: '102'
  },
  // Late Night (103)
  {
    id: '5',
    title: 'Late Night Drive',
    artist: 'Lofi Girl',
    url: 'https://www.youtube.com/watch?v=rUxyKA_-grg',
    playlist: '103'
  },
  {
    id: '6',
    title: 'Dreamy Night',
    artist: 'Nujabes Style',
    url: 'https://www.youtube.com/watch?v=6Pe2pUJvDdk',
    playlist: '103'
  },
  // Coffee Break (104)
  {
    id: '7',
    title: 'Coffee Shop Radio',
    artist: 'Nourish',
    url: 'https://www.youtube.com/watch?v=e3L1PIY1pN8',
    playlist: '104'
  },
  {
    id: '8',
    title: 'Morning Coffee',
    artist: 'STEEZYASFUCK',
    url: 'https://www.youtube.com/watch?v=gsP3EZf4Qnk',
    playlist: '104'
  },
  // Rainy Days (105)
  {
    id: '9',
    title: 'Rainy Day Lofi',
    artist: 'Dreamhop',
    url: 'https://www.youtube.com/watch?v=1fueZCTYkpA',
    playlist: '105'
  },
  {
    id: '10',
    title: 'Rainy Night',
    artist: 'Nujabes Style',
    url: 'https://www.youtube.com/watch?v=AzV77KFsLn4',
    playlist: '105'
  }
] as const

export const DEFAULT_VOLUME = 0.7
export const WALLPAPER_CHANGE_INTERVAL = 20000 
export const FADE_DURATION = 1000 

export const STICKY_NOTE_COLORS = [
  { name: 'pink', bg: 'bg-pink-300/90', text: 'text-pink-950' },
  { name: 'purple', bg: 'bg-purple-300/90', text: 'text-purple-950' },
  { name: 'blue', bg: 'bg-sky-300/90', text: 'text-sky-950' },
  { name: 'green', bg: 'bg-emerald-300/90', text: 'text-emerald-950' },
  { name: 'yellow', bg: 'bg-amber-200/90', text: 'text-amber-950' },
  { name: 'orange', bg: 'bg-orange-300/90', text: 'text-orange-950' },
] as const

export const WALLPAPERS = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
] as const 