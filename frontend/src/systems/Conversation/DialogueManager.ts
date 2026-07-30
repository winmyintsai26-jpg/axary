import type {
  DialogueDraft,
  DialogueMessage,
  DialogueThread,
} from '../../book/Dialogue/types'
import { createMirrorSafeFallback, evaluateMirrorRule } from './MirrorRule'

export interface DialogueManager {
  append(thread: DialogueThread, draft: DialogueDraft): DialogueThread
}

function createMessage(draft: DialogueDraft): DialogueMessage {
  return {
    ...draft,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  }
}

export class MirrorDialogueManager implements DialogueManager {
  append(thread: DialogueThread, draft: DialogueDraft): DialogueThread {
    const result = evaluateMirrorRule(draft)
    const safeDraft = result.passed ? draft : createMirrorSafeFallback()

    return {
      ...thread,
      messages: [...thread.messages, createMessage(safeDraft)],
    }
  }
}
