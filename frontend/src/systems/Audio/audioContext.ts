import { createContext } from 'react'

export interface AudioContextValue {
  beginJourney: () => Promise<void>
  enterHeartWorld: () => Promise<void>
}

export const AxaryAudioContext = createContext<AudioContextValue | null>(null)
