import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { CinematicCameraRig } from '../../world/Camera/CinematicCameraRig'
import { WorldAtmosphere } from '../../world/Sky/WorldAtmosphere'
import { CreatorUniverse } from '../../world/Universe/CreatorUniverse'
import { PrototypeWorlds } from '../../world/Worlds/PrototypeWorlds'

interface UniverseSceneProps {
  reducedMotion: boolean
}

export function UniverseScene({ reducedMotion }: UniverseSceneProps) {
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
          <WorldAtmosphere />
          <ambientLight intensity={0.42} color="#aabbd1" />
          <directionalLight position={[5, 7, 8]} intensity={1.5} color="#ffe0aa" />
          <CreatorUniverse reducedMotion={reducedMotion} />
          <PrototypeWorlds reducedMotion={reducedMotion} />
          <CinematicCameraRig reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
