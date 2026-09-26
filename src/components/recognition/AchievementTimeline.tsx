import { useState } from 'react';
import { Award, Flag, Maximize2, RefreshCcw, ShieldCheck, type LucideIcon } from 'lucide-react';
import { recognition, type TimelineEvent } from '../../data/content';
import { timelinePhotoUrlPath } from '../../data/recognitionMoments';
import { useAssetExists } from '../../hooks/useAssetExists';
import Reveal from '../Reveal';
import TimelineList from '../TimelineList';
import Lightbox from './Lightbox';

const eventIcons: Record<string, LucideIcon> = {
  'sprint-milestone': Flag,
  'production-achievement': ShieldCheck,
  'process-improvement': RefreshCcw,
  'client-recognition': Award,
};

function TimelineStep({ event, delay }: { event: TimelineEvent; delay: number }) {
  const Icon = eventIcons[event.id] ?? Flag;
  const src = `${import.meta.env.BASE_URL}${timelinePhotoUrlPath(event.id)}`;
  const hasPhoto = useAssetExists(src, 'image/');
  const [open, setOpen] = useState(false);

  return (
    <li className="relative pb-10 pl-16 last:pb-0">
      <span className="absolute left-0 top-1 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-warm-accent bg-warm-surface text-warm-ink">
        <Icon size={18} />
      </span>

      <Reveal delay={delay}>
        <div className="rounded-3xl border border-warm-border bg-warm-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-warm-accent/10">
          <h4 className="text-lg font-bold text-navy">{event.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-slate">{event.description}</p>

          {hasPhoto ? (
            <>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`View documentation for ${event.title}`}
                className="group relative mt-4 block w-full max-w-xs overflow-hidden rounded-2xl border border-warm-border"
              >
                <img src={src} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 size={15} />
                  </span>
                </span>
              </button>
              <Lightbox open={open} onClose={() => setOpen(false)} label={`${event.title} documentation`}>
                <img src={src} alt={`${event.title} documentation`} className="max-h-[80vh] w-full rounded-2xl object-contain" />
                <p className="mt-3 text-center text-sm text-white/90">{event.title}</p>
              </Lightbox>
            </>
          ) : null}
        </div>
      </Reveal>
    </li>
  );
}

export default function AchievementTimeline() {
  const { title, events } = recognition.timeline;

  return (
    <div className="mt-24">
      <Reveal>
        <h3 className="font-display text-[28px] font-bold leading-tight text-navy md:text-[36px]">
          {title}
        </h3>
      </Reveal>

      <TimelineList className="mt-10">
        {events.map((event, i) => (
          <TimelineStep key={event.id} event={event} delay={i * 0.05} />
        ))}
      </TimelineList>
    </div>
  );
}
