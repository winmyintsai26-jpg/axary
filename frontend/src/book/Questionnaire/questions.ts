import type { JourneyQuestion } from './types'

export const reflectionJourneyVersion = 2

export const journeyQuestions: JourneyQuestion[] = [
  {
    id: 'restoration-landscape',
    category: 'energy',
    type: 'landscape',
    prompt: 'After an emotionally intense week, where would you most want to arrive?',
    introduction: 'Choose the place that feels restorative today.',
    options: [
      {
        id: 'sheltered-garden',
        label: 'A sheltered garden after rain',
        description: 'Close, green, and quietly alive',
        influences: { stillness: 2, continuity: 1, privacy: 1 },
        visual: { accent: '#95b98b', landscape: 'garden' },
      },
      {
        id: 'open-coast',
        label: 'A wide coast beneath moving clouds',
        description: 'Open air, distance, and changing light',
        influences: { openness: 2, novelty: 1, wonder: 1 },
        visual: { accent: '#8eb7c5', landscape: 'coast' },
      },
      {
        id: 'warm-forest',
        label: 'A warm forest shared with someone trusted',
        description: 'Soft conversation beneath old trees',
        influences: { connection: 2, harmony: 1, continuity: 1 },
        visual: { accent: '#bd9b72', landscape: 'forest' },
      },
      {
        id: 'high-overlook',
        label: 'A quiet overlook above distant mountains',
        description: 'Perspective, wind, and an uninterrupted horizon',
        influences: { privacy: 1, deliberation: 1, wonder: 2 },
        visual: { accent: '#a9a7c4', landscape: 'mountain' },
      },
    ],
  },
  {
    id: 'social-rhythm',
    category: 'energy',
    type: 'likert',
    prompt:
      'Even after meaningful time with people I care about, I need solitude before I feel fully restored.',
    scale: {
      lowLabel: 'Not usually true for me',
      highLabel: 'Very often true for me',
      points: 5,
    },
  },
  {
    id: 'meaningful-choice',
    category: 'decision-making',
    type: 'paired-choice',
    prompt:
      'When an important choice has no perfect answer, which beginning feels kinder?',
    introduction: 'Both approaches can lead somewhere worthwhile.',
    options: [
      {
        id: 'inner-sense',
        label: 'Listen for what feels quietly aligned',
        description: 'Begin with meaning, then examine the practical shape',
        influences: { intuition: 2, harmony: 1 },
      },
      {
        id: 'visible-pieces',
        label: 'Lay out what is known and compare the paths',
        description: 'Begin with evidence, then notice what still matters',
        influences: { deliberation: 2, structure: 1 },
      },
    ],
  },
  {
    id: 'project-beginning',
    category: 'creativity',
    type: 'single-choice',
    prompt: 'When beginning something meaningful, what most often opens the door?',
    options: [
      {
        id: 'clear-frame',
        label: 'A clear frame to build within',
        influences: { structure: 2, mastery: 1 },
      },
      {
        id: 'compelling-image',
        label: 'An image or feeling I cannot yet explain',
        influences: { intuition: 1, wonder: 2 },
      },
      {
        id: 'conversation',
        label: 'A conversation that changes the question',
        influences: { connection: 1, openness: 2 },
      },
      {
        id: 'first-experiment',
        label: 'A small experiment that reveals the next step',
        influences: { novelty: 2, growth: 1 },
      },
    ],
  },
  {
    id: 'trust-formation',
    category: 'relationships',
    type: 'ranking',
    prompt: 'What helps trust take root for you?',
    introduction: 'Place these in the order that feels most true.',
    options: [
      {
        id: 'consistency',
        label: 'Quiet consistency over time',
        influences: { continuity: 2 },
      },
      {
        id: 'honesty',
        label: 'Honesty, even when it is uncomfortable',
        influences: { directness: 2 },
      },
      {
        id: 'understanding',
        label: 'Feeling deeply understood',
        influences: { connection: 2 },
      },
      {
        id: 'space',
        label: 'Having space without losing closeness',
        influences: { privacy: 1, harmony: 1 },
      },
    ],
  },
  {
    id: 'conflict-response',
    category: 'conflict',
    type: 'paired-choice',
    prompt: 'When a relationship matters and tension appears, what do you need first?',
    introduction:
      'Choose the need that tends to arrive first—not the one that sounds ideal.',
    options: [
      {
        id: 'space-to-understand',
        label: 'Time to understand what I am feeling',
        influences: { privacy: 2, deliberation: 1 },
      },
      {
        id: 'contact-to-repair',
        label: 'A sign that we are still willing to meet each other',
        influences: { connection: 2, harmony: 1 },
      },
    ],
  },
  {
    id: 'uncertain-path',
    category: 'change',
    type: 'likert',
    prompt:
      'When the path ahead changes unexpectedly, possibility becomes visible before certainty returns.',
    scale: {
      lowLabel: 'Rarely my experience',
      highLabel: 'Often my experience',
      points: 5,
    },
  },
  {
    id: 'curiosity-doorways',
    category: 'curiosity',
    type: 'multiple-choice',
    prompt: 'Which doorways most often lead you into a new idea?',
    introduction: 'Choose up to three.',
    minSelections: 1,
    maxSelections: 3,
    options: [
      {
        id: 'stories',
        label: 'Stories and lived experiences',
        influences: { connection: 1, wonder: 1 },
      },
      {
        id: 'patterns',
        label: 'Patterns, systems, and hidden structure',
        influences: { structure: 1, deliberation: 1 },
      },
      {
        id: 'places',
        label: 'Unfamiliar places and ways of living',
        influences: { openness: 2 },
      },
      {
        id: 'making',
        label: 'Making something before I understand it',
        influences: { expression: 1, novelty: 1 },
      },
      {
        id: 'quiet-observation',
        label: 'Watching closely until something changes',
        influences: { stillness: 1, intuition: 1 },
      },
    ],
  },
  {
    id: 'guiding-values',
    category: 'values',
    type: 'multiple-choice',
    prompt:
      'Which qualities would you want to remain visible in the life you are building?',
    introduction: 'Choose four. None of them are opposites.',
    minSelections: 4,
    maxSelections: 4,
    options: [
      { id: 'care', label: 'Care', influences: { service: 2, harmony: 1 } },
      { id: 'freedom', label: 'Freedom', influences: { openness: 2 } },
      { id: 'craft', label: 'Craft', influences: { mastery: 2 } },
      { id: 'belonging', label: 'Belonging', influences: { connection: 2 } },
      { id: 'wonder', label: 'Wonder', influences: { wonder: 2 } },
      { id: 'steadiness', label: 'Steadiness', influences: { continuity: 2 } },
      { id: 'growth', label: 'Growth', influences: { growth: 2 } },
      { id: 'truth', label: 'Truth', influences: { directness: 2 } },
    ],
  },
  {
    id: 'emotion-processing',
    category: 'reflection',
    type: 'single-choice',
    prompt:
      'After an experience stays with you, how does its meaning usually become clearer?',
    options: [
      {
        id: 'language',
        label: 'I find language for it',
        influences: { expression: 2, deliberation: 1 },
      },
      {
        id: 'sharing',
        label: 'I share it with someone I trust',
        influences: { connection: 2, expression: 1 },
      },
      {
        id: 'time',
        label: 'I let time reveal what remains',
        influences: { stillness: 1, continuity: 2 },
      },
      {
        id: 'movement',
        label: 'I move, make, or change my surroundings',
        influences: { growth: 1, novelty: 1, expression: 1 },
      },
    ],
  },
  {
    id: 'inner-symbol',
    category: 'reflection',
    type: 'symbol',
    prompt: 'Which symbol feels closest to the way your inner life moves?',
    introduction: 'Choose by instinct. The symbol has no fixed interpretation.',
    options: [
      {
        id: 'river',
        label: 'River',
        description: 'Finding a way through changing ground',
        influences: { growth: 1, continuity: 1 },
        visual: { accent: '#86b6c1', glyph: '≈' },
      },
      {
        id: 'lantern',
        label: 'Lantern',
        description: 'A small light held with care',
        influences: { service: 1, stillness: 1 },
        visual: { accent: '#e6b979', glyph: '◇' },
      },
      {
        id: 'bridge',
        label: 'Bridge',
        description: 'The space made between two shores',
        influences: { connection: 2 },
        visual: { accent: '#c69b86', glyph: '⌒' },
      },
      {
        id: 'seed',
        label: 'Seed',
        description: 'A future held inside something small',
        influences: { growth: 2, wonder: 1 },
        visual: { accent: '#99b884', glyph: '◌' },
      },
    ],
  },
  {
    id: 'purpose-source',
    category: 'purpose',
    type: 'ranking',
    prompt: 'When life feels meaningful, which elements are usually present?',
    introduction: 'Arrange these from most present to least present.',
    options: [
      {
        id: 'contribution',
        label: 'Something I do matters beyond me',
        influences: { service: 2 },
      },
      {
        id: 'mastery',
        label: 'I am becoming more capable',
        influences: { mastery: 2 },
      },
      {
        id: 'belonging',
        label: 'I feel part of something living',
        influences: { connection: 2 },
      },
      {
        id: 'discovery',
        label: 'I can follow what makes me curious',
        influences: { openness: 1, wonder: 1 },
      },
    ],
  },
  {
    id: 'unwritten-reflection',
    category: 'reflection',
    type: 'reflection',
    optional: true,
    prompt:
      'Is there a place, memory, or feeling you hope your worlds will make room for?',
    introduction:
      'Optional. This belongs to you and is used only to shape your experience on this device.',
  },
]
