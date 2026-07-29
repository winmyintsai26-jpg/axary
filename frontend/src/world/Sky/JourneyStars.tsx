import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { starFragmentShader, starVertexShader } from '../../shaders/starField'
import { useExperienceStore } from '../../store/useExperienceStore'
import { createStarField } from '../../utils/createStarField'

interface JourneyStarsProps {
  reducedMotion: boolean
}

export function JourneyStars({ reducedMotion }: JourneyStarsProps) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const group = useRef<THREE.Group>(null)
  const phase = useExperienceStore((state) => state.journeyPhase)
  const stars = useMemo(() => createStarField(1600, 1718), [])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.6) },
      uAwakened: { value: 0 },
      uMotion: { value: reducedMotion ? 0 : 1 },
      uTravel: { value: 0 },
    }),
    [reducedMotion],
  )

  useFrame((state, delta) => {
    if (!material.current || !group.current) return

    const isTraveling = phase === 'traveling' || phase === 'approaching'
    const travelTarget = isTraveling && !reducedMotion ? 1 : 0
    const easing = 1 - Math.exp(-delta * 0.9)

    material.current.uniforms.uTime!.value = state.clock.elapsedTime
    material.current.uniforms.uTravel!.value = THREE.MathUtils.lerp(
      material.current.uniforms.uTravel!.value as number,
      travelTarget,
      easing,
    )
    material.current.uniforms.uAwakened!.value = isTraveling ? 1 : 0
    group.current.rotation.z += delta * 0.0015
  })

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars.positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[stars.sizes, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[stars.phases, 1]} />
          <bufferAttribute attach="attributes-aWarmth" args={[stars.warmth, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
