import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { useJourneyStore } from '../../book/Journey/useJourneyStore'
import { symbolicWorlds } from '../../book/Worlds/worlds'

interface CinematicCameraRigProps {
  reducedMotion: boolean
}

const universePosition = new THREE.Vector3(0, 0.2, 18)
const origin = new THREE.Vector3()
const approachOffset = new THREE.Vector3(0.4, 1.15, 7.1)
const arrivalPosition = new THREE.Vector3(0, 2.2, 9)
const arrivalTarget = new THREE.Vector3(0, 1.15, 0)

export function CinematicCameraRig({ reducedMotion }: CinematicCameraRigProps) {
  const camera = useThree((state) => state.camera)
  const journeyPhase = useJourneyStore((state) => state.journeyPhase)
  const selectedWorldId = useJourneyStore((state) => state.selectedWorldId)
  const setJourneyPhase = useJourneyStore((state) => state.setJourneyPhase)
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const orbitAngle = useRef(0)
  const target = useRef(new THREE.Vector3())
  const desiredPosition = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime
    const selectedWorld = symbolicWorlds.find((world) => world.id === selectedWorldId)
    target.current.fromArray(selectedWorld?.position ?? [0, 0, 0])
    const smoothing = 1 - Math.exp(-delta * (reducedMotion ? 5 : 1.35))

    if (
      journeyPhase === 'introduction' ||
      journeyPhase === 'questionnaire' ||
      journeyPhase === 'reflection' ||
      journeyPhase === 'book'
    ) {
      camera.position.set(
        Math.sin(elapsed * 0.08) * 0.09,
        0.2 + Math.sin(elapsed * 0.11) * 0.045,
        universePosition.z,
      )
      currentLookAt.current.lerp(origin, 0.035)
      camera.lookAt(currentLookAt.current)
      return
    }

    if (journeyPhase === 'returning') {
      camera.position.lerp(universePosition, smoothing)
      currentLookAt.current.lerp(origin, smoothing)
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

    if (journeyPhase === 'entering-heart') {
      camera.position.lerp(arrivalPosition, 1 - Math.exp(-delta * 0.72))
      currentLookAt.current.lerp(arrivalTarget, 1 - Math.exp(-delta * 0.8))
      camera.lookAt(currentLookAt.current)
      if (camera.position.distanceTo(arrivalPosition) < 0.12) {
        setJourneyPhase('heart-world')
      }
      return
    }

    if (journeyPhase === 'heart-world') return

    if (journeyPhase === 'focusing') {
      desiredPosition.current.copy(target.current).add(approachOffset)
      camera.position.lerp(desiredPosition.current, smoothing)
      currentLookAt.current.lerp(target.current, smoothing)
      camera.lookAt(currentLookAt.current)
      if (camera.position.distanceTo(desiredPosition.current) < 0.12) {
        orbitAngle.current = Math.atan2(
          camera.position.x - target.current.x,
          camera.position.z - target.current.z,
        )
        setJourneyPhase('orbiting')
      }
      return
    }

    orbitAngle.current += reducedMotion ? 0 : delta * 0.055
    desiredPosition.current.set(
      target.current.x + Math.sin(orbitAngle.current) * 7,
      target.current.y + 1.35 + Math.sin(elapsed * 0.14) * 0.12,
      target.current.z + Math.cos(orbitAngle.current) * 7,
    )
    camera.position.lerp(desiredPosition.current, 1 - Math.exp(-delta * 1.1))
    currentLookAt.current.lerp(target.current, 1 - Math.exp(-delta * 1.5))
    camera.lookAt(currentLookAt.current)
  })

  return null
}
