'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PLAYLISTS, TRACKS } from '@/constants'

interface PlaylistSidebarProps {
  isOpen: boolean
  onClose: () => void
  currentPlaylist: string
  onPlaylistChange: (playlistId: string) => void
}

export function PlaylistSidebar({ isOpen, onClose, currentPlaylist, onPlaylistChange }: PlaylistSidebarProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-black/80 backdrop-blur-lg py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-semibold leading-6 text-white">
                          Playlists
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md text-gray-400 hover:text-gray-300 focus:outline-none"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="space-y-6">
                        {Object.entries(PLAYLISTS).map(([id, name]) => {
                          const tracks = TRACKS.filter(track => track.playlist === id)
                          return (
                            <div key={id} className="space-y-2">
                              <button
                                onClick={() => {
                                  onPlaylistChange(id)
                                  onClose()
                                }}
                                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                                  currentPlaylist === id
                                    ? 'bg-white/20 text-white'
                                    : 'hover:bg-white/10 text-gray-300'
                                }`}
                              >
                                <h3 className="font-medium">{name}</h3>
                                <p className="text-sm text-gray-400">{tracks.length} tracks</p>
                              </button>
                              {currentPlaylist === id && (
                                <div className="pl-4 space-y-1">
                                  {tracks.map(track => (
                                    <div
                                      key={track.id}
                                      className="px-4 py-2 rounded-lg text-sm text-gray-300"
                                    >
                                      {track.title} - {track.artist}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 