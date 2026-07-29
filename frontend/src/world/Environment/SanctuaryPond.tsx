import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { waterFragmentShader, waterVertexShader } from '../../shaders/water'

interface SanctuaryPondProps {
  reducedMotion: boolean
}

export function SanctuaryPond({ reducedMotion }: SanctuaryPondProps) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMotion: { value: reducedMotion ? 0 : 1 },
      uDeepColor: { value: new THREE.Color('#557f89') },
      uLightColor: { value: new THREE.Color('#b6d0c8') },
    }),
    [reducedMotion],
  )

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime!.value = state.clock.elapsedTime
    }
  })

  return (
    <group position={[-1.35, 2.735, -0.05]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[1.15, 0.72, 1]}>
        <circleGeometry args={[0.62, 48, 0, Math.PI * 2]} />
        <shaderMaterial
          ref={material}
          vertexShader={waterVertexShader}
          fragmentShader={waterFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 0.69, 40]} />
        <meshStandardMaterial color="#a7a083" roughness={1} />
      </mesh>
    </group>
  )
}
