'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { TRACKS } from '@/constants'
import type { Track } from '@/types'

export function useTrackSelection() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState('101')
  const [volume, setVolume] = useState(0.7)
  const [previousTracks, setPreviousTracks] = useState<Track[]>([])
  const playerRef = useRef<ReactPlayer>(null)

  const getCurrentPlaylistTracks = useCallback(() => {
    return TRACKS.filter(track => track.playlist === currentPlaylist)
  }, [currentPlaylist])

  const getRandomTrack = useCallback(() => {
    const allTracks = TRACKS.filter(track => track.id !== currentTrack?.id)
    if (allTracks.length === 0) return null
    return allTracks[Math.floor(Math.random() * allTracks.length)]
  }, [currentTrack?.id])

  const getRandomTrackFromPlaylist = useCallback(() => {
    const playlistTracks = getCurrentPlaylistTracks().filter(track => track.id !== currentTrack?.id)
    if (playlistTracks.length === 0) {
      return getRandomTrack()
    }
    return playlistTracks[Math.floor(Math.random() * playlistTracks.length)]
  }, [currentTrack?.id, getCurrentPlaylistTracks, getRandomTrack])

  useEffect(() => {
    if (!currentTrack) {
      const firstTrack = getCurrentPlaylistTracks()[0]
      if (firstTrack) {
        setCurrentTrack(firstTrack)
        setIsPlaying(false)
      }
    }
  }, [currentTrack, getCurrentPlaylistTracks])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const playTrack = async (track: Track) => {
    if (currentTrack) {
      setPreviousTracks(prev => [...prev, currentTrack])
    }
    setCurrentTrack(track)
    setCurrentPlaylist(track.playlist)
    setIsPlaying(true)
  }

  const playRandomTrack = async () => {
    const shouldSwitchPlaylist = Math.random() < 0.3
    const randomTrack = shouldSwitchPlaylist ? getRandomTrack() : getRandomTrackFromPlaylist()
    
    if (randomTrack) {
      await playTrack(randomTrack)
    } else {
      const firstTrack = getCurrentPlaylistTracks()[0]
      if (firstTrack) {
        await playTrack(firstTrack)
      }
    }
  }

  const playNextTrack = async () => {
    const playlistTracks = getCurrentPlaylistTracks()
    const currentIndex = playlistTracks.findIndex(track => track.id === currentTrack?.id)
    const nextTrack = playlistTracks[(currentIndex + 1) % playlistTracks.length]
    if (nextTrack) {
      await playTrack(nextTrack)
    }
  }

  const playPreviousTrack = async () => {
    if (previousTracks.length > 0) {
      const prevTrack = previousTracks[previousTracks.length - 1]
      setPreviousTracks(prev => prev.slice(0, -1))
      setCurrentTrack(prevTrack)
      setCurrentPlaylist(prevTrack.playlist)
      setIsPlaying(true)
    }
  }

  const changePlaylist = async (playlistId: string) => {
    setCurrentPlaylist(playlistId)
    const playlistTracks = TRACKS.filter(track => track.playlist === playlistId)
    const randomTrack = playlistTracks[Math.floor(Math.random() * playlistTracks.length)]
    if (randomTrack) {
      await playTrack(randomTrack)
    }
  }

  return {
    currentTrack,
    isPlaying,
    volume,
    setVolume,
    togglePlay,
    playTrack,
    playRandomTrack,
    playNextTrack,
    playPreviousTrack,
    currentPlaylist,
    changePlaylist,
    playerRef,
    hasPreviousTrack: previousTracks.length > 0
  }
} 