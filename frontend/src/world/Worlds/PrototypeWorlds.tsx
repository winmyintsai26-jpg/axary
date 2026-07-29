import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useExperienceStore } from '../../store/useExperienceStore'
import type { CreatorWorld, WorldStyle } from '../../types/CreatorWorld'
import { creatorWorlds } from '../Universe/creatorWorlds'

interface PrototypeWorldsProps {
  reducedMotion: boolean
}

interface PrototypeWorldProps extends PrototypeWorldsProps {
  world: CreatorWorld
}

function Tree({
  foliage,
  position,
  scale = 1,
}: {
  foliage: string
  position: [number, number, number]
  scale?: number
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.045, 0.065, 0.44, 7]} />
        <meshStandardMaterial color="#594538" roughness={1} />
      </mesh>
      <mesh position={[0, 0.54, 0]}>
        <dodecahedronGeometry args={[0.27, 0]} />
        <meshStandardMaterial color={foliage} roughness={1} />
      </mesh>
    </group>
  )
}

function WaterDisc({
  color,
  position,
  scale = 1,
}: {
  color: string
  position: [number, number, number]
  scale?: number
}) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
      <circleGeometry args={[0.48, 40]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.12}
        metalness={0.18}
        roughness={0.3}
      />
    </mesh>
  )
}

function Studio({
  color = '#ead4af',
  roof = '#795746',
  position = [0.25, 1.5, 0.1],
}: {
  color?: string
  position?: [number, number, number]
  roof?: string
}) {
  return (
    <group position={position} scale={0.5}>
      <mesh>
        <boxGeometry args={[0.7, 0.56, 0.62]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.44, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.62, 0.42, 4]} />
        <meshStandardMaterial color={roof} roughness={1} />
      </mesh>
      <mesh position={[0, -0.08, 0.316]}>
        <planeGeometry args={[0.19, 0.3]} />
        <meshStandardMaterial color="#563d31" />
      </mesh>
      <mesh position={[-0.22, 0.1, 0.318]}>
        <planeGeometry args={[0.16, 0.16]} />
        <meshStandardMaterial
          color="#f3c77e"
          emissive="#e9a953"
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  )
}

function MeadowWorld() {
  const flowers = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => {
        const angle = index * 2.399
        const radius = 0.35 + (index % 5) * 0.17
        return {
          color: ['#f6d796', '#f3b6c5', '#d9e8f1'][index % 3],
          position: [
            Math.cos(angle) * radius,
            1.53 + (index % 3) * 0.018,
            Math.sin(angle) * radius,
          ] as [number, number, number],
        }
      }),
    [],
  )

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.55, 48, 32]} />
        <meshStandardMaterial color="#79a96f" roughness={0.98} />
      </mesh>
      <WaterDisc color="#7db8c1" position={[-0.52, 1.48, 0.16]} scale={0.72} />
      <Studio />
      <Tree foliage="#496f4c" position={[-0.95, 1.22, -0.22]} scale={0.75} />
      <Tree foliage="#64865a" position={[0.88, 1.25, -0.18]} scale={0.66} />
      {flowers.map((flower, index) => (
        <mesh key={index} position={flower.position}>
          <sphereGeometry args={[0.025, 7, 5]} />
          <meshBasicMaterial color={flower.color} />
        </mesh>
      ))}
    </group>
  )
}

