import { useEffect, useState } from 'react';
import {
  MOMENTS_MANIFEST_URL_PATH,
  parseMoments,
  sortMoments,
  type RecognitionMoment,
} from '../data/recognitionMoments';

export function useRecognitionMoments(): RecognitionMoment[] {
  const [moments, setMoments] = useState<RecognitionMoment[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}${MOMENTS_MANIFEST_URL_PATH}`, { cache: 'no-cache' })
      .then((res) => (res.ok ? res.json() : []))
      .then((raw) => {
        if (!cancelled) setMoments(sortMoments(parseMoments(raw)));
      })
      .catch(() => {
        // A missing or unreadable manifest just means there are no moments to show.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return moments;
}
