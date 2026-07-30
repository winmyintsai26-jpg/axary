import type { SymbolicEventKind } from '../SymbolicEvents/types'
import type {
  LivingWorldEngine,
  LivingWorldReflection,
  LivingWorldState,
} from './types'

interface ThemeRule {
  event: SymbolicEventKind
  words: string[]
}

const sharedRules: ThemeRule[] = [
  { event: 'bridge-completes', words: ['trust', 'friend', 'connection', 'together'] },
  { event: 'first-bloom', words: ['hope', 'begin', 'change', 'care'] },
  { event: 'fog-lifts', words: ['uncertain', 'confused', 'clarity', 'understand'] },
  { event: 'birds-return', words: ['return', 'home', 'belong', 'welcome'] },
  { event: 'river-clears', words: ['accept', 'release', 'calm', 'peace'] },
  { event: 'lantern-lights', words: ['lonely', 'warmth', 'remember', 'miss'] },
  { event: 'path-appears', words: ['purpose', 'direction', 'work', 'build'] },
  { event: 'stars-appear', words: ['dream', 'mystery', 'wonder', 'future'] },
  { event: 'tree-grows', words: ['grow', 'practice', 'patience', 'courage'] },
]

const eventCopy: Record<
  SymbolicEventKind,
  { description: string; symbolicMeaning: string }
> = {
  'birds-return': {
    description: 'A small flock has returned to the quiet sky.',
    symbolicMeaning: 'A possible sense of return or belonging.',
  },
  'bridge-completes': {
    description: 'The bridge beside the water now reaches the far bank.',
    symbolicMeaning: 'A possible way of approaching what once felt distant.',
  },
  'first-bloom': {
    description: 'The first flowers have opened along the path.',
    symbolicMeaning: 'A possible sign of attention becoming visible.',
  },
  'fog-lifts': {
    description: 'The fog has lifted enough to reveal more of the horizon.',
    symbolicMeaning: 'A possible opening without a final answer.',
  },
  'lantern-lights': {
    description: 'A lantern has begun to glow near the shelter.',
    symbolicMeaning: 'A possible welcome held through the night.',
  },
  'path-appears': {
    description: 'A pale path can now be seen through the landscape.',
    symbolicMeaning: 'A possible direction discovered through movement.',
  },
  'river-clears': {
    description: 'The water has become clear enough to reflect the sky.',
    symbolicMeaning: 'A possible settling without erasing what came before.',
  },
  'stars-appear': {
    description: 'A few quiet stars have become visible above the world.',
    symbolicMeaning: 'A possible invitation to wonder beyond certainty.',
  },
  'tree-grows': {
    description: 'The young tree carries a new ring of branches.',
    symbolicMeaning: 'A possible change that happened slowly.',
  },
}

export class PlaceholderLivingWorldEngine implements LivingWorldEngine {
  reflect(reflection: LivingWorldReflection, currentState: LivingWorldState) {
    const text = reflection.text.toLowerCase()
    const match = sharedRules.find((rule) =>
      rule.words.some((word) => text.includes(word)),
    )

    if (!match || currentState.history.some((event) => event.kind === match.event)) {
      return null
    }

    const copy = eventCopy[match.event]
    const reflectionTheme = match.words.find((word) => text.includes(word))

    return {
      ...copy,
      kind: match.event,
      reflectionTheme,
      worldId: reflection.worldId,
    }
  }
}
