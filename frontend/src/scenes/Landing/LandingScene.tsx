import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { Curator } from '../../book/Curator/Curator'
import { useJourneyStore } from '../../book/Journey/useJourneyStore'
import { useLivingWorldStore } from '../../book/LivingWorld/useLivingWorldStore'
import { QuestionnaireJourney } from '../../book/Questionnaire/QuestionnaireJourney'
import { symbolicWorlds } from '../../book/Worlds/worlds'
import { AudioProvider } from '../../systems/Audio/AudioProvider'
import { useAudio } from '../../systems/Audio/useAudio'
import { JourneyButton } from '../../ui/JourneyButton'
import { useHeartWorldStore } from '../../world/Heart/useHeartWorldStore'
import { UniverseScene } from '../Universe'

function BookOfWorldsExperience() {
  const reduceMotion = Boolean(useReducedMotion())
  const journeyPhase = useJourneyStore((state) => state.journeyPhase)
  const beginJourney = useJourneyStore((state) => state.beginJourney)
  const enterHeartWorld = useJourneyStore((state) => state.enterHeartWorld)
  const selectedWorldId = useJourneyStore((state) => state.selectedWorldId)
  const hoveredWorldId = useJourneyStore((state) => state.hoveredWorldId)
  const returnToBook = useJourneyStore((state) => state.returnToBook)
  const selectWorld = useJourneyStore((state) => state.selectWorld)
  const audio = useAudio()
  const activeHeartLocation = useHeartWorldStore((state) => state.activeLocation)
  const heartTime = useHeartWorldStore((state) => state.heartTime)
  const isResting = useHeartWorldStore((state) => state.isResting)
  const stand = useHeartWorldStore((state) => state.stand)
  const livingWorlds = useLivingWorldStore((state) => state.worlds)

  const selectedWorld = symbolicWorlds.find((world) => world.id === selectedWorldId)
  const latestWorldMemory = selectedWorld
    ? livingWorlds[selectedWorld.id].history.at(-1)
    : undefined
  const hoveredWorld = symbolicWorlds.find((world) => world.id === hoveredWorldId)
  const isObserving = journeyPhase === 'focusing' || journeyPhase === 'orbiting'
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }

  const start = () => {
    void audio.beginJourney()
    beginJourney()
  }

  const enterHeart = () => {
    void audio.enterHeartWorld()
    enterHeartWorld()
  }

  return (
    <main className="book-experience" data-phase={journeyPhase}>
      <UniverseScene reducedMotion={reduceMotion} />

      <div className="atmosphere" aria-hidden="true">
        <div className="moon-haze" />
        <div className="lantern-glow" />
        <div className="horizon-mist" />
      </div>

      <AnimatePresence mode="wait">
        {journeyPhase === 'introduction' && (
          <motion.section
            className="introduction"
            key="introduction"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={transition}
          >
            <p className="wordmark">AXARY</p>
            <h1>Every person carries many worlds within them.</h1>
            <div className="introduction-copy">
              <p>Some represent love.</p>
              <p>Some represent purpose.</p>
              <p>Some remain unexplored.</p>
            </div>
            <p className="invitation">Today, you will begin discovering yours.</p>
            <JourneyButton onClick={start} awakened={false}>
              Begin Your Journey
            </JourneyButton>
          </motion.section>
        )}

        {journeyPhase === 'questionnaire' && (
          <motion.div
            className="questionnaire-shell"
            key="questionnaire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <QuestionnaireJourney reducedMotion={reduceMotion} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {journeyPhase === 'book' && (
          <motion.header
            className="book-guidance"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={transition}
          >
            <p className="quiet-label">The Book of Worlds</p>
            <h1>{hoveredWorld?.name ?? 'Five worlds wait within you.'}</h1>
            <p>
              {hoveredWorld?.description ??
                'Choose the world that quietly asks for your attention.'}
            </p>
          </motion.header>
        )}
      </AnimatePresence>

      {journeyPhase === 'book' && (
        <nav className="world-access-list" aria-label="Symbolic worlds">
          {symbolicWorlds.map((world) => (
            <button key={world.id} type="button" onClick={() => selectWorld(world.id)}>
              Visit the World of {world.name}
            </button>
          ))}
        </nav>
      )}

      <AnimatePresence>
        {isObserving && selectedWorld && (
          <motion.aside
            className="world-caption"
            initial={{ opacity: 0, x: -16 }}
            animate={{
              opacity: journeyPhase === 'orbiting' ? 1 : 0,
              x: 0,
            }}
            exit={{ opacity: 0, x: -10 }}
            transition={transition}
            aria-live="polite"
          >
            <span
              className="world-symbol"
              aria-hidden="true"
              style={{ color: selectedWorld.environment.colorPalette.accent }}
            >
              {selectedWorld.icon}
            </span>
            <p className="quiet-label">The World of</p>
            <h2>{selectedWorld.name}</h2>
            <p>{selectedWorld.description}</p>
            <div className="world-tone" aria-label="Emotional tone">
              {selectedWorld.narrative.emotionalTone.map((tone) => (
                <span key={tone}>{tone}</span>
              ))}
            </div>
            {latestWorldMemory && (
              <p className="world-memory">
                The world remembers: {latestWorldMemory.description}
              </p>
            )}
            {selectedWorld.id === 'heart' && journeyPhase === 'orbiting' && (
              <button className="heart-entry-button" type="button" onClick={enterHeart}>
                Enter the Heart World
              </button>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {journeyPhase === 'heart-world' && (
          <motion.aside
            className="heart-world-presence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <div>
              <p className="quiet-label">The Heart World</p>
              <p>{activeHeartLocation.replace('-', ' ')}</p>
              <span>{heartTime.replace('-', ' ')}</span>
            </div>
            {isResting ? (
              <button type="button" onClick={stand}>
                Stand when you are ready
              </button>
            ) : (
              <small>Walk with arrow keys, or choose a place in the landscape.</small>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isObserving || journeyPhase === 'heart-world') && (
          <motion.button
            className="return-button"
            type="button"
            onClick={returnToBook}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <span aria-hidden="true">←</span>
            {journeyPhase === 'heart-world'
              ? 'Leave the Heart World'
              : 'Return to the Book'}
          </motion.button>
        )}
      </AnimatePresence>

      <Curator reducedMotion={reduceMotion} />
    </main>
  )
}

export function LandingScene() {
  return (
    <AudioProvider>
      <BookOfWorldsExperience />
    </AudioProvider>
  )
}
