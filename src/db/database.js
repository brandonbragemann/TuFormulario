import * as SQLite from 'expo-sqlite';

// Normalized schema (v1)
// - forms(id INTEGER PK, title TEXT, description TEXT, question_limit INTEGER)
// - questions(id INTEGER PK, form_id INTEGER, prompt TEXT, explanation TEXT, correct_index INTEGER, sort_order INTEGER)
// - options(id INTEGER PK, question_id INTEGER, text TEXT, sort_order INTEGER)
// Legacy (v0): cuestionarios(quiz_name, pregunta, opcion1..4)

const DB_NAME = 'tuformulario.db';

const openDb = () => SQLite.openDatabase(DB_NAME);

const runMigrations = (tx) => {
  // user_version: 0 = legacy/unknown, 1 = normalized schema
  tx.executeSql('PRAGMA user_version');
  tx.executeSql(
    'PRAGMA user_version',
    [],
    (_, res) => {
      const userVersion = res?.rows?.item(0)?.user_version || 0;
      if (userVersion < 1) {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS forms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            question_limit INTEGER
          );`
        );
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            form_id INTEGER NOT NULL,
            prompt TEXT NOT NULL,
            explanation TEXT,
            correct_index INTEGER,
            sort_order INTEGER,
            FOREIGN KEY(form_id) REFERENCES forms(id) ON DELETE CASCADE
          );`
        );
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS options (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_id INTEGER NOT NULL,
            text TEXT NOT NULL,
            sort_order INTEGER,
            FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
          );`
        );
        tx.executeSql('PRAGMA user_version = 1');
      }
    }
  );
};

const tableExists = (tx, name) =>
  new Promise((resolve) => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
      [name],
      (_, r) => resolve(r.rows.length > 0),
      () => resolve(false)
    );
  });

export const ensureDatabase = () =>
  new Promise((resolve, reject) => {
    const db = openDb();
    db.transaction(
      (tx) => runMigrations(tx),
      (err) => reject(err),
      () => resolve()
    );
  });

const countForms = () =>
  new Promise((resolve, reject) => {
    const db = openDb();
    db.readTransaction(
      (tx) => {
        tx.executeSql('SELECT COUNT(*) as c FROM forms', [], (_, { rows }) =>
          resolve(rows.item(0).c || 0)
        );
      },
      (err) => reject(err)
    );
  });

const maybeMigrateFromLegacy = () =>
  new Promise((resolve, reject) => {
    const db = openDb();
    db.transaction(
      async (tx) => {
        runMigrations(tx);
        const hasLegacy = await tableExists(tx, 'cuestionarios');
        if (!hasLegacy) return;
        // If there are already forms, skip migration
        let already = false;
        tx.executeSql('SELECT COUNT(*) as c FROM forms', [], (_, r) => {
          already = (r.rows.item(0).c || 0) > 0;
        });
        tx.executeSql(
          'SELECT quiz_name, pregunta, opcion1, opcion2, opcion3, opcion4 FROM cuestionarios',
          [],
          (_, { rows }) => {
            if (already) return;
            const byName = new Map();
            for (let i = 0; i < rows.length; i += 1) {
              const r = rows.item(i);
              const options = [r.opcion1, r.opcion2, r.opcion3, r.opcion4].filter(
                (v) => v !== null && v !== undefined && String(v).length > 0
              );
              if (!byName.has(r.quiz_name)) byName.set(r.quiz_name, []);
              byName.get(r.quiz_name).push({ prompt: r.pregunta, options });
            }
            byName.forEach((questions, title) => {
              tx.executeSql(
                'INSERT INTO forms (title, description) VALUES (?, ?)',
                [title, 'Migrado desde tabla legacy'],
                (_, fRes) => {
                  const formId = fRes.insertId;
                  questions.forEach((q, qi) => {
                    tx.executeSql(
                      'INSERT INTO questions (form_id, prompt, explanation, correct_index, sort_order) VALUES (?, ?, ?, ?, ?)',
                      [formId, q.prompt, null, 0, qi],
                      (_, qRes) => {
                        const qId = qRes.insertId;
                        q.options.forEach((text, oi) => {
                          tx.executeSql(
                            'INSERT INTO options (question_id, text, sort_order) VALUES (?, ?, ?)',
                            [qId, text, oi]
                          );
                        });
                      }
                    );
                  });
                }
              );
            });
          }
        );
      },
      (err) => reject(err),
      () => resolve()
    );
  });

export const seedFromFormsIfEmpty = async (forms) => {
  await maybeMigrateFromLegacy();
  const count = await countForms().catch(() => 0);
  if (count > 0) return;

  await new Promise((resolve, reject) => {
    const db = openDb();
    db.transaction(
      (tx) => {
        forms.forEach((form, fi) => {
          tx.executeSql(
            'INSERT INTO forms (title, description, question_limit) VALUES (?, ?, ?)',
            [form.title, form.description || null, form.questionLimit ?? null],
            (_, fRes) => {
              const formId = fRes.insertId;
              (form.questions || []).forEach((q, qi) => {
                const correctIndex = typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0;
                tx.executeSql(
                  'INSERT INTO questions (form_id, prompt, explanation, correct_index, sort_order) VALUES (?, ?, ?, ?, ?)',
                  [formId, q.prompt, q.explanation || null, correctIndex, qi],
                  (_, qRes) => {
                    const qId = qRes.insertId;
                    (q.options || []).forEach((optText, oi) => {
                      tx.executeSql(
                        'INSERT INTO options (question_id, text, sort_order) VALUES (?, ?, ?)',
                        [qId, optText, oi]
                      );
                    });
                  }
                );
              });
            }
          );
        });
      },
      (err) => reject(err),
      () => resolve()
    );
  });
};

export const fetchFormsFromDb = () =>
  new Promise((resolve, reject) => {
    const db = openDb();
    db.readTransaction(
      (tx) => {
        tx.executeSql('SELECT * FROM forms', [], (_, formsRes) => {
          const forms = [];
          for (let i = 0; i < formsRes.rows.length; i += 1) forms.push(formsRes.rows.item(i));
          if (forms.length === 0) return resolve([]);

          const formIds = forms.map((f) => f.id);
          const placeholders = formIds.map(() => '?').join(',');
          tx.executeSql(
            `SELECT * FROM questions WHERE form_id IN (${placeholders}) ORDER BY sort_order ASC, id ASC`,
            formIds,
            (_, qRes) => {
              const questions = [];
              for (let i = 0; i < qRes.rows.length; i += 1) questions.push(qRes.rows.item(i));
              const qIds = questions.map((q) => q.id);
              if (qIds.length === 0) {
                const mapped = forms.map((f) => ({
                  id: String(f.id),
                  title: f.title,
                  description: f.description,
                  questionLimit: f.question_limit ?? undefined,
                  questions: []
                }));
                return resolve(mapped);
              }
              const qPlace = qIds.map(() => '?').join(',');
              tx.executeSql(
                `SELECT * FROM options WHERE question_id IN (${qPlace}) ORDER BY sort_order ASC, id ASC`,
                qIds,
                (_, oRes) => {
                  const options = [];
                  for (let i = 0; i < oRes.rows.length; i += 1) options.push(oRes.rows.item(i));
                  const optsByQ = new Map();
                  options.forEach((o) => {
                    if (!optsByQ.has(o.question_id)) optsByQ.set(o.question_id, []);
                    optsByQ.get(o.question_id).push(o);
                  });

                  const formsOut = forms.map((f) => {
                    const fQuestions = questions
                      .filter((q) => q.form_id === f.id)
                      .map((q) => {
                        const opts = (optsByQ.get(q.id) || []).sort(
                          (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
                        );
                        return {
                          id: String(q.id),
                          prompt: q.prompt,
                          options: opts.map((o) => o.text),
                          correctOptionIndex:
                            typeof q.correct_index === 'number' ? q.correct_index : 0,
                          explanation: q.explanation || null
                        };
                      });
                    return {
                      id: String(f.id),
                      title: f.title,
                      description: f.description,
                      questionLimit: f.question_limit ?? undefined,
                      questions: fQuestions
                    };
                  });
                  resolve(formsOut);
                }
              );
            }
          );
        });
      },
      (err) => reject(err)
    );
  });

// Backward-compatible insert: if form with title doesn't exist, creates it; inserts question + up to 4 opciones; correct = 0
export const insertQuestion = ({ quizName, pregunta, opciones }) =>
  new Promise((resolve, reject) => {
    const db = openDb();
    const opts = Array.isArray(opciones) ? opciones : [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT id FROM forms WHERE title = ? LIMIT 1',
          [quizName],
          (_, r) => {
            const ensure = (formId) => {
              tx.executeSql(
                'INSERT INTO questions (form_id, prompt, explanation, correct_index, sort_order) VALUES (?, ?, ?, ?, ?)',
                [formId, pregunta, null, 0, null],
                (_, qRes) => {
                  const qId = qRes.insertId;
                  const to4 = opts.slice(0, 4);
                  while (to4.length < 4) to4.push('');
                  to4.forEach((text, i) => {
                    tx.executeSql(
                      'INSERT INTO options (question_id, text, sort_order) VALUES (?, ?, ?)',
                      [qId, text, i]
                    );
                  });
                }
              );
            };
            if (r.rows.length > 0) {
              ensure(r.rows.item(0).id);
            } else {
              tx.executeSql(
                'INSERT INTO forms (title, description) VALUES (?, ?)',
                [quizName, null],
                (_, fRes) => ensure(fRes.insertId)
              );
            }
          }
        );
      },
      (err) => reject(err),
      () => resolve()
    );
  });

// New helpers for explicit normalized writes
export const insertForm = ({ title, description, questionLimit }) =>
  new Promise((resolve, reject) => {
    const db = openDb();
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO forms (title, description, question_limit) VALUES (?, ?, ?)',
          [title, description || null, questionLimit ?? null],
          (_, res) => resolve(res.insertId)
        );
      },
      (err) => reject(err)
    );
  });

export const insertQuestionWithOptions = ({
  formId,
  prompt,
  explanation,
  options,
  correctIndex = 0,
}) =>
  new Promise((resolve, reject) => {
    const db = openDb();
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO questions (form_id, prompt, explanation, correct_index, sort_order) VALUES (?, ?, ?, ?, ?)',
          [formId, prompt, explanation || null, correctIndex, null],
          (_, qRes) => {
            const qId = qRes.insertId;
            (options || []).forEach((text, i) => {
              tx.executeSql(
                'INSERT INTO options (question_id, text, sort_order) VALUES (?, ?, ?)',
                [qId, text, i]
              );
            });
            resolve(qId);
          }
        );
      },
      (err) => reject(err)
    );
  });

