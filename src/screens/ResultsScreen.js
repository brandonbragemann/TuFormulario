import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const ResultsScreen = ({ quiz, summary, onRestart, onGoHome, styles }) => {
  const scorePercentage = summary.total === 0 ? 0 : Math.round((summary.correct / summary.total) * 100);

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.title}>Resultados</Text>
      <View style={styles.card}>
        <Text style={styles.resultText}>Aciertos: {summary.correct}</Text>
        <Text style={styles.resultText}>Total: {summary.total}</Text>
        <Text style={styles.resultText}>Puntaje: {scorePercentage}%</Text>
      </View>

      <Text style={[styles.subtitle, styles.sectionTitle]}>Revisa tus respuestas</Text>
      {summary.mistakes.length === 0 ? (
        <Text style={styles.cardDescription}>¡Excelente! No hay respuestas incorrectas.</Text>
      ) : (
        summary.mistakes.map(({ question, response }) => (
          <View key={question.id} style={styles.card}>
            <Text style={styles.cardTitle}>{question.prompt}</Text>
            <Text style={styles.resultText}>
              Tu respuesta: {typeof response?.selectedIndex === 'number'
                ? question.options[response.selectedIndex]
                : 'Sin respuesta'}
            </Text>
            <Text style={styles.resultText}>
              Respuesta correcta: {question.options[question.correctOptionIndex]}
            </Text>
            <Text style={styles.cardDescription}>{question.explanation}</Text>
          </View>
        ))
      )}

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={onRestart}>
          <Text style={styles.secondaryButtonText}>Repetir cuestionario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onGoHome}>
          <Text style={styles.secondaryButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ResultsScreen;
