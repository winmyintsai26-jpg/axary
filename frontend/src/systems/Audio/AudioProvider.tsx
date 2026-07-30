import { type PropsWithChildren, useMemo } from 'react'

import { audioManager } from './AudioManager'
import { AxaryAudioContext } from './audioContext'

export function AudioProvider({ children }: PropsWithChildren) {
  const value = useMemo(
    () => ({
      beginJourney: () => audioManager.beginJourney(),
      enterHeartWorld: () => audioManager.enterHeartWorld(),
    }),
    [],
  )

  return (
    <AxaryAudioContext.Provider value={value}>{children}</AxaryAudioContext.Provider>
  )
}
