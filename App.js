import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { forms, DEFAULT_QUESTION_LIMIT } from './src/data/forms';
import { useQuizEngine } from './src/hooks/useQuizEngine';

export default function App() {
  const { screen, quiz, summary, answers, start, selectOption, finish, restart, goHome } =
    useQuizEngine(null, DEFAULT_QUESTION_LIMIT);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      {screen === 'home' && <HomeScreen forms={forms} onStartQuiz={start} styles={styles} />}
      {screen === 'quiz' && quiz && (
        <QuizScreen
          quiz={quiz}
          answers={answers}
          onSelectOption={selectOption}
          onFinish={finish}
          styles={styles}
        />
      )}
      {screen === 'results' && quiz && (
        <ResultsScreen quiz={quiz} summary={summary} onRestart={restart} onGoHome={goHome} styles={styles} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101524'
  },
  screenContainer: {
    flexGrow: 1,
    padding: 24,
    gap: 16
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#D0D4E4'
  },
  sectionTitle: {
    marginTop: 16
  },
  card: {
    backgroundColor: '#1A2136',
    borderRadius: 12,
    padding: 16,
    gap: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  cardDescription: {
    fontSize: 14,
    color: '#B8BED2'
  },
  cardMeta: {
    fontSize: 12,
    color: '#8490A8'
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  primaryButtonDisabled: {
    opacity: 0.6
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  secondaryButton: {
    backgroundColor: '#27304A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: '500'
  },
  quizContainer: {
    flex: 1,
    padding: 24,
    gap: 16
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white'
  },
  quizProgress: {
    fontSize: 14,
    color: '#D0D4E4'
  },
  questionCard: {
    backgroundColor: '#1A2136',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    flex: 1
  },
  questionPrompt: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  optionButton: {
    backgroundColor: '#27304A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  optionButtonSelected: {
    backgroundColor: '#4F46E5'
  },
  optionButtonText: {
    color: 'white'
  },
  optionButtonTextSelected: {
    fontWeight: '700'
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12
  },
  resultText: {
    color: 'white',
    fontSize: 16
  }
});
