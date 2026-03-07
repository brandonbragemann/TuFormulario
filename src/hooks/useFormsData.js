import { useEffect, useState } from 'react';
import { ensureDatabase, seedFromFormsIfEmpty, fetchFormsFromDb } from '../db/database';
import { forms as sampleForms } from '../data/forms';

export const useFormsData = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        await ensureDatabase();
        await seedFromFormsIfEmpty(sampleForms);
        const dbForms = await fetchFormsFromDb();
        if (!cancelled) setForms(dbForms);
      } catch (e) {
        // On any DB error, fall back to in-memory forms
        if (!cancelled) {
          setError(e?.message || 'Error al cargar BD');
          setForms(sampleForms);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { forms, loading, error };
};

