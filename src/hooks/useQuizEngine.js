import { useEffect, useMemo, useRef, useState } from 'react';

const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const normalizeCorrectIndexes = (question) => {
  if (Array.isArray(question.correctOptionIndexes) && question.correctOptionIndexes.length > 0) {
    return Array.from(
      new Set(
        question.correctOptionIndexes
          .map((value) => Number(value))
          .filter((value) => Number.isInteger(value) && value >= 0)
      )
    ).sort((a, b) => a - b);
  }
  if (typeof question.correctOptionIndex === 'number') {
    return [question.correctOptionIndex];
  }
  return [0];
};

const normalizeQuestion = (question) => {
  const correctOptionIndexes = normalizeCorrectIndexes(question);
  return {
    ...question,
    correctOptionIndexes,
    correctOptionIndex: correctOptionIndexes[0] ?? 0
  };
};

const buildQuiz = (form, questionLimit) => {
  const pool = Array.isArray(form.questions) ? form.questions : [];
  const questions = questionLimit ? shuffle(pool).slice(0, questionLimit) : shuffle(pool);

  return {
    formId: form.id,
    title: form.title,
    questions: questions.map((question) => normalizeQuestion(question)),
    createdAt: Date.now()
  };
};

const calculateSummary = (quiz, answers) => {
  if (!quiz) {
    return { total: 0, correct: 0, incorrect: 0, mistakes: [], topicInsights: [] };
  }

  let correct = 0;
  const mistakes = [];
  const topicStats = new Map();

  const sameSelection = (a = [], b = []) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  quiz.questions.forEach((question) => {
    const response = answers[question.id];
    const selectedIndexes = response?.selectedIndexes ?? [];
    const normalizedSelection = Array.from(new Set(selectedIndexes)).sort((a, b) => a - b);
    const isCorrect = sameSelection(normalizedSelection, question.correctOptionIndexes);
    if (isCorrect) {
      correct += 1;
    } else {
      const normalizedResponse = response
        ? { ...response, selectedIndexes: normalizedSelection }
        : { selectedIndexes: normalizedSelection };
      mistakes.push({ question, response: normalizedResponse });
    }

    const topic = question.topic || 'General';
    const entry = topicStats.get(topic) || { topic, total: 0, correct: 0, incorrect: 0 };
    entry.total += 1;
    if (isCorrect) {
      entry.correct += 1;
    } else {
      entry.incorrect += 1;
    }
    topicStats.set(topic, entry);
  });

  const incorrect = mistakes.length;
  const topicInsights = Array.from(topicStats.values()).sort((a, b) => {
    if (b.incorrect !== a.incorrect) return b.incorrect - a.incorrect;
    if (b.total !== a.total) return b.total - a.total;
    return a.topic.localeCompare(b.topic);
  });

  return {
    total: quiz.questions.length,
    correct,
    incorrect,
    mistakes,
    topicInsights
  };
};

export const useQuizEngine = (initialForm = null, questionLimit) => {
  const [form, setForm] = useState(initialForm);
  const [quiz, setQuiz] = useState(() =>
    initialForm ? buildQuiz(initialForm, questionLimit ?? initialForm.questionLimit) : null
  );
  const [answers, setAnswers] = useState({});
  const [screen, setScreen] = useState(initialForm ? 'quiz' : 'home');
  const [attemptHistory, setAttemptHistory] = useState({});
  const lastRecordedQuizId = useRef(null);

  const start = (nextForm) => {
    setForm(nextForm);
    setQuiz(buildQuiz(nextForm, questionLimit ?? nextForm.questionLimit));
    setAnswers({});
    setScreen('quiz');
  };

  const toggleOption = (questionId, optionIndex) => {
    setAnswers((prev) => {
      const previous = prev[questionId]?.selectedIndexes ?? [];
      const nextSet = new Set(previous);
      if (nextSet.has(optionIndex)) {
        nextSet.delete(optionIndex);
      } else {
        nextSet.add(optionIndex);
      }
      const nextSelection = Array.from(nextSet).sort((a, b) => a - b);

      if (nextSelection.length === 0) {
        const { [questionId]: _removed, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [questionId]: {
          selectedIndexes: nextSelection,
          timestamp: Date.now()
        }
      };
    });
  };

  const finish = (elapsedSeconds = 0) => {
    setScreen('results');
    setQuiz((prev) => (prev ? { ...prev, elapsedSeconds } : prev));
  };

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

  useEffect(() => {
    if (screen !== 'results' || !quiz || !quiz.formId) {
      return;
    }
    if (lastRecordedQuizId.current === quiz.createdAt) {
      return;
    }

    const snapshot = calculateSummary(quiz, answers);
    const attemptEntry = {
      quizId: quiz.createdAt,
      formId: quiz.formId,
      formTitle: quiz.title,
      completedAt: Date.now(),
      percentage: snapshot.total === 0 ? 0 : Math.round((snapshot.correct / snapshot.total) * 100),
      correct: snapshot.correct,
      incorrect: snapshot.incorrect,
      total: snapshot.total,
      elapsedSeconds: quiz.elapsedSeconds ?? 0
    };

    setAttemptHistory((prev) => {
      const previousAttempts = prev[quiz.formId] ?? [];
      const filtered = previousAttempts.filter((entry) => entry.quizId !== attemptEntry.quizId);
      return {
        ...prev,
        [quiz.formId]: [...filtered, attemptEntry]
      };
    });

    lastRecordedQuizId.current = quiz.createdAt;
  }, [answers, quiz, screen]);

  const summary = useMemo(() => calculateSummary(quiz, answers), [answers, quiz]);

  const currentFormAttempts = quiz?.formId ? attemptHistory[quiz.formId] ?? [] : [];
  const previousAttempts = useMemo(() => {
    const sorted = [...currentFormAttempts].sort(
      (a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0)
    );
    if (!quiz?.createdAt) {
      return sorted;
    }
    return sorted.filter((attempt) => attempt.quizId !== quiz.createdAt);
  }, [currentFormAttempts, quiz?.createdAt]);

  return {
    screen,
    quiz,
    answers,
    summary,
    attempts: previousAttempts,
    start,
    toggleOption,
    finish,
    restart,
    goHome
  };
};
