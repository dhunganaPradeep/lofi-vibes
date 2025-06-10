'use client'

import { useState } from 'react'
import { ArrowPathIcon, NoSymbolIcon } from '@heroicons/react/24/solid'

interface BackgroundControlProps {
  onToggle: (isPaused: boolean) => void
}

export function BackgroundControl({ onToggle }: BackgroundControlProps) {
  const [isPaused, setIsPaused] = useState(false)

  const handleToggle = () => {
    const newState = !isPaused
    setIsPaused(newState)
    onToggle(newState)
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-23 right-6 p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition z-30 group"
      title={isPaused ? 'Resume background transitions' : 'Pause background transitions'}
    >
      {isPaused ? (
        <ArrowPathIcon className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
      ) : (
        <NoSymbolIcon className="w-6 h-6" />
      )}
      <span className="sr-only">
        {isPaused ? 'Resume background transitions' : 'Pause background transitions'}
      </span>
    </button>
  )
} 