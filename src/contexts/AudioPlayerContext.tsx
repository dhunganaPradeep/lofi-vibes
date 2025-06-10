'use client'

import { createContext, useContext, ReactNode } from 'react'
import { usePersistedVolume } from '@/hooks/usePersistedVolume'
import { useTrackSelection } from '@/hooks/useTrackSelection'
import type { Track } from '@/types'

interface AudioPlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  setVolume: (volume: number) => void
  togglePlay: () => void
  playTrack: (track: Track) => void
  playRandomTrack: () => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [volume, setVolume] = usePersistedVolume()
  const { currentTrack, isPlaying, togglePlay, playTrack, playRandomTrack } = useTrackSelection()

  const value = {
    currentTrack,
    isPlaying,
    volume,
    setVolume,
    togglePlay,
    playTrack,
    playRandomTrack,
  }

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudioPlayerContext must be used within an AudioPlayerProvider')
  }
  return context
} 