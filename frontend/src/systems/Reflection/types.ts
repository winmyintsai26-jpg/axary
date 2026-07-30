import type { DialogueMessage } from '../../book/Dialogue/types'
import type {
  QuestionnaireResponse,
  ReflectionDimension,
} from '../../book/Questionnaire/types'
import type { SymbolicWorldKind } from '../../book/Worlds/types'
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

export interface WorldAttributeInfluence {
  architecture: string[]
  atmosphere: string[]
  colorPalette: string[]
  landmarks: string[]
  lighting: string[]
  music: string[]
  symbolicThemes: string[]
  vegetation: string[]
  weather: string[]
}

export interface WorldInfluence {
  attributes: WorldAttributeInfluence
  resonance: number
  worldId: SymbolicWorldKind
}

export interface SymbolicInterpretation {
  dimensionPattern: Record<ReflectionDimension, number>
  fingerprint: string
  openQuestions: string[]
  recurringThemes: string[]
  schemaVersion: number
  worldInfluences: WorldInfluence[]
}

export interface ReflectionEngine {
  reflect(signals: ReflectionSignals): Promise<SymbolicInterpretation>
}
