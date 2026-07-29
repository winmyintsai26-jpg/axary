import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { SanctuaryEnvironment } from '../Environment/SanctuaryEnvironment'
import { MuseumExterior } from '../Museum/MuseumExterior'
import { PainterlyTerrain } from '../Terrain/PainterlyTerrain'
import { useExperienceStore } from '../../store/useExperienceStore'

interface FirstWorldProps {
  reducedMotion: boolean
}

const phaseScales = {
  idle: 0.018,
  traveling: 0.045,
  approaching: 0.34,
  orbiting: 1,
  descending: 1,
  arrived: 1,
  exploring: 1,
} as const

export function FirstWorld({ reducedMotion }: FirstWorldProps) {
  const group = useRef<THREE.Group>(null)
  const phase = useExperienceStore((state) => state.journeyPhase)

  useFrame((_, delta) => {
    if (!group.current) return
    const target = phaseScales[phase]
    const easing = reducedMotion ? 1 : 1 - Math.exp(-delta * 0.72)
    const next = THREE.MathUtils.lerp(group.current.scale.x, target, easing)
    group.current.scale.setScalar(next)
    group.current.rotation.y +=
      phase === 'idle' || phase === 'traveling' ? delta * 0.025 : 0
  })

  return (
    <group ref={group} scale={phaseScales.idle}>
      <PainterlyTerrain />
      <SanctuaryEnvironment reducedMotion={reducedMotion} />
      <MuseumExterior />
    </group>
  )
}
