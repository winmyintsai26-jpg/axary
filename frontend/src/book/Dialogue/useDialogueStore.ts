import { create } from 'zustand'

import type { DialogueMessage, DialogueThread } from './types'

const initialTime = new Date().toISOString()

const initialThread: DialogueThread = {
  id: 'curator-welcome',
  createdAt: initialTime,
  messages: [
    {
      id: 'welcome',
      speaker: 'curator',
      text: 'Welcome. There is no right way to begin.',
      timestamp: initialTime,
    },
    {
      id: 'becoming',
      speaker: 'curator',
      text: 'These worlds are still becoming, just as you are.',
      timestamp: initialTime,
    },
  ],
}

interface DialogueState {
  activeThread: DialogueThread
  addMessage: (message: Omit<DialogueMessage, 'id' | 'timestamp'>) => void
  isCuratorOpen: boolean
  setCuratorOpen: (isOpen: boolean) => void
}

export const useDialogueStore = create<DialogueState>((set) => ({
  activeThread: initialThread,
  isCuratorOpen: false,
  addMessage: (message) =>
    set((state) => ({
      activeThread: {
        ...state.activeThread,
        messages: [
          ...state.activeThread.messages,
          {
            ...message,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
          },
        ],
      },
    })),
  setCuratorOpen: (isCuratorOpen) => set({ isCuratorOpen }),
}))
