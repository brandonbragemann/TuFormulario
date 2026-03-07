import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ResultsDonutChart from '../components/ResultsDonutChart';

const ResultsScreen = ({ quiz, summary, onGoHome, styles }) => {
  const [showCorrections, setShowCorrections] = useState(false);
  const scorePercentage = summary.total === 0 ? 0 : Math.round((summary.correct / summary.total) * 100);
  const topicInsights = summary.topicInsights ?? [];
  const highlightedTopics = topicInsights.slice(0, 5);

  const formattedTime = useMemo(() => {
    const totalSeconds = quiz?.elapsedSeconds ?? 0;
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [quiz?.elapsedSeconds]);

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.title}>Resultados</Text>
      <View style={styles.card}>
        <Text style={styles.resultText}>Aciertos: {summary.correct}</Text>
        <Text style={styles.resultText}>Incorrectos: {summary.incorrect}</Text>
        <Text style={styles.resultText}>Tiempo: {formattedTime}</Text>
        <Text style={styles.resultText}>Puntaje: {scorePercentage}%</Text>
      </View>

      {!showCorrections && (
        <View style={styles.resultsChartWrapper}>
          <Text style={styles.resultsChartTitle}>Resumen visual</Text>
          <ResultsDonutChart correct={summary.correct} incorrect={summary.incorrect} />
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
