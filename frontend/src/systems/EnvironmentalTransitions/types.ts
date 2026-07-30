export type TimeOfDay = 'dawn' | 'day' | 'golden-hour' | 'dusk' | 'night'
export type WorldSeason = 'spring' | 'summer' | 'autumn' | 'winter'

export interface LivingAtmosphere {
  ambientActivity: number
  cloudDensity: number
  fogDensity: number
  lightWarmth: number
  season: WorldSeason
  timeOfDay: TimeOfDay
  waterClarity: number
  wildlifePresence: number
  windStrength: number
}

export interface EnvironmentalTransition {
  durationMs: number
  from: LivingAtmosphere
  reason: string
  to: LivingAtmosphere
}
