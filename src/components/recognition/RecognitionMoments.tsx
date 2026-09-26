import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, MessageCircleHeart } from 'lucide-react';
import { recognition, recognitionCategories } from '../../data/content';
import { formatMomentDate, type RecognitionMoment } from '../../data/recognitionMoments';
import { useRecognitionMoments } from '../../hooks/useRecognitionMoments';
import Reveal from '../Reveal';
import CategoryFilter from './CategoryFilter';
import Lightbox from './Lightbox';

const imageSrc = (moment: RecognitionMoment) =>
  moment.image ? `${import.meta.env.BASE_URL}${moment.image}` : undefined;

function MomentMeta({ moment }: { moment: RecognitionMoment }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-warm-ink">
        {moment.kind} · {formatMomentDate(moment.date)}
      </p>
      <h4 className="mt-1.5 text-base font-bold text-navy">{moment.project}</h4>
      <p className="mt-2 text-sm leading-relaxed text-slate">{moment.context}</p>
      {moment.categories.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {moment.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-warm-border bg-warm-bg px-2.5 py-0.5 text-[11px] font-medium text-warm-ink"
            >
              {category}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default function RecognitionMoments() {
  const moments = useRecognitionMoments();
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<RecognitionMoment | null>(null);

  if (moments.length === 0) return null;

  const presentCategories = recognitionCategories.filter((category) =>
    moments.some((moment) => moment.categories.includes(category)),
  );
  const visible = active ? moments.filter((moment) => moment.categories.includes(active)) : moments;
  const selectedSrc = selected ? imageSrc(selected) : undefined;

  return (
    <div className="mt-24">
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h3 className="font-display text-[28px] font-bold leading-tight text-navy md:text-[36px]">
            {recognition.moments.title}
          </h3>
          <CategoryFilter
            categories={presentCategories}
            active={active}
            onChange={setActive}
            label="Filter recognition moments by category"
          />
        </div>
      </Reveal>

      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((moment) => {
            const src = imageSrc(moment);
            return (
              <motion.article
                key={moment.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-3xl border border-warm-border bg-warm-surface shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-warm-accent/10"
              >
                {src ? (
                  <button
                    type="button"
                    onClick={() => setSelected(moment)}
                    aria-label={`Expand ${moment.kind} from ${moment.project}`}
                    className="group relative block w-full"
                  >
                    <img
                      src={src}
                      alt={`${moment.kind} from ${moment.project}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize2 size={16} />
                      </span>
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-warm-bg px-6 py-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-warm text-white">
                      <MessageCircleHeart size={18} />
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <MomentMeta moment={moment} />
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        open={selected !== null}
        onClose={() => setSelected(null)}
        label={selected ? `${selected.kind} from ${selected.project}` : 'Recognition moment'}
      >
        {selected && selectedSrc ? (
          <div className="overflow-hidden rounded-3xl bg-warm-surface">
            <img
              src={selectedSrc}
              alt={`${selected.kind} from ${selected.project}`}
              className="max-h-[70vh] w-full bg-black/10 object-contain"
            />
            <div className="p-6">
              <MomentMeta moment={selected} />
            </div>
          </div>
        ) : null}
      </Lightbox>
    </div>
  );
}
