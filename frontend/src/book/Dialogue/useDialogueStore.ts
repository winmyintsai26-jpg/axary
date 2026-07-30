import { create } from 'zustand'

import { MirrorDialogueManager } from '../../systems/Conversation/DialogueManager'
import { ScriptedCuratorGuide } from '../../systems/Curator/ScriptedCuratorGuide'
import type { DialogueDraft, DialogueThread } from './types'

const initialTime = new Date().toISOString()

const initialThread: DialogueThread = {
  id: 'curator-welcome',
  createdAt: initialTime,
  messages: [
    {
      id: 'welcome',
      speaker: 'curator',
      text: 'Welcome. There is no right way to begin. You may notice different meanings as you continue.',
      timestamp: initialTime,
    },
    {
      id: 'becoming',
      speaker: 'curator',
      text: 'These worlds are still becoming. I wonder what their changes may come to mean as your journey continues.',
      timestamp: initialTime,
    },
  ],
}

interface DialogueState {
  activeThread: DialogueThread
  addMessage: (message: DialogueDraft) => void
  askCurator: (question: string, worldId?: string) => Promise<void>
  isCuratorOpen: boolean
  setCuratorOpen: (isOpen: boolean) => void
}

const dialogueManager = new MirrorDialogueManager()
const curatorGuide = new ScriptedCuratorGuide()

export const useDialogueStore = create<DialogueState>((set) => ({
  activeThread: initialThread,
  isCuratorOpen: false,
  addMessage: (message) =>
    set((state) => ({
      activeThread: dialogueManager.append(state.activeThread, message),
    })),
  askCurator: async (question, worldId) => {
    const travelerDraft: DialogueDraft = {
      speaker: 'traveler',
      text: question,
    }
    set((state) => ({
      activeThread: dialogueManager.append(state.activeThread, travelerDraft),
    }))

    const history = useDialogueStore.getState().activeThread
    const response = await curatorGuide.respond({
      history,
      visitorQuestion: question,
      worldId,
    })

    set((state) => ({
      activeThread: dialogueManager.append(state.activeThread, response),
    }))
  },
  setCuratorOpen: (isCuratorOpen) => set({ isCuratorOpen }),
}))
