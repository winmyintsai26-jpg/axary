import { create } from 'zustand'

interface ExperienceState {
  hasAwakened: boolean
  awaken: () => void
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  hasAwakened: false,
  awaken: () => set({ hasAwakened: true }),
}))
