import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ImageBackground } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { DEFAULT_QUESTION_LIMIT } from './src/data/forms';
import { useQuizEngine } from './src/hooks/useQuizEngine';
import { useFormsData } from './src/hooks/useFormsData';

export default function App() {
  const { forms, loading, error } = useFormsData();
  const { screen, quiz, summary, answers, attempts, start, toggleOption, finish, goHome } =
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
        <View style={styles.quizWrapper}>
          <View style={styles.gcpBackground} />
          <QuizScreen
            quiz={quiz}
            answers={answers}
            onToggleOption={toggleOption}
            onFinish={finish}
            styles={styles}
          />
        </View>
      )}
      {screen === 'results' && quiz && (
        <ResultsScreen
          quiz={quiz}
          summary={summary}
          attempts={attempts}
          onGoHome={goHome}
          styles={styles}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F1419'
  },
  quizWrapper: {
    flex: 1,
    position: 'relative'
  },
  gcpBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0F1419',
    pointerEvents: 'none'
  },
  screenContainer: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
    backgroundColor: '#0F1419'
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(66, 133, 244, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  subtitle: {
    fontSize: 16,
    color: '#B0BEC5'
  },
  sectionTitle: {
    marginTop: 16
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4285F4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8
  },
  cardLogoContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8
  },
  cardTitleContainer: {
    flex: 1
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#202124'
  },
  cardDescription: {
    fontSize: 14,
    color: '#5F6368'
  },
  cardMeta: {
    fontSize: 12,
    color: '#80868B'
  },
  primaryButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  primaryButtonDisabled: {
    opacity: 0.6
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  secondaryButton: {
    backgroundColor: 'rgba(66, 133, 244, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4285F4'
  },
  secondaryButtonText: {
    color: '#4285F4',
    fontWeight: '500'
  },
  quizContainer: {
    flex: 1,
    padding: 24,
    gap: 16,
    zIndex: 1,
    backgroundColor: '#0F1419'
  },
  quizBody: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    marginTop: 16
  },
  quizBodyStacked: {
    flexDirection: 'column'
  },
  quizMainColumn: {
    flex: 1,
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
    color: '#FFFFFF',
    textShadowColor: 'rgba(66, 133, 244, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3
  },
  quizTimer: {
    fontSize: 12,
    color: '#B0BEC5'
  },
  quizProgress: {
    fontSize: 14,
    color: '#B0BEC5'
  },
  questionCard: {
    backgroundColor: 'rgba(26, 33, 54, 0.9)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#EA4335',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  feedbackCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    gap: 8,
    borderLeftWidth: 4
  },
  feedbackCardCorrect: {
    backgroundColor: 'rgba(52, 168, 83, 0.2)',
    borderLeftColor: '#34A853'
  },
  feedbackCardIncorrect: {
    backgroundColor: 'rgba(234, 67, 53, 0.2)',
    borderLeftColor: '#EA4335'
  },
  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  feedbackLabel: {
    color: '#B0BEC5',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  feedbackSection: {
    marginTop: 4,
    gap: 4
  },
  feedbackCorrectOption: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500'
  },
  feedbackIncorrectOption: {
    color: '#FFCDD2',
    fontSize: 14,
    fontWeight: '500'
  },
  feedbackExplanation: {
    color: '#B0BEC5',
    fontSize: 13,
    lineHeight: 18
  },
  finishButton: {
    backgroundColor: '#EA4335',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#EA4335',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  finishButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  questionPrompt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  questionHelper: {
    fontSize: 12,
    color: '#81C784',
    fontStyle: 'italic'
  },
  optionButton: {
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#4285F4'
  },
  optionButtonSelected: {
    backgroundColor: '#4285F4',
    borderColor: '#1A73E8'
  },
  optionButtonText: {
    color: '#4285F4',
    fontWeight: '500'
  },
  optionButtonTextSelected: {
    fontWeight: '700',
    color: 'white'
  },
  quizActionsRow: {
    flexDirection: 'row',
    gap: 12
  },
  quizNextButton: {
    flex: 1,
    alignItems: 'center'
  },
  timelineContainer: {
    width: 170,
    backgroundColor: 'rgba(26, 33, 54, 0.85)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
    flexShrink: 0,
    maxHeight: '100%'
  },
  timelineContainerStacked: {
    width: '100%',
    marginTop: 16
  },
  timelineTitle: {
    color: '#B0BEC5',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  timelineList: {
    flexGrow: 1
  },
  timelineListContent: {
    gap: 8,
    paddingBottom: 4,
    paddingTop: 4
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48
  },
  timelineBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#4A4F58',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  timelineBadgeCorrect: {
    borderColor: '#34A853',
    backgroundColor: 'rgba(52, 168, 83, 0.15)'
  },
  timelineBadgeIncorrect: {
    borderColor: '#EA4335',
    backgroundColor: 'rgba(234, 67, 53, 0.15)'
  },
  timelineBadgeActive: {
    borderColor: '#FBBC04'
  },
  timelineBadgeText: {
    color: '#FFFFFF',
    fontWeight: '600'
  },
  timelineTime: {
    color: '#FFFFFF',
    fontSize: 14
  },
  timelineTimeMuted: {
    color: '#5F6368'
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
    backgroundColor: 'rgba(26, 33, 54, 0.8)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 2,
    borderTopColor: '#34A853'
  },
  resultsSummaryCard: {
    backgroundColor: 'rgba(26, 33, 54, 0.9)',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4285F4'
  },
  resultsSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  resultsSummaryImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 20, 25, 0.6)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultsSummaryInfo: {
    flex: 1
  },
  resultsSummaryTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },
  resultsSummarySubtitle: {
    color: '#B0BEC5',
    fontSize: 12
  },
  resultsSummaryStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between'
  },
  resultsSummaryStat: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: 'rgba(15, 20, 25, 0.7)',
    borderRadius: 8,
    padding: 12,
    gap: 4
  },
  resultsSummaryStatLabel: {
    color: '#B0BEC5',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  resultsSummaryStatValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },
  resultsChartTitle: {
    color: '#B0BEC5',
    fontSize: 16,
    fontWeight: '600'
  },
  resultsHistory: {
    width: '100%',
    backgroundColor: 'rgba(15, 20, 25, 0.6)',
    borderRadius: 12,
    padding: 12,
    gap: 8
  },
  resultsHistoryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  resultsHistoryEmpty: {
    color: '#B0BEC5',
    fontSize: 14
  },
  resultsHistoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(26, 33, 54, 0.6)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 12
  },
  resultsHistoryRowLeft: {
    flex: 1,
    gap: 2
  },
  resultsHistoryRowRight: {
    alignItems: 'flex-end',
    minWidth: 96
  },
  resultsHistoryRowLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500'
  },
  resultsHistoryRowMeta: {
    color: '#B0BEC5',
    fontSize: 12
  },
  resultsHistoryScore: {
    color: '#34A853',
    fontSize: 20,
    fontWeight: '700'
  },
  topicInsightsCard: {
    backgroundColor: 'rgba(26, 33, 54, 0.8)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FBBC04'
  },
  topicInsightsTitle: {
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    paddingRight: 8
  },
  topicRowCounter: {
    color: '#B0BEC5',
    fontSize: 12
  },
  topicRowBar: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: 'rgba(66, 133, 244, 0.2)',
    overflow: 'hidden'
  },
  topicRowBarFill: {
    height: '100%',
    backgroundColor: '#34A853'
  },
  topicRowFooter: {
    color: '#B0BEC5',
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
