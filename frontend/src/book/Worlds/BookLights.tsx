import { symbolicWorlds } from './worlds'
import { WorldLight } from './WorldLight'

interface BookLightsProps {
  reducedMotion: boolean
}

export function BookLights({ reducedMotion }: BookLightsProps) {
  return (
    <group name="Symbolic world lights">
      {symbolicWorlds.map((world) => (
        <WorldLight key={world.id} world={world} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}
