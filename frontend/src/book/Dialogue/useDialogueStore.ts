import { create } from 'zustand'

import { MirrorDialogueManager } from '../../systems/Conversation/DialogueManager'
import { ScriptedCuratorGuide } from '../../systems/Curator/ScriptedCuratorGuide'
import { useLivingWorldStore } from '../LivingWorld/useLivingWorldStore'
import type { SymbolicWorldKind } from '../Worlds/types'
import type { DialogueDraft, DialogueThread } from './types'

const initialTime = new Date().toISOString()

const initialThread: DialogueThread = {
  id: 'curator-welcome',
  createdAt: initialTime,
  messages: [
    {
      id: 'welcome',
      speaker: 'curator',
      text: 'Welcome. These worlds are one symbolic interpretation of your reflections. They are not meant to define you.',
      timestamp: initialTime,
    },
    {
      id: 'becoming',
      speaker: 'curator',
      text: 'As you grow, your worlds may grow with you. Walk slowly. Some answers are easier to see than to explain.',
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

    const livingWorld = useLivingWorldStore.getState()
    const symbolicWorldId = worldId as SymbolicWorldKind | undefined
    const newWorldEvent = symbolicWorldId
      ? livingWorld.shareReflection(question, symbolicWorldId)
      : null
    if (symbolicWorldId) {
      livingWorld.recordConversation(question, symbolicWorldId, 'traveler')
    }

    const history = useDialogueStore.getState().activeThread
    const response = await curatorGuide.respond({
      history,
      memories: symbolicWorldId ? livingWorld.recall(symbolicWorldId) : [],
      newWorldEvent,
      visitorQuestion: question,
      worldId,
    })

    set((state) => ({
      activeThread: dialogueManager.append(state.activeThread, response),
    }))
    if (symbolicWorldId) {
      useLivingWorldStore
        .getState()
        .recordConversation(response.text, symbolicWorldId, 'curator')
    }
  },
  setCuratorOpen: (isCuratorOpen) => set({ isCuratorOpen }),
}))
