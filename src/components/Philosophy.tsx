import { philosophy, profile } from '../data/content';
import Reveal from './Reveal';

export default function Philosophy() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden="true"
              className="mx-auto block h-16 select-none overflow-hidden font-display text-[120px] leading-[1.1] text-gradient opacity-40 md:h-20 md:text-[150px]"
            >
              &ldquo;
            </span>
            <blockquote className="mt-3 text-2xl font-semibold leading-snug text-navy md:text-4xl">
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
