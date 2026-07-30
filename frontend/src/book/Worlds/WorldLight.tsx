import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useJourneyStore } from '../Journey/useJourneyStore'
import type { SymbolicWorld } from './types'

interface WorldLightProps {
  reducedMotion: boolean
  world: SymbolicWorld
}

const phaseOpacity = {
  introduction: 0,
  questionnaire: 0,
  book: 1,
  focusing: 1,
  orbiting: 0,
  returning: 1,
} as const

export function WorldLight({ reducedMotion, world }: WorldLightProps) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.MeshBasicMaterial>(null)
  const innerGlow = useRef<THREE.MeshBasicMaterial>(null)
  const outerGlow = useRef<THREE.MeshBasicMaterial>(null)
  const phase = useJourneyStore((state) => state.journeyPhase)
  const selectedWorldId = useJourneyStore((state) => state.selectedWorldId)
  const selectWorld = useJourneyStore((state) => state.selectWorld)
  const hoverWorld = useJourneyStore((state) => state.hoverWorld)
  const color = useMemo(() => new THREE.Color(world.color), [world])

  useFrame((state, delta) => {
    if (!group.current || !core.current || !innerGlow.current || !outerGlow.current) {
      return
    }

    const isSelected = selectedWorldId === world.id
    const opacity = phase === 'focusing' && !isSelected ? 0.16 : phaseOpacity[phase]
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
    <group
      ref={group}
      position={world.position}
      name={world.name}
      onClick={(event) => {
        event.stopPropagation()
        if (phase === 'book') selectWorld(world.id)
      }}
      onPointerEnter={(event) => {
        event.stopPropagation()
        if (phase === 'book') {
          document.body.style.cursor = 'pointer'
          hoverWorld(world.id)
        }
      }}
      onPointerLeave={() => {
        document.body.style.cursor = ''
        hoverWorld(null)
      }}
    >
      <mesh>
        <sphereGeometry args={[0.075, 24, 18]} />
        <meshBasicMaterial
          ref={core}
          color={color}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 24, 18]} />
        <meshBasicMaterial
          ref={innerGlow}
          color={color}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.7, 24, 18]} />
        <meshBasicMaterial
          ref={outerGlow}
          color={world.glow}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={color} intensity={0.85} distance={4} />
    </group>
  )
}
