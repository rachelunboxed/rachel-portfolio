import { Briefcase } from 'lucide-react';
import { careerJourney, careerJourneyNote } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import TimelineList from './TimelineList';

export default function CareerTimeline() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Career"
          title="Experience Highlights"
          subtitle="Highlights from 22+ years of delivery."
        />

        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-xs italic text-muted">{careerJourneyNote}</p>
        </Reveal>

        <TimelineList className="mt-14">
          {careerJourney.map((stage, i) => (
            <li key={stage.id} className="relative pb-10 pl-16 last:pb-0">
              <span className="absolute left-0 top-1 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-warm-accent bg-surface text-warm-ink">
                <Briefcase size={18} />
              </span>

              <Reveal delay={i * 0.04}>
                <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-warm-accent/10 md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gradient">{stage.order}</p>
                    <p className="text-xs font-medium text-muted">{stage.dates}</p>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-navy">{stage.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate">{stage.company}</p>
                  {stage.note ? (
                    <p className="mt-3 text-sm leading-relaxed text-slate">{stage.note}</p>
                  ) : null}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {stage.focus.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-warm-border bg-warm-bg px-3 py-1 text-xs font-medium text-warm-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </TimelineList>
      </div>
    </section>
  );
}
