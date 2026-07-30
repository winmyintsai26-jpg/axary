import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useDialogueStore } from '../../book/Dialogue/useDialogueStore'
import { useHeartWorldStore } from './useHeartWorldStore'

function Lantern({ id, position }: { id: string; position: [number, number, number] }) {
  const isLit = useHeartWorldStore((state) => state.lanternsLit.includes(id))
  const lightLantern = useHeartWorldStore((state) => state.lightLantern)

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation()
        lightLantern(id)
      }}
    >
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.055, 0.075, 1.1, 7]} />
        <meshStandardMaterial color="#55423d" roughness={1} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[0.26, 0.34, 0.26]} />
        <meshStandardMaterial
          color={isLit ? '#fff0ce' : '#786d67'}
          emissive={isLit ? '#ef9f55' : '#000000'}
          emissiveIntensity={isLit ? 1.7 : 0}
          roughness={0.75}
        />
      </mesh>
      {isLit && (
        <pointLight
          position={[0, 1.08, 0]}
          color="#f7b66d"
          intensity={2.2}
          distance={5}
        />
      )}
    </group>
  )
}

function WoodenBridge() {
  const repairedPlanks = useRef<THREE.InstancedMesh>(null)
  const originalPlanks = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useLayoutEffect(() => {
    let repairedIndex = 0
    let originalIndex = 0
    Array.from({ length: 12 }, (_, index) => {
      dummy.position.set(
        (index - 5.5) * 0.22,
        Math.sin((index / 11) * Math.PI) * 0.18,
        0,
      )
      dummy.updateMatrix()
      if (index < 2) {
        repairedPlanks.current?.setMatrixAt(repairedIndex, dummy.matrix)
        repairedIndex += 1
      } else {
        originalPlanks.current?.setMatrixAt(originalIndex, dummy.matrix)
        originalIndex += 1
      }
    })
    if (repairedPlanks.current) repairedPlanks.current.instanceMatrix.needsUpdate = true
    if (originalPlanks.current) originalPlanks.current.instanceMatrix.needsUpdate = true
  }, [dummy])

  return (
    <group position={[-1.15, 0.3, 1.1]} rotation={[0, -0.48, 0]} name="The Bridge">
      <instancedMesh ref={repairedPlanks} args={[undefined, undefined, 2]} castShadow>
        <boxGeometry args={[0.2, 0.09, 1.05]} />
        <meshStandardMaterial color="#725248" roughness={0.96} />
      </instancedMesh>
      <instancedMesh ref={originalPlanks} args={[undefined, undefined, 10]} castShadow>
        <boxGeometry args={[0.2, 0.09, 1.05]} />
        <meshStandardMaterial color="#8b6655" roughness={0.96} />
      </instancedMesh>
      {[-0.5, 0.5].map((z) => (
        <group key={z} position={[0, 0.35, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 2.65, 7]} />
            <meshStandardMaterial color="#6a4c42" roughness={1} />
          </mesh>
          {[-1.15, -0.38, 0.38, 1.15].map((x) => (
            <mesh key={x} position={[x, -0.22, 0]}>
              <cylinderGeometry args={[0.04, 0.05, 0.62, 7]} />
              <meshStandardMaterial color="#6a4c42" roughness={1} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function ArtistCabin() {
  return (
    <group position={[4.7, 0.08, -4.8]} rotation={[0, -0.35, 0]} name="The Cabin">
      <mesh castShadow position={[0, 1.05, 0]}>
        <boxGeometry args={[2.6, 2.05, 2]} />
        <meshStandardMaterial color="#9a725c" roughness={0.96} />
      </mesh>
      <mesh castShadow position={[0, 2.28, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.05, 0.9, 4]} />
        <meshStandardMaterial color="#554447" roughness={0.94} />
      </mesh>
      <mesh position={[-0.65, 1.18, 1.012]}>
        <planeGeometry args={[0.72, 0.82]} />
        <meshStandardMaterial
          color="#fff0ca"
          emissive="#e99953"
          emissiveIntensity={1.25}
        />
      </mesh>
      <mesh position={[0.68, 0.84, 1.02]}>
        <planeGeometry args={[0.62, 1.35]} />
        <meshStandardMaterial color="#63473d" roughness={1} />
      </mesh>
      <pointLight
        position={[-0.65, 1.2, 1.4]}
        color="#efad69"
        intensity={2.4}
        distance={7}
      />
      <Lantern id="cabin" position={[1.65, 0, 1.35]} />
    </group>
  )
}

function RestingBench({
  location,
  position,
  rotation = 0,
}: {
  location: 'lake' | 'old-tree' | 'overlook'
  position: [number, number, number]
  rotation?: number
}) {
  const restAt = useHeartWorldStore((state) => state.restAt)

  return (
    <group
      position={position}
      rotation={[0, rotation, 0]}
      onClick={(event) => {
        event.stopPropagation()
        restAt(location, [position[0], 0.62, position[2] + 0.8])
      }}
    >
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[1.55, 0.14, 0.48]} />
        <meshStandardMaterial color="#80604d" roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 0.95, -0.2]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[1.55, 0.7, 0.11]} />
        <meshStandardMaterial color="#785744" roughness={1} />
      </mesh>
      {[-0.58, 0.58].map((x) => (
        <mesh key={x} position={[x, 0.26, 0]}>
          <boxGeometry args={[0.1, 0.55, 0.1]} />
          <meshStandardMaterial color="#65493e" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

function HiddenGarden() {
  const pinkFlowers = useRef<THREE.InstancedMesh>(null)
  const creamFlowers = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useLayoutEffect(() => {
    let pinkIndex = 0
    let creamIndex = 0
    Array.from({ length: 18 }, (_, index) => {
      const angle = (index / 18) * Math.PI * 2
      dummy.position.set(Math.cos(angle) * 2.2, 0.18, Math.sin(angle) * 1.7)
      dummy.updateMatrix()
      if (index % 2) {
        pinkFlowers.current?.setMatrixAt(pinkIndex, dummy.matrix)
        pinkIndex += 1
      } else {
        creamFlowers.current?.setMatrixAt(creamIndex, dummy.matrix)
        creamIndex += 1
      }
    })
    if (pinkFlowers.current) pinkFlowers.current.instanceMatrix.needsUpdate = true
    if (creamFlowers.current) creamFlowers.current.instanceMatrix.needsUpdate = true
  }, [dummy])

  return (
    <group position={[7.8, 0.05, 3.6]} name="The Hidden Garden">
      <mesh position={[0, 1.35, 0]}>
        <torusGeometry args={[1.25, 0.14, 10, 32, Math.PI]} />
        <meshStandardMaterial color="#6c745b" roughness={1} />
      </mesh>
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} position={[x, 0.66, 0]}>
          <cylinderGeometry args={[0.13, 0.18, 1.35, 8]} />
          <meshStandardMaterial color="#6b7259" roughness={1} />
        </mesh>
      ))}
      <instancedMesh ref={pinkFlowers} args={[undefined, undefined, 9]}>
        <sphereGeometry args={[0.11, 8, 6]} />
        <meshStandardMaterial
          color="#f8bbd9"
          emissive="#ec6fa9"
          emissiveIntensity={0.08}
        />
      </instancedMesh>
      <instancedMesh ref={creamFlowers} args={[undefined, undefined, 9]}>
        <sphereGeometry args={[0.11, 8, 6]} />
        <meshStandardMaterial
          color="#fff5f8"
          emissive="#ec6fa9"
          emissiveIntensity={0.08}
        />
      </instancedMesh>
      <Lantern id="garden" position={[0, 0, -1.1]} />
    </group>
  )
}

function CuratorPresence() {
  const setOpen = useDialogueStore((state) => state.setCuratorOpen)
  return (
    <group
      position={[-4.85, 0.08, -0.2]}
      name="The Curator beneath the old cherry tree"
      onClick={(event) => {
        event.stopPropagation()
        setOpen(true)
      }}
    >
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[0.42, 1.55, 12]} />
        <meshStandardMaterial color="#4c4655" roughness={0.96} />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.22, 14, 10]} />
        <meshStandardMaterial color="#d4c4b9" roughness={0.92} />
      </mesh>
      <mesh position={[0.38, 0.8, 0.1]}>
        <sphereGeometry args={[0.12, 12, 8]} />
        <meshStandardMaterial
          color="#ffe8b4"
          emissive="#ec9a52"
          emissiveIntensity={1.8}
        />
      </mesh>
      <pointLight
        position={[0.38, 0.8, 0.1]}
        color="#f1a75e"
        intensity={1.5}
        distance={4}
      />
    </group>
  )
}

export function HeartLandmarks() {
  return (
    <group name="Heart World symbolic places">
      <WoodenBridge />
      <ArtistCabin />
      <HiddenGarden />
      <RestingBench location="lake" position={[-5.2, 0.05, 1.8]} rotation={0.55} />
      <RestingBench location="old-tree" position={[-3.6, 0.04, -0.2]} rotation={-0.4} />
      <RestingBench location="overlook" position={[4.8, 0.55, 5.5]} rotation={2.5} />
      <Lantern id="bridge-west" position={[-2.3, 0.05, 1.7]} />
      <Lantern id="bridge-east" position={[0.05, 0.05, 0.48]} />
      <CuratorPresence />
    </group>
  )
}
