import type { SymbolicWorld } from '../../book/Worlds/types'
import type { WorldState } from './types'

export function createInitialWorldState(world: SymbolicWorld): WorldState {
  return {
    discoveredLocationIds: world.environment.hiddenLocations
      .filter((location) => location.discoveredByDefault)
      .map((location) => location.id),
    history: [],
    lifeStage: 'seed',
    revision: 1,
    worldId: world.id,
  }
}
