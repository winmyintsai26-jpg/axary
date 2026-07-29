import type { CreatorWorld } from '../../types/CreatorWorld'

// Every entry represents one real creator world. Never add decorative stars here.
export const creatorWorlds: CreatorWorld[] = [
  {
    id: 'peaceful-meadow',
    name: 'Peaceful Meadow',
    description: 'A gentle world of wildflowers, still water, and golden light.',
    color: '#f1d39a',
    position: [-4.6, 1.8, 0],
    style: 'meadow',
  },
  {
    id: 'japanese-garden',
    name: 'Japanese Garden',
    description: 'Cherry blossoms gather around lantern paths and quiet water.',
    color: '#efb8c8',
    position: [0.1, 2.8, -1.3],
    style: 'garden',
  },
  {
    id: 'floating-islands',
    name: 'Floating Islands',
    description: 'Ancient stones drift among clouds and rivers fall into sky.',
    color: '#c8e4ee',
    position: [4.8, 1.2, -0.4],
    style: 'islands',
  },
  {
    id: 'crystal-cavern',
    name: 'Crystal Cavern',
    description: 'Cool light rests in reflective pools beneath crystal spires.',
    color: '#83dce2',
    position: [-2.6, -2.5, -0.8],
    style: 'cavern',
  },
  {
    id: 'autumn-forest',
    name: 'Autumn Forest',
    description: 'Falling leaves warm a small cabin at the edge of sunset.',
    color: '#e6a15e',
    position: [3.2, -2.3, -1.6],
    style: 'autumn',
  },
]
