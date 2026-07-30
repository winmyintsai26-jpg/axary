import type { SymbolicWorldKind } from '../../book/Worlds/types'
import type { CuratorMemory } from '../CuratorMemory/types'
import type { LivingAtmosphere } from '../EnvironmentalTransitions/types'
import type { SymbolicEvent, SymbolicEventProposal } from '../SymbolicEvents/types'

export interface LivingWorldState {
  atmosphere: LivingAtmosphere
  history: SymbolicEvent[]
  lastChangedAt?: string
  worldId: SymbolicWorldKind
}

export interface LivingWorldReflection {
  previousMemories: CuratorMemory[]
  text: string
  worldId: SymbolicWorldKind
}

export interface LivingWorldEngine {
  reflect(
    reflection: LivingWorldReflection,
    currentState: LivingWorldState,
  ): SymbolicEventProposal | null
}
