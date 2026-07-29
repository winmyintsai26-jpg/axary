import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'

import { useExperienceStore } from '../../store/useExperienceStore'

export function WorldAtmosphere() {
  const scene = useThree((state) => state.scene)
  const phase = useExperienceStore((state) => state.journeyPhase)
  const space = useMemo(() => new THREE.Color('#070b15'), [])
  const sanctuary = useMemo(() => new THREE.Color('#9db3c3'), [])

  useFrame((_, delta) => {
    const target =
      phase === 'descending' || phase === 'arrived' || phase === 'exploring'
        ? sanctuary
        : space
    const background = scene.background
    if (background instanceof THREE.Color) {
      background.lerp(target, 1 - Math.exp(-delta * 0.35))
    }
  })

  return null
}
