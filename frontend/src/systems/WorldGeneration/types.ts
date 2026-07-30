import type { SymbolicWorld } from '../../book/Worlds/types'
import type { SymbolicInterpretation } from '../Personality/types'

export interface WorldGenerationContext {
  baseWorld: SymbolicWorld
  interpretation?: SymbolicInterpretation
}

export interface WorldGenerator {
  generate(context: WorldGenerationContext): Promise<SymbolicWorld>
}
