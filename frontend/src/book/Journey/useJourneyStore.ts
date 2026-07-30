import { create } from 'zustand'

import { reflectionJourneyVersion } from '../Questionnaire/questions'
import type { QuestionnaireResponse, QuestionAnswer } from '../Questionnaire/types'

export type JourneyPhase =
  | 'introduction'
  | 'questionnaire'
  | 'book'
  | 'focusing'
  | 'orbiting'
  | 'entering-heart'
  | 'heart-world'
  | 'returning'

interface JourneyState {
  answers: Record<string, QuestionnaireResponse>
  currentQuestionIndex: number
  hoveredWorldId: string | null
  journeyPhase: JourneyPhase
  answerQuestion: (questionId: string, answer: QuestionAnswer) => void
  beginJourney: () => void
  completeQuestionnaire: () => void
  enterHeartWorld: () => void
  hoverWorld: (worldId: string | null) => void
  nextQuestion: () => void
  previousQuestion: () => void
  returnToBook: () => void
  selectWorld: (worldId: string) => void
  selectedWorldId: string | null
  setJourneyPhase: (phase: JourneyPhase) => void
}

export const useJourneyStore = create<JourneyState>((set) => ({
  answers: {},
  currentQuestionIndex: 0,
  hoveredWorldId: null,
  journeyPhase: 'introduction',
  selectedWorldId: null,
  answerQuestion: (questionId, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: {
          answer,
          answeredAt: new Date().toISOString(),
          questionId,
          schemaVersion: reflectionJourneyVersion,
        },
      },
    })),
  beginJourney: () => set({ journeyPhase: 'questionnaire' }),
  completeQuestionnaire: () => set({ journeyPhase: 'book' }),
  enterHeartWorld: () =>
    set((state) =>
      state.selectedWorldId === 'heart' ? { journeyPhase: 'entering-heart' } : state,
    ),
  hoverWorld: (hoveredWorldId) => set({ hoveredWorldId }),
  nextQuestion: () =>
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
    })),
  returnToBook: () => set({ hoveredWorldId: null, journeyPhase: 'returning' }),
  selectWorld: (selectedWorldId) =>
    set({ hoveredWorldId: null, journeyPhase: 'focusing', selectedWorldId }),
  setJourneyPhase: (journeyPhase) => set({ journeyPhase }),
}))
