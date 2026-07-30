import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { AxaryReflectionEngine } from '../../systems/Reflection/ReflectionEngine'
import { useReflectionProfileStore } from '../../systems/Reflection/useReflectionProfileStore'
import { JourneyButton } from '../../ui/JourneyButton'
import { useJourneyStore } from '../Journey/useJourneyStore'
import { useLivingWorldStore } from '../LivingWorld/useLivingWorldStore'
import { journeyQuestions } from './questions'
import type { JourneyQuestion, QuestionAnswer } from './types'

interface QuestionnaireJourneyProps {
  reducedMotion: boolean
}

function isAnswerComplete(question: JourneyQuestion, answer?: QuestionAnswer) {
  if (question.optional) return true
  if (answer === undefined) return false
  if (typeof answer === 'string') return answer.trim().length > 0
  if (typeof answer === 'number') return true
  return answer.length >= (question.minSelections ?? 1)
}

export function QuestionnaireJourney({ reducedMotion }: QuestionnaireJourneyProps) {
  const answers = useJourneyStore((state) => state.answers)
  const answerQuestion = useJourneyStore((state) => state.answerQuestion)
  const completeQuestionnaire = useJourneyStore((state) => state.completeQuestionnaire)
  const currentQuestionIndex = useJourneyStore((state) => state.currentQuestionIndex)
  const nextQuestion = useJourneyStore((state) => state.nextQuestion)
  const previousQuestion = useJourneyStore((state) => state.previousQuestion)
  const recordQuestion = useLivingWorldStore((state) => state.recordQuestion)
  const setInterpretation = useReflectionProfileStore(
    (state) => state.setInterpretation,
  )
  const [isInterpreting, setIsInterpreting] = useState(false)
  const engine = useMemo(() => new AxaryReflectionEngine(), [])

  const question = journeyQuestions[currentQuestionIndex]
  const response = question ? answers[question.id] : undefined
  const isLastQuestion = currentQuestionIndex === journeyQuestions.length - 1
  const isComplete = question ? isAnswerComplete(question, response?.answer) : false

  if (!question) return null

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }

  const saveAnswer = (answer: QuestionAnswer) => {
    answerQuestion(question.id, answer)
    if (!response) recordQuestion(question.prompt)
  }

  const toggleOption = (optionId: string) => {
    const current = Array.isArray(response?.answer) ? response.answer : []
    if (current.includes(optionId)) {
      saveAnswer(current.filter((id) => id !== optionId))
      return
    }
    if (current.length < (question.maxSelections ?? Number.POSITIVE_INFINITY)) {
      saveAnswer([...current, optionId])
    }
  }

  const ranking =
    Array.isArray(response?.answer) && response.answer.length > 0
      ? response.answer
      : (question.options?.map((option) => option.id) ?? [])

  const moveRankedOption = (index: number, direction: -1 | 1) => {
    const destination = index + direction
    if (destination < 0 || destination >= ranking.length) return
    const nextRanking = [...ranking]
    const currentOption = nextRanking[index]
    const destinationOption = nextRanking[destination]
    if (!currentOption || !destinationOption) return
    nextRanking[index] = destinationOption
    nextRanking[destination] = currentOption
    saveAnswer(nextRanking)
  }

  const continueJourney = async () => {
    if (!isComplete) return
    if (!isLastQuestion) {
      nextQuestion()
      return
    }

    setIsInterpreting(true)
    const interpretation = await engine.reflect({
      conversations: [],
      memories: [],
      motivations: [],
      preferences: [],
      questionnaireResponses: Object.values(answers),
      recurringThemes: [],
      values: [],
    })
    setInterpretation(interpretation)
    completeQuestionnaire()
  }

  const renderOptions = () => {
    if (question.type === 'likert' && question.scale) {
      return (
        <div className="likert-field" role="radiogroup" aria-label={question.prompt}>
          <div className="likert-options">
            {Array.from({ length: question.scale.points }, (_, index) => index + 1).map(
              (value) => (
                <button
                  className="likert-option"
                  data-selected={response?.answer === value}
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={response?.answer === value}
                  onClick={() => saveAnswer(value)}
                >
                  <span>{value}</span>
                </button>
              ),
            )}
          </div>
          <div className="likert-labels">
            <span>{question.scale.lowLabel}</span>
            <span>{question.scale.highLabel}</span>
          </div>
        </div>
      )
    }

    if (question.type === 'reflection') {
      return (
        <label className="reflection-field">
          <span className="sr-only">Optional written reflection</span>
          <textarea
            rows={5}
            maxLength={600}
            value={typeof response?.answer === 'string' ? response.answer : ''}
            placeholder="You may leave this unwritten."
            onChange={(event) => saveAnswer(event.target.value)}
          />
          <small>This reflection remains private to this experience.</small>
        </label>
      )
    }

    if (question.type === 'ranking') {
      return (
        <div className="ranking-field">
          <ol className="ranking-options">
            {ranking.map((optionId, index) => {
              const option = question.options?.find(
                (candidate) => candidate.id === optionId,
              )
              if (!option) return null
              return (
                <li className="ranking-option" key={option.id}>
                  <span className="rank-number">{index + 1}</span>
                  <span>{option.label}</span>
                  <span className="rank-actions">
                    <button
                      type="button"
                      aria-label={`Move ${option.label} higher`}
                      disabled={index === 0}
                      onClick={() => moveRankedOption(index, -1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label={`Move ${option.label} lower`}
                      disabled={index === ranking.length - 1}
                      onClick={() => moveRankedOption(index, 1)}
                    >
                      ↓
                    </button>
                  </span>
                </li>
              )
            })}
          </ol>
          {!response && (
            <button
              className="keep-order-button"
              type="button"
              onClick={() => saveAnswer(ranking)}
            >
              This order feels true
            </button>
          )}
        </div>
      )
    }

    const isMultiple = question.type === 'multiple-choice'
    const selected = Array.isArray(response?.answer) ? response.answer : []

    return (
      <div
        className="answer-options"
        data-layout={question.type === 'symbol' ? 'symbols' : question.type}
      >
        {question.options?.map((option) => {
          const isSelected = isMultiple
            ? selected.includes(option.id)
            : response?.answer === option.id
          return (
            <button
              className="answer-option"
              data-selected={isSelected}
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              style={
                option.visual
                  ? ({ '--option-accent': option.visual.accent } as React.CSSProperties)
                  : undefined
              }
              onClick={() =>
                isMultiple ? toggleOption(option.id) : saveAnswer(option.id)
              }
            >
              {option.visual?.glyph && (
                <span className="answer-glyph" aria-hidden="true">
                  {option.visual.glyph}
                </span>
              )}
              <span>{option.label}</span>
              {option.description && <small>{option.description}</small>}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <section className="questionnaire" aria-labelledby="reflection-question">
      <p className="quiet-label">{question.category.replace('-', ' ')}</p>

      <AnimatePresence mode="wait">
        <motion.div
          className="question-stage"
          key={question.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={transition}
        >
          <h1 id="reflection-question">{question.prompt}</h1>
          {question.introduction && (
            <p className="question-introduction">{question.introduction}</p>
          )}
          {renderOptions()}
        </motion.div>
      </AnimatePresence>

      <div className="question-actions">
        <button
          className="text-button"
          type="button"
          disabled={currentQuestionIndex === 0}
          onClick={previousQuestion}
        >
          Previous reflection
        </button>
        <JourneyButton
          onClick={() => void continueJourney()}
          awakened={isComplete}
          disabled={!isComplete || isInterpreting}
        >
          {isLastQuestion
            ? isInterpreting
              ? 'Listening…'
              : 'Reveal My Worlds'
            : 'Continue'}
        </JourneyButton>
      </div>
    </section>
  )
}
