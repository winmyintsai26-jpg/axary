import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { AudioProvider } from '../../systems/Audio/AudioProvider'
import { useAudio } from '../../systems/Audio/useAudio'
import { JourneyButton } from '../../ui/JourneyButton'
import { useExperienceStore } from '../../store/useExperienceStore'
import { creatorWorlds } from '../../world/Universe/creatorWorlds'
import { UniverseScene } from '../Universe'

function LandingExperience() {
  const reduceMotion = useReducedMotion()
  const journeyPhase = useExperienceStore((state) => state.journeyPhase)
  const startJourney = useExperienceStore((state) => state.startJourney)
  const selectedWorldId = useExperienceStore((state) => state.selectedWorldId)
  const hoveredWorldId = useExperienceStore((state) => state.hoveredWorldId)
  const returnToUniverse = useExperienceStore((state) => state.returnToUniverse)
  const audio = useAudio()
  const isIdle = journeyPhase === 'idle'
  const selectedWorld = creatorWorlds.find((world) => world.id === selectedWorldId)
  const hoveredWorld = creatorWorlds.find((world) => world.id === hoveredWorldId)
  const isObserving = journeyPhase === 'focusing' || journeyPhase === 'orbiting'

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const }

  const beginJourney = () => {
    void audio.beginJourney()
    startJourney()
  }

  return (
    <section className="first-light" data-phase={journeyPhase}>
      <UniverseScene reducedMotion={Boolean(reduceMotion)} />

      <div className="atmosphere" aria-hidden="true">
        <div className="moon-haze" />
        <div className="lantern-glow" />
        <div className="horizon-mist" />
      </div>

      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: isIdle ? 1 : 0,
          y: isIdle ? 0 : -18,
          scale: isIdle ? 1 : 0.985,
        }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.45 }}
        aria-hidden={!isIdle}
      >
        <motion.p
          className="wordmark"
          initial={{ letterSpacing: '0.52em', opacity: 0 }}
          animate={{ letterSpacing: '0.68em', opacity: 1 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.2 }}
        >
          AXARY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.9 }}
        >
          A quiet universe where creativity is encouraged.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 1.35 }}
        >
          <JourneyButton
            onClick={beginJourney}
            awakened={!isIdle}
            tabIndex={isIdle ? 0 : -1}
          >
            Begin Journey
          </JourneyButton>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {journeyPhase === 'universe' && (
          <motion.div
            className="universe-guidance"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={transition}
          >
            <p className="universe-eyebrow">Five lights. Five imagined worlds.</p>
            <p className="universe-instruction">
              {hoveredWorld?.name ?? 'Choose a light to draw closer.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isObserving && selectedWorld && (
          <motion.aside
            className="world-caption"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: journeyPhase === 'orbiting' ? 1 : 0, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={transition}
            aria-live="polite"
          >
            <span className="world-number">
              World {creatorWorlds.indexOf(selectedWorld) + 1}
            </span>
            <h2>{selectedWorld.name}</h2>
            <p>{selectedWorld.description}</p>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isObserving && (
          <motion.button
            className="return-button"
            type="button"
            onClick={returnToUniverse}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <span aria-hidden="true">←</span>
            Return to the universe
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}

export function LandingScene() {
  return (
    <AudioProvider>
      <LandingExperience />
    </AudioProvider>
  )
}
