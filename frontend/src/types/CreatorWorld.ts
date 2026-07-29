export type WorldStyle = 'meadow' | 'garden' | 'islands' | 'cavern' | 'autumn'

export interface CreatorWorld {
  color: string
  description: string
  id: string
  name: string
  position: [number, number, number]
  style: WorldStyle
}
