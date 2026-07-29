import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'

export function WorldAtmosphere() {
  const scene = useThree((state) => state.scene)
  const space = useMemo(() => new THREE.Color('#070b15'), [])

  useFrame((_, delta) => {
    const background = scene.background
    if (background instanceof THREE.Color) {
      background.lerp(space, 1 - Math.exp(-delta * 0.35))
    }
  })

  return null
}
