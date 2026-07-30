import type { DialogueDraft, DialogueThread } from '../../book/Dialogue/types'

export interface CuratorContext {
  history: DialogueThread
  visitorQuestion: string
  worldId?: string
}

export interface CuratorGuide {
  respond(context: CuratorContext): Promise<DialogueDraft>
}
