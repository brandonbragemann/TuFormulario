SQLite data layer
=================

- Engine: `expo-sqlite` (Android, iOS, Web compatible).
- Schema versions  
  - v1: `forms(id, title, description, question_limit)`, `questions(id, form_id, prompt, explanation, correct_index, sort_order)`, `options(id, question_id, text, sort_order)`.  
  - v2: adds `questions.topic` to tag each question with a study unit.  
  - v3: adds `questions.correct_indexes` (JSON array of option indexes) to support multi answer questions. `correct_index` is kept for backward compatibility and stores the first correct option.
- Migration: on first launch we migrate legacy data if a table named `cuestionarios` exists, then upgrade sequentially up to v3.
- Seeding: when the database is empty we load `src/data/forms.js`, which now includes `topic` and `correctOptionIndexes` per question.

Key modules
- `src/db/database.js`: migrations, seeding helpers, fetch helpers.
- `src/hooks/useFormsData.js`: ensures the database, seeds when empty, and falls back to local JSON on errors.

Evaluation rules
- Answers are correct when the sorted set of selected indexes matches `correct_indexes`. Partial matches count as incorrect so the corrections view can highlight them.

Setup
- Run `npm install` (or `npx expo install expo-sqlite`) before starting the app.
