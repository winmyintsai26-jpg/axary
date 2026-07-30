import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { audioManager } from '../../systems/Audio/AudioManager'
import { useHeartWorldStore, type HeartLocation } from './useHeartWorldStore'

const meaningfulPlaces: {
  id: HeartLocation
  position: THREE.Vector3
  radius: number
}[] = [
  { id: 'lake', position: new THREE.Vector3(-3.1, 0, -0.5), radius: 3.2 },
  { id: 'bridge', position: new THREE.Vector3(-1.15, 0, 1.1), radius: 1.8 },
  { id: 'old-tree', position: new THREE.Vector3(-4.3, 0, -1.5), radius: 2.1 },
  { id: 'cabin', position: new THREE.Vector3(4.7, 0, -4.8), radius: 2.6 },
  { id: 'hidden-garden', position: new THREE.Vector3(7.8, 0, 3.6), radius: 2.8 },
  { id: 'overlook', position: new THREE.Vector3(4.8, 0, 5.5), radius: 2.2 },
]
const upAxis = new THREE.Vector3(0, 1, 0)

export function HeartCameraController({ reducedMotion }: { reducedMotion: boolean }) {
  const camera = useThree((state) => state.camera)
  const destination = useHeartWorldStore((state) => state.destination)
  const isResting = useHeartWorldStore((state) => state.isResting)
  const setActiveLocation = useHeartWorldStore((state) => state.setActiveLocation)
  const stand = useHeartWorldStore((state) => state.stand)
  const position = useRef(new THREE.Vector3(0, 0.78, 7))
  const lookDirection = useRef(new THREE.Vector3(0, -0.12, -1))
  const pressed = useRef(new Set<string>())
  const lastStepAt = useRef(0)
  const activeLocation = useRef<HeartLocation>('arrival')
  const moveDirection = useRef(new THREE.Vector3())
  const desiredCamera = useRef(new THREE.Vector3())
  const lookTarget = useRef(new THREE.Vector3())
  const destinationVector = useMemo(
    () => new THREE.Vector3(...destination),
    [destination],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      pressed.current.add(event.key.toLowerCase())
      if (
        isResting &&
        ['w', 'a', 's', 'd', 'arrowup', 'arrowdown'].includes(event.key.toLowerCase())
      ) {
        stand()
      }
    }
    const onKeyUp = (event: KeyboardEvent) =>
      pressed.current.delete(event.key.toLowerCase())
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [isResting, stand])

  useFrame((state, delta) => {
    const keys = pressed.current
    const forward =
      Number(keys.has('w') || keys.has('arrowup')) -
      Number(keys.has('s') || keys.has('arrowdown'))
    const turn =
      Number(keys.has('a') || keys.has('arrowleft')) -
      Number(keys.has('d') || keys.has('arrowright'))

    if (turn) {
      lookDirection.current.applyAxisAngle(upAxis, turn * delta * 1.1)
    }

    let moving = false
    if (forward && !isResting) {
      position.current.addScaledVector(lookDirection.current, forward * delta * 2.1)
      position.current.y = 0.78
      destinationVector.copy(position.current)
      moving = true
    } else if (!isResting && position.current.distanceTo(destinationVector) > 0.12) {
      moveDirection.current.copy(destinationVector).sub(position.current).setY(0)
      if (moveDirection.current.length() > 0.01) {
        moveDirection.current.normalize()
        lookDirection.current.lerp(moveDirection.current, 1 - Math.exp(-delta * 2))
        position.current.addScaledVector(
          moveDirection.current,
          Math.min(delta * 1.6, position.current.distanceTo(destinationVector)),
        )
        moving = true
      }
    }

    const distanceFromCenter = Math.hypot(position.current.x, position.current.z)
    if (distanceFromCenter > 15.5) {
      position.current.multiplyScalar(15.5 / distanceFromCenter)
      position.current.y = 0.78
    }

    if (moving && state.clock.elapsedTime - lastStepAt.current > 0.52) {
      audioManager.playFootstep()
      lastStepAt.current = state.clock.elapsedTime
    }

    const eyeHeight = isResting ? 1.08 : 1.58
    desiredCamera.current.copy(position.current)
    desiredCamera.current.y = eyeHeight
    if (!reducedMotion)
      desiredCamera.current.y +=
        Math.sin(state.clock.elapsedTime * 1.7) * (moving ? 0.025 : 0.008)
    camera.position.lerp(desiredCamera.current, 1 - Math.exp(-delta * 5))
    lookTarget.current.copy(position.current).add(lookDirection.current)
    lookTarget.current.y += isResting ? 0.45 : 0.72
    camera.lookAt(lookTarget.current)

    const place = meaningfulPlaces.find(
      (candidate) => candidate.position.distanceTo(position.current) < candidate.radius,
    )
    const nextLocation = place?.id ?? 'arrival'
    if (activeLocation.current !== nextLocation) {
      activeLocation.current = nextLocation
      setActiveLocation(nextLocation)
    }
  })

  return null
}
