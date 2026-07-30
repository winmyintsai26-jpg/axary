import type { JourneyQuestion } from './types'

export const reflectionJourneyVersion = 3

export const journeyQuestions: JourneyQuestion[] = [
  {
    id: 'restore',
    category: 'energy',
    type: 'single-choice',
    prompt: 'After a difficult week, where would you rather spend your time?',
    options: [
      {
        id: 'quiet-forest',
        label: 'A quiet forest',
        influences: { stillness: 2, privacy: 1, continuity: 1 },
      },
      {
        id: 'beach',
        label: 'A beach',
        influences: { openness: 2, wonder: 1, stillness: 1 },
      },
      {
        id: 'busy-cafe',
        label: 'A busy café',
        influences: { connection: 1, novelty: 2, expression: 1 },
      },
      {
        id: 'close-friends',
        label: 'With close friends',
        influences: { connection: 2, harmony: 1, continuity: 1 },
      },
    ],
  },
  {
    id: 'decision',
    category: 'decision-making',
    type: 'single-choice',
    prompt: 'When making an important decision, what do you trust most?',
    options: [
      {
        id: 'feelings',
        label: 'My feelings',
        influences: { intuition: 2, harmony: 1 },
      },
      {
        id: 'careful-thinking',
        label: 'Careful thinking',
        influences: { deliberation: 2, structure: 1 },
      },
      {
        id: 'trusted-advice',
        label: 'Advice from people I trust',
        influences: { connection: 2, service: 1 },
      },
      {
        id: 'past-experience',
        label: 'My past experience',
        influences: { continuity: 2, deliberation: 1 },
      },
    ],
  },
  {
    id: 'home',
    category: 'reflection',
    type: 'single-choice',
    prompt: 'Which place feels most like home to you?',
    options: [
      {
        id: 'mountains',
        label: 'Mountains',
        influences: { wonder: 2, privacy: 1, mastery: 1 },
      },
      {
        id: 'peaceful-lake',
        label: 'A peaceful lake',
        influences: { stillness: 2, intuition: 1, harmony: 1 },
      },
      {
        id: 'lively-city',
        label: 'A lively city',
        influences: { connection: 1, novelty: 2, openness: 1 },
      },
      {
        id: 'open-countryside',
        label: 'Open countryside',
        influences: { openness: 2, continuity: 1, growth: 1 },
      },
    ],
  },
  {
    id: 'friendship',
    category: 'relationships',
    type: 'single-choice',
    prompt: 'What matters most in a friendship?',
    options: [
      {
        id: 'loyalty',
        label: 'Loyalty',
        influences: { continuity: 2, connection: 1 },
      },
      {
        id: 'honesty',
        label: 'Honesty',
        influences: { directness: 2, connection: 1 },
      },
      {
        id: 'fun',
        label: 'Fun',
        influences: { novelty: 1, expression: 2 },
      },
      {
        id: 'understanding',
        label: 'Understanding',
        influences: { harmony: 2, connection: 1, intuition: 1 },
      },
    ],
  },
  {
    id: 'unexpected',
    category: 'change',
    type: 'single-choice',
    prompt: 'When something unexpected happens, you usually…',
    options: [
      {
        id: 'adapt',
        label: 'Adapt quickly',
        influences: { openness: 2, growth: 1, novelty: 1 },
      },
      {
        id: 'think',
        label: 'Think before acting',
        influences: { deliberation: 2, structure: 1 },
      },
      {
        id: 'ask',
        label: 'Ask someone I trust',
        influences: { connection: 2, harmony: 1 },
      },
      {
        id: 'reflect',
        label: 'Take time to reflect',
        influences: { stillness: 2, intuition: 1, privacy: 1 },
      },
    ],
  },
  {
    id: 'season',
    category: 'values',
    type: 'single-choice',
    prompt: 'Which season feels most like you?',
    options: [
      {
        id: 'spring',
        label: 'Spring',
        influences: { growth: 2, openness: 1 },
      },
      {
        id: 'summer',
        label: 'Summer',
        influences: { expression: 2, connection: 1 },
      },
      {
        id: 'autumn',
        label: 'Autumn',
        influences: { continuity: 1, intuition: 2 },
      },
      {
        id: 'winter',
        label: 'Winter',
        influences: { stillness: 2, privacy: 1 },
      },
    ],
  },
  {
    id: 'closest-sentence',
    category: 'curiosity',
    type: 'single-choice',
    prompt: 'Which sentence feels closest to you?',
    options: [
      {
        id: 'discovering',
        label: 'I enjoy discovering new ideas.',
        influences: { openness: 2, wonder: 1, novelty: 1 },
      },
      {
        id: 'helping',
        label: 'I enjoy helping others.',
        influences: { service: 2, connection: 1, harmony: 1 },
      },
      {
        id: 'creating',
        label: 'I enjoy creating things.',
        influences: { expression: 2, growth: 1, mastery: 1 },
      },
      {
        id: 'how-things-work',
        label: 'I enjoy understanding how things work.',
        influences: { structure: 2, deliberation: 1, mastery: 1 },
      },
    ],
  },
]
