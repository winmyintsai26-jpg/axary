import type { SymbolicWorld } from './types'

export const symbolicWorlds: SymbolicWorld[] = [
  {
    id: 'heart',
    name: 'Heart',
    icon: '♥',
    description:
      'The world of tenderness, longing, trust, and the ways you let yourself be known.',
    color: '#d98991',
    glow: '#f0a9ae',
    position: [-4.6, 1.8, 0],
    style: 'garden',
    environment: {
      environment: 'A rose-colored garden gathered around a still reflecting pond.',
      lighting: 'Warm dusk with soft rose-gold highlights.',
      weather: 'Petals drifting through a quiet, temperate breeze.',
      music: 'Distant strings, breath, and slow water.',
      architecture: ['open pavilion', 'lantern bridge'],
      vegetation: ['blossom trees', 'water lilies', 'soft moss'],
    },
    narrative: {
      symbolism: ['openness', 'vulnerability', 'belonging'],
      emotionalTone: ['tender', 'safe', 'honest'],
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
      lighting: 'Early morning light after rain.',
      weather: 'Passing clouds and a clean, renewing breeze.',
      music: 'Woodwinds, leaves, and a distant stream.',
      architecture: ['small stone observatory', 'winding footpath'],
      vegetation: ['wildflowers', 'young trees', 'tall grass'],
    },
    narrative: {
      symbolism: ['renewal', 'patience', 'possibility'],
      emotionalTone: ['hopeful', 'grounded', 'gentle'],
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
      lighting: 'Late afternoon sun through autumn leaves.',
      weather: 'Falling leaves and warm, steady air.',
      music: 'Acoustic strings, footsteps, and a cabin fire.',
      architecture: ['wooden bridge', 'shared cabin gallery'],
      vegetation: ['maples', 'ferns', 'golden grasses'],
    },
    narrative: {
      symbolism: ['connection', 'reciprocity', 'shared time'],
      emotionalTone: ['warm', 'familiar', 'welcoming'],
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
      lighting: 'A clear horizon lit by a low golden sun.',
      weather: 'Strong clean wind with slow-moving clouds.',
      music: 'Low drums, open air, and resonant stone.',
      architecture: ['ancient arch', 'unfinished tower'],
      vegetation: ['wind-bent grass', 'silver shrubs'],
    },
    narrative: {
      symbolism: ['direction', 'craft', 'contribution'],
      emotionalTone: ['clear', 'brave', 'expansive'],
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
      lighting: 'Cool moonlight rising from beneath the water.',
      weather: 'Fine mist moving through deep stillness.',
      music: 'Glass tones, water echoes, and near-silence.',
      architecture: ['stone sanctuary', 'circular threshold'],
      vegetation: ['moss', 'pale ferns', 'luminous reeds'],
    },
    narrative: {
      symbolism: ['intuition', 'inner truth', 'mystery'],
      emotionalTone: ['quiet', 'deep', 'accepting'],
      futureDialogue: [
        'What do you know without proof?',
        'What remains when everything is quiet?',
      ],
      futureMemories: [],
    },
  },
]
