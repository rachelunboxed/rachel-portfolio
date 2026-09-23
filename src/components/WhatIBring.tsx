import { whatIBring } from '../data/content';
import Reveal from './Reveal';

export default function WhatIBring() {
  return (
    <section className="bg-surface-2 py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <h2 className="text-[34px] font-bold leading-tight text-navy md:text-[48px]">
            What I Bring to a Team
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatIBring.map((item, i) => (
            <Reveal key={item.number} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5">
                <span className="text-sm font-bold text-gradient">{item.number}</span>
                <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
