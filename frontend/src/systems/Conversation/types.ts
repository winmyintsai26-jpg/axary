import type { DialogueMessage, DialogueThread } from '../../book/Dialogue/types'

export interface ConversationContext {
  history: DialogueThread
  worldId?: string
}

export interface ConversationProvider {
  respond(context: ConversationContext): Promise<DialogueMessage>
}
