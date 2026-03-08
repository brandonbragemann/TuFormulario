import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ResultsDonutChart from '../components/ResultsDonutChart';
import GoogleLogo from '../components/GoogleLogo';

const MAX_HISTORY_ITEMS = 5;

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Sin registro';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'Sin registro';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month} ${hours}:${minutes}`;
};

const formatDuration = (totalSeconds = 0) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const ResultsScreen = ({ quiz, summary, attempts = [], onGoHome, styles }) => {
  const [showCorrections, setShowCorrections] = useState(false);
  const scorePercentage = summary.total === 0 ? 0 : Math.round((summary.correct / summary.total) * 100);
  const topicInsights = summary.topicInsights ?? [];
  const highlightedTopics = topicInsights.slice(0, 5);
  const formattedTime = useMemo(
    () => formatDuration(quiz?.elapsedSeconds ?? 0),
    [quiz?.elapsedSeconds]
  );
  const historyEntries = useMemo(
    () => (Array.isArray(attempts) ? attempts.slice(0, MAX_HISTORY_ITEMS) : []),
    [attempts]
  );

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.title}>Resultados</Text>
      <View style={styles.resultsSummaryCard}>
        <View style={styles.resultsSummaryHeader}>
          <View style={styles.resultsSummaryImage}>
            <GoogleLogo size={56} />
          </View>
          <View style={styles.resultsSummaryInfo}>
            <Text style={styles.resultsSummaryTitle}>{quiz?.title ?? 'Formulario'}</Text>
            <Text style={styles.resultsSummarySubtitle}>Intento completado</Text>
          </View>
        </View>
        <View style={styles.resultsSummaryStats}>
          <View style={styles.resultsSummaryStat}>
            <Text style={styles.resultsSummaryStatLabel}>Aciertos</Text>
            <Text style={styles.resultsSummaryStatValue}>{summary.correct}</Text>
          </View>
          <View style={styles.resultsSummaryStat}>
            <Text style={styles.resultsSummaryStatLabel}>Incorrectos</Text>
            <Text style={styles.resultsSummaryStatValue}>{summary.incorrect}</Text>
          </View>
          <View style={styles.resultsSummaryStat}>
            <Text style={styles.resultsSummaryStatLabel}>Tiempo</Text>
            <Text style={styles.resultsSummaryStatValue}>{formattedTime}</Text>
          </View>
          <View style={styles.resultsSummaryStat}>
            <Text style={styles.resultsSummaryStatLabel}>Puntaje</Text>
            <Text style={styles.resultsSummaryStatValue}>{scorePercentage}%</Text>
          </View>
        </View>
      </View>

      {!showCorrections && (
        <View style={styles.resultsChartWrapper}>
          <Text style={styles.resultsChartTitle}>Resumen visual</Text>
          <ResultsDonutChart correct={summary.correct} incorrect={summary.incorrect} />
          <View style={styles.resultsHistory}>
            <Text style={styles.resultsHistoryTitle}>Intentos anteriores</Text>
            {historyEntries.length === 0 ? (
              <Text style={styles.resultsHistoryEmpty}>
                AÃºn no registras intentos anteriores para este formulario.
              </Text>
            ) : (
              historyEntries.map((attempt) => (
                <View key={attempt.quizId} style={styles.resultsHistoryRow}>
                  <View style={styles.resultsHistoryRowLeft}>
                    <Text style={styles.resultsHistoryRowLabel}>
                      {attempt.formTitle ?? quiz?.title}
                    </Text>
                    <Text style={styles.resultsHistoryRowMeta}>
                      {formatTimestamp(attempt.completedAt)} - Tiempo {formatDuration(attempt.elapsedSeconds)}
                    </Text>
                  </View>
                  <View style={styles.resultsHistoryRowRight}>
                    <Text style={styles.resultsHistoryScore}>{attempt.percentage}%</Text>
                    <Text style={styles.resultsHistoryRowMeta}>
                      {attempt.correct}/{attempt.total} aciertos
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      )}

      {!showCorrections && (
        <View style={styles.topicInsightsCard}>
          <Text style={styles.topicInsightsTitle}>Temáticas a reforzar</Text>
          {highlightedTopics.length === 0 ? (
            <Text style={styles.cardDescription}>Aún no hay temáticas con resultados registrados.</Text>
          ) : (
            highlightedTopics.map((topic) => {
              const successRate = topic.total === 0 ? 0 : topic.correct / topic.total;
              return (
                <View key={topic.topic} style={styles.topicRow}>
                  <View style={styles.topicRowHeader}>
                    <Text style={styles.topicRowTitle}>{topic.topic}</Text>
                    <Text style={styles.topicRowCounter}>
                      {topic.incorrect} incorrectas · {topic.correct} correctas
                    </Text>
                  </View>
                  <View style={styles.topicRowBar}>
                    <View style={[styles.topicRowBarFill, { width: `${Math.round(successRate * 100)}%` }]} />
                  </View>
                  <Text style={styles.topicRowFooter}>
                    {topic.total} preguntas en total · Aciertos {Math.round(successRate * 100)}%
                  </Text>
                </View>
              );
            })
          )}
        </View>
      )}

      <View style={styles.actionsRow}>
        <Pressable
          style={[styles.secondaryButton, showCorrections && styles.secondaryButtonDisabled]}
          onPress={() => setShowCorrections(true)}
          disabled={showCorrections}
        >
          <Text style={styles.secondaryButtonText}>Ver correcciones</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onGoHome}>
          <Text style={styles.secondaryButtonText}>Finalizar</Text>
        </Pressable>
      </View>

      {showCorrections && (
        <>
          <Text style={[styles.subtitle, styles.sectionTitle]}>Correcciones</Text>
          {summary.mistakes.length === 0 ? (
            <Text style={styles.cardDescription}>Excelente! No hay respuestas incorrectas.</Text>
          ) : (
            summary.mistakes.map(({ question, response }) => (
              <View key={question.id} style={styles.card}>
                <Text style={styles.cardTitle}>{question.prompt}</Text>
                <Text style={styles.resultText}>
                  Tu respuesta:{' '}
                  {Array.isArray(response?.selectedIndexes) && response.selectedIndexes.length > 0
                    ? response.selectedIndexes
                        .map((idx) => question.options[idx])
                        .filter(Boolean)
                        .join(', ')
                    : 'Sin respuesta'}
                </Text>
                <Text style={styles.resultText}>
                  Respuesta correcta:{' '}
                  {(question.correctOptionIndexes || [question.correctOptionIndex])
                    .map((idx) => question.options[idx])
                    .filter(Boolean)
                    .join(', ')}
                </Text>
                <Text style={styles.cardDescription}>{question.explanation}</Text>
              </View>
            ))
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ResultsScreen;
