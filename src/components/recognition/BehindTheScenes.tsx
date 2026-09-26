import { Feather, Handshake, Link2, Puzzle, TrendingUp, type LucideIcon } from 'lucide-react';
import { recognition } from '../../data/content';
import Reveal from '../Reveal';

const icons: LucideIcon[] = [Puzzle, Link2, Feather, Handshake, TrendingUp];

export default function BehindTheScenes() {
  const { title, text, cards } = recognition.behindTheScenes;

  return (
    <div className="mt-24">
      <Reveal>
        <h3 className="font-display text-[28px] font-bold leading-tight text-navy md:text-[36px]">
          {title}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate md:text-lg">{text}</p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={card.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-warm-border bg-warm-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-warm-accent/10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-bg text-warm-ink">
                  <Icon size={18} />
                </span>
                <h4 className="mt-3 text-base font-bold text-navy">{card.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{card.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
