import { motion, useReducedMotion } from 'framer-motion'

import { AudioProvider } from '../../systems/Audio/AudioProvider'
import { useAudio } from '../../systems/Audio/useAudio'
import { JourneyButton } from '../../ui/JourneyButton'
import { useExperienceStore } from '../../store/useExperienceStore'
import { FirstWorldScene } from '../FirstWorld'

function LandingExperience() {
  const reduceMotion = useReducedMotion()
  const journeyPhase = useExperienceStore((state) => state.journeyPhase)
  const startJourney = useExperienceStore((state) => state.startJourney)
  const audio = useAudio()
  const isIdle = journeyPhase === 'idle'

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const }

  const beginJourney = () => {
    void audio.beginJourney()
    startJourney()
  }

  return (
    <section className="first-light" data-phase={journeyPhase}>
      <FirstWorldScene reducedMotion={Boolean(reduceMotion)} />

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

      <motion.p
        className="opening-whisper"
        aria-live="polite"
        initial={false}
        animate={{
          opacity: journeyPhase === 'arrived' ? 1 : 0,
          y: journeyPhase === 'arrived' ? 0 : 6,
        }}
        transition={transition}
      >
        Stay as long as you like.
      </motion.p>
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