function GardenWorld() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.55, 48, 32]} />
        <meshStandardMaterial color="#71816a" roughness={1} />
      </mesh>
      <WaterDisc color="#476f76" position={[0.34, 1.49, 0.18]} scale={0.76} />
      <Tree foliage="#e7a5b6" position={[-0.75, 1.3, 0]} scale={0.9} />
      <Tree foliage="#f0bcc7" position={[0.95, 1.18, -0.2]} scale={0.7} />
      <group position={[-0.04, 1.56, -0.1]} scale={0.42}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.66, 0.46, 0.5]} />
          <meshStandardMaterial color="#8d463e" />
        </mesh>
        <mesh position={[0, 0.53, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.58, 0.24, 4]} />
          <meshStandardMaterial color="#372f36" />
        </mesh>
      </group>
      {[-0.62, -0.28, 0.02].map((x) => (
        <mesh key={x} position={[x, 1.53, 0.63]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.025, 12]} />
          <meshStandardMaterial color="#c8c0ad" />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.56, 1.56, 0.54]} scale={0.3}>
          <mesh position={[0, 0.17, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.34, 6]} />
            <meshStandardMaterial color="#5d5146" />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.09, 10, 8]} />
            <meshStandardMaterial
              color="#f4c77d"
              emissive="#e9a24e"
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FloatingIslandsWorld() {
  return (
    <group>
      <mesh scale={[1.1, 0.72, 1.1]}>
        <dodecahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color="#7e9c78" roughness={1} />
      </mesh>
      {(
        [
          [-1.55, 0.55, 0.2, 0.48],
          [1.45, 0.28, -0.35, 0.42],
          [0.75, 1.35, -0.7, 0.3],
        ] as const
      ).map(([x, y, z, scale], index) => (
        <group key={index} position={[x, y, z]} scale={scale}>
          <mesh scale={[1, 0.55, 1]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#819a74" roughness={1} />
          </mesh>
          <mesh position={[0, -0.83, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.75, 1.25, 7]} />
            <meshStandardMaterial color="#645c52" roughness={1} />
          </mesh>
        </group>
      ))}
      <mesh position={[-1.55, -0.25, 0.45]} scale={[0.11, 1.6, 0.06]}>
        <boxGeometry />
        <meshBasicMaterial color="#b8e5ef" transparent opacity={0.72} />
      </mesh>
      <group position={[0.2, 0.75, 0.25]} scale={0.42}>
        <mesh position={[-0.34, 0.15, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshStandardMaterial color="#c4baa4" roughness={1} />
        </mesh>
        <mesh position={[0.34, 0.15, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshStandardMaterial color="#c4baa4" roughness={1} />
        </mesh>
        <mesh position={[0, 0.53, 0]}>
          <boxGeometry args={[0.86, 0.17, 0.2]} />
          <meshStandardMaterial color="#b0a58e" roughness={1} />
        </mesh>
      </group>
    </group>
  )
}

function CrystalCavernWorld() {
  const crystals = [
    [-0.7, 1.24, 0.42, 0.42],
    [-0.28, 1.55, 0.3, 0.62],
    [0.18, 1.5, 0.25, 0.5],
    [0.62, 1.31, 0.38, 0.38],
  ] as const

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.55, 48, 32]} />
        <meshStandardMaterial color="#253b44" roughness={0.88} />
      </mesh>
      <WaterDisc color="#5ccbd5" position={[0, 1.5, 0.42]} scale={1.18} />
      {crystals.map(([x, y, z, scale], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[0, 0, index % 2 ? -0.16 : 0.12]}
          scale={scale}
        >
          <octahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial
            color={index % 2 ? '#81e4e7' : '#a3cffa'}
            emissive={index % 2 ? '#3ac6cb' : '#6aaee8'}
            emissiveIntensity={0.8}
            metalness={0.15}
            roughness={0.22}
          />
        </mesh>
      ))}
      <pointLight position={[0, 2.4, 1]} color="#65e3ea" intensity={3} distance={5} />
      {[-0.95, 0.92].map((x) => (
        <mesh key={x} position={[x, 1.18, 0.3]} scale={[0.45, 0.18, 0.45]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#52765c" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

function AutumnWorld() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.55, 48, 32]} />
        <meshStandardMaterial color="#8f7655" roughness={1} />
      </mesh>
      <Tree foliage="#c85734" position={[-0.92, 1.2, -0.05]} scale={0.9} />
      <Tree foliage="#e18b3e" position={[-0.45, 1.45, -0.2]} scale={0.72} />
      <Tree foliage="#a94532" position={[0.9, 1.22, -0.12]} scale={0.8} />
      <Studio color="#a7714f" roof="#4d3a36" position={[0.22, 1.49, 0]} />
      <mesh position={[-0.46, 1.56, 0.58]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.72, 0.07, 0.2]} />
        <meshStandardMaterial color="#654334" roughness={1} />
      </mesh>
      {Array.from({ length: 14 }, (_, index) => {
        const angle = index * 1.9
        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * (0.5 + (index % 4) * 0.17),
              1.72 + (index % 5) * 0.13,
              0.34 + Math.sin(angle) * 0.45,
            ]}
            rotation={[angle, angle * 0.4, angle * 0.7]}
          >
            <planeGeometry args={[0.08, 0.045]} />
            <meshBasicMaterial
              color={index % 2 ? '#df7e39' : '#b84e31'}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

const worldComponents: Record<WorldStyle, () => React.JSX.Element> = {
  meadow: MeadowWorld,
  garden: GardenWorld,
  islands: FloatingIslandsWorld,
  cavern: CrystalCavernWorld,
  autumn: AutumnWorld,
}

function PrototypeWorld({ world, reducedMotion }: PrototypeWorldProps) {
  const group = useRef<THREE.Group>(null)
  const phase = useExperienceStore((state) => state.journeyPhase)
  const selectedWorldId = useExperienceStore((state) => state.selectedWorldId)
  const isSelected = selectedWorldId === world.id
  const WorldComposition = worldComponents[world.style]

  useFrame((state, delta) => {
    if (!group.current) return
    const shouldReveal = isSelected && (phase === 'focusing' || phase === 'orbiting')
    const targetScale = shouldReveal ? 1 : 0.001
    const easing = reducedMotion ? 1 : 1 - Math.exp(-delta * 0.8)
    const nextScale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, easing)
    group.current.scale.setScalar(nextScale)
    group.current.visible = nextScale > 0.002
    if (!reducedMotion) {
      group.current.rotation.y += delta * (phase === 'orbiting' ? 0.035 : 0.012)
      group.current.position.y =
        world.position[1] + Math.sin(state.clock.elapsedTime * 0.25) * 0.035
    }
  })

  return (
    <group
      ref={group}
      position={world.position}
      scale={0.001}
      name={`${world.name} prototype world`}
    >
      <WorldComposition />
      <mesh scale={1.04}>
        <sphereGeometry args={[1.55, 40, 28]} />
        <meshBasicMaterial
          color={world.color}
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

export function PrototypeWorlds({ reducedMotion }: PrototypeWorldsProps) {
  return (
    <group name="Prototype creator worlds">
      {creatorWorlds.map((world) => (
        <PrototypeWorld key={world.id} world={world} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}
