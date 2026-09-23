import { philosophy, profile } from '../data/content';
import Reveal from './Reveal';

export default function Philosophy() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="relative mx-auto max-w-3xl text-center">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-display text-[140px] leading-none text-gradient opacity-15 md:text-[180px]"
            >
              &ldquo;
            </span>
            <blockquote className="relative text-2xl font-semibold leading-snug text-navy md:text-4xl">
              {philosophy.quote}
            </blockquote>
            <div className="mx-auto mt-8 h-px w-16 bg-gradient-accent" />
            <p className="mt-6 text-base font-bold text-navy">{profile.name}</p>
            <p className="text-sm font-medium text-muted">
              AI Product Manager • Agile Delivery Leader
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
