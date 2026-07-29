import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

interface InstancedMeadowProps {
  reducedMotion: boolean
}

interface MeadowPoint {
  color: THREE.Color
  position: THREE.Vector3
  rotation: number
  scale: number
}

function seededRandom(seed: number) {
  return () => {
    seed = Math.sin(seed) * 10_000
    return seed - Math.floor(seed)
  }
}

export function InstancedMeadow({ reducedMotion }: InstancedMeadowProps) {
  const grass = useRef<THREE.InstancedMesh>(null)
  const flowers = useRef<THREE.InstancedMesh>(null)
  const group = useRef<THREE.Group>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const points = useMemo(() => {
    const random = seededRandom(41)
    const generated: MeadowPoint[] = []

    while (generated.length < 115) {
      const angle = random() * Math.PI * 2
      const radius = Math.sqrt(random()) * 2.55
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      if (Math.abs(x) < 0.42 && z > -1.8) continue
      if ((x + 1.35) ** 2 + (z + 0.1) ** 2 < 0.55) continue

      generated.push({
        color: new THREE.Color(generated.length % 9 === 0 ? '#e8c985' : '#73945f'),
        position: new THREE.Vector3(x, 2.72, z),
        rotation: random() * Math.PI,
        scale: 0.65 + random() * 0.8,
      })
    }
    return generated
  }, [])

  useLayoutEffect(() => {
    points.forEach((point, index) => {
      dummy.position.copy(point.position)
      dummy.rotation.set(0, point.rotation, 0)
      dummy.scale.setScalar(point.scale)
      dummy.updateMatrix()

      grass.current?.setMatrixAt(index, dummy.matrix)
      grass.current?.setColorAt(index, point.color)

      if (index < 24) {
        const flowerPoint = points[index * 4]
        if (!flowerPoint) return
        dummy.position.copy(flowerPoint.position)
        dummy.position.y += 0.12
        dummy.rotation.set(0, flowerPoint.rotation, 0)
        dummy.scale.setScalar(0.75 + (index % 3) * 0.12)
        dummy.updateMatrix()
        flowers.current?.setMatrixAt(index, dummy.matrix)
        flowers.current?.setColorAt(
          index,
          new THREE.Color(['#efd6a1', '#d9b4a7', '#d8d4ec'][index % 3]),
        )
      }
    })

    if (grass.current) grass.current.instanceMatrix.needsUpdate = true
    if (flowers.current) flowers.current.instanceMatrix.needsUpdate = true
  }, [dummy, points])

  useFrame((state) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.42) * 0.006
  })

  return (
    <group ref={group}>
      <instancedMesh ref={grass} args={[undefined, undefined, points.length]}>
        <coneGeometry args={[0.025, 0.22, 4]} />
        <meshStandardMaterial vertexColors roughness={1} />
      </instancedMesh>
      <instancedMesh ref={flowers} args={[undefined, undefined, 24]}>
        <octahedronGeometry args={[0.055, 0]} />
        <meshStandardMaterial vertexColors roughness={0.9} />
      </instancedMesh>
    </group>
  )
}
