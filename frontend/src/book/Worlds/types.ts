import type { WorldStyle } from '../../types/WorldStyle'

export type SymbolicWorldKind = 'heart' | 'growth' | 'bonds' | 'purpose' | 'soul'

export interface WorldEnvironment {
  architecture: string[]
  ambientSounds: string[]
  colorPalette: WorldColorPalette
  environment: string
  hiddenLocations: WorldLocation[]
  lighting: string
  music: string
  notableLandmarks: WorldLandmark[]
  terrain: string[]
  vegetation: string[]
  weather: string
}

export interface WorldColorPalette {
  accent: string
  atmosphere: string
  foliage: string
  glow: string
  terrain: string
  water: string
}

export interface WorldLandmark {
  description: string
  id: string
  name: string
  symbolism: string[]
}

export interface WorldLocation {
  discoveredByDefault: boolean
  id: string
  name: string
  symbolism: string[]
}

export type WorldEvolutionKind =
  | 'path-appears'
  | 'bridge-completes'
  | 'garden-blooms'
  | 'river-changes'
  | 'tree-grows'
  | 'building-restores'

export interface WorldEvolutionRule {
  description: string
  id: string
  kind: WorldEvolutionKind
  symbolicMeaning: string
  triggerThemes: string[]
}

export interface WorldNarrative {
  emotionalTone: string[]
  evolution: WorldEvolutionRule[]
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
