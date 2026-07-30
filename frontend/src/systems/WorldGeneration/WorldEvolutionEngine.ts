import type { SymbolicWorld, WorldEvolutionRule } from '../../book/Worlds/types'
import type { WorldChange, WorldState } from '../WorldState/types'

export interface EvolutionContext {
  recurringThemes: string[]
}

export interface EvolutionProposal {
  change: WorldChange
  rule: WorldEvolutionRule
}

export function proposeWorldEvolution(
  world: SymbolicWorld,
  state: WorldState,
  context: EvolutionContext,
): EvolutionProposal[] {
  const appliedRuleIds = new Set(state.history.map((change) => change.id))
  const themes = new Set(context.recurringThemes)

  return world.narrative.evolution
    .filter(
      (rule) =>
        !appliedRuleIds.has(rule.id) &&
        rule.triggerThemes.some((theme) => themes.has(theme)),
    )
    .map((rule) => ({
      rule,
      change: {
        appliedAt: new Date().toISOString(),
        description: rule.description,
        id: rule.id,
        kind: rule.kind,
        symbolicMeaning: rule.symbolicMeaning,
      },
    }))
}
