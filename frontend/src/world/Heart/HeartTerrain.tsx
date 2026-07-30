import { useMemo } from 'react'

function WindingPath() {
  const stones = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => {
        const progress = index / 29
        return {
          position: [
            Math.sin(progress * Math.PI * 2.4) * (0.55 + progress * 0.8),
            0.045,
            7.2 - progress * 12.2,
          ] as [number, number, number],
          rotation: -0.2 + (index % 4) * 0.11,
          scale: 0.82 + (index % 3) * 0.09,
        }
      }),
    [],
  )

  return (
    <group name="The winding path">
      {stones.map((stone, index) => (
        <mesh
          key={index}
          position={stone.position}
          rotation={[-Math.PI / 2, 0, stone.rotation]}
          scale={[stone.scale, stone.scale * 0.66, 1]}
          receiveShadow
        >
          <circleGeometry args={[0.28, 9]} />
          <meshStandardMaterial
            color={index % 2 ? '#c6b7ae' : '#d5c8bd'}
            roughness={0.98}
          />
        </mesh>
      ))}
    </group>
  )
}

function DistantMountains() {
  return (
    <group position={[0, -0.5, -18]} name="Distant mountains">
      {[-9, -6, -2.8, 1, 4.4, 8].map((x, index) => (
        <mesh
          key={x}
          position={[x, 2.4 + (index % 3) * 0.55, index % 2 ? -1.2 : 0]}
          scale={[1.9 + (index % 2) * 0.7, 3.5 + (index % 3), 1.4]}
        >
          <coneGeometry args={[2.2, 3.8, 5]} />
          <meshStandardMaterial
            color={index % 2 ? '#796f7f' : '#877c88'}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  )
}

export function HeartTerrain() {
  return (
    <group name="Heart World terrain">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[18, 72]} />
        <meshStandardMaterial color="#78966d" roughness={0.98} />
      </mesh>

      <mesh position={[-7.2, 0.3, -3.8]} scale={[6.2, 1.25, 4.8]} receiveShadow>
        <sphereGeometry args={[1, 32, 18]} />
        <meshStandardMaterial color="#6f8c66" roughness={1} />
      </mesh>
      <mesh position={[7.5, 0.45, -5]} scale={[6.5, 1.55, 5]} receiveShadow>
        <sphereGeometry args={[1, 32, 18]} />
        <meshStandardMaterial color="#749269" roughness={1} />
      </mesh>
      <mesh position={[5.2, 0.55, 4.2]} scale={[4.2, 1.35, 3.2]} receiveShadow>
        <sphereGeometry args={[1, 30, 18]} />
        <meshStandardMaterial color="#819d71" roughness={1} />
      </mesh>
      <mesh position={[-5, 0.38, 5.5]} scale={[4.8, 1.05, 3.5]} receiveShadow>
        <sphereGeometry args={[1, 30, 18]} />
        <meshStandardMaterial color="#76946b" roughness={1} />
      </mesh>

      <WindingPath />
      <DistantMountains />
    </group>
  )
}
