import { HeartAmbientLife } from './HeartAmbientLife'
import { HeartCameraController } from './HeartCameraController'
import { HeartFlora } from './HeartFlora'
import { HeartLake } from './HeartLake'
import { HeartLandmarks } from './HeartLandmarks'
import { HeartLighting } from './HeartLighting'
import { HeartTerrain } from './HeartTerrain'
import { useHeartWorldStore } from './useHeartWorldStore'

export function HeartWorld({ reducedMotion }: { reducedMotion: boolean }) {
  const setDestination = useHeartWorldStore((state) => state.setDestination)

  return (
    <group
      name="The Heart World"
      onClick={(event) => {
        setDestination([event.point.x, 0.78, event.point.z])
      }}
    >
      <HeartLighting reducedMotion={reducedMotion} />
      <HeartTerrain />
      <HeartLake reducedMotion={reducedMotion} />
      <HeartFlora reducedMotion={reducedMotion} />
      <HeartLandmarks />
      <HeartAmbientLife reducedMotion={reducedMotion} />
      <HeartCameraController reducedMotion={reducedMotion} />
    </group>
  )
}
