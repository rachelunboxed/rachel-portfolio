import { useEffect, useState } from 'react';

// Static hosts (and Vite's preview server) can answer a missing file with a 200 HTML
// fallback, so the content type is checked as well as the status.
export function useAssetExists(src: string, typePrefix: string): boolean | null {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        const matches = res.ok && (res.headers.get('content-type') ?? '').startsWith(typePrefix);
        if (!cancelled) setExists(matches);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [src, typePrefix]);

  return exists;
}
