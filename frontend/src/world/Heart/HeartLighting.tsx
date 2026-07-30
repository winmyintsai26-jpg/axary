import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useHeartWorldStore, type HeartTime } from './useHeartWorldStore'

const phases: {
  ambient: string
  background: string
  directional: string
  fog: string
  name: HeartTime
}[] = [
  {
    ambient: '#c8d3dd',
    background: '#b9c9d3',
    directional: '#ffd6b1',
    fog: '#d6d6d2',
    name: 'sunrise',
  },
  {
    ambient: '#d9cad1',
    background: '#d6a9a6',
    directional: '#ffd08d',
    fog: '#d4b6b1',
    name: 'golden-hour',
  },
  {
    ambient: '#b59aaa',
    background: '#815d79',
    directional: '#f4a06f',
    fog: '#96788b',
    name: 'sunset',
  },
  {
    ambient: '#71839e',
    background: '#18243a',
    directional: '#a9c8e6',
    fog: '#334058',
    name: 'moonlight',
  },
]

export function HeartLighting({ reducedMotion }: { reducedMotion: boolean }) {
  const scene = useThree((state) => state.scene)
  const sun = useRef<THREE.DirectionalLight>(null)
  const ambient = useRef<THREE.AmbientLight>(null)
  const setHeartTime = useHeartWorldStore((state) => state.setHeartTime)
  const currentPhase = useHeartWorldStore((state) => state.heartTime)
  const colors = useMemo(
    () => ({
      ambient: new THREE.Color('#d9cad1'),
      background: new THREE.Color('#d6a9a6'),
      directional: new THREE.Color('#ffd08d'),
      fog: new THREE.Color('#d4b6b1'),
    }),
    [],
  )

  useFrame((state, delta) => {
    const cycle = reducedMotion ? 75 : state.clock.elapsedTime % 300
    const phaseIndex = Math.floor(cycle / 75) % phases.length
    const phase = phases[phaseIndex]!
    const nextPhase = phases[(phaseIndex + 1) % phases.length]!
    const localProgress = (cycle % 75) / 75
    const blend = THREE.MathUtils.smoothstep(localProgress, 0.25, 0.9)

    colors.ambient.lerpColors(
      new THREE.Color(phase.ambient),
      new THREE.Color(nextPhase.ambient),
      blend,
    )
    colors.background.lerpColors(
      new THREE.Color(phase.background),
      new THREE.Color(nextPhase.background),
      blend,
    )
    colors.directional.lerpColors(
      new THREE.Color(phase.directional),
      new THREE.Color(nextPhase.directional),
      blend,
    )
    colors.fog.lerpColors(
      new THREE.Color(phase.fog),
      new THREE.Color(nextPhase.fog),
      blend,
    )

    if (ambient.current) ambient.current.color.lerp(colors.ambient, delta * 0.8)
    if (sun.current) {
      sun.current.color.lerp(colors.directional, delta * 0.8)
      const angle = (cycle / 300) * Math.PI * 2 - Math.PI * 0.3
      sun.current.position.set(Math.cos(angle) * 14, 7 + Math.sin(angle) * 7, 9)
      sun.current.intensity = phase.name === 'moonlight' ? 0.8 : 2.1
    }
    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(colors.background, delta * 0.45)
    }
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(colors.fog, delta * 0.45)
      scene.fog.near = phase.name === 'sunrise' ? 12 : 18
      scene.fog.far = phase.name === 'sunrise' ? 34 : 48
    }
    if (currentPhase !== phase.name) setHeartTime(phase.name)
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={0.75} color="#d9cad1" />
      <hemisphereLight args={['#ffe5d8', '#5e7164', 1.25]} />
      <directionalLight
        ref={sun}
        castShadow
        position={[-8, 12, 9]}
        color="#ffd08d"
        intensity={2.1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={45}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
    </>
  )
}
