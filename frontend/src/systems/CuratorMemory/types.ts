import type { SymbolicWorldKind } from '../../book/Worlds/types'

export interface CuratorMemory {
  firstNoticedAt: string
  id: string
  lastNoticedAt: string
  sourceText: string
  theme: string
  worldId?: SymbolicWorldKind
}

export interface CuratorMemoryStore {
  recall(worldId?: SymbolicWorldKind): CuratorMemory[]
  remember(memory: CuratorMemory): void
}
