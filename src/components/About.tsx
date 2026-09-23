import { Compass, Handshake, TrendingUp } from 'lucide-react';
import { about } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const icons = [Compass, Handshake, TrendingUp];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading title={about.title} subtitle={about.intro} />

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="space-y-5">
              {about.narrative.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-slate">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-surface-2/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gradient">
                {about.outsideOfWork.label}
              </p>
              <p className="mt-2 text-base text-slate">{about.outsideOfWork.text}</p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:col-span-2">
            {about.cards.map((card, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={card.title} delay={0.15 + i * 0.1}>
                  <div className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-accent text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-navy">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
