import { useMemo } from 'react'

function StonePath() {
  const stones = useMemo(
    () =>
      Array.from({ length: 13 }, (_, index) => ({
        position: [
          Math.sin(index * 0.62) * 0.16,
          2.735 + index * 0.002,
          2.45 - index * 0.3,
        ] as [number, number, number],
        rotation: -0.12 + (index % 3) * 0.09,
        scale: 0.78 + (index % 2) * 0.13,
      })),
    [],
  )

  return (
    <group>
      {stones.map((stone, index) => (
        <mesh
          key={index}
          position={stone.position}
          rotation={[-Math.PI / 2, 0, stone.rotation]}
          scale={[stone.scale, stone.scale * 0.68, 1]}
          receiveShadow
        >
          <circleGeometry args={[0.21, 8]} />
          <meshStandardMaterial
            color={index % 2 ? '#b7ad91' : '#c7b99b'}
            roughness={0.96}
          />
        </mesh>
      ))}
    </group>
  )
}

export function PainterlyTerrain() {
  return (
    <group>
      <mesh receiveShadow castShadow scale={[1.18, 0.88, 1.05]}>
        <sphereGeometry args={[3.05, 48, 32]} />
        <meshStandardMaterial color="#688b68" roughness={0.94} />
      </mesh>

      <mesh position={[0, 2.47, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.88, 2.98, 0.48, 64]} />
        <meshStandardMaterial color="#8faa72" roughness={0.98} />
      </mesh>

      <mesh position={[-1.65, 2.5, -1.15]} scale={[1.35, 0.42, 1.1]} castShadow>
        <sphereGeometry args={[1, 28, 18]} />
        <meshStandardMaterial color="#779962" roughness={1} />
      </mesh>
      <mesh position={[1.8, 2.48, -0.75]} scale={[1.45, 0.36, 1.2]} castShadow>
        <sphereGeometry args={[1, 28, 18]} />
        <meshStandardMaterial color="#83a66a" roughness={1} />
      </mesh>
      <mesh position={[1.05, 2.44, 1.5]} scale={[1.25, 0.28, 0.8]} castShadow>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#92ae73" roughness={1} />
      </mesh>

      <StonePath />
    </group>
  )
}
