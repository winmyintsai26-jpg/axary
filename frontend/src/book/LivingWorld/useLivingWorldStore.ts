import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import {
  createLivingAtmosphere,
  reflectEventInAtmosphere,
} from '../../systems/EnvironmentalTransitions/createLivingAtmosphere'
import type { CuratorMemory } from '../../systems/CuratorMemory/types'
import { PlaceholderLivingWorldEngine } from '../../systems/LivingWorld/PlaceholderLivingWorldEngine'
import type { LivingWorldState } from '../../systems/LivingWorld/types'
import type { JournalMoment } from '../../systems/ReflectionJournal/types'
import type { SymbolicEvent } from '../../systems/SymbolicEvents/types'
import type { SymbolicWorldKind } from '../Worlds/types'

function createInitialWorlds(): Record<SymbolicWorldKind, LivingWorldState> {
  const createWorld = (worldId: SymbolicWorldKind): LivingWorldState => ({
    atmosphere: createLivingAtmosphere(worldId),
    history: [],
    worldId,
  })

  return {
    heart: createWorld('heart'),
    growth: createWorld('growth'),
    bonds: createWorld('bonds'),
    purpose: createWorld('purpose'),
    soul: createWorld('soul'),
  }
}

interface LivingWorldStore {
  journal: JournalMoment[]
  memories: CuratorMemory[]
  recall: (worldId?: SymbolicWorldKind) => CuratorMemory[]
  recordQuestion: (question: string) => void
  recordConversation: (
    text: string,
    worldId: SymbolicWorldKind,
    speaker: 'curator' | 'traveler',
  ) => void
  shareReflection: (text: string, worldId: SymbolicWorldKind) => SymbolicEvent | null
  worlds: Record<SymbolicWorldKind, LivingWorldState>
}

const engine = new PlaceholderLivingWorldEngine()

function inferTheme(text: string): string | null {
  const themes = [
    'trust',
    'friendship',
    'connection',
    'hope',
    'change',
    'clarity',
    'belonging',
    'acceptance',
    'loneliness',
    'purpose',
    'direction',
    'dreams',
    'patience',
    'courage',
  ]

  return themes.find((theme) => text.toLowerCase().includes(theme)) ?? null
}

export const useLivingWorldStore = create<LivingWorldStore>()(
  persist(
    (set, get) => ({
      journal: [],
      memories: [],
      worlds: createInitialWorlds(),
      recall: (worldId) =>
        get().memories.filter((memory) => !worldId || memory.worldId === worldId),
      recordQuestion: (question) =>
        set((state) => ({
          journal: [
            ...state.journal,
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              kind: 'question',
              summary: question,
            },
          ],
        })),
      recordConversation: (text, worldId, speaker) => {
        const now = new Date().toISOString()
        const theme = inferTheme(text)
        const moment: JournalMoment = {
          createdAt: now,
          id: crypto.randomUUID(),
          kind: speaker === 'traveler' ? 'reflection' : 'conversation',
          summary:
            speaker === 'traveler'
              ? text
              : `The Curator offered a question in the World of ${worldId}.`,
          worldId,
        }

        set((state) => ({
          journal: [...state.journal, moment],
          memories:
            speaker === 'traveler' && theme
              ? state.memories.some(
                  (memory) => memory.theme === theme && memory.worldId === worldId,
                )
                ? state.memories.map((memory) =>
                    memory.theme === theme && memory.worldId === worldId
                      ? { ...memory, lastNoticedAt: now, sourceText: text }
                      : memory,
                  )
                : [
                    ...state.memories,
                    {
                      firstNoticedAt: now,
                      id: crypto.randomUUID(),
                      lastNoticedAt: now,
                      sourceText: text,
                      theme,
                      worldId,
                    },
                  ]
              : state.memories,
        }))
      },
      shareReflection: (text, worldId) => {
        const state = get()
        const proposal = engine.reflect(
          {
            previousMemories: state.memories,
            text,
            worldId,
          },
          state.worlds[worldId],
        )

        if (!proposal) return null

        const occurredAt = new Date().toISOString()
        const event: SymbolicEvent = {
          ...proposal,
          id: crypto.randomUUID(),
          occurredAt,
        }
        const journalMoment: JournalMoment = {
          createdAt: occurredAt,
          id: crypto.randomUUID(),
          kind: 'symbolic-change',
          summary: event.description,
          worldId,
        }

        set((current) => ({
          journal: [...current.journal, journalMoment],
          worlds: {
            ...current.worlds,
            [worldId]: {
              ...current.worlds[worldId],
              atmosphere: reflectEventInAtmosphere(
                current.worlds[worldId].atmosphere,
                event.kind,
              ),
              history: [...current.worlds[worldId].history, event],
              lastChangedAt: occurredAt,
            },
          },
        }))

        return event
      },
    }),
    {
      name: 'axary-living-mirror.v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
)
