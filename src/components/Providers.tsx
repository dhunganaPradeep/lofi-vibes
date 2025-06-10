'use client'

import { ReactNode } from 'react'
import { AudioPlayerProvider as AudioProvider } from 'react-use-audio-player'
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AudioProvider>
      <AudioPlayerProvider>
        {children}
      </AudioPlayerProvider>
    </AudioProvider>
  )
} 