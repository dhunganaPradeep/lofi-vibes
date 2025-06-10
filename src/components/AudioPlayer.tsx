'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { PlayIcon, PauseIcon, SpeakerWaveIcon, ForwardIcon, BackwardIcon, QueueListIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'
import { useTrackSelection } from '@/hooks/useTrackSelection'
import { DEFAULT_VOLUME } from '@/constants'
import { PlaylistSidebar } from './PlaylistSidebar'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
})

const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    setVolume,
    togglePlay,
    playRandomTrack,
    playNextTrack,
    playPreviousTrack,
    hasPreviousTrack,
    playerRef,
    currentPlaylist,
    changePlaylist
  } = useTrackSelection()

  const [isMounted, setIsMounted] = useState(false)
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg text-white p-4 z-30">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{currentTrack?.title || 'Select a track'}</h3>
            <p className="text-sm text-gray-400 truncate">{currentTrack?.artist || 'Artist'}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={playPreviousTrack}
              className="p-2 rounded-full hover:bg-white/10 transition"
              disabled={!hasPreviousTrack}
              title="Previous"
            >
              <BackwardIcon className={`w-8 h-8 ${!hasPreviousTrack ? 'opacity-50' : ''}`} />
            </button>
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-white/10 transition"
              disabled={!currentTrack}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="w-8 h-8" />
              ) : (
                <PlayIcon className="w-8 h-8" />
              )}
            </button>
            <button
              onClick={playNextTrack}
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Next"
            >
              <ForwardIcon className="w-8 h-8" />
            </button>
            <button
              onClick={playRandomTrack}
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Shuffle"
            >
              <ArrowPathRoundedSquareIcon className="w-8 h-8" />
            </button>
            <button
              onClick={() => setIsPlaylistOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Playlist"
            >
              <QueueListIcon className="w-8 h-8" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 w-32">
            <SpeakerWaveIcon className="w-5 h-5" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {currentTrack && (
        <div className="hidden">
          <ReactPlayer
            ref={playerRef}
            url={currentTrack.url}
            playing={isPlaying}
            volume={volume}
            width="0"
            height="0"
            onEnded={playRandomTrack}
            onError={(error: Error) => {
              console.error('Player error:', error)
              setTimeout(() => {
                playRandomTrack()
              }, 1000)
            }}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 0,
                  controls: 0,
                  disablekb: 1,
                  fs: 0,
                  modestbranding: 1,
                  iv_load_policy: 3,
                  rel: 0,
                  playsinline: 1,
                  showinfo: 0,
                  enablejsapi: 1,
                  origin: typeof window !== 'undefined' ? window.location.origin : '',
                  widget_referrer: typeof window !== 'undefined' ? window.location.origin : '',
                  hl: 'en',
                  mute: 0
                },
                embedOptions: {
                  host: 'https://www.youtube-nocookie.com',
                  origin: typeof window !== 'undefined' ? window.location.origin : ''
                }
              }
            }}
          />
        </div>
      )}

      <PlaylistSidebar 
        isOpen={isPlaylistOpen} 
        onClose={() => setIsPlaylistOpen(false)}
        currentPlaylist={currentPlaylist}
        onPlaylistChange={changePlaylist}
      />
    </>
  )
}

export default AudioPlayer 