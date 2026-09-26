import { Bot, Cpu, Sparkles, Workflow } from 'lucide-react';
import { aiSection } from '../data/content';
import Reveal from './Reveal';

const icons = [Sparkles, Bot, Cpu, Workflow];

export default function AISection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundImage: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))' }}
        aria-hidden="true"
      />
      <div className="container-page relative">
        <Reveal>
          <span className="inline-block rounded-full border border-accent-from/30 bg-accent-from/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-ink">
            {aiSection.label}
          </span>
          <h2 className="mt-5 max-w-2xl text-[32px] font-bold leading-tight text-navy md:text-[44px]">
            {aiSection.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">{aiSection.content}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiSection.cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={card.title} delay={0.1 + i * 0.08}>
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-accent-ink transition-colors group-hover:bg-gradient-accent group-hover:text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-navy">{card.title}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
