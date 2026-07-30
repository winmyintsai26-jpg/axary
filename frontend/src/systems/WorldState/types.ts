import type { SymbolicWorldKind, WorldEvolutionKind } from '../../book/Worlds/types'

export type WorldLifeStage = 'seed' | 'awakening' | 'growing' | 'renewing'

export interface WorldChange {
  appliedAt: string
  description: string
  id: string
  kind: WorldEvolutionKind
  symbolicMeaning: string
}

export interface WorldState {
  discoveredLocationIds: string[]
  history: WorldChange[]
  lifeStage: WorldLifeStage
  revision: number
  worldId: SymbolicWorldKind
}

export interface WorldStateRepository {
  get(worldId: SymbolicWorldKind): Promise<WorldState | null>
  save(state: WorldState): Promise<void>
}
