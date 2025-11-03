import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import ProgressBar from '../components/ProgressBar';

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
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const goToNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
    } else {
      handleFinish();
    }
  };

  const goToPrevious = () => {
    if (canGoBack) {
      setCurrentIndex((index) => index - 1);
    }
  };

  const handleFinish = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onFinish(elapsedSeconds);
  };

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
          style={[styles.primaryButton, styles.quizNextButton, !hasSelection && styles.primaryButtonDisabled]}
          disabled={!hasSelection}
          onPress={goToNext}
          accessibilityRole="button"
          accessibilityLabel="Ir a la siguiente pregunta"
        >
          <Text style={styles.primaryButtonText}>{isLastQuestion ? 'Finalizar' : 'Siguiente'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default QuizScreen;
