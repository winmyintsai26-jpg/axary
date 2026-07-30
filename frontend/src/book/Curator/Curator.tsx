import { AnimatePresence, motion } from 'framer-motion'
import { useState, type CSSProperties } from 'react'

import { useDialogueStore } from '../Dialogue/useDialogueStore'
import { useJourneyStore } from '../Journey/useJourneyStore'
import { useLivingWorldStore } from '../LivingWorld/useLivingWorldStore'
import { symbolicWorlds } from '../Worlds/worlds'

interface CuratorProps {
  reducedMotion: boolean
}

export function Curator({ reducedMotion }: CuratorProps) {
  const activeThread = useDialogueStore((state) => state.activeThread)
  const askCurator = useDialogueStore((state) => state.askCurator)
  const journal = useLivingWorldStore((state) => state.journal)
  const isOpen = useDialogueStore((state) => state.isCuratorOpen)
  const setOpen = useDialogueStore((state) => state.setCuratorOpen)
  const journeyPhase = useJourneyStore((state) => state.journeyPhase)
  const selectedWorldId = useJourneyStore((state) => state.selectedWorldId)
  const selectedWorld = symbolicWorlds.find((world) => world.id === selectedWorldId)
  const worldAccentStyle = selectedWorld
    ? ({
        '--world-accent': selectedWorld.environment.colorPalette.accent,
        '--world-glow': selectedWorld.environment.colorPalette.glow,
      } as CSSProperties)
    : undefined
  const [reflection, setReflection] = useState('')
  const [showJournal, setShowJournal] = useState(false)
  const heartQuestion = 'Why does my Heart World feel so quiet?'
  const hasAskedHeartQuestion = activeThread.messages.some(
    (message) => message.speaker === 'traveler' && message.text === heartQuestion,
  )
  const isVisible =
    journeyPhase !== 'introduction' &&
    journeyPhase !== 'questionnaire' &&
    journeyPhase !== 'reflection'
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }

  if (!isVisible) return null

  const shareReflection = () => {
    const text = reflection.trim()
    if (!text || !selectedWorld) return
    setReflection('')
    void askCurator(text, selectedWorld.id)
  }

  return (
    <aside className="curator" style={worldAccentStyle}>
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
            {showJournal ? (
              <section
                className="reflection-journal"
                aria-label="Private reflection journal"
              >
                <p>Your journal stays quietly on this device.</p>
                {journal.length === 0 ? (
                  <p>No moments have been recorded yet.</p>
                ) : (
                  <ol>
                    {journal
                      .slice()
                      .reverse()
                      .slice(0, 8)
                      .map((moment) => (
                        <li key={moment.id}>
                          <span>{moment.kind.replace('-', ' ')}</span>
                          <p>{moment.summary}</p>
                        </li>
                      ))}
                  </ol>
                )}
              </section>
            ) : (
              <>
                <div className="dialogue-history" aria-live="polite">
                  {activeThread.messages.map((message) => (
                    <div key={message.id} data-speaker={message.speaker}>
                      <span>
                        {message.speaker === 'traveler' ? 'You' : 'The Curator'}
                      </span>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
                {selectedWorld?.id === 'heart' &&
                  journeyPhase === 'orbiting' &&
                  !hasAskedHeartQuestion && (
                    <button
                      className="curator-prompt"
                      type="button"
                      onClick={() => void askCurator(heartQuestion, selectedWorld.id)}
                    >
                      {heartQuestion}
                    </button>
                  )}
                {selectedWorld && journeyPhase === 'orbiting' && (
                  <form
                    className="reflection-form"
                    onSubmit={(event) => {
                      event.preventDefault()
                      shareReflection()
                    }}
                  >
                    <label htmlFor="curator-reflection">Share a reflection</label>
                    <textarea
                      id="curator-reflection"
                      value={reflection}
                      rows={2}
                      placeholder="What feels present for you here?"
                      onChange={(event) => setReflection(event.target.value)}
                    />
                    <button type="submit" disabled={!reflection.trim()}>
                      Leave this thought with the world
                    </button>
                  </form>
                )}
              </>
            )}
            <footer>
              <button type="button" onClick={() => setShowJournal(!showJournal)}>
                {showJournal ? 'Return to conversation' : 'Open private journal'}
              </button>
              <small>Memory remains on this device</small>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {journeyPhase !== 'heart-world' && (
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
      )}
    </aside>
  )
}
