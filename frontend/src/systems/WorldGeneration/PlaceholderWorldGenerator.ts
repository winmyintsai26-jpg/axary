import type { SymbolicWorld } from '../../book/Worlds/types'
import type { WorldGenerationContext, WorldGenerator } from './types'

export class PlaceholderWorldGenerator implements WorldGenerator {
  async generate(context: WorldGenerationContext): Promise<SymbolicWorld> {
    return Promise.resolve(structuredClone(context.blueprint))
  }
}
