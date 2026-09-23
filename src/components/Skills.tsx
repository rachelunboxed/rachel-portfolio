import { skillsAndTools } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading title="Skills & Tools" />

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-3">
            {skillsAndTools.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-slate transition-colors hover:border-accent-from/50"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
