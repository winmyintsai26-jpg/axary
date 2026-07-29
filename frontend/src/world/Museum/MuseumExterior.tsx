function WarmWindow({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[0.42, 0.64]} />
      <meshStandardMaterial
        color="#f1c47d"
        emissive="#d99545"
        emissiveIntensity={1.3}
        roughness={0.65}
      />
    </mesh>
  )
}

export function MuseumExterior() {
  return (
    <group position={[0, 2.72, -1.55]} rotation={[0, 0.05, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.63, 0]}>
        <boxGeometry args={[1.8, 1.25, 1.12]} />
        <meshStandardMaterial color="#d8ccb0" roughness={0.96} />
      </mesh>

      <mesh castShadow position={[0, 1.47, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.38, 0.62, 4]} />
        <meshStandardMaterial color="#776f68" roughness={0.92} />
      </mesh>

      <mesh castShadow position={[0, 0.48, 0.568]}>
        <boxGeometry args={[0.38, 0.92, 0.08]} />
        <meshStandardMaterial color="#765b45" roughness={0.9} />
      </mesh>
      <mesh position={[0.1, 0.46, 0.617]}>
        <sphereGeometry args={[0.035, 10, 8]} />
        <meshStandardMaterial color="#d0a65f" metalness={0.25} roughness={0.6} />
      </mesh>

      <WarmWindow position={[-0.55, 0.7, 0.572]} />
      <WarmWindow position={[0.55, 0.7, 0.572]} />

      <mesh castShadow position={[-0.88, 0.33, 0]} scale={[0.16, 0.7, 0.16]}>
        <cylinderGeometry args={[0.24, 0.28, 1, 8]} />
        <meshStandardMaterial color="#b8ab8d" roughness={1} />
      </mesh>
      <mesh castShadow position={[0.88, 0.33, 0]} scale={[0.16, 0.7, 0.16]}>
        <cylinderGeometry args={[0.24, 0.28, 1, 8]} />
        <meshStandardMaterial color="#b8ab8d" roughness={1} />
      </mesh>

      <pointLight
        position={[0, 0.8, 1.1]}
        intensity={0.8}
        distance={4}
        color="#efb964"
      />
    </group>
  )
}
