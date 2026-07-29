import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface CloudsProps {
  reducedMotion: boolean
}

function Cloud({
  position,
  scale,
}: {
  position: [number, number, number]
  scale: number
}) {
  return (
    <group position={position} scale={scale}>
      {[
        [-0.55, 0, 0],
        [0, 0.1, 0],
        [0.58, -0.02, 0.05],
        [0.25, -0.12, 0.15],
      ].map((cloudPosition, index) => (
        <mesh key={index} position={cloudPosition as [number, number, number]}>
          <sphereGeometry args={[0.58 - index * 0.04, 16, 12]} />
          <meshStandardMaterial
            color="#e8e2d4"
            transparent
            opacity={0.48}
            depthWrite={false}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  )
}

export function Clouds({ reducedMotion }: CloudsProps) {
  const group = useRef<THREE.Group>(null)
  const clouds = useMemo(
    () => [
      { position: [-5.5, 5.9, -2] as [number, number, number], scale: 1.2 },
      { position: [4.8, 6.5, -3.5] as [number, number, number], scale: 0.95 },
      { position: [1.6, 7.2, 1] as [number, number, number], scale: 0.7 },
    ],
    [],
  )

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return
    group.current.position.x += delta * 0.045
    if (group.current.position.x > 2.4) group.current.position.x = -2.4
  })

  return (
    <group ref={group}>
      {clouds.map((cloud) => (
        <Cloud key={cloud.position.join(':')} {...cloud} />
      ))}
    </group>
  )
}
