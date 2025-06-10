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
      const newWallpaper = WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)]
      setCurrentWallpaper(newWallpaper)
    }, WALLPAPER_CHANGE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const setRandomWallpaper = () => {
    const randomWallpaper = WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)]
    setCurrentWallpaper(randomWallpaper)
  }

  return [currentWallpaper, setRandomWallpaper] as const
} 