import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from '../components/ProgressBar';

const QuizScreen = ({ quiz, answers, onSelectOption, onFinish, styles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quiz.questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const progressValue = (currentIndex + 1) / quiz.questions.length;

  const goToNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
    } else {
      onFinish();
    }
  };

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.quizTitle}>{quiz.title}</Text>
      <Text style={styles.quizProgress}>
        Progreso: {currentIndex + 1} / {quiz.questions.length}
      </Text>
      <ProgressBar progress={progressValue} />
      <View style={styles.questionCard}>
        <Text style={styles.questionPrompt}>{currentQuestion.prompt}</Text>
        {currentQuestion.options.map((option, index) => {
          const isSelected = currentAnswer?.selectedIndex === index;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
              onPress={() => onSelectOption(currentQuestion.id, index)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[styles.optionButtonText, isSelected && styles.optionButtonTextSelected]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        style={[styles.primaryButton, !currentAnswer && styles.primaryButtonDisabled]}
        disabled={!currentAnswer}
        onPress={goToNext}
      >
        <Text style={styles.primaryButtonText}>{isLastQuestion ? 'Finalizar' : 'Siguiente'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizScreen;
