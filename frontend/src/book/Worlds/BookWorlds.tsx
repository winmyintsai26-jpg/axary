import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useReflectionProfileStore } from '../../systems/Reflection/useReflectionProfileStore'
import type { WorldStyle } from '../../types/WorldStyle'
import { useJourneyStore } from '../Journey/useJourneyStore'
import { useLivingWorldStore } from '../LivingWorld/useLivingWorldStore'
import type { SymbolicWorld } from './types'
import { symbolicWorlds } from './worlds'

interface BookWorldsProps {
  reducedMotion: boolean
}

interface SymbolicWorldProps extends BookWorldsProps {
  world: SymbolicWorld
}

interface WorldCompositionProps {
  world: SymbolicWorld
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

function BlossomTree({
  position,
  scale = 1,
}: {
  position: [number, number, number]
  scale?: number
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.045, 0.075, 0.5, 7]} />
        <meshStandardMaterial color="#60423f" roughness={1} />
      </mesh>
      <mesh position={[-0.11, 0.56, 0]}>
        <dodecahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color="#f7a8c4" roughness={0.9} />
      </mesh>
      <mesh position={[0.13, 0.59, -0.04]}>
        <dodecahedronGeometry args={[0.27, 1]} />
        <meshStandardMaterial color="#f8bbd9" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.72, 0.04]}>
        <dodecahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial
          color="#fff5f8"
          emissive="#f8bbd9"
          emissiveIntensity={0.12}
          roughness={0.92}
        />
      </mesh>
      <mesh position={[0.24, 0.5, 0.08]}>
        <dodecahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color="#f48fb1" roughness={0.9} />
      </mesh>
    </group>
  )
}

function SakuraPetals() {
  const group = useRef<THREE.Group>(null)
  const petals = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => {
        const angle = index * 2.399
        const radius = 0.45 + (index % 7) * 0.2
        return {
          color: ['#f8bbd9', '#f7a8c4', '#f48fb1', '#fff5f8'][index % 4],
          position: [
            Math.cos(angle) * radius,
            1.7 + (index % 9) * 0.12,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          rotation: [angle * 0.4, angle, angle * 0.7] as [number, number, number],
          scale: 0.7 + (index % 4) * 0.12,
        }
      }),
    [],
  )

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.025
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.035
  })

  return (
    <group ref={group}>
      {petals.map((petal, index) => (
        <mesh
          key={index}
          position={petal.position}
          rotation={petal.rotation}
          scale={petal.scale}
        >
          <circleGeometry args={[0.035, 7]} />
          <meshStandardMaterial
            color={petal.color}
            emissive="#ec6fa9"
            emissiveIntensity={0.08}
            side={THREE.DoubleSide}
            roughness={0.8}
          />
        </mesh>
      ))}
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

function MeadowWorld({ world }: WorldCompositionProps) {
  const palette = world.environment.colorPalette
  const flowers = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => {
        const angle = index * 2.399
        const radius = 0.35 + (index % 5) * 0.17
        return {
          color: [palette.glow, palette.accent, palette.water][index % 3],
          position: [
            Math.cos(angle) * radius,
            1.53 + (index % 3) * 0.018,
            Math.sin(angle) * radius,
          ] as [number, number, number],
        }
      }),
    [palette],
  )

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.55, 48, 32]} />
        <meshStandardMaterial color={palette.terrain} roughness={0.98} />
      </mesh>
      <WaterDisc color={palette.water} position={[-0.52, 1.48, 0.16]} scale={0.72} />
      <Studio />
      <Tree foliage={palette.foliage} position={[-0.95, 1.22, -0.22]} scale={0.75} />
      <Tree foliage={palette.accent} position={[0.88, 1.25, -0.18]} scale={0.66} />
      {flowers.map((flower, index) => (
        <mesh key={index} position={flower.position}>
          <sphereGeometry args={[0.025, 7, 5]} />
          <meshBasicMaterial color={flower.color} />
        </mesh>
      ))}
    </group>
  )
}

