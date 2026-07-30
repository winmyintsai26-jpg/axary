import { AnimatePresence, motion } from 'framer-motion'

import { JourneyButton } from '../../ui/JourneyButton'
import { useJourneyStore } from '../Journey/useJourneyStore'
import { journeyQuestions } from './questions'

interface QuestionnaireJourneyProps {
  reducedMotion: boolean
}

export function QuestionnaireJourney({ reducedMotion }: QuestionnaireJourneyProps) {
  const answers = useJourneyStore((state) => state.answers)
  const answerQuestion = useJourneyStore((state) => state.answerQuestion)
  const completeQuestionnaire = useJourneyStore((state) => state.completeQuestionnaire)
  const currentQuestionIndex = useJourneyStore((state) => state.currentQuestionIndex)
  const nextQuestion = useJourneyStore((state) => state.nextQuestion)
  const previousQuestion = useJourneyStore((state) => state.previousQuestion)

  const question = journeyQuestions[currentQuestionIndex]
  const response = question ? answers[question.id] : undefined
  const isLastQuestion = currentQuestionIndex === journeyQuestions.length - 1
  const selectedAnswer = typeof response?.answer === 'string' ? response.answer : null

  if (!question) return null

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }

  const continueJourney = () => {
    if (!response) return
    if (isLastQuestion) {
      completeQuestionnaire()
      return
    }
    nextQuestion()
  }

  return (
    <section className="questionnaire" aria-labelledby="reflection-question">
      <p className="quiet-label">A quiet question</p>

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
          <div className="answer-options">
            {question.options?.map((option) => {
              const isSelected = selectedAnswer === option.id
              return (
                <button
                  className="answer-option"
                  data-selected={isSelected}
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => answerQuestion(question.id, option.id)}
                >
                  <span>{option.label}</span>
                  {option.description && <small>{option.description}</small>}
                </button>
              )
            })}
          </div>
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
          onClick={continueJourney}
          awakened={Boolean(response)}
          disabled={!response}
        >
          {isLastQuestion ? 'Open the Book of Worlds' : 'Continue'}
        </JourneyButton>
      </div>
    </section>
  )
}
