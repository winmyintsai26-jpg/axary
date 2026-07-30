import type { SymbolicWorldKind } from '../../book/Worlds/types'
import type { WorldState, WorldStateRepository } from './types'

export class PlaceholderWorldStateRepository implements WorldStateRepository {
  private readonly states = new Map<SymbolicWorldKind, WorldState>()

  async get(worldId: SymbolicWorldKind): Promise<WorldState | null> {
    const state = this.states.get(worldId)
    return state ? structuredClone(state) : null
  }

  async save(state: WorldState): Promise<void> {
    this.states.set(state.worldId, structuredClone(state))
  }
}
