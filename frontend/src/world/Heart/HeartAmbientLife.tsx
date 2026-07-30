import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { Clouds } from '../Environment/Clouds'
import { useHeartWorldStore } from './useHeartWorldStore'

function Birds({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current || reducedMotion) return
    const angle = state.clock.elapsedTime * 0.055
    group.current.position.set(Math.sin(angle) * 12, 7.5, Math.cos(angle) * 8 - 4)
    group.current.rotation.y = angle
  })
  return (
    <group ref={group}>
      {[-0.8, 0, 0.9].map((x, index) => (
        <group key={x} position={[x, index % 2 ? 0.25 : 0, index * -0.22]}>
          <mesh rotation={[0, 0, 0.45]}>
            <planeGeometry args={[0.5, 0.08]} />
            <meshBasicMaterial color="#4d4650" side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[0, 0, -0.45]}>
            <planeGeometry args={[0.5, 0.08]} />
            <meshBasicMaterial color="#4d4650" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Butterflies({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.y = state.clock.elapsedTime * 0.07
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.18
  })
  return (
    <group ref={group}>
      {[
        [-2.2, 1.3, 2.8],
        [2.8, 1.1, 1.7],
        [6.8, 1.2, 3.4],
        [-4.8, 1.45, -2.2],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[0.2, index, 0.4]}
        >
          <planeGeometry args={[0.18, 0.1]} />
          <meshBasicMaterial
            color={index % 2 ? '#f5d386' : '#f48fb1'}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

function Fireflies({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null)
  const heartTime = useHeartWorldStore((state) => state.heartTime)
  const positions = useMemo(() => {
    const values = new Float32Array(54 * 3)
    for (let index = 0; index < 54; index += 1) {
      const angle = index * 2.399
      const radius = 1.5 + (index % 11) * 0.72
      values[index * 3] = Math.cos(angle) * radius
      values[index * 3 + 1] = 0.45 + (index % 7) * 0.3
      values[index * 3 + 2] = Math.sin(angle) * radius
    }
    return values
  }, [])

  useFrame((state) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y = state.clock.elapsedTime * 0.018
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
  })

  return (
    <points ref={points} visible={heartTime === 'sunset' || heartTime === 'moonlight'}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd789"
        size={0.065}
        transparent
        opacity={0.82}
        depthWrite={false}
      />
    </points>
  )
}

function MorningMist() {
  const heartTime = useHeartWorldStore((state) => state.heartTime)
  return (
    <group visible={heartTime === 'sunrise'} position={[0, 0.38, -1]}>
      {[-5, -1.5, 2.4, 5.5].map((x, index) => (
        <mesh
          key={x}
          position={[x, index % 2 ? 0.18 : 0, -index * 0.8]}
          scale={[3.2, 0.42, 1.3]}
        >
          <sphereGeometry args={[1, 20, 12]} />
          <meshBasicMaterial
            color="#fff5f8"
            transparent
            opacity={0.075}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export function HeartAmbientLife({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group name="Heart World ambient life">
      <Clouds reducedMotion={reducedMotion} />
      <Birds reducedMotion={reducedMotion} />
      <Butterflies reducedMotion={reducedMotion} />
      <Fireflies reducedMotion={reducedMotion} />
      <MorningMist />
    </group>
  )
}
