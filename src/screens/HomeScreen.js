import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ forms, onStartQuiz, styles }) => {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.title}>TuFormulario</Text>
      <Text style={styles.subtitle}>
        Selecciona uno de tus formularios y repásalo con cuestionarios configurables. Personaliza el
        contenido editando el archivo src/data/forms.js.
      </Text>
      {forms.map((form) => (
        <View key={form.id} style={styles.card}>
          <Text style={styles.cardTitle}>{form.title}</Text>
          <Text style={styles.cardDescription}>{form.description}</Text>
          <Text style={styles.cardMeta}>
            Total de preguntas disponibles: {form.questions.length}
          </Text>
          <Text style={styles.cardMeta}>
            Preguntas por sesión: {form.questionLimit ?? 'Todas las disponibles'}
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => onStartQuiz(form)}>
            <Text style={styles.primaryButtonText}>Comenzar cuestionario</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
