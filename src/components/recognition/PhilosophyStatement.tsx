import { Eye, PartyPopper, Users, type LucideIcon } from 'lucide-react';
import { recognition } from '../../data/content';
import Reveal from '../Reveal';

const principleIcons: LucideIcon[] = [Users, Eye, PartyPopper];

export default function PhilosophyStatement() {
  const { statement, principles } = recognition.philosophy;

  return (
    <div className="mt-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-warm-strong px-8 py-12 text-white shadow-xl shadow-warm-accent/20 md:px-14 md:py-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-white/10"
          />
          <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Leadership Philosophy
          </p>
          <p className="relative mt-5 max-w-4xl font-display text-[26px] font-bold leading-snug md:text-[38px]">
            {statement}
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {principles.map((principle, i) => {
          const Icon = principleIcons[i % principleIcons.length];
          return (
            <Reveal key={principle.title} delay={0.1 + i * 0.08}>
              <div className="h-full rounded-3xl border border-warm-border bg-warm-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-warm-accent/10">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-warm text-white">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{principle.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
