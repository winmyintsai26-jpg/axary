import { create } from 'zustand'

export type JourneyPhase =
  | 'idle'
  | 'traveling'
  | 'approaching'
  | 'orbiting'
  | 'descending'
  | 'arrived'
  | 'exploring'

interface ExperienceState {
  journeyPhase: JourneyPhase
  setJourneyPhase: (phase: JourneyPhase) => void
  startJourney: () => void
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  journeyPhase: 'idle',
  setJourneyPhase: (journeyPhase) => set({ journeyPhase }),
  startJourney: () => set({ journeyPhase: 'traveling' }),
}))
