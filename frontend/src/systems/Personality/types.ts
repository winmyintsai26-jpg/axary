import type { QuestionnaireResponse } from '../../book/Questionnaire/types'

export interface PersonalityInput {
  responses: QuestionnaireResponse[]
}

export interface SymbolicInterpretation {
  confidence?: number
  themes: string[]
}

export interface PersonalityInterpreter {
  interpret(input: PersonalityInput): Promise<SymbolicInterpretation>
}
