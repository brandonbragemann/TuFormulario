import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import QuestionTimeline from '../components/QuestionTimeline';

const QuizScreen = ({ quiz, answers, onToggleOption, onFinish, styles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quiz.questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id];
  const selectedIndexes = currentAnswer?.selectedIndexes ?? [];
  const hasSelection = selectedIndexes.length > 0;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const progressValue = (currentIndex + 1) / quiz.questions.length;
  const canGoBack = currentIndex > 0;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [questionElapsedSeconds, setQuestionElapsedSeconds] = useState(0);
  const timerRef = useRef(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [questionLogs, setQuestionLogs] = useState([]);
  const { width } = useWindowDimensions();
  const isStackedLayout = width < 900;

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setElapsedSeconds(0);
    setQuestionElapsedSeconds(0);
    timerRef.current = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
      setQuestionElapsedSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [quiz?.createdAt]);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswerFeedback(null);
    if (quiz?.questions) {
      setQuestionLogs(
        quiz.questions.map((question) => ({
          questionId: question.id,
          timeSeconds: 0,
          isCorrect: null
        }))
      );
    } else {
      setQuestionLogs([]);
    }
    setQuestionElapsedSeconds(0);
  }, [quiz?.createdAt, quiz?.questions]);

  useEffect(() => {
    setQuestionElapsedSeconds(0);
  }, [currentIndex]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const normalizeSelection = (indexes = []) =>
    Array.from(new Set(indexes)).sort((a, b) => a - b);

  const isSameSelection = (selectionA = [], selectionB = []) => {
    if (selectionA.length !== selectionB.length) {
      return false;
    }
    for (let i = 0; i < selectionA.length; i += 1) {
      if (selectionA[i] !== selectionB[i]) {
        return false;
      }
    }
    return true;
  };

  const buildFeedbackForQuestion = (question, selection) => {
    const normalizedSelection = normalizeSelection(selection);
    const normalizedCorrect = normalizeSelection(question.correctOptionIndexes);
    const isCorrect = isSameSelection(normalizedSelection, normalizedCorrect);
    return {
      questionId: question.id,
      prompt: question.prompt,
      isCorrect,
      correctOptionTexts: normalizedCorrect
        .map((index) => question.options[index])
        .filter(Boolean),
      selectedOptionTexts: normalizedSelection
        .map((index) => question.options[index])
        .filter(Boolean),
      explanation: question.explanation
    };
  };

  const captureCurrentQuestionStats = (feedback = null) => {
    setQuestionLogs((prev) => {
      if (!Array.isArray(prev) || prev.length === 0) {
        return prev;
      }
      return prev.map((entry) => {
        if (!entry || entry.questionId !== currentQuestion.id) {
          return entry;
        }
        const additionalSeconds = questionElapsedSeconds;
        const accumulatedTime = Math.max(0, (entry.timeSeconds ?? 0) + additionalSeconds);
        return {
          ...entry,
          timeSeconds: accumulatedTime,
          isCorrect: feedback ? feedback.isCorrect : entry.isCorrect
        };
      });
    });
  };

  const finalizeQuiz = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onFinish(elapsedSeconds);
  };

  const goToNext = () => {
    if (!hasSelection) {
      return;
    }
    const feedback = buildFeedbackForQuestion(currentQuestion, selectedIndexes);
    setAnswerFeedback(feedback);
    captureCurrentQuestionStats(feedback);
    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
    } else {
      finalizeQuiz();
    }
  };

  const goToPrevious = () => {
    if (canGoBack) {
      captureCurrentQuestionStats();
      setAnswerFeedback(null);
      setCurrentIndex((index) => index - 1);
    }
  };

  const handleFinish = () => {
    const feedback = hasSelection ? buildFeedbackForQuestion(currentQuestion, selectedIndexes) : null;
    captureCurrentQuestionStats(feedback);
    if (feedback) {
      setAnswerFeedback(feedback);
    }
    finalizeQuiz();
  };

  const shouldShowFeedback =
    answerFeedback && answerFeedback.questionId !== currentQuestion.id;

  return (
    <View style={styles.quizContainer}>
      <View style={styles.quizHeader}>
        <View style={styles.quizHeaderInfo}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <Text style={styles.quizTimer}>Tiempo: {formatTime(elapsedSeconds)}</Text>
        </View>
        <Pressable
          style={styles.finishButton}
          onPress={handleFinish}
          accessibilityRole="button"
          accessibilityLabel="Finalizar cuestionario"
        >
          <Text style={styles.finishButtonText}>Finalizar</Text>
        </Pressable>
      </View>
      <Text style={styles.quizProgress}>
        Progreso: {currentIndex + 1} / {quiz.questions.length}
      </Text>
      <ProgressBar progress={progressValue} />
      <View style={[styles.quizBody, isStackedLayout && styles.quizBodyStacked]}>
        <View style={styles.quizMainColumn}>
          {shouldShowFeedback && (
            <View
              style={[
                styles.feedbackCard,
                answerFeedback.isCorrect ? styles.feedbackCardCorrect : styles.feedbackCardIncorrect
              ]}
              accessibilityLiveRegion="polite"
            >
              <Text style={styles.feedbackTitle}>
                {answerFeedback.isCorrect ? 'Respuesta correcta' : 'Respuesta incorrecta'}
              </Text>
              {!answerFeedback.isCorrect && (
                <View style={styles.feedbackSection}>
                  <Text style={styles.feedbackLabel}>Tu respuesta</Text>
                  <Text style={styles.feedbackIncorrectOption}>
                    {answerFeedback.selectedOptionTexts?.length > 0
                      ? answerFeedback.selectedOptionTexts.join(', ')
                      : 'Sin respuesta'}
                  </Text>
                  <Text style={styles.feedbackLabel}>Respuesta esperada</Text>
                  <Text style={styles.feedbackCorrectOption}>
                    {answerFeedback.correctOptionTexts.join(', ')}
                  </Text>
                </View>
              )}
              {answerFeedback.explanation && (
                <Text style={styles.feedbackExplanation}>{answerFeedback.explanation}</Text>
              )}
            </View>
          )}
          <View style={styles.questionCard}>
            <Text style={styles.questionPrompt}>{currentQuestion.prompt}</Text>
            {currentQuestion.correctOptionIndexes.length > 1 && (
              <Text style={styles.questionHelper}>Selecciona todas las respuestas correctas</Text>
            )}
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentAnswer?.selectedIndexes?.includes(index);
              return (
                <Pressable
                  key={`${currentQuestion.id}-${index}`}
                  style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                  onPress={() => onToggleOption(currentQuestion.id, index)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text
                    style={[styles.optionButtonText, isSelected && styles.optionButtonTextSelected]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.quizActionsRow}>
            <Pressable
              style={[styles.secondaryButton, !canGoBack && styles.secondaryButtonDisabled]}
              disabled={!canGoBack}
              onPress={goToPrevious}
              accessibilityRole="button"
              accessibilityLabel="Volver a la pregunta anterior"
            >
              <Text style={styles.secondaryButtonText}>Anterior</Text>
            </Pressable>
            <Pressable
              style={[
                styles.primaryButton,
                styles.quizNextButton,
                !hasSelection && styles.primaryButtonDisabled
              ]}
              disabled={!hasSelection}
              onPress={goToNext}
              accessibilityRole="button"
              accessibilityLabel="Ir a la siguiente pregunta"
            >
              <Text style={styles.primaryButtonText}>{isLastQuestion ? 'Finalizar' : 'Siguiente'}</Text>
            </Pressable>
          </View>
        </View>
        <QuestionTimeline
          logs={questionLogs}
          currentIndex={currentIndex}
          currentQuestionSeconds={questionElapsedSeconds}
          formatTime={formatTime}
          styles={styles}
          isStacked={isStackedLayout}
        />
      </View>
    </View>
  );
};

export default QuizScreen;