function GardenWorld({ world }: WorldCompositionProps) {
  const palette = world.environment.colorPalette

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.55, 48, 32]} />
        <meshStandardMaterial color={palette.terrain} roughness={1} />
      </mesh>
      <WaterDisc color={palette.water} position={[0.34, 1.49, 0.18]} scale={0.76} />
      <BlossomTree position={[-0.75, 1.3, 0]} scale={0.9} />
      <BlossomTree position={[0.95, 1.18, -0.2]} scale={0.72} />
      <BlossomTree position={[0.42, 1.39, -0.68]} scale={0.52} />
      <group position={[-0.04, 1.56, -0.1]} scale={0.42}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.66, 0.46, 0.5]} />
          <meshStandardMaterial color={palette.accent} />
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
              color={palette.glow}
              emissive={palette.glow}
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      ))}
      <SakuraPetals />
      <pointLight
        position={[0.2, 2.65, 1.2]}
        color={palette.glow}
        intensity={2.2}
        distance={5}
      />
    </group>
  )
}

function FloatingIslandsWorld({ world }: WorldCompositionProps) {
  const palette = world.environment.colorPalette

  return (
    <group>
      <mesh scale={[1.1, 0.72, 1.1]}>
        <dodecahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color={palette.foliage} roughness={1} />
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
            <meshStandardMaterial color={palette.accent} roughness={1} />
          </mesh>
          <mesh position={[0, -0.83, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.75, 1.25, 7]} />
            <meshStandardMaterial color={palette.terrain} roughness={1} />
          </mesh>
        </group>
      ))}
      <mesh position={[-1.55, -0.25, 0.45]} scale={[0.11, 1.6, 0.06]}>
        <boxGeometry />
        <meshBasicMaterial color={palette.water} transparent opacity={0.72} />
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

