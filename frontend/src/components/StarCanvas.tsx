import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { starFragmentShader, starVertexShader } from '../shaders/starField'
import { createStarField } from '../utils/createStarField'

interface StarCanvasProps {
  awakened: boolean
  reducedMotion: boolean
}

interface StarFieldProps extends StarCanvasProps {
  pointer: React.RefObject<THREE.Vector2>
}

function StarField({ awakened, pointer, reducedMotion }: StarFieldProps) {
  const group = useRef<THREE.Group>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const stars = useMemo(() => createStarField(1800, 1718), [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
      uAwakened: { value: 0 },
      uMotion: { value: reducedMotion ? 0 : 1 },
    }),
    [reducedMotion],
  )

  useFrame((state, delta) => {
    if (!group.current || !material.current) return

    const easing = 1 - Math.exp(-delta * 1.4)
    const targetX = reducedMotion ? 0 : -pointer.current.y * 0.035
    const targetY = reducedMotion ? 0 : pointer.current.x * 0.055

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      easing,
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      easing,
    )

    material.current.uniforms.uTime!.value = state.clock.elapsedTime
    material.current.uniforms.uAwakened!.value = THREE.MathUtils.lerp(
      material.current.uniforms.uAwakened!.value as number,
      awakened ? 1 : 0,
      1 - Math.exp(-delta * 0.65),
    )
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

export function StarCanvas({ awakened, reducedMotion }: StarCanvasProps) {
  const pointer = useRef(new THREE.Vector2())

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      )
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    return () => window.removeEventListener('pointermove', updatePointer)
  }, [])

  return (
    <div className="star-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 58, near: 0.1, far: 40 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
      >
        <StarField
          pointer={pointer}
          awakened={awakened}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  )
}
