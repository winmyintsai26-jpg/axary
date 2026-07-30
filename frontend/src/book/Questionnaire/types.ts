export type QuestionType = 'single-choice' | 'multiple-choice' | 'scale' | 'text'

export interface QuestionOption {
  description?: string
  id: string
  label: string
}

export interface JourneyQuestion {
  id: string
  options?: QuestionOption[]
  prompt: string
  type: QuestionType
}

export type QuestionAnswer = string | string[] | number

export interface QuestionnaireResponse {
  answer: QuestionAnswer
  answeredAt: string
  questionId: string
}
