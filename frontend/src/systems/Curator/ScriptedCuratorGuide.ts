import type { DialogueDraft } from '../../book/Dialogue/types'
import type { CuratorContext, CuratorGuide } from './types'

const quietHeartResponse: DialogueDraft = {
  speaker: 'curator',
  text: 'Quiet places can mean many things. For some people they offer peace. For others they invite questions. As you continue your journey, you may discover what this place means to you.',
}

export class ScriptedCuratorGuide implements CuratorGuide {
  async respond(context: CuratorContext): Promise<DialogueDraft> {
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
