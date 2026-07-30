import type { SymbolicWorldKind } from '../../book/Worlds/types'
import type { SymbolicEventKind } from '../SymbolicEvents/types'
import type { LivingAtmosphere } from './types'

const worldDefaults: Record<SymbolicWorldKind, LivingAtmosphere> = {
  heart: {
    ambientActivity: 0.25,
    cloudDensity: 0.35,
    fogDensity: 0.3,
    lightWarmth: 0.65,
    season: 'spring',
    timeOfDay: 'dusk',
    waterClarity: 0.55,
    wildlifePresence: 0.15,
    windStrength: 0.18,
  },
  growth: {
    ambientActivity: 0.35,
    cloudDensity: 0.4,
    fogDensity: 0.18,
    lightWarmth: 0.58,
    season: 'spring',
    timeOfDay: 'dawn',
    waterClarity: 0.7,
    wildlifePresence: 0.3,
    windStrength: 0.28,
  },
  bonds: {
    ambientActivity: 0.3,
    cloudDensity: 0.22,
    fogDensity: 0.12,
    lightWarmth: 0.8,
    season: 'autumn',
    timeOfDay: 'golden-hour',
    waterClarity: 0.52,
    wildlifePresence: 0.24,
    windStrength: 0.2,
  },
  purpose: {
    ambientActivity: 0.42,
    cloudDensity: 0.5,
    fogDensity: 0.1,
    lightWarmth: 0.7,
    season: 'summer',
    timeOfDay: 'golden-hour',
    waterClarity: 0.75,
    wildlifePresence: 0.18,
    windStrength: 0.48,
  },
  soul: {
    ambientActivity: 0.16,
    cloudDensity: 0.28,
    fogDensity: 0.52,
    lightWarmth: 0.25,
    season: 'winter',
    timeOfDay: 'night',
    waterClarity: 0.62,
    wildlifePresence: 0.08,
    windStrength: 0.12,
  },
}

export function createLivingAtmosphere(worldId: SymbolicWorldKind): LivingAtmosphere {
  return structuredClone(worldDefaults[worldId])
}

export function reflectEventInAtmosphere(
  atmosphere: LivingAtmosphere,
  kind: SymbolicEventKind,
): LivingAtmosphere {
  const next = structuredClone(atmosphere)

  if (kind === 'fog-lifts') next.fogDensity = Math.max(0.08, next.fogDensity - 0.2)
  if (kind === 'birds-return')
    next.wildlifePresence = Math.min(1, next.wildlifePresence + 0.24)
  if (kind === 'river-clears') next.waterClarity = Math.min(1, next.waterClarity + 0.2)
  if (kind === 'lantern-lights') next.lightWarmth = Math.min(1, next.lightWarmth + 0.18)
  if (kind === 'stars-appear') next.timeOfDay = 'night'
  if (kind === 'first-bloom') next.season = 'spring'
  if (kind === 'tree-grows')
    next.ambientActivity = Math.min(1, next.ambientActivity + 0.12)

  return next
}
