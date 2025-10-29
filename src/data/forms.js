const createSampleQuestions = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: `sample-q-${index + 1}`,
    prompt: `Pregunta ${index + 1}: ¿Cuál es la respuesta correcta para el formulario de ejemplo?`,
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctOptionIndex: index % 4,
    explanation: `Para la pregunta ${index + 1}, la respuesta correcta es la opción ${String.fromCharCode(
      65 + (index % 4)
    )}. Personaliza este texto con la explicación de tu formulario.`
  }));

const createTrueFalseQuestions = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: `tf-q-${index + 1}`,
    prompt: `Verdadero o falso ${index + 1}: ajusta esta afirmación según tu temario específico.`,
    options: ['Verdadero', 'Falso'],
    correctOptionIndex: index % 2,
    explanation: `Amplía esta explicación para justificar por qué la respuesta correcta es ${index % 2 === 0 ? 'Verdadero' : 'Falso'}.`
  }));

export const forms = [
  {
    id: 'formulario-demo',
    title: 'Formulario de Ejemplo',
    description:
      'Formulario de muestra con 60 preguntas para demostrar el flujo de estudio. Reemplaza o complementa este contenido con tus propios formularios.',
    questions: createSampleQuestions(60),
    questionLimit: 50
  },
  {
    id: 'formulario-rapido',
    title: 'Repaso Rápido Verdadero/Falso',
    description: 'Plantilla ideal para evaluaciones rápidas de conceptos clave en formato verdadero/falso.',
    questions: createTrueFalseQuestions(40),
    questionLimit: 20
  }
];

export const DEFAULT_QUESTION_LIMIT = 50;
