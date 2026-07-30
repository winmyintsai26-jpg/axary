import type { SymbolicWorld } from '../../book/Worlds/types'
import type { SymbolicInterpretation } from '../Reflection/types'
import type { WorldState } from '../WorldState/types'

export interface WorldGenerationContext {
  blueprint: SymbolicWorld
  interpretation?: SymbolicInterpretation
  state: WorldState
}

export interface WorldGenerator {
  generate(context: WorldGenerationContext): Promise<SymbolicWorld>
}
