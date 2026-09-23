import { Award } from 'lucide-react';
import { certifications } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading title="Certifications" />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-accent text-white">
                  <Award size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold leading-snug text-navy">{cert.name}</h3>
                <p className="mt-2 text-sm text-muted">{cert.provider}</p>
                <p className="mt-1 text-xs font-medium text-muted">{cert.year}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
