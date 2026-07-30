export type DialogueSpeaker = 'curator' | 'traveler' | 'world'

export interface DialogueBranch {
  id: string
  label: string
  nextMessageId?: string
}

export interface DialogueMemoryReference {
  id: string
  kind: 'answer' | 'reflection' | 'visit'
  summary: string
}

export interface DialogueMessage {
  branches?: DialogueBranch[]
  id: string
  memoryReferences?: DialogueMemoryReference[]
  speaker: DialogueSpeaker
  text: string
  timestamp: string
}

export interface DialogueThread {
  createdAt: string
  id: string
  messages: DialogueMessage[]
  worldId?: string
}
