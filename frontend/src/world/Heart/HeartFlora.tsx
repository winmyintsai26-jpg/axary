import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useLivingWorldStore } from '../../book/LivingWorld/useLivingWorldStore'

function seededRandom(seed: number) {
  return () => {
    seed = Math.sin(seed) * 10_000
    return seed - Math.floor(seed)
  }
}

const cherryTrees = [
  { old: true, position: [-4.3, 0.08, -1.5], scale: 1.22 },
  { position: [-6.1, 0.05, 2.4], scale: 0.88 },
  { position: [4.8, 0.08, -3], scale: 0.96 },
  { position: [6.4, 0.04, 1.1], scale: 0.78 },
  { position: [-1.9, 0.03, -6.8], scale: 0.72 },
  { position: [2.3, 0.04, 5.8], scale: 0.68 },
] as const

const canopyLayers = [
  { color: '#f7a8c4', offset: [-0.48, 2.05, 0.02], size: 0.82 },
  { color: '#f8bbd9', offset: [0.42, 2.15, -0.1], size: 0.92 },
  { color: '#fff5f8', offset: [0, 2.58, 0.05], size: 0.78 },
  { color: '#f48fb1', offset: [0.7, 1.85, 0.18], size: 0.58 },
  { color: '#f7a8c4', offset: [-0.76, 1.75, -0.14], size: 0.62 },
] as const

function InstancedCherryTrees() {
  const trunks = useRef<THREE.InstancedMesh>(null)
  const canopies = useRef<Array<THREE.InstancedMesh | null>>([])
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useLayoutEffect(() => {
    cherryTrees.forEach((tree, treeIndex) => {
      const [x, y, z] = tree.position
      dummy.position.set(x, y + 1.05 * tree.scale, z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(
        tree.scale * ('old' in tree && tree.old ? 1.65 : 1),
        tree.scale,
        tree.scale * ('old' in tree && tree.old ? 1.65 : 1),
      )
      dummy.updateMatrix()
      trunks.current?.setMatrixAt(treeIndex, dummy.matrix)

      canopyLayers.forEach((layer, layerIndex) => {
        dummy.position.set(
          x + layer.offset[0] * tree.scale,
          y + layer.offset[1] * tree.scale,
          z + layer.offset[2] * tree.scale,
        )
        dummy.scale.setScalar(layer.size * tree.scale)
        dummy.updateMatrix()
        canopies.current[layerIndex]?.setMatrixAt(treeIndex, dummy.matrix)
      })
    })
    if (trunks.current) trunks.current.instanceMatrix.needsUpdate = true
    canopies.current.forEach((canopy) => {
      if (canopy) canopy.instanceMatrix.needsUpdate = true
    })
  }, [dummy])

  return (
    <>
      <instancedMesh
        ref={trunks}
        args={[undefined, undefined, cherryTrees.length]}
        castShadow
      >
        <cylinderGeometry args={[0.14, 0.24, 2.1, 9]} />
        <meshStandardMaterial color="#62443e" roughness={1} />
      </instancedMesh>
      {canopyLayers.map((layer, index) => (
        <instancedMesh
          key={`${layer.color}-${index}`}
          ref={(mesh) => {
            canopies.current[index] = mesh
          }}
          args={[undefined, undefined, cherryTrees.length]}
          castShadow
        >
          <dodecahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial
            color={layer.color}
            emissive="#ec6fa9"
            emissiveIntensity={index === 2 ? 0.1 : 0.035}
            roughness={0.94}
          />
        </instancedMesh>
      ))}
    </>
  )
}

function MeadowLife({ reducedMotion }: { reducedMotion: boolean }) {
  const grass = useRef<THREE.InstancedMesh>(null)
  const flowers = useRef<THREE.InstancedMesh>(null)
  const group = useRef<THREE.Group>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const points = useMemo(() => {
    const random = seededRandom(73)
    return Array.from({ length: 360 }, (_, index) => {
      const angle = random() * Math.PI * 2
      const radius = 2.8 + Math.sqrt(random()) * 12.5
      return {
        angle: random() * Math.PI,
        color: new THREE.Color(index % 13 === 0 ? '#edbfd1' : '#698a61'),
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          0.12,
          Math.sin(angle) * radius,
        ),
        scale: 0.55 + random() * 0.85,
      }
    })
  }, [])

  useLayoutEffect(() => {
    points.forEach((point, index) => {
      dummy.position.copy(point.position)
      dummy.rotation.set(0, point.angle, 0)
      dummy.scale.setScalar(point.scale)
      dummy.updateMatrix()
      grass.current?.setMatrixAt(index, dummy.matrix)
      grass.current?.setColorAt(index, point.color)

      if (index < 72) {
        const flowerPoint = points[index * 5]
        if (!flowerPoint) return
        dummy.position.copy(flowerPoint.position)
        dummy.position.y += 0.16
        dummy.scale.setScalar(0.7 + (index % 4) * 0.12)
        dummy.updateMatrix()
        flowers.current?.setMatrixAt(index, dummy.matrix)
        flowers.current?.setColorAt(
          index,
          new THREE.Color(['#fff5f8', '#f8bbd9', '#e7d99c', '#d7d5ee'][index % 4]),
        )
      }
    })
    if (grass.current) grass.current.instanceMatrix.needsUpdate = true
    if (flowers.current) flowers.current.instanceMatrix.needsUpdate = true
  }, [dummy, points])

  useFrame((state) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.42) * 0.004
  })

  return (
    <group ref={group}>
      <instancedMesh ref={grass} args={[undefined, undefined, points.length]}>
        <coneGeometry args={[0.035, 0.32, 4]} />
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh ref={flowers} args={[undefined, undefined, 72]}>
        <octahedronGeometry args={[0.07, 0]} />
        <meshStandardMaterial vertexColors roughness={0.9} />
      </instancedMesh>
    </group>
  )
}

function FallingPetals({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null)
  const heartHistory = useLivingWorldStore((state) => state.worlds.heart.history)
  const blossomScale = heartHistory.some((event) => event.kind === 'first-bloom')
    ? 1.28
    : 1
  const positions = useMemo(() => {
    const random = seededRandom(91)
    const array = new Float32Array(110 * 3)
    for (let index = 0; index < 110; index += 1) {
      array[index * 3] = (random() - 0.5) * 20
      array[index * 3 + 1] = 0.8 + random() * 8
      array[index * 3 + 2] = (random() - 0.5) * 18
    }
    return array
  }, [])

  useFrame((state, delta) => {
    if (!points.current || reducedMotion) return
    points.current.rotation.y += delta * 0.012
    points.current.position.y = -((state.clock.elapsedTime * 0.07) % 0.8)
  })

  return (
    <points ref={points} scale={blossomScale}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f7a8c4"
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.78}
        depthWrite={false}
      />
    </points>
  )
}

export function HeartFlora({ reducedMotion }: { reducedMotion: boolean }) {
  const trees = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!trees.current || reducedMotion) return
    trees.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.31) * 0.008
    trees.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.23) * 0.004
  })

  return (
    <group name="Heart World flora">
      <group ref={trees}>
        <InstancedCherryTrees />
      </group>
      <MeadowLife reducedMotion={reducedMotion} />
      <FallingPetals reducedMotion={reducedMotion} />
    </group>
  )
}