function CrystalCavernWorld({ world }: WorldCompositionProps) {
  const palette = world.environment.colorPalette
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
        <meshStandardMaterial color={palette.terrain} roughness={0.88} />
      </mesh>
      <WaterDisc color={palette.water} position={[0, 1.5, 0.42]} scale={1.18} />
      {crystals.map(([x, y, z, scale], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[0, 0, index % 2 ? -0.16 : 0.12]}
          scale={scale}
        >
          <octahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial
            color={index % 2 ? palette.glow : palette.accent}
            emissive={palette.glow}
            emissiveIntensity={0.8}
            metalness={0.15}
            roughness={0.22}
          />
        </mesh>
      ))}
      <pointLight
        position={[0, 2.4, 1]}
        color={palette.glow}
        intensity={3}
        distance={5}
      />
      {[-0.95, 0.92].map((x) => (
        <mesh key={x} position={[x, 1.18, 0.3]} scale={[0.45, 0.18, 0.45]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color={palette.foliage} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

function AutumnWorld({ world }: WorldCompositionProps) {
  const palette = world.environment.colorPalette

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.55, 48, 32]} />
        <meshStandardMaterial color={palette.terrain} roughness={1} />
      </mesh>
      <Tree foliage={palette.foliage} position={[-0.92, 1.2, -0.05]} scale={0.9} />
      <Tree foliage={palette.accent} position={[-0.45, 1.45, -0.2]} scale={0.72} />
      <Tree foliage={palette.glow} position={[0.9, 1.22, -0.12]} scale={0.8} />
      <Studio
        color={palette.accent}
        roof={palette.terrain}
        position={[0.22, 1.49, 0]}
      />
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
              color={index % 2 ? palette.glow : palette.accent}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

const worldComponents: Record<
  WorldStyle,
  (properties: WorldCompositionProps) => React.JSX.Element
> = {
  meadow: MeadowWorld,
  garden: GardenWorld,
  islands: FloatingIslandsWorld,
  cavern: CrystalCavernWorld,
  autumn: AutumnWorld,
}

function LivingWorldEffects({ world }: { world: SymbolicWorld }) {
  const group = useRef<THREE.Group>(null)
  const worldState = useLivingWorldStore((state) => state.worlds[world.id])
  const eventKinds = useMemo(
    () => new Set(worldState.history.map((event) => event.kind)),
    [worldState.history],
  )

  useFrame((_, delta) => {
    if (!group.current) return
    const nextScale = THREE.MathUtils.lerp(
      group.current.scale.x,
      1,
      1 - Math.exp(-delta * 0.5),
    )
    group.current.scale.setScalar(nextScale)
  })

  const palette = world.environment.colorPalette

  return (
    <group ref={group} scale={0.01} name={`${world.name} living changes`}>
      {eventKinds.has('first-bloom') &&
        Array.from({ length: 18 }, (_, index) => {
          const angle = index * 2.28
          const radius = 0.35 + (index % 4) * 0.22
          return (
            <mesh
              key={`bloom-${index}`}
              position={[
                Math.cos(angle) * radius,
                1.57 + (index % 3) * 0.018,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.035, 8, 6]} />
              <meshStandardMaterial
                color={index % 2 ? palette.glow : palette.accent}
                emissive={palette.glow}
                emissiveIntensity={0.2}
              />
            </mesh>
          )
        })}

      {eventKinds.has('bridge-completes') && (
        <group position={[0, 1.68, 0.62]} rotation={[0, 0, -0.08]}>
          {Array.from({ length: 7 }, (_, index) => (
            <mesh key={index} position={[(index - 3) * 0.12, index * 0.015, 0]}>
              <boxGeometry args={[0.1, 0.035, 0.28]} />
              <meshStandardMaterial color={palette.accent} roughness={0.9} />
            </mesh>
          ))}
        </group>
      )}

      {eventKinds.has('path-appears') &&
        Array.from({ length: 8 }, (_, index) => (
          <mesh
            key={`path-${index}`}
            position={[-0.75 + index * 0.19, 1.58, 0.52 - index * 0.045]}
            rotation={[-Math.PI / 2, 0, index * 0.18]}
          >
            <circleGeometry args={[0.075, 10]} />
            <meshStandardMaterial color={palette.glow} roughness={0.95} />
          </mesh>
        ))}

      {eventKinds.has('tree-grows') && (
        <Tree foliage={palette.foliage} position={[0, 1.46, -0.2]} scale={1.15} />
      )}

      {eventKinds.has('river-clears') && (
        <WaterDisc color={palette.water} position={[0, 1.61, 0.35]} scale={1.35} />
      )}

      {eventKinds.has('lantern-lights') && (
        <>
          <mesh position={[0.58, 1.82, 0.5]}>
            <sphereGeometry args={[0.075, 12, 9]} />
            <meshStandardMaterial
              color={palette.glow}
              emissive={palette.glow}
              emissiveIntensity={1.8}
            />
          </mesh>
          <pointLight
            position={[0.58, 1.82, 0.5]}
            color={palette.glow}
            intensity={4}
            distance={3}
          />
        </>
      )}

      {(eventKinds.has('stars-appear') || eventKinds.has('birds-return')) && (
        <group position={[0, 0.2, 0]}>
          {Array.from(
            { length: eventKinds.has('stars-appear') ? 18 : 6 },
            (_, index) => {
              const angle = index * 2.1
              return (
                <mesh
                  key={`sky-${index}`}
                  position={[
                    Math.cos(angle) * (1.7 + (index % 3) * 0.3),
                    1.8 + (index % 5) * 0.25,
                    Math.sin(angle) * 1.5,
                  ]}
                >
                  <sphereGeometry
                    args={[eventKinds.has('stars-appear') ? 0.025 : 0.04, 7, 5]}
                  />
                  <meshBasicMaterial color={palette.glow} />
                </mesh>
              )
            },
          )}
        </group>
      )}

      <mesh scale={1.075}>
        <sphereGeometry args={[1.55, 32, 24]} />
        <meshBasicMaterial
          color={palette.atmosphere}
          transparent
          opacity={0.025 + worldState.atmosphere.fogDensity * 0.055}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

function SymbolicWorldPlanet({ world, reducedMotion }: SymbolicWorldProps) {
  const group = useRef<THREE.Group>(null)
  const phase = useJourneyStore((state) => state.journeyPhase)
  const selectedWorldId = useJourneyStore((state) => state.selectedWorldId)
  const isSelected = selectedWorldId === world.id
  const WorldComposition = worldComponents[world.style]
  const interpretation = useReflectionProfileStore((state) => state.interpretation)
  const reflectionInfluence = interpretation?.worldInfluences.find(
    (influence) => influence.worldId === world.id,
  )
  const reflectiveGlow = 0.045 + (reflectionInfluence?.resonance ?? 0.35) * 0.055

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
      name={`${world.name} symbolic world`}
    >
      <WorldComposition world={world} />
      <LivingWorldEffects world={world} />
      <mesh scale={1.04}>
        <sphereGeometry args={[1.55, 40, 28]} />
        <meshBasicMaterial
          color={world.color}
          transparent
          opacity={reflectiveGlow}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

export function BookWorlds({ reducedMotion }: BookWorldsProps) {
  return (
    <group name="The Book of Worlds">
      {symbolicWorlds.map((world) => (
        <SymbolicWorldPlanet
          key={world.id}
          world={world}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  )
}
