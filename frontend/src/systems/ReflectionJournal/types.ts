import type { SymbolicWorldKind } from '../../book/Worlds/types'

export type JournalMomentKind =
  'conversation' | 'question' | 'reflection' | 'symbolic-change'

export interface JournalMoment {
  createdAt: string
  id: string
  kind: JournalMomentKind
  summary: string
  worldId?: SymbolicWorldKind
}

export interface ReflectionJournal {
  moments: JournalMoment[]
  record(moment: JournalMoment): void
}
