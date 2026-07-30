import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { useJourneyStore } from '../../book/Journey/useJourneyStore'
import { symbolicWorlds } from '../../book/Worlds/worlds'

interface CinematicCameraRigProps {
  reducedMotion: boolean
}

const universePosition = new THREE.Vector3(0, 0.2, 18)

export function CinematicCameraRig({ reducedMotion }: CinematicCameraRigProps) {
  const camera = useThree((state) => state.camera)
  const journeyPhase = useJourneyStore((state) => state.journeyPhase)
  const selectedWorldId = useJourneyStore((state) => state.selectedWorldId)
  const setJourneyPhase = useJourneyStore((state) => state.setJourneyPhase)
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const orbitAngle = useRef(0)

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime
    const selectedWorld = symbolicWorlds.find((world) => world.id === selectedWorldId)
    const target = selectedWorld
      ? new THREE.Vector3(...selectedWorld.position)
      : new THREE.Vector3(0, 0, 0)
    const smoothing = 1 - Math.exp(-delta * (reducedMotion ? 5 : 1.35))

    if (
      journeyPhase === 'introduction' ||
      journeyPhase === 'questionnaire' ||
      journeyPhase === 'book'
    ) {
      camera.position.set(
        Math.sin(elapsed * 0.08) * 0.09,
        0.2 + Math.sin(elapsed * 0.11) * 0.045,
        universePosition.z,
      )
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), 0.035)
      camera.lookAt(currentLookAt.current)
      return
    }

    if (journeyPhase === 'returning') {
      camera.position.lerp(universePosition, smoothing)
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), smoothing)
      camera.lookAt(currentLookAt.current)
      if (camera.position.distanceTo(universePosition) < 0.08) {
        setJourneyPhase('book')
      }
      return
    }

    if (!selectedWorld) {
      setJourneyPhase('book')
      return
    }

    if (journeyPhase === 'focusing') {
      const approachPosition = target.clone().add(new THREE.Vector3(0.4, 1.15, 7.1))
      camera.position.lerp(approachPosition, smoothing)
      currentLookAt.current.lerp(target, smoothing)
      camera.lookAt(currentLookAt.current)
      if (camera.position.distanceTo(approachPosition) < 0.12) {
        orbitAngle.current = Math.atan2(
          camera.position.x - target.x,
          camera.position.z - target.z,
        )
        setJourneyPhase('orbiting')
      }
      return
    }

    orbitAngle.current += reducedMotion ? 0 : delta * 0.055
    const desiredPosition = target
      .clone()
      .add(
        new THREE.Vector3(
          Math.sin(orbitAngle.current) * 7,
          1.35 + Math.sin(elapsed * 0.14) * 0.12,
          Math.cos(orbitAngle.current) * 7,
        ),
      )
    camera.position.lerp(desiredPosition, 1 - Math.exp(-delta * 1.1))
    currentLookAt.current.lerp(target, 1 - Math.exp(-delta * 1.5))
    camera.lookAt(currentLookAt.current)
  })

  return null
}
