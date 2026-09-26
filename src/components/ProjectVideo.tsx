import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { useAssetExists } from '../hooks/useAssetExists';

type ProjectVideoProps = {
  projectId: string;
  title: string;
};

export default function ProjectVideo({ projectId, title }: ProjectVideoProps) {
  const [expanded, setExpanded] = useState(false);
  const src = `${import.meta.env.BASE_URL}media/projects/${projectId}.mp4`;
  const available = useAssetExists(src, 'video/');

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [expanded]);

  if (!available) return null;

  return (
    <>
      <div className="mt-6 border-t border-border pt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">POC Preview</p>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="group relative block w-full overflow-hidden rounded-xl border border-border"
          aria-label={`Expand POC video for ${title}`}
        >
          <video src={src} className="aspect-video w-full bg-black object-cover" muted preload="metadata" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 size={16} />
            </span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {expanded ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} POC video`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Close video"
                className="absolute -top-11 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:border-white/40"
              >
                <X size={16} />
              </button>
              <video src={src} className="w-full rounded-xl" controls autoPlay />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
