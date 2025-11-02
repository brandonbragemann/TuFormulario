Base de datos (SQLite)
======================

- Motor: `expo-sqlite` (Android, iOS y Web compatibles).
- Esquema normalizado (v1):
  - `forms(id, title, description, question_limit)`
  - `questions(id, form_id, prompt, explanation, correct_index, sort_order)`
  - `options(id, question_id, text, sort_order)`
- Migración: si existe la tabla legacy `cuestionarios(...)`, se migra automáticamente a v1 en el primer arranque.
- Seed: si la BD está vacía, se cargan datos desde `src/data/forms.js`.

Archivos
- `src/db/database.js`: crea tablas, migra legacy y expone helpers.
- `src/hooks/useFormsData.js`: carga formularios desde BD (con fallback a datos locales ante error).

Respuesta correcta
- Se almacena en `questions.correct_index` (0..n) relativo al orden de `options`.

Instalación
- Ejecuta `npx expo install expo-sqlite` (o `npm install`).
