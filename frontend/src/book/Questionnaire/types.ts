export type ReflectionCategory =
  | 'energy'
  | 'decision-making'
  | 'relationships'
  | 'creativity'
  | 'purpose'
  | 'conflict'
  | 'change'
  | 'reflection'
  | 'curiosity'
  | 'values'

export type QuestionType =
  | 'single-choice'
  | 'paired-choice'
  | 'multiple-choice'
  | 'likert'
  | 'ranking'
  | 'reflection'
  | 'landscape'
  | 'symbol'

export type ReflectionDimension =
  | 'stillness'
  | 'connection'
  | 'openness'
  | 'structure'
  | 'intuition'
  | 'deliberation'
  | 'novelty'
  | 'continuity'
  | 'expression'
  | 'privacy'
  | 'harmony'
  | 'directness'
  | 'growth'
  | 'service'
  | 'mastery'
  | 'wonder'

export interface QuestionOption {
  description?: string
  id: string
  influences: Partial<Record<ReflectionDimension, number>>
  label: string
  visual?: {
    accent: string
    glyph?: string
    landscape?: 'coast' | 'forest' | 'garden' | 'mountain'
  }
}

export interface JourneyQuestion {
  category: ReflectionCategory
  id: string
  introduction?: string
  maxSelections?: number
  minSelections?: number
  optional?: boolean
  options?: QuestionOption[]
  prompt: string
  scale?: {
    highLabel: string
    lowLabel: string
    points: number
  }
  type: QuestionType
}

export type QuestionAnswer = string | string[] | number

export interface QuestionnaireResponse {
  answer: QuestionAnswer
  answeredAt: string
  questionId: string
  schemaVersion: number
}
