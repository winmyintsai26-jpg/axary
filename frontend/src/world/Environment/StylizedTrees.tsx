import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface StylizedTreesProps {
  reducedMotion: boolean
}

interface TreeProps {
  position: [number, number, number]
  scale: number
  tint: string
}

function Tree({ position, scale, tint }: TreeProps) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.09, 0.14, 0.92, 8]} />
        <meshStandardMaterial color="#72594a" roughness={1} />
      </mesh>
      <mesh castShadow position={[-0.14, 1.12, 0]} scale={[0.68, 0.86, 0.7]}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial color={tint} roughness={0.94} />
      </mesh>
      <mesh castShadow position={[0.2, 1.05, 0.04]} scale={[0.6, 0.74, 0.62]}>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial color="#64865f" roughness={0.96} />
      </mesh>
      <mesh castShadow position={[0.02, 1.42, 0]} scale={[0.6, 0.7, 0.62]}>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial color={tint} roughness={0.94} />
      </mesh>
    </group>
  )
}

export function StylizedTrees({ reducedMotion }: StylizedTreesProps) {
  const group = useRef<THREE.Group>(null)
  const trees = useMemo<TreeProps[]>(
    () => [
      { position: [-2.1, 2.66, -1.35], scale: 0.86, tint: '#557b58' },
      { position: [-2.35, 2.67, 0.25], scale: 0.72, tint: '#668a61' },
      { position: [2.05, 2.65, -1.05], scale: 0.92, tint: '#587b55' },
      { position: [2.25, 2.66, 0.7], scale: 0.68, tint: '#6d8f63' },
      { position: [-1.65, 2.67, 1.55], scale: 0.62, tint: '#62835d' },
      { position: [1.55, 2.67, 1.72], scale: 0.58, tint: '#6f9167' },
    ],
    [],
  )

  useFrame((state) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.33) * 0.008
    group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.25) * 0.004
  })

  return (
    <group ref={group}>
      {trees.map((tree) => (
        <Tree key={tree.position.join(':')} {...tree} />
      ))}
    </group>
  )
}
