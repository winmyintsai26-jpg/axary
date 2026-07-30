import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { waterFragmentShader, waterVertexShader } from '../../shaders/water'
import { useHeartWorldStore } from './useHeartWorldStore'

function Fish({ offset }: { offset: number }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const angle = state.clock.elapsedTime * 0.22 + offset
    group.current.position.set(
      -3.1 + Math.cos(angle) * (1.4 + (offset % 2) * 0.25),
      0.08,
      -0.5 + Math.sin(angle) * 1.05,
    )
    group.current.rotation.y = -angle
  })
  return (
    <group ref={group} scale={0.16}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.3, 0.9, 8]} />
        <meshStandardMaterial color={offset % 2 ? '#e99c72' : '#f2d4ad'} />
      </mesh>
    </group>
  )
}

export function HeartLake({ reducedMotion }: { reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const heartTime = useHeartWorldStore((state) => state.heartTime)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMotion: { value: reducedMotion ? 0 : 0.7 },
      uDeepColor: { value: new THREE.Color('#536f78') },
      uLightColor: { value: new THREE.Color('#d6ced8') },
    }),
    [reducedMotion],
  )

  useFrame((state) => {
    if (!material.current) return
    material.current.uniforms.uTime!.value = state.clock.elapsedTime
    const moonlit = heartTime === 'moonlight'
    material.current.uniforms.uDeepColor!.value.lerp(
      new THREE.Color(moonlit ? '#263f58' : '#536f78'),
      0.01,
    )
    material.current.uniforms.uLightColor!.value.lerp(
      new THREE.Color(moonlit ? '#8ca8c4' : '#e2d3d7'),
      0.01,
    )
  })

  return (
    <group name="The Lake">
      <mesh position={[-3.1, 0.055, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.35, 72]} />
        <shaderMaterial
          ref={material}
          vertexShader={waterVertexShader}
          fragmentShader={waterFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-3.1, 0.025, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.34, 2.55, 64]} />
        <meshStandardMaterial color="#8a9275" roughness={1} />
      </mesh>
      {[0.3, 2.2, 4.4, 5.8].map((offset) => (
        <Fish key={offset} offset={offset} />
      ))}
    </group>
  )
}
