import type { SymbolicWorldKind } from '../../book/Worlds/types'

export type SymbolicEventKind =
  | 'birds-return'
  | 'bridge-completes'
  | 'first-bloom'
  | 'fog-lifts'
  | 'lantern-lights'
  | 'path-appears'
  | 'river-clears'
  | 'stars-appear'
  | 'tree-grows'

export interface SymbolicEvent {
  description: string
  id: string
  kind: SymbolicEventKind
  occurredAt: string
  reflectionTheme?: string
  symbolicMeaning: string
  worldId: SymbolicWorldKind
}

export interface SymbolicEventProposal {
  description: string
  kind: SymbolicEventKind
  reflectionTheme?: string
  symbolicMeaning: string
  worldId: SymbolicWorldKind
}
