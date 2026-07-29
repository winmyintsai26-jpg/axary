interface StarFieldData {
  phases: Float32Array
  positions: Float32Array
  sizes: Float32Array
  warmth: Float32Array
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5)
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296
  }
}

export function createStarField(count: number, seed: number): StarFieldData {
  const random = mulberry32(seed)
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)
  const warmth = new Float32Array(count)

  for (let index = 0; index < count; index += 1) {
    const positionIndex = index * 3
    const depth = random()

    positions[positionIndex] = (random() - 0.5) * (14 + depth * 10)
    positions[positionIndex + 1] = (random() - 0.5) * (8 + depth * 7)
    positions[positionIndex + 2] = 1.2 - depth * 14

    sizes[index] = 0.5 + Math.pow(random(), 6) * 2.4
    phases[index] = random() * Math.PI * 2
    warmth[index] = random()
  }

  return { phases, positions, sizes, warmth }
}
