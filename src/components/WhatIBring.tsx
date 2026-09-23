import { whatIBring } from '../data/content';
import Reveal from './Reveal';

export default function WhatIBring() {
  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <div className="container-page">
        <Reveal>
          <h2 className="text-[34px] font-bold leading-tight md:text-[48px]">
            What I Bring to a Team
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatIBring.map((item, i) => (
            <Reveal key={item.number} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
                <span className="text-sm font-bold text-gradient">{item.number}</span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
