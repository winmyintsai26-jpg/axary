export function GoldenHourLighting() {
  return (
    <>
      <ambientLight intensity={0.72} color="#b9c7dc" />
      <hemisphereLight args={['#f4d39c', '#5b6b88', 1.7]} />
      <directionalLight
        castShadow
        position={[-7, 10, 8]}
        intensity={2.2}
        color="#ffd49a"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={35}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
    </>
  )
}
