'use client'

import { useState, useEffect } from 'react'
import { WALLPAPERS, WALLPAPER_CHANGE_INTERVAL } from '@/constants'
import type { Wallpaper } from '@/types'

export function useWallpaperTransition() {
  const [currentWallpaper, setCurrentWallpaper] = useState<Wallpaper | null>(null)

  useEffect(() => {
    if (!currentWallpaper) {
      const randomWallpaper = WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)]
      setCurrentWallpaper(randomWallpaper)
    }
  }, [currentWallpaper])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = WALLPAPERS.indexOf(currentWallpaper as Wallpaper)
      const nextIndex = (currentIndex + 1) % WALLPAPERS.length
      setCurrentWallpaper(WALLPAPERS[nextIndex])
    }, WALLPAPER_CHANGE_INTERVAL)
    return () => clearInterval(interval)
  }, [currentWallpaper])

  const setRandomWallpaper = () => {
    const currentIndex = WALLPAPERS.indexOf(currentWallpaper as Wallpaper)
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * WALLPAPERS.length)
    } while (newIndex === currentIndex)
    setCurrentWallpaper(WALLPAPERS[newIndex])
  }

  return [currentWallpaper, setRandomWallpaper] as const
} 