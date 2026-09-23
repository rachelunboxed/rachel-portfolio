import { trustStrip } from '../data/content';
import Reveal from './Reveal';

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface-2/60 py-8">
      <Reveal>
        <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustStrip.map((item) => (
            <span
              key={item}
              className="text-xs font-semibold uppercase tracking-wider text-muted md:text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
