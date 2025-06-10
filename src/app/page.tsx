'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { WALLPAPERS, PLAYLISTS } from '@/constants'
import { StickyNotes } from '@/components/StickyNotes'
import { BackgroundControl } from '@/components/BackgroundControl'
import { format } from 'date-fns'
import { useTrackSelection } from '@/hooks/useTrackSelection'

const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-0 left-0 right-0 p-6 backdrop-blur-sm z-30">
      <div className="mx-auto max-w-md text-center">
        <div className="animate-pulse">
          Loading player...
        </div>
      </div>
    </div>
  ),
})

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed bottom-28 left-6 text-2xl font-light z-20 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg">
      {format(time, 'hh:mm a')}
    </div>
  )
}

function CurrentDate() {
  return (
    <div className="fixed top-6 left-6 text-xl font-light z-50 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg">
      {format(new Date(), 'MMMM dd, yyyy')}
    </div>
  )
}

function PlaylistInfo({ currentPlaylist }: { currentPlaylist: string }) {
  return (
    <div className="fixed top-6 right-6 text-xl font-light z-50 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg">
      {PLAYLISTS[currentPlaylist as keyof typeof PLAYLISTS]}
    </div>
  )
}

export default function Home() {
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0)
  const [isBackgroundPaused, setIsBackgroundPaused] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { currentTrack, currentPlaylist } = useTrackSelection()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isBackgroundPaused) return

    const interval = setInterval(() => {
      setCurrentWallpaperIndex((prev) => (prev + 1) % WALLPAPERS.length)
    }, 20000) 

    return () => clearInterval(interval)
  }, [isBackgroundPaused])

  if (!isLoaded) {
    return null
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-900">
      <div className="fixed inset-0 z-0">
        {WALLPAPERS.map((wallpaper, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: index === currentWallpaperIndex ? 1 : 0,
              backgroundImage: `url(${wallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0.8)',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="font-['Telegraf'] text-5xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-4">
          LOFI - VIBES
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-2 text-center">
          Chill beats to relax/study to
        </p>

        <div className="md:hidden fixed top-6 left-0 right-0 flex justify-between items-center px-6 z-30">
          <div className="backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-lg">
            {format(new Date(), 'MMM dd')}
          </div>
          <div className="backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-lg">
            {format(new Date(), 'hh:mm a')}
          </div>
        </div>

        <div className="md:hidden fixed top-20 left-0 right-0 flex justify-center items-center px-6 z-30">
          <div className="backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg text-center">
            <div className="text-sm text-gray-300">Now Playing</div>
            <div className="text-base font-medium">
              {currentTrack?.title || 'Select a track'}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <CurrentDate />
          <Clock />
          <PlaylistInfo currentPlaylist={currentPlaylist} />
        </div>

        <div className="hidden md:block">
          <StickyNotes />
        </div>

        <AudioPlayer />
        
        <div className="hidden md:block">
          <BackgroundControl onToggle={setIsBackgroundPaused} />
        </div>
      </div>
    </main>
  )
}
