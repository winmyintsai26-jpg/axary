import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import type { CreatorWorld } from '../../types/CreatorWorld'
import { useExperienceStore } from '../../store/useExperienceStore'

interface CreatorStarProps {
  creatorWorld: CreatorWorld
  reducedMotion: boolean
}

const phaseOpacity = {
  idle: 1,
  traveling: 1,
  approaching: 0.72,
  orbiting: 0,
  descending: 0,
  arrived: 0,
  exploring: 0,
} as const

export function CreatorStar({ creatorWorld, reducedMotion }: CreatorStarProps) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.MeshBasicMaterial>(null)
  const innerGlow = useRef<THREE.MeshBasicMaterial>(null)
  const outerGlow = useRef<THREE.MeshBasicMaterial>(null)
  const phase = useExperienceStore((state) => state.journeyPhase)
  const color = useMemo(() => new THREE.Color(creatorWorld.color), [creatorWorld])

  useFrame((state, delta) => {
    if (!group.current || !core.current || !innerGlow.current || !outerGlow.current) {
      return
    }

    const opacity = phaseOpacity[phase]
    const easing = 1 - Math.exp(-delta * 1.4)
    core.current.opacity = THREE.MathUtils.lerp(core.current.opacity, opacity, easing)
    innerGlow.current.opacity = THREE.MathUtils.lerp(
      innerGlow.current.opacity,
      opacity * 0.2,
      easing,
    )
    outerGlow.current.opacity = THREE.MathUtils.lerp(
      outerGlow.current.opacity,
      opacity * 0.075,
      easing,
    )

    const breath = reducedMotion
      ? 1
      : 1 + Math.sin(state.clock.elapsedTime * 0.55) * 0.055
    group.current.scale.setScalar(breath)
    group.current.visible = outerGlow.current.opacity > 0.001
  })

  return (
    <group ref={group} position={creatorWorld.position} name={creatorWorld.name}>
      <mesh>
        <sphereGeometry args={[0.075, 24, 18]} />
        <meshBasicMaterial
          ref={core}
          color={color}
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 24, 18]} />
        <meshBasicMaterial
          ref={innerGlow}
          color={color}
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.62, 24, 18]} />
        <meshBasicMaterial
          ref={outerGlow}
          color="#c9d8ef"
          transparent
          opacity={0.075}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={color} intensity={0.7} distance={4} />
    </group>
  )
}
