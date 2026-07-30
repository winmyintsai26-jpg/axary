import type { SymbolicWorld } from './types'

export const symbolicWorlds: SymbolicWorld[] = [
  {
    id: 'heart',
    name: 'Heart',
    icon: '♥',
    description:
      'The world of tenderness, longing, trust, and the ways you let yourself be known.',
    color: '#f7a8c4',
    glow: '#f8bbd9',
    position: [-4.6, 1.8, 0],
    style: 'garden',
    environment: {
      environment: 'A rose-colored garden gathered around a still reflecting pond.',
      terrain: ['soft garden earth', 'still-water terraces'],
      lighting: 'Warm dusk with soft rose-gold highlights.',
      weather: 'Petals drifting through a quiet, temperate breeze.',
      music: 'Distant strings, breath, and slow water.',
      ambientSounds: ['petals in wind', 'pond water', 'distant chimes'],
      colorPalette: {
        accent: '#ec6fa9',
        atmosphere: '#5a3348',
        foliage: '#f7a8c4',
        glow: '#f8bbd9',
        terrain: '#8b6b73',
        water: '#9d8fa7',
      },
      architecture: ['open pavilion', 'lantern bridge'],
      vegetation: ['blossom trees', 'water lilies', 'soft moss'],
      notableLandmarks: [
        {
          id: 'heart-reflecting-pond',
          name: 'The Reflecting Pond',
          description: 'A still pool that changes color with the sky.',
          symbolism: ['emotional honesty', 'what is held beneath stillness'],
        },
      ],
      hiddenLocations: [
        {
          id: 'heart-unwritten-letter',
          name: 'The Unwritten Letter',
          discoveredByDefault: false,
          symbolism: ['words not yet spoken', 'possibility'],
        },
      ],
    },
    narrative: {
      symbolism: ['openness', 'vulnerability', 'belonging'],
      emotionalTone: ['tender', 'safe', 'honest'],
      evolution: [
        {
          id: 'heart-bridge-completes',
          kind: 'bridge-completes',
          description: 'The lantern bridge reaches the far garden.',
          symbolicMeaning: 'A willingness to approach what once felt distant.',
          triggerThemes: ['trust', 'openness'],
        },
      ],
      futureDialogue: [
        'What have you been protecting?',
        'Where do you feel most understood?',
      ],
      futureMemories: [],
    },
  },
  {
    id: 'growth',
    name: 'Growth',
    icon: '✦',
    description:
      'The world of change, patience, courage, and everything in you that is still becoming.',
    color: '#8fb680',
    glow: '#b7d69d',
    position: [0.1, 2.8, -1.3],
    style: 'meadow',
    environment: {
      environment: 'Rolling green hills surrounding a young tree and a clear spring.',
      terrain: ['rolling hills', 'spring-fed meadow'],
      lighting: 'Early morning light after rain.',
      weather: 'Passing clouds and a clean, renewing breeze.',
      music: 'Woodwinds, leaves, and a distant stream.',
      ambientSounds: ['tall grass', 'morning birds', 'running spring'],
      colorPalette: {
        accent: '#d7d58b',
        atmosphere: '#304838',
        foliage: '#6f9a65',
        glow: '#b7d69d',
        terrain: '#71976a',
        water: '#79aeb2',
      },
      architecture: ['small stone observatory', 'winding footpath'],
      vegetation: ['wildflowers', 'young trees', 'tall grass'],
      notableLandmarks: [
        {
          id: 'growth-young-tree',
          name: 'The Young Tree',
          description: 'A tree whose newest branches always face the light.',
          symbolism: ['patience', 'unfinished becoming'],
        },
      ],
      hiddenLocations: [
        {
          id: 'growth-seed-vault',
          name: 'The Seed Room',
          discoveredByDefault: false,
          symbolism: ['unbegun possibilities', 'quiet preparation'],
        },
      ],
    },
    narrative: {
      symbolism: ['renewal', 'patience', 'possibility'],
      emotionalTone: ['hopeful', 'grounded', 'gentle'],
      evolution: [
        {
          id: 'growth-garden-blooms',
          kind: 'garden-blooms',
          description: 'Wildflowers spread along the winding path.',
          symbolicMeaning: 'Care becoming visible through patient repetition.',
          triggerThemes: ['patience', 'renewal'],
        },
        {
          id: 'growth-tree-grows',
          kind: 'tree-grows',
          description: 'The young tree grows a new ring of branches.',
          symbolicMeaning: 'Growth that happened slowly enough to be missed.',
          triggerThemes: ['courage', 'practice'],
        },
      ],
      futureDialogue: ['What is asking for more time?', 'What are you ready to begin?'],
      futureMemories: [],
    },
  },
  {
    id: 'bonds',
    name: 'Bonds',
    icon: '∞',
    description:
      'The world of friendship, family, shared history, and the bridges between lives.',
    color: '#d4a267',
    glow: '#edc58b',
    position: [4.8, 1.2, -0.4],
    style: 'autumn',
    environment: {
      environment: 'An amber forest crossed by bridges and gathering paths.',
      terrain: ['wooded slopes', 'leaf-covered riverbank'],
      lighting: 'Late afternoon sun through autumn leaves.',
      weather: 'Falling leaves and warm, steady air.',
      music: 'Acoustic strings, footsteps, and a cabin fire.',
      ambientSounds: ['leaves underfoot', 'wooden bridge', 'cabin fire'],
      colorPalette: {
        accent: '#e8bd77',
        atmosphere: '#49382d',
        foliage: '#c2693f',
        glow: '#edc58b',
        terrain: '#8f7655',
        water: '#6f817d',
      },
      architecture: ['wooden bridge', 'shared cabin gallery'],
      vegetation: ['maples', 'ferns', 'golden grasses'],
      notableLandmarks: [
        {
          id: 'bonds-shared-bridge',
          name: 'The Shared Bridge',
          description: 'A wooden crossing worn smooth by many footsteps.',
          symbolism: ['reciprocity', 'the work of staying connected'],
        },
      ],
      hiddenLocations: [
        {
          id: 'bonds-empty-chair',
          name: 'The Empty Chair',
          discoveredByDefault: false,
          symbolism: ['absence', 'room for return'],
        },
      ],
    },
    narrative: {
      symbolism: ['connection', 'reciprocity', 'shared time'],
      emotionalTone: ['warm', 'familiar', 'welcoming'],
      evolution: [
        {
          id: 'bonds-cabin-restores',
          kind: 'building-restores',
          description: 'A shutter opens and warm light returns to the cabin.',
          symbolicMeaning: 'Connection renewed through attention.',
          triggerThemes: ['friendship', 'repair'],
        },
      ],
      futureDialogue: [
        'Who helps you return to yourself?',
        'What do you carry for others?',
      ],
      futureMemories: [],
    },
  },
  {
    id: 'purpose',
    name: 'Purpose',
    icon: '△',
    description:
      'The world of direction, contribution, work, and the fire that asks you to continue.',
    color: '#dd8a4f',
    glow: '#f0b06d',
    position: [-2.6, -2.5, -0.8],
    style: 'islands',
    environment: {
      environment:
        'High floating islands connected by light and impossible waterfalls.',
      terrain: ['floating stone islands', 'wind-carved cliffs'],
      lighting: 'A clear horizon lit by a low golden sun.',
      weather: 'Strong clean wind with slow-moving clouds.',
      music: 'Low drums, open air, and resonant stone.',
      ambientSounds: ['high wind', 'distant waterfall', 'resonant stone'],
      colorPalette: {
        accent: '#f0bd72',
        atmosphere: '#384957',
        foliage: '#869d76',
        glow: '#f0b06d',
        terrain: '#7c7768',
        water: '#a6d8e6',
      },
      architecture: ['ancient arch', 'unfinished tower'],
      vegetation: ['wind-bent grass', 'silver shrubs'],
      notableLandmarks: [
        {
          id: 'purpose-unfinished-tower',
          name: 'The Unfinished Tower',
          description: 'A patient structure open to the sky.',
          symbolism: ['work in progress', 'direction without certainty'],
        },
      ],
      hiddenLocations: [
        {
          id: 'purpose-foundation-stone',
          name: 'The Foundation Stone',
          discoveredByDefault: false,
          symbolism: ['first commitments', 'work no one sees'],
        },
      ],
    },
    narrative: {
      symbolism: ['direction', 'craft', 'contribution'],
      emotionalTone: ['clear', 'brave', 'expansive'],
      evolution: [
        {
          id: 'purpose-path-appears',
          kind: 'path-appears',
          description: 'A path of pale stones appears toward the tower.',
          symbolicMeaning: 'Direction emerging through continued effort.',
          triggerThemes: ['commitment', 'craft'],
        },
      ],
      futureDialogue: [
        'What is worth your effort?',
        'What would you build without applause?',
      ],
      futureMemories: [],
    },
  },
  {
    id: 'soul',
    name: 'Soul',
    icon: '☾',
    description:
      'The quiet inner world that holds intuition, mystery, dreams, and what has no easy name.',
    color: '#729fc4',
    glow: '#9fdbe0',
    position: [3.2, -2.3, -1.6],
    style: 'cavern',
    environment: {
      environment: 'A moonlit cavern of reflective pools and softly glowing crystal.',
      terrain: ['moonlit cavern', 'reflective stone shelves'],
      lighting: 'Cool moonlight rising from beneath the water.',
      weather: 'Fine mist moving through deep stillness.',
      music: 'Glass tones, water echoes, and near-silence.',
      ambientSounds: ['water echoes', 'soft crystal resonance', 'moving mist'],
      colorPalette: {
        accent: '#b7c7e7',
        atmosphere: '#263641',
        foliage: '#52765c',
        glow: '#9fdbe0',
        terrain: '#253b44',
        water: '#5ccbd5',
      },
      architecture: ['stone sanctuary', 'circular threshold'],
      vegetation: ['moss', 'pale ferns', 'luminous reeds'],
      notableLandmarks: [
        {
          id: 'soul-moon-pool',
          name: 'The Moon Pool',
          description: 'A dark pool that reflects light from no visible source.',
          symbolism: ['intuition', 'knowing without proof'],
        },
      ],
      hiddenLocations: [
        {
          id: 'soul-echo-chamber',
          name: 'The Echo Chamber',
          discoveredByDefault: false,
          symbolism: ['inner voice', 'the difference between echo and truth'],
        },
      ],
    },
    narrative: {
      symbolism: ['intuition', 'inner truth', 'mystery'],
      emotionalTone: ['quiet', 'deep', 'accepting'],
      evolution: [
        {
          id: 'soul-river-changes',
          kind: 'river-changes',
          description: 'A narrow underground river finds a gentler course.',
          symbolicMeaning: 'Inner change that does not need an audience.',
          triggerThemes: ['acceptance', 'intuition'],
        },
      ],
      futureDialogue: [
        'What do you know without proof?',
        'What remains when everything is quiet?',
      ],
      futureMemories: [],
    },
  },
]
