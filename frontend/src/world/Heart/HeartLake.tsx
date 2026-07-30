import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { waterFragmentShader, waterVertexShader } from '../../shaders/water'
import { useHeartWorldStore } from './useHeartWorldStore'

const daylightDeep = new THREE.Color('#536f78')
const moonlightDeep = new THREE.Color('#263f58')
const daylightSurface = new THREE.Color('#e2d3d7')
const moonlightSurface = new THREE.Color('#8ca8c4')
const fishOffsets = [0.3, 2.2, 4.4, 5.8]
const fishColors = [new THREE.Color('#f2d4ad'), new THREE.Color('#e99c72')]

function FishSchool({ reducedMotion }: { reducedMotion: boolean }) {
  const fish = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useLayoutEffect(() => {
    fishOffsets.forEach((_, index) => {
      fish.current?.setColorAt(index, fishColors[index % fishColors.length]!)
    })
    if (fish.current?.instanceColor) fish.current.instanceColor.needsUpdate = true
  }, [])

  useFrame((state) => {
    if (!fish.current) return
    fishOffsets.forEach((offset, index) => {
      const angle = (reducedMotion ? 0 : state.clock.elapsedTime * 0.22) + offset
      dummy.position.set(
        -3.1 + Math.cos(angle) * (1.4 + (offset % 2) * 0.25),
        0.08,
        -0.5 + Math.sin(angle) * 1.05,
      )
      dummy.rotation.set(0, -angle, Math.PI / 2)
      dummy.scale.setScalar(0.16)
      dummy.updateMatrix()
      fish.current?.setMatrixAt(index, dummy.matrix)
    })
    fish.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={fish} args={[undefined, undefined, fishOffsets.length]}>
      <coneGeometry args={[0.3, 0.9, 8]} />
      <meshStandardMaterial vertexColors />
    </instancedMesh>
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
      moonlit ? moonlightDeep : daylightDeep,
      0.01,
    )
    material.current.uniforms.uLightColor!.value.lerp(
      moonlit ? moonlightSurface : daylightSurface,
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
      <FishSchool reducedMotion={reducedMotion} />
    </group>
  )
}
