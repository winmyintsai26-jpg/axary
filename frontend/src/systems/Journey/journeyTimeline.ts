import * as THREE from 'three'

import type { JourneyPhase } from '../../store/useExperienceStore'

export interface JourneyMoment {
  camera: THREE.Vector3
  lookAt: THREE.Vector3
  phase: JourneyPhase
  worldScale: number
}

const approachCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0.2, 18),
    new THREE.Vector3(0.1, 0.7, 14),
    new THREE.Vector3(2.8, 2.8, 11.5),
    new THREE.Vector3(7, 4, 6),
    new THREE.Vector3(9, 4.3, 0),
  ],
  false,
  'catmullrom',
  0.45,
)

const descentCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(9, 4.3, 0),
    new THREE.Vector3(6.2, 4.8, 4.6),
    new THREE.Vector3(2.8, 5.2, 6.4),
    new THREE.Vector3(0.35, 3.75, 5.1),
    new THREE.Vector3(0.15, 3.45, 4.25),
  ],
  false,
  'catmullrom',
  0.45,
)

export const JOURNEY_DURATION = 28

export function phaseForProgress(progress: number): JourneyPhase {
  if (progress < 0.18) return 'traveling'
  if (progress < 0.34) return 'approaching'
  if (progress < 0.64) return 'orbiting'
  if (progress < 0.94) return 'descending'
  return 'arrived'
}

export function sampleJourney(progress: number): JourneyMoment {
  const approachEnd = 0.34
  const orbitEnd = 0.64
  let camera: THREE.Vector3
  let lookAt = new THREE.Vector3(0, 0.35, 0)

  if (progress < approachEnd) {
    const localProgress = THREE.MathUtils.smoothstep(progress / approachEnd, 0, 1)
    camera = approachCurve.getPoint(localProgress)
  } else if (progress < orbitEnd) {
    const localProgress = THREE.MathUtils.smoothstep(
      (progress - approachEnd) / (orbitEnd - approachEnd),
      0,
      1,
    )
    const angle = Math.PI / 2 + localProgress * Math.PI * 2
    camera = new THREE.Vector3(
      Math.sin(angle) * 9,
      4.3 + Math.sin(localProgress * Math.PI) * 0.45,
      Math.cos(angle) * 9,
    )
  } else {
    const localProgress = THREE.MathUtils.smoothstep(
      (progress - orbitEnd) / (1 - orbitEnd),
      0,
      1,
    )
    camera = descentCurve.getPoint(localProgress)
    lookAt = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(0, 0.35, 0),
      new THREE.Vector3(0, 2.6, -1.25),
      localProgress,
    )
  }

  const revealProgress = THREE.MathUtils.smoothstep(
    Math.min(1, progress / approachEnd),
    0,
    1,
  )
  const worldScale = THREE.MathUtils.lerp(0.025, 1, Math.pow(revealProgress, 1.5))

  return {
    camera,
    lookAt,
    phase: phaseForProgress(progress),
    worldScale,
  }
}
