import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { useJourneyStore } from '../../book/Journey/useJourneyStore'
import { BookLights } from '../../book/Worlds/BookLights'
import { BookWorlds } from '../../book/Worlds/BookWorlds'
import { CinematicCameraRig } from '../../world/Camera/CinematicCameraRig'
import { HeartWorld } from '../../world/Heart/HeartWorld'
import { WorldAtmosphere } from '../../world/Sky/WorldAtmosphere'

interface UniverseSceneProps {
  reducedMotion: boolean
}

export function UniverseScene({ reducedMotion }: UniverseSceneProps) {
  const journeyPhase = useJourneyStore((state) => state.journeyPhase)
  const isInHeartWorld =
    journeyPhase === 'entering-heart' || journeyPhase === 'heart-world'

  return (
    <div className="star-canvas">
      <Canvas
        camera={{ position: [0, 0.2, 18], fov: 48, near: 0.1, far: 120 }}
        dpr={[1, 1.6]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#070b15']} />
          <fog attach="fog" args={['#11182a', 20, 48]} />
          {!isInHeartWorld && <WorldAtmosphere />}
          {!isInHeartWorld && <ambientLight intensity={0.42} color="#aabbd1" />}
          {!isInHeartWorld && (
            <directionalLight position={[5, 7, 8]} intensity={1.5} color="#ffe0aa" />
          )}
          <BookLights reducedMotion={reducedMotion} />
          <BookWorlds reducedMotion={reducedMotion} />
          {isInHeartWorld && <HeartWorld reducedMotion={reducedMotion} />}
          <CinematicCameraRig reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
