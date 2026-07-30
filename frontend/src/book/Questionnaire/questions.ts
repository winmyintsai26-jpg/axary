import type { JourneyQuestion } from './types'

export const journeyQuestions: JourneyQuestion[] = [
  {
    id: 'peaceful-place',
    type: 'single-choice',
    prompt: 'Which place feels most peaceful?',
    options: [
      {
        id: 'meadow',
        label: 'An open meadow',
        description: 'Warm light and room to breathe',
      },
      {
        id: 'garden',
        label: 'A quiet garden',
        description: 'Still water and careful paths',
      },
      {
        id: 'mountains',
        label: 'A high mountain',
        description: 'Distance, wind, and perspective',
      },
      {
        id: 'forest',
        label: 'A deep forest',
        description: 'Shelter, earth, and softened sound',
      },
    ],
  },
  {
    id: 'decision-guide',
    type: 'single-choice',
    prompt: 'When making decisions, what guides you most?',
    options: [
      { id: 'heart', label: 'What feels true' },
      { id: 'reason', label: 'What makes sense' },
      { id: 'people', label: 'Who may be affected' },
      { id: 'possibility', label: 'What could become possible' },
    ],
  },
  {
    id: 'energy',
    type: 'single-choice',
    prompt: 'What kind of environment gives you energy?',
    options: [
      { id: 'quiet', label: 'Peaceful solitude' },
      { id: 'conversation', label: 'Meaningful conversation' },
      { id: 'movement', label: 'Movement and discovery' },
      { id: 'making', label: 'Building something new' },
    ],
  },
  {
    id: 'friendship',
    type: 'single-choice',
    prompt: 'What do you value most in friendships?',
    options: [
      { id: 'honesty', label: 'Honesty' },
      { id: 'warmth', label: 'Warmth' },
      { id: 'steadiness', label: 'Steadiness' },
      { id: 'growth', label: 'Growing together' },
    ],
  },
  {
    id: 'season',
    type: 'single-choice',
    prompt: 'Which season feels most like you?',
    options: [
      { id: 'spring', label: 'Spring', description: 'Beginning again' },
      { id: 'summer', label: 'Summer', description: 'Open and alive' },
      { id: 'autumn', label: 'Autumn', description: 'Reflective and changing' },
      { id: 'winter', label: 'Winter', description: 'Quiet and inward' },
    ],
  },
]
