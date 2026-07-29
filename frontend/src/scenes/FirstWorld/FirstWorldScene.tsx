import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { CinematicCameraRig } from '../../world/Camera/CinematicCameraRig'
import { GoldenHourLighting } from '../../world/Lighting/GoldenHourLighting'
import { FirstWorld } from '../../world/Planet/FirstWorld'
import { JourneyStars } from '../../world/Sky/JourneyStars'
import { WorldAtmosphere } from '../../world/Sky/WorldAtmosphere'

interface FirstWorldSceneProps {
  reducedMotion: boolean
}

export function FirstWorldScene({ reducedMotion }: FirstWorldSceneProps) {
  return (
    <div className="star-canvas" aria-hidden="true">
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 18], fov: 52, near: 0.1, far: 120 }}
        dpr={[1, 1.6]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#070b15']} />
          <fog attach="fog" args={['#8aa0bc', 19, 45]} />
          <WorldAtmosphere />
          <GoldenHourLighting />
          <JourneyStars reducedMotion={reducedMotion} />
          <FirstWorld reducedMotion={reducedMotion} />
          <CinematicCameraRig reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
