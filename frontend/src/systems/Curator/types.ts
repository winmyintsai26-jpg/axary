import type { DialogueDraft, DialogueThread } from '../../book/Dialogue/types'
import type { CuratorMemory } from '../CuratorMemory/types'
import type { SymbolicEvent } from '../SymbolicEvents/types'

export interface CuratorContext {
  history: DialogueThread
  memories?: CuratorMemory[]
  newWorldEvent?: SymbolicEvent | null
  visitorQuestion: string
  worldId?: string
}

export interface CuratorGuide {
  respond(context: CuratorContext): Promise<DialogueDraft>
}
