import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { DEFAULT_QUESTION_LIMIT } from './src/data/forms';
import { useQuizEngine } from './src/hooks/useQuizEngine';
import { useFormsData } from './src/hooks/useFormsData';

export default function App() {
  const { forms, loading, error } = useFormsData();
  const { screen, quiz, summary, answers, start, toggleOption, finish, goHome } =
    useQuizEngine(null, DEFAULT_QUESTION_LIMIT);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      {screen === 'home' && (
        loading ? (
          <HomeLoading styles={styles} error={error} />
        ) : (
          <HomeScreen forms={forms} onStartQuiz={start} styles={styles} />
        )
      )}
      {screen === 'quiz' && quiz && (
        <QuizScreen
          quiz={quiz}
          answers={answers}
          onToggleOption={toggleOption}
          onFinish={finish}
          styles={styles}
        />
      )}
      {screen === 'results' && quiz && (
        <ResultsScreen quiz={quiz} summary={summary} onGoHome={goHome} styles={styles} />
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
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  quizHeaderInfo: {
    gap: 4
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white'
  },
  quizTimer: {
    fontSize: 12,
    color: '#D0D4E4'
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
  finishButton: {
    backgroundColor: '#EA580C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  finishButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  questionPrompt: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  questionHelper: {
    fontSize: 12,
    color: '#D0D4E4'
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
  quizActionsRow: {
    flexDirection: 'row',
    gap: 12
  },
  quizNextButton: {
    flex: 1,
    alignItems: 'center'
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12
  },
  resultText: {
    color: 'white',
    fontSize: 16
  },
  secondaryButtonDisabled: {
    opacity: 0.5
  },
  resultsChartWrapper: {
    backgroundColor: '#1A2136',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12
  },
  resultsChartTitle: {
    color: '#D0D4E4',
    fontSize: 16,
    fontWeight: '600'
  },
  topicInsightsCard: {
    backgroundColor: '#1A2136',
    borderRadius: 12,
    padding: 16,
    gap: 12
  },
  topicInsightsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  topicRow: {
    gap: 8
  },
  topicRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topicRowTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    paddingRight: 8
  },
  topicRowCounter: {
    color: '#D0D4E4',
    fontSize: 12
  },
  topicRowBar: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#27304A',
    overflow: 'hidden'
  },
  topicRowBarFill: {
    height: '100%',
    backgroundColor: '#22C55E'
  },
  topicRowFooter: {
    color: '#D0D4E4',
    fontSize: 12
  }
});

function HomeLoading({ styles, error }) {
  return (
    <View style={[styles.screenContainer, { justifyContent: 'center' }]}>
      <Text style={styles.subtitle}>
        {error ? `Cargando desde BD falló: ${error}. Usando datos locales...` : 'Cargando formularios...'}
      </Text>
    </View>
  );
}
