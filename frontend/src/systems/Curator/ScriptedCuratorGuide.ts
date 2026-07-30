import type { DialogueDraft } from '../../book/Dialogue/types'
import type { CuratorContext, CuratorGuide } from './types'

const quietHeartResponse: DialogueDraft = {
  speaker: 'curator',
  text: 'Quiet places can mean many things. For some people they offer peace. For others they invite questions. As you continue your journey, you may discover what this place means to you.',
}

export class ScriptedCuratorGuide implements CuratorGuide {
  async respond(context: CuratorContext): Promise<DialogueDraft> {
    if (context.newWorldEvent?.kind === 'first-bloom') {
      return Promise.resolve({
        speaker: 'curator',
        text: 'They were not here before. Sometimes a place may change after it has been seen with new eyes. I wonder what these flowers could mean to you as you continue.',
      })
    }

    if (context.newWorldEvent) {
      const rememberedTheme = context.memories?.at(-1)?.theme
      return Promise.resolve({
        speaker: 'curator',
        text: `${context.newWorldEvent.description} You may remember speaking about ${rememberedTheme ?? 'something meaningful'}. I wonder what this change could represent to you when you return.`,
      })
    }

    const previousMemory = context.memories?.at(-1)
    if (previousMemory) {
      return Promise.resolve({
        speaker: 'curator',
        text: `Last time, you spoke about ${previousMemory.theme}. This world may hold that memory differently today. I wonder what you notice now, and what may continue changing.`,
      })
    }

    if (
      context.worldId === 'heart' &&
      context.visitorQuestion.toLowerCase().includes('quiet')
    ) {
      return Promise.resolve(quietHeartResponse)
    }

    return Promise.resolve({
      speaker: 'curator',
      text: 'This world may suggest more than one path. I wonder which details feel meaningful to you, and what you may discover when you return.',
    })
  }
}
