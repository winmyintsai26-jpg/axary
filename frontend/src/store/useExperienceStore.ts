import { create } from 'zustand'

export type JourneyPhase = 'idle' | 'universe' | 'focusing' | 'orbiting' | 'returning'

interface ExperienceState {
  journeyPhase: JourneyPhase
  selectedWorldId: string | null
  hoverWorld: (worldId: string | null) => void
  hoveredWorldId: string | null
  returnToUniverse: () => void
  selectWorld: (worldId: string) => void
  setJourneyPhase: (phase: JourneyPhase) => void
  startJourney: () => void
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  journeyPhase: 'idle',
  selectedWorldId: null,
  hoveredWorldId: null,
  hoverWorld: (hoveredWorldId) => set({ hoveredWorldId }),
  returnToUniverse: () => set({ journeyPhase: 'returning', hoveredWorldId: null }),
  selectWorld: (selectedWorldId) =>
    set({ journeyPhase: 'focusing', selectedWorldId, hoveredWorldId: null }),
  setJourneyPhase: (journeyPhase) => set({ journeyPhase }),
  startJourney: () => set({ journeyPhase: 'universe' }),
}))
