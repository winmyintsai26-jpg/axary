import { useContext } from 'react'

import { AxaryAudioContext } from './audioContext'

export function useAudio() {
  const context = useContext(AxaryAudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider.')
  }
  return context
}
