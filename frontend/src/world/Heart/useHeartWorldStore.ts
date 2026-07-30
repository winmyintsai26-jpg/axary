import { create } from 'zustand'

export type HeartLocation =
  'arrival' | 'bridge' | 'cabin' | 'hidden-garden' | 'lake' | 'old-tree' | 'overlook'

export type HeartTime = 'sunrise' | 'golden-hour' | 'sunset' | 'moonlight'

interface HeartWorldState {
  activeLocation: HeartLocation
  destination: [number, number, number]
  heartTime: HeartTime
  isResting: boolean
  lanternsLit: string[]
  lightLantern: (id: string) => void
  restAt: (location: HeartLocation, position: [number, number, number]) => void
  setActiveLocation: (location: HeartLocation) => void
  setDestination: (destination: [number, number, number]) => void
  setHeartTime: (heartTime: HeartTime) => void
  stand: () => void
}

export const useHeartWorldStore = create<HeartWorldState>((set) => ({
  activeLocation: 'arrival',
  destination: [0, 0.78, 7],
  heartTime: 'golden-hour',
  isResting: false,
  lanternsLit: ['cabin'],
  lightLantern: (id) =>
    set((state) => ({
      lanternsLit: state.lanternsLit.includes(id)
        ? state.lanternsLit
        : [...state.lanternsLit, id],
    })),
  restAt: (activeLocation, destination) =>
    set({ activeLocation, destination, isResting: true }),
  setActiveLocation: (activeLocation) =>
    set((state) =>
      state.activeLocation === activeLocation ? state : { activeLocation },
    ),
  setDestination: (destination) => set({ destination, isResting: false }),
  setHeartTime: (heartTime) =>
    set((state) => (state.heartTime === heartTime ? state : { heartTime })),
  stand: () => set({ isResting: false }),
}))
