import type { DialogueDraft } from '../../book/Dialogue/types'

export type MirrorRulePrinciple =
  | 'encourages-reflection'
  | 'avoids-definition'
  | 'leaves-interpretation'
  | 'shows-respect'
  | 'ends-with-hope'

export interface MirrorRuleCheck {
  passed: boolean
  principle: MirrorRulePrinciple
}

export interface MirrorRuleResult {
  checks: MirrorRuleCheck[]
  passed: boolean
}

const definingPatterns = [
  /\byou are\b/i,
  /\byour personality is\b/i,
  /\bthis proves\b/i,
  /\bthis means you\b/i,
  /\byou always\b/i,
  /\byou never\b/i,
]

const reflectivePatterns = [
  /\bmay\b/i,
  /\bmight\b/i,
  /\bcould\b/i,
  /\bi wonder\b/i,
  /\byou may notice\b/i,
  /\bsuggests?\b/i,
  /\bfor some people\b/i,
]

const disrespectfulPatterns = [
  /\bobviously\b/i,
  /\bwrong with you\b/i,
  /\bshould feel\b/i,
  /\bfailed\b/i,
  /\bweak\b/i,
]

const hopefulPatterns = [
  /\bcontinue\b/i,
  /\bbecoming\b/i,
  /\bdiscover\b/i,
  /\bchange\b/i,
  /\bgrow\b/i,
  /\breturn\b/i,
  /\bpossib/i,
  /\bwhen you are ready\b/i,
]

export function evaluateMirrorRule(message: DialogueDraft): MirrorRuleResult {
  if (message.speaker !== 'curator') {
    return {
      passed: true,
      checks: [],
    }
  }

  const text = message.text.trim()
  const checks: MirrorRuleCheck[] = [
    {
      principle: 'encourages-reflection',
      passed:
        reflectivePatterns.some((pattern) => pattern.test(text)) || text.includes('?'),
    },
    {
      principle: 'avoids-definition',
      passed: !definingPatterns.some((pattern) => pattern.test(text)),
    },
    {
      principle: 'leaves-interpretation',
      passed: reflectivePatterns.some((pattern) => pattern.test(text)),
    },
    {
      principle: 'shows-respect',
      passed: !disrespectfulPatterns.some((pattern) => pattern.test(text)),
    },
    {
      principle: 'ends-with-hope',
      passed: hopefulPatterns.some((pattern) => pattern.test(text)),
    },
  ]

  return {
    checks,
    passed: checks.every((check) => check.passed),
  }
}

export function createMirrorSafeFallback(): DialogueDraft {
  return {
    speaker: 'curator',
    text: 'This world may hold more than one meaning. I wonder what you may notice if you stay with the question and return when you are ready.',
  }
}
