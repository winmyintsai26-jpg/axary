import type {
  ReflectionEngine,
  ReflectionSignals,
  SymbolicInterpretation,
} from './types'

export class PlaceholderReflectionEngine implements ReflectionEngine {
  async reflect(signals: ReflectionSignals): Promise<SymbolicInterpretation> {
    const recurringThemes = [...new Set(signals.recurringThemes)].slice(0, 5)

    return Promise.resolve({
      recurringThemes,
      openQuestions: [
        'Which of these themes feels true to you right now?',
        'What might look different if you returned later?',
      ],
      worldInfluences: [],
    })
  }
}
