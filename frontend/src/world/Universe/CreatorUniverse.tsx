import { CreatorStar } from './CreatorStar'
import { creatorWorlds } from './creatorWorlds'

interface CreatorUniverseProps {
  reducedMotion: boolean
}

export function CreatorUniverse({ reducedMotion }: CreatorUniverseProps) {
  return (
    <group name="Creator universe">
      {creatorWorlds.map((creatorWorld) => (
        <CreatorStar
          key={creatorWorld.id}
          creatorWorld={creatorWorld}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  )
}
