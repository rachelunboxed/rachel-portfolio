import { careerJourney, careerJourneyNote } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function CareerTimeline() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          title="Experience Highlights"
          subtitle="Highlights from 22+ years of delivery."
        />

        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-xs italic text-muted">{careerJourneyNote}</p>
        </Reveal>

        <div className="relative mt-16">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-12">
            {careerJourney.map((stage, i) => {
              const isEven = i % 2 === 0;
              return (
                <li key={stage.id} className="relative md:grid md:grid-cols-2 md:gap-12">
                  <Reveal
                    delay={i * 0.08}
                    className={
                      isEven
                        ? 'md:col-start-1 md:row-start-1 md:text-right md:pr-12'
                        : 'md:col-start-2 md:row-start-1 md:pl-12'
                    }
                  >
                    <div className="relative pl-10 md:pl-0">
                      <span
                        className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent-from bg-surface md:top-1.5 ${
                          isEven ? 'md:left-auto md:-right-[calc(3rem+7px)]' : 'md:-left-[calc(3rem+7px)]'
                        }`}
                        aria-hidden="true"
                      />
                      <p className="text-xs font-semibold uppercase tracking-wider text-gradient">
                        {stage.order}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-navy">{stage.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate">{stage.company}</p>
                      <p className="text-xs font-medium text-muted">{stage.dates}</p>
                      {stage.note ? (
                        <p className="mt-3 text-sm italic leading-relaxed text-muted">{stage.note}</p>
                      ) : null}
                      <ul
                        className={`mt-4 flex flex-wrap gap-2 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        {stage.focus.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-slate"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
