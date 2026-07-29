import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface WorldParticlesProps {
  reducedMotion: boolean
}

export function WorldParticles({ reducedMotion }: WorldParticlesProps) {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const array = new Float32Array(42 * 3)
    for (let index = 0; index < 42; index += 1) {
      const angle = index * 2.399
      const radius = 0.5 + ((index * 17) % 23) / 10
      array[index * 3] = Math.cos(angle) * radius
      array[index * 3 + 1] = 2.9 + ((index * 13) % 21) / 12
      array[index * 3 + 2] = Math.sin(angle) * radius
    }
    return array
  }, [])

  useFrame((state) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y = state.clock.elapsedTime * 0.025
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.04
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f0d7a5"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.58}
        depthWrite={false}
      />
    </points>
  )
}
