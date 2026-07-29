import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { useExplorationInput } from '../../systems/Input/useExplorationInput'
import { JOURNEY_DURATION, sampleJourney } from '../../systems/Journey/journeyTimeline'
import { useExperienceStore } from '../../store/useExperienceStore'

interface CinematicCameraRigProps {
  reducedMotion: boolean
}

const landingPosition = new THREE.Vector3(0.15, 3.45, 4.25)
const museumTarget = new THREE.Vector3(0, 2.65, -1.3)

export function CinematicCameraRig({ reducedMotion }: CinematicCameraRigProps) {
  const camera = useThree((state) => state.camera)
  const journeyPhase = useExperienceStore((state) => state.journeyPhase)
  const setJourneyPhase = useExperienceStore((state) => state.setJourneyPhase)
  const journeyStart = useRef<number | null>(null)
  const arrivalStart = useRef<number | null>(null)
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const explorationPosition = useRef(landingPosition.clone())
  const input = useExplorationInput(journeyPhase === 'exploring')

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime

    if (journeyPhase === 'idle') {
      camera.position.set(
        Math.sin(elapsed * 0.08) * 0.06,
        0.2 + Math.sin(elapsed * 0.11) * 0.035,
        18,
      )
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), 0.035)
      camera.lookAt(currentLookAt.current)
      return
    }

    if (
      journeyPhase === 'traveling' ||
      journeyPhase === 'approaching' ||
      journeyPhase === 'orbiting' ||
      journeyPhase === 'descending'
    ) {
      const duration = reducedMotion ? 7 : JOURNEY_DURATION
      if (journeyStart.current === null) journeyStart.current = elapsed
      const start = journeyStart.current
      const progress = THREE.MathUtils.clamp((elapsed - start) / duration, 0, 1)
      const moment = sampleJourney(progress)
      const smoothing = 1 - Math.exp(-delta * (reducedMotion ? 5 : 2.5))

      camera.position.lerp(moment.camera, smoothing)
      currentLookAt.current.lerp(moment.lookAt, smoothing)
      camera.lookAt(currentLookAt.current)

      if (moment.phase !== journeyPhase) {
        setJourneyPhase(moment.phase)
      }
      return
    }

    if (journeyPhase === 'arrived') {
      if (arrivalStart.current === null) {
        arrivalStart.current = elapsed
      }

      camera.position.lerp(landingPosition, 1 - Math.exp(-delta * 1.1))
      currentLookAt.current.lerp(museumTarget, 1 - Math.exp(-delta * 1.2))
      camera.lookAt(currentLookAt.current)

      if (elapsed - arrivalStart.current > (reducedMotion ? 1 : 4.5)) {
        explorationPosition.current.copy(camera.position)
        setJourneyPhase('exploring')
      }
      return
    }

    const direction = new THREE.Vector3()
    const right = new THREE.Vector3()
    camera.getWorldDirection(direction)
    direction.y = 0
    direction.normalize()
    right.crossVectors(direction, camera.up).normalize()

    const movement = new THREE.Vector3()
    const keys = input.current
    if (keys.has('w') || keys.has('arrowup')) movement.add(direction)
    if (keys.has('s') || keys.has('arrowdown')) movement.sub(direction)
    if (keys.has('a') || keys.has('arrowleft')) movement.sub(right)
    if (keys.has('d') || keys.has('arrowright')) movement.add(right)

    if (movement.lengthSq() > 0) {
      movement.normalize().multiplyScalar(delta * 0.62)
      explorationPosition.current.add(movement)
      explorationPosition.current.x = THREE.MathUtils.clamp(
        explorationPosition.current.x,
        -1.8,
        1.8,
      )
      explorationPosition.current.z = THREE.MathUtils.clamp(
        explorationPosition.current.z,
        0.7,
        4.4,
      )
    }

    const drift = reducedMotion ? 0 : Math.sin(elapsed * 0.32) * 0.018
    camera.position.lerp(
      explorationPosition.current.clone().add(new THREE.Vector3(0, drift, 0)),
      1 - Math.exp(-delta * 4),
    )
    currentLookAt.current.lerp(museumTarget, 1 - Math.exp(-delta * 1.1))
    camera.lookAt(currentLookAt.current)
  })

  return null
}
