'use client'

import { useState, useEffect } from 'react'
import { DEFAULT_VOLUME } from '@/constants'

export function usePersistedVolume() {
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedVolume = localStorage.getItem('lofi-volume')
      return savedVolume ? parseFloat(savedVolume) : DEFAULT_VOLUME
    }
    return DEFAULT_VOLUME
  })

  useEffect(() => {
    localStorage.setItem('lofi-volume', volume.toString())
  }, [volume])

  return [volume, setVolume] as const
} 