import type { DialogueMessage } from '../../book/Dialogue/types'
import type { QuestionnaireResponse } from '../../book/Questionnaire/types'
import type { MemoryRecord } from '../Memory/types'

export interface ReflectionSignals {
  conversations: DialogueMessage[]
  memories: MemoryRecord[]
  motivations: string[]
  preferences: string[]
  questionnaireResponses: QuestionnaireResponse[]
  recurringThemes: string[]
  values: string[]
}

export interface WorldInfluence {
  suggestedMotifs: string[]
  worldId: string
}

export interface SymbolicInterpretation {
  openQuestions: string[]
  recurringThemes: string[]
  worldInfluences: WorldInfluence[]
}

export interface ReflectionEngine {
  reflect(signals: ReflectionSignals): Promise<SymbolicInterpretation>
}
