import { motion, useReducedMotion } from 'framer-motion'

import { StarCanvas } from '../../components/StarCanvas'
import { JourneyButton } from '../../ui/JourneyButton'
import { useExperienceStore } from '../../store/useExperienceStore'

export function LandingScene() {
  const reduceMotion = useReducedMotion()
  const hasAwakened = useExperienceStore((state) => state.hasAwakened)
  const awaken = useExperienceStore((state) => state.awaken)

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section className="first-light" data-awakened={hasAwakened}>
      <StarCanvas reducedMotion={Boolean(reduceMotion)} awakened={hasAwakened} />

      <div className="atmosphere" aria-hidden="true">
        <div className="moon-haze" />
        <div className="lantern-glow" />
        <div className="horizon-mist" />
      </div>

      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.45 }}
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
          <JourneyButton onClick={awaken} awakened={hasAwakened}>
            Begin Journey
          </JourneyButton>
        </motion.div>
      </motion.div>

      <motion.p
        className="opening-whisper"
        aria-live="polite"
        initial={false}
        animate={{
          opacity: hasAwakened ? 1 : 0,
          y: hasAwakened ? 0 : 6,
        }}
        transition={transition}
      >
        The first light is waiting.
      </motion.p>
    </section>
  )
}
