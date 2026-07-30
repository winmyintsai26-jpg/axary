import {
  journeyQuestions,
  reflectionJourneyVersion,
} from '../../book/Questionnaire/questions'
import type {
  JourneyQuestion,
  QuestionOption,
  QuestionnaireResponse,
  ReflectionDimension,
} from '../../book/Questionnaire/types'
import type { SymbolicWorldKind } from '../../book/Worlds/types'
import type {
  ReflectionEngine,
  ReflectionSignals,
  SymbolicInterpretation,
  WorldAttributeInfluence,
} from './types'

const dimensions: ReflectionDimension[] = [
  'stillness',
  'connection',
  'openness',
  'structure',
  'intuition',
  'deliberation',
  'novelty',
  'continuity',
  'expression',
  'privacy',
  'harmony',
  'directness',
  'growth',
  'service',
  'mastery',
  'wonder',
]

const worldDimensions: Record<SymbolicWorldKind, ReflectionDimension[]> = {
  heart: ['connection', 'harmony', 'expression', 'continuity'],
  growth: ['growth', 'novelty', 'openness', 'mastery'],
  bonds: ['connection', 'service', 'continuity', 'directness'],
  purpose: ['mastery', 'structure', 'service', 'deliberation'],
  soul: ['stillness', 'intuition', 'privacy', 'wonder'],
}

const emptyAttributes = (): WorldAttributeInfluence => ({
  architecture: [],
  atmosphere: [],
  colorPalette: [],
  landmarks: [],
  lighting: [],
  music: [],
  symbolicThemes: [],
  vegetation: [],
  weather: [],
})

const attributeLanguage: Partial<
  Record<ReflectionDimension, Partial<WorldAttributeInfluence>>
> = {
  stillness: {
    atmosphere: ['wide quiet spaces', 'softened distance'],
    music: ['long silences', 'slow natural tones'],
    weather: ['morning mist'],
  },
  connection: {
    architecture: ['welcoming thresholds', 'places made for two'],
    landmarks: ['bridges', 'shared hearths'],
    symbolicThemes: ['belonging', 'reciprocity'],
  },
  openness: {
    architecture: ['open pavilions'],
    atmosphere: ['expansive horizons'],
    weather: ['moving cloudscapes'],
  },
  structure: {
    architecture: ['careful stonework', 'ordered courtyards'],
    landmarks: ['observatories', 'patterned paths'],
  },
  intuition: {
    lighting: ['light without a visible source'],
    landmarks: ['reflecting pools', 'unmarked doorways'],
    symbolicThemes: ['inner knowing'],
  },
  deliberation: {
    architecture: ['layered pathways'],
    atmosphere: ['clear sightlines'],
    symbolicThemes: ['discernment'],
  },
  novelty: {
    colorPalette: ['unexpected natural accents'],
    landmarks: ['changing paths'],
    vegetation: ['rare seasonal blooms'],
  },
  continuity: {
    architecture: ['weathered timber', 'restored foundations'],
    landmarks: ['old trees', 'well-worn paths'],
    symbolicThemes: ['endurance'],
  },
  expression: {
    colorPalette: ['rich blossom color'],
    landmarks: ['artist shelters'],
    music: ['expressive acoustic motifs'],
  },
  privacy: {
    architecture: ['sheltered alcoves'],
    landmarks: ['hidden gardens'],
    vegetation: ['protective tree canopies'],
  },
  harmony: {
    atmosphere: ['comfortable contrast'],
    colorPalette: ['neighboring natural hues'],
    weather: ['gentle temperate air'],
  },
  directness: {
    architecture: ['honest materials'],
    lighting: ['clear warm daylight'],
    symbolicThemes: ['truth spoken with care'],
  },
  growth: {
    landmarks: ['unfinished bridges', 'young trees'],
    vegetation: ['new shoots', 'seasonal gardens'],
    symbolicThemes: ['becoming'],
  },
  service: {
    architecture: ['lantern-lit shelters'],
    landmarks: ['community wells'],
    symbolicThemes: ['care made visible'],
  },
  mastery: {
    architecture: ['handcrafted studios'],
    landmarks: ['patiently built towers'],
    symbolicThemes: ['devotion to craft'],
  },
  wonder: {
    atmosphere: ['distant luminous depth'],
    lighting: ['moonlit shimmer'],
    landmarks: ['impossible natural forms'],
  },
}

