import { Clouds } from './Clouds'
import { InstancedMeadow } from './InstancedMeadow'
import { SanctuaryPond } from './SanctuaryPond'
import { StylizedTrees } from './StylizedTrees'
import { WorldParticles } from './WorldParticles'

interface SanctuaryEnvironmentProps {
  reducedMotion: boolean
}

export function SanctuaryEnvironment({ reducedMotion }: SanctuaryEnvironmentProps) {
  return (
    <group>
      <StylizedTrees reducedMotion={reducedMotion} />
      <InstancedMeadow reducedMotion={reducedMotion} />
      <SanctuaryPond reducedMotion={reducedMotion} />
      <Clouds reducedMotion={reducedMotion} />
      <WorldParticles reducedMotion={reducedMotion} />
    </group>
  )
}
