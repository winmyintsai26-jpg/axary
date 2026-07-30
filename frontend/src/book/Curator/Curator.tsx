import { AnimatePresence, motion } from 'framer-motion'

import { useDialogueStore } from '../Dialogue/useDialogueStore'
import { useJourneyStore } from '../Journey/useJourneyStore'
import { symbolicWorlds } from '../Worlds/worlds'

interface CuratorProps {
  reducedMotion: boolean
}

export function Curator({ reducedMotion }: CuratorProps) {
  const activeThread = useDialogueStore((state) => state.activeThread)
  const isOpen = useDialogueStore((state) => state.isCuratorOpen)
  const setOpen = useDialogueStore((state) => state.setCuratorOpen)
  const journeyPhase = useJourneyStore((state) => state.journeyPhase)
  const selectedWorldId = useJourneyStore((state) => state.selectedWorldId)
  const selectedWorld = symbolicWorlds.find((world) => world.id === selectedWorldId)
  const isVisible = journeyPhase !== 'introduction'
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }

  if (!isVisible) return null

  return (
    <aside className="curator">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="curator-dialogue"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={transition}
          >
            <header>
              <div>
                <span className="curator-mark" aria-hidden="true">
                  ◇
                </span>
                <p>The Curator</p>
              </div>
              <button
                type="button"
                aria-label="Close The Curator"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </header>
            <div className="dialogue-history" aria-live="polite">
              {activeThread.messages.map((message) => (
                <p key={message.id}>{message.text}</p>
              ))}
              {selectedWorld && journeyPhase === 'orbiting' && (
                <p>
                  {selectedWorld.name} is still becoming. Every path here will one day
                  tell a story.
                </p>
              )}
            </div>
            <small>Scripted guidance for this foundation</small>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="curator-lantern"
        type="button"
        aria-label={isOpen ? 'Close The Curator' : 'Speak with The Curator'}
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        <span aria-hidden="true">◇</span>
        <span>The Curator</span>
      </button>
    </aside>
  )
}
