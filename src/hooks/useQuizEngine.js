import { useMemo, useState } from 'react';

const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildQuiz = (form, questionLimit) => {
  const questions = questionLimit
    ? shuffle(form.questions).slice(0, questionLimit)
    : shuffle(form.questions);

  return {
    formId: form.id,
    title: form.title,
    questions,
    createdAt: Date.now()
  };
};

export const useQuizEngine = (initialForm = null, questionLimit) => {
  const [form, setForm] = useState(initialForm);
  const [quiz, setQuiz] = useState(() =>
    initialForm ? buildQuiz(initialForm, questionLimit ?? initialForm.questionLimit) : null
  );
  const [answers, setAnswers] = useState({});
  const [screen, setScreen] = useState(initialForm ? 'quiz' : 'home');

  const start = (nextForm) => {
    setForm(nextForm);
    setQuiz(buildQuiz(nextForm, questionLimit ?? nextForm.questionLimit));
    setAnswers({});
    setScreen('quiz');
  };

  const selectOption = (questionId, selectedIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selectedIndex,
        timestamp: Date.now()
      }
    }));
  };

  const finish = () => setScreen('results');

  const restart = () => {
    if (!form) return;
    setQuiz(buildQuiz(form, questionLimit ?? form.questionLimit));
    setAnswers({});
    setScreen('quiz');
  };

  const goHome = () => {
    setScreen('home');
    setForm(null);
    setQuiz(null);
    setAnswers({});
  };

  const summary = useMemo(() => {
    if (!quiz) {
      return { total: 0, correct: 0, mistakes: [] };
    }

    let correct = 0;
    const mistakes = [];

    quiz.questions.forEach((question) => {
      const response = answers[question.id];
      if (response?.selectedIndex === question.correctOptionIndex) {
        correct += 1;
      } else {
        mistakes.push({ question, response });
      }
    });

    return {
      total: quiz.questions.length,
      correct,
      mistakes
    };
  }, [answers, quiz]);

  return {
    screen,
    quiz,
    answers,
    summary,
    start,
    selectOption,
    finish,
    restart,
    goHome
  };
};
