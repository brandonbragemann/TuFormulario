import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import GoogleLogo from '../components/GoogleLogo';

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
          <View style={styles.cardHeader}>
            <View style={styles.cardLogoContainer}>
              <GoogleLogo size={56} />
            </View>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{form.title}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{form.description}</Text>
          <Text style={styles.cardMeta}>
            Total de preguntas disponibles: {form.questions.length}
          </Text>
          <Text style={styles.cardMeta}>
            Preguntas por sesión: {form.questionLimit ?? 'Todas las disponibles'}
          </Text>
          <Pressable style={styles.primaryButton} onPress={() => onStartQuiz(form)}>
            <Text style={styles.primaryButtonText}>Comenzar cuestionario</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
