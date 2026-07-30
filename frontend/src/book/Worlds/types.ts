import type { WorldStyle } from '../../types/WorldStyle'

export type SymbolicWorldKind = 'heart' | 'growth' | 'bonds' | 'purpose' | 'soul'

export interface WorldEnvironment {
  architecture: string[]
  environment: string
  lighting: string
  music: string
  vegetation: string[]
  weather: string
}

export interface WorldNarrative {
  emotionalTone: string[]
  futureDialogue: string[]
  futureMemories: string[]
  symbolism: string[]
}

export interface SymbolicWorld {
  color: string
  description: string
  environment: WorldEnvironment
  glow: string
  icon: string
  id: SymbolicWorldKind
  name: string
  narrative: WorldNarrative
  position: [number, number, number]
  style: WorldStyle
}
