import { create } from 'zustand'

import type { SymbolicInterpretation } from './types'

interface ReflectionProfileState {
  interpretation: SymbolicInterpretation | null
  setInterpretation: (interpretation: SymbolicInterpretation) => void
}

export const useReflectionProfileStore = create<ReflectionProfileState>((set) => ({
  interpretation: null,
  setInterpretation: (interpretation) => set({ interpretation }),
}))
