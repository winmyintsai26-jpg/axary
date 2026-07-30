import { motion } from 'framer-motion'

import { JourneyButton } from '../../ui/JourneyButton'
import type { QuestionnaireResponse } from '../Questionnaire/types'

interface FirstReflectionProps {
  answers: Record<string, QuestionnaireResponse>
  onContinue: () => void
  reducedMotion: boolean
}

const reflectionLines: Record<string, string> = {
  'quiet-forest':
    'Quiet, sheltered places may help you return to yourself when life feels heavy.',
  beach: 'Open horizons may help you breathe more freely and see beyond the moment.',
  'busy-cafe':
    'The movement and energy of other people may help you feel connected to life again.',
  'close-friends':
    'Being near people you trust may restore you more deeply than being alone.',
  feelings:
    'Your worlds suggest that you often listen for what feels true before certainty arrives.',
  'careful-thinking':
    'You may feel steadier when you have time to look carefully at the path ahead.',
  'trusted-advice':
    'The voices of people you trust may help important choices become clearer.',
  'past-experience':
    'You may find guidance by remembering what life has already taught you.',
  loyalty: 'You may value relationships that remain steady through changing seasons.',
  honesty: 'You may feel closest to people when there is room for gentle honesty.',
  fun: 'Shared joy may be one of the ways you recognize a meaningful connection.',
  understanding:
    'Feeling understood—and taking time to understand others—may matter deeply to you.',
  adapt:
    'When change arrives, you may look for the new path before the old one disappears.',
  think:
    'When challenges appear, you may prefer to pause and understand before acting.',
  ask: 'When the way forward is unclear, connection may help you find your footing.',
  reflect:
    'When challenges appear, quiet reflection may help the next step become visible.',
  spring:
    'Your inner landscape may be drawn toward beginnings and what is still becoming.',
  summer: 'Your inner landscape may carry warmth, openness, and a wish to live fully.',
  autumn: 'Your inner landscape may find beauty in change, memory, and letting go.',
  winter:
    'Your inner landscape may value stillness, depth, and life beneath the surface.',
  discovering:
    'A curiosity for unfamiliar ideas may keep new paths appearing in your worlds.',
  helping: 'Care for other people may become a warm light throughout your worlds.',
  creating: 'Making something new may be one way you understand yourself.',
  'how-things-work':
    'You may feel most alive when hidden patterns begin to make sense.',
}

function answerId(answers: Record<string, QuestionnaireResponse>, questionId: string) {
  const answer = answers[questionId]?.answer
  return typeof answer === 'string' ? answer : ''
}

export function FirstReflection({
  answers,
  onContinue,
  reducedMotion,
}: FirstReflectionProps) {
  const chosen = [
    answerId(answers, 'decision'),
    answerId(answers, 'friendship'),
    answerId(answers, 'restore'),
    answerId(answers, 'unexpected'),
    answerId(answers, 'season'),
    answerId(answers, 'closest-sentence'),
  ]
  const lines = chosen
    .map((id) => reflectionLines[id])
    .filter((line): line is string => Boolean(line))
    .filter((line, index, all) => all.indexOf(line) === index)
    .slice(0, 5)

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.section
      className="first-reflection"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={transition}
      aria-labelledby="first-reflection-title"
    >
      <p className="quiet-label">A Reflection</p>
      <h1 id="first-reflection-title">A few things your worlds seem to notice.</h1>

      <div className="reflection-reading">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>
          Some paths remain unexplored—not because something is missing, but because
          every person is still becoming.
        </p>
      </div>

      <blockquote className="curator-welcome">
        <p>Welcome.</p>
        <p>These worlds are one symbolic interpretation of your reflections.</p>
        <p>They are not meant to define you.</p>
        <p>As you grow, your worlds may grow with you.</p>
        <p>Walk slowly.</p>
        <p>Some answers are easier to see than to explain.</p>
        <footer>— The Curator</footer>
      </blockquote>

      <JourneyButton onClick={onContinue} awakened>
        Enter the Heart World
      </JourneyButton>
    </motion.section>
  )
}
