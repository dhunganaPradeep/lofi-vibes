'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { STICKY_NOTE_COLORS } from '@/constants'
import ReactMarkdown from 'react-markdown'

interface Note {
  id: string
  content: string
  color: (typeof STICKY_NOTE_COLORS)[number]['name']
  rotation: number
  position: { x: number; y: number }
  zIndex: number
  fontIndex?: number
}

const handwritingFonts = [
  'Caveat',
  'Kalam',
  'Indie Flower',
  'Shadows Into Light',
]

const GRID_SIZE = 20 
const NOTE_WIDTH = 200
const NOTE_HEIGHT = 300 
const MIN_MARGIN = 20 
const PLAYBAR_MARGIN = 200 
const DRAG_BOUNDS_MARGIN = 50

function snapToGrid(value: number) {
  return Math.round(value / GRID_SIZE) * GRID_SIZE
}

export function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lofi-notes')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [isAdding, setIsAdding] = useState(false)
  const [newNoteContent, setNewNoteContent] = useState('')
  const [selectedColor, setSelectedColor] = useState<(typeof STICKY_NOTE_COLORS)[number]['name']>(STICKY_NOTE_COLORS[0].name)
  const [maxZIndex, setMaxZIndex] = useState(1)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  })
  const notesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@400;700&family=Indie+Flower&family=Shadows+Into+Light&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      document.head.removeChild(link)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lofi-notes', JSON.stringify(notes))
  }, [notes])

  const bringToFront = (noteId: string) => {
    setMaxZIndex(prev => prev + 1)
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, zIndex: maxZIndex + 1 } : note
    ))
  }

  const findValidPosition = (noteId: string, x: number, y: number): { x: number; y: number } => {
    const maxX = windowSize.width - NOTE_WIDTH - MIN_MARGIN
    const maxY = windowSize.height - NOTE_HEIGHT - PLAYBAR_MARGIN
    
    const boundedX = Math.max(MIN_MARGIN, Math.min(maxX, x))
    const boundedY = Math.max(MIN_MARGIN, Math.min(maxY, y))
    
    return {
      x: snapToGrid(boundedX),
      y: snapToGrid(boundedY)
    }
  }

  const updateNotePosition = (id: string, x: number, y: number) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        const validPosition = findValidPosition(id, x, y)
        return {
          ...note,
          position: validPosition
        }
      }
      return note
    }))
  }

  const addNote = () => {
    if (!newNoteContent.trim()) return

    const newNote: Note = {
      id: Date.now().toString(),
      content: newNoteContent,
      color: selectedColor,
      rotation: Math.random() * 6 - 3,
      position: {
        x: Math.random() * (windowSize.width - NOTE_WIDTH - 2 * MIN_MARGIN) + MIN_MARGIN,
        y: Math.random() * (windowSize.height - NOTE_HEIGHT - PLAYBAR_MARGIN - MIN_MARGIN) + MIN_MARGIN,
      },
      zIndex: maxZIndex + 1,
      fontIndex: Math.floor(Math.random() * handwritingFonts.length)
    }

    setMaxZIndex(prev => prev + 1)
    setNotes([...notes, newNote])
    setNewNoteContent('')
    setIsAdding(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <>
      <div className="fixed bottom-40 right-6 z-40 group">
        <button
          onClick={() => setIsAdding(true)}
          className="p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition relative"
        >
          <DocumentTextIcon className="w-6 h-6" />
          <span className="absolute left-0 -translate-x-full -translate-y-1/2 top-1/2 pr-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Add Note
          </span>
        </button>
      </div>

      <div ref={notesRef} className="fixed inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {notes.map((note) => {
            const color = STICKY_NOTE_COLORS.find(c => c.name === note.color)
            const font = handwritingFonts[note.fontIndex || 0]
            
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={{
                  left: -DRAG_BOUNDS_MARGIN,
                  right: windowSize.width - NOTE_WIDTH + DRAG_BOUNDS_MARGIN,
                  top: -DRAG_BOUNDS_MARGIN,
                  bottom: windowSize.height - NOTE_HEIGHT - PLAYBAR_MARGIN + DRAG_BOUNDS_MARGIN
                }}
                onDragStart={() => bringToFront(note.id)}
                onDragEnd={(_, info) => {
                  const newX = note.position.x + info.offset.x
                  const newY = note.position.y + info.offset.y
                  updateNotePosition(note.id, newX, newY)
                }}
                style={{
                  position: 'absolute',
                  left: note.position.x,
                  top: note.position.y,
                  rotate: `${note.rotation}deg`,
                  fontFamily: handwritingFonts[note.fontIndex || 0],
                  fontSize: '1.25rem', 
                  lineHeight: '1.75rem',
                  width: NOTE_WIDTH,
                  zIndex: note.zIndex,
                  touchAction: 'none',
                  willChange: 'transform',
                }}
                className="p-6 rounded-sm shadow-lg pointer-events-auto transform cursor-move group transition-transform duration-200"
                onClick={() => bringToFront(note.id)}
              >
                <div className={`${color?.bg} absolute inset-0 rounded-sm -z-10`} />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gray-200/50 rounded-sm transform rotate-2 backdrop-blur-sm" />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNote(note.id)
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition opacity-0 group-hover:opacity-100"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
                <div className={`prose max-w-none ${color?.text} mt-2 text-base selection:bg-white/30 selection:text-current`}>
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAdding && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white/10 backdrop-blur-lg rounded-lg p-6 z-50"
            >
              <div className="flex gap-2 mb-4">
                {STICKY_NOTE_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full ${color.bg} ${
                      selectedColor === color.name ? 'ring-2 ring-white' : ''
                    }`}
                  />
                ))}
              </div>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Write your note here... (Markdown supported)"
                className="w-full h-32 bg-black/20 rounded p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 font-['Caveat']"
                style={{ fontSize: '1.25rem' }}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={addNote}
                  className="px-4 py-2 bg-white/20 rounded hover:bg-white/30 transition"
                >
                  Add Note
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 