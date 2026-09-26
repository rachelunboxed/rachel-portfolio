import { Eye, Gift, HeartHandshake, PartyPopper, type LucideIcon } from 'lucide-react';
import { recognition } from '../../data/content';
import Reveal from '../Reveal';

const icons: LucideIcon[] = [Eye, PartyPopper, HeartHandshake, Gift];

export default function HowILead() {
  const { title, statements } = recognition.howILead;

  return (
    <div className="mt-24">
      <Reveal>
        <h3 className="font-display text-[28px] font-bold leading-tight text-navy md:text-[36px]">
          {title}
        </h3>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {statements.map((statement, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={statement.title} delay={i * 0.08}>
              <div className="flex h-full gap-5 rounded-3xl border border-warm-border bg-warm-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-warm-accent/10">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-warm text-white">
                  <Icon size={22} />
                </span>
                <div>
                  <h4 className="text-lg font-bold text-navy">{statement.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{statement.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