function selectedOptions(
  question: JourneyQuestion,
  response: QuestionnaireResponse,
): Array<{ option: QuestionOption; strength: number }> {
  if (!question.options) return []
  const answer = response.answer

  if (question.type === 'ranking' && Array.isArray(answer)) {
    return answer.flatMap((id, index) => {
      const option = question.options?.find((candidate) => candidate.id === id)
      return option
        ? [{ option, strength: (answer.length - index) / answer.length }]
        : []
    })
  }

  const ids = Array.isArray(answer) ? answer : [String(answer)]
  return ids.flatMap((id) => {
    const option = question.options?.find((candidate) => candidate.id === id)
    return option ? [{ option, strength: 1 }] : []
  })
}

function stableFingerprint(pattern: Record<ReflectionDimension, number>): string {
  const source = dimensions
    .map((dimension) => Math.round(pattern[dimension] * 100))
    .join(':')
  let hash = 2166136261
  for (const character of source) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return `axary-${reflectionJourneyVersion}-${(hash >>> 0).toString(36)}`
}

export class AxaryReflectionEngine implements ReflectionEngine {
  async reflect(signals: ReflectionSignals): Promise<SymbolicInterpretation> {
    const totals = Object.fromEntries(
      dimensions.map((dimension) => [dimension, 0]),
    ) as Record<ReflectionDimension, number>
    const opportunities = { ...totals }

    for (const response of signals.questionnaireResponses) {
      const question = journeyQuestions.find(
        (candidate) => candidate.id === response.questionId,
      )
      if (!question) continue

      if (question.type === 'likert' && typeof response.answer === 'number') {
        const centered =
          (response.answer - 1) / Math.max(1, (question.scale?.points ?? 5) - 1)
        const target =
          question.id === 'social-rhythm'
            ? 'stillness'
            : question.id === 'uncertain-path'
              ? 'openness'
              : 'deliberation'
        totals[target] += centered * 2
        opportunities[target] += 2
        continue
      }

      for (const { option, strength } of selectedOptions(question, response)) {
        for (const [dimension, weight] of Object.entries(option.influences)) {
          const key = dimension as ReflectionDimension
          totals[key] += (weight ?? 0) * strength
          opportunities[key] += Math.abs(weight ?? 0)
        }
      }
    }

    const dimensionPattern = Object.fromEntries(
      dimensions.map((dimension) => [
        dimension,
        opportunities[dimension] === 0
          ? 0.35
          : totals[dimension] / opportunities[dimension],
      ]),
    ) as Record<ReflectionDimension, number>

    const strongestDimensions = [...dimensions]
      .sort((a, b) => dimensionPattern[b] - dimensionPattern[a])
      .slice(0, 5)

    const worldInfluences = (
      Object.entries(worldDimensions) as Array<
        [SymbolicWorldKind, ReflectionDimension[]]
      >
    ).map(([worldId, relevantDimensions]) => {
      const attributes = emptyAttributes()
      const ranked = [...relevantDimensions].sort(
        (a, b) => dimensionPattern[b] - dimensionPattern[a],
      )
      for (const dimension of ranked.slice(0, 3)) {
        const language = attributeLanguage[dimension]
        for (const [attribute, phrases] of Object.entries(language ?? {})) {
          attributes[attribute as keyof WorldAttributeInfluence].push(
            ...(phrases ?? []),
          )
        }
      }
      return {
        worldId,
        resonance:
          relevantDimensions.reduce(
            (sum, dimension) => sum + dimensionPattern[dimension],
            0,
          ) / relevantDimensions.length,
        attributes,
      }
    })

    return {
      schemaVersion: reflectionJourneyVersion,
      fingerprint: stableFingerprint(dimensionPattern),
      dimensionPattern,
      recurringThemes: [
        ...new Set([...strongestDimensions, ...signals.recurringThemes]),
      ].slice(0, 7),
      openQuestions: [
        'Which part of these worlds feels unexpectedly familiar?',
        'What meaning would you choose for the paths that appeared?',
      ],
      worldInfluences,
    }
  }
}
