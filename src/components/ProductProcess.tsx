import { productProcess } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function ProductProcess() {
  return (
    <section className="bg-surface-2/60 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading title="From Problem to Product" align="center" />

        <div className="relative mt-16">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {productProcess.map((step, i) => (
              <Reveal key={step.stage} delay={i * 0.08}>
                <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-accent text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-navy">{step.stage}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
