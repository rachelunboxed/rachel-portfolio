import type { CaseStudy } from '../data/content';
import ProjectVideo from './ProjectVideo';
import Reveal from './Reveal';

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
  delay?: number;
};

export default function CaseStudyCard({ caseStudy, delay = 0 }: CaseStudyCardProps) {
  return (
    <Reveal delay={delay}>
      <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-gradient">
          {caseStudy.index} · {caseStudy.category}
        </p>
        <h3 className="mt-3 text-2xl font-bold text-navy">{caseStudy.title}</h3>

        <dl className="mt-6 space-y-5">
          {caseStudy.problem ? (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Problem</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-slate">{caseStudy.problem}</dd>
            </div>
          ) : null}

          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Role</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-slate">{caseStudy.role}</dd>
          </div>

          {caseStudy.highlights ? (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                What it does
              </dt>
              <dd className="mt-1.5">
                <ul className="space-y-1.5">
                  {caseStudy.highlights.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-from" />
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}

          {caseStudy.summary ? (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                What it does
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-slate">{caseStudy.summary}</dd>
            </div>
          ) : null}

          {caseStudy.outcome ? (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Outcome</dt>
              <dd className="mt-1.5 text-sm italic leading-relaxed text-muted">{caseStudy.outcome}</dd>
            </div>
          ) : null}
        </dl>

        {caseStudy.tools ? (
          <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
            {caseStudy.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-slate"
              >
                {tool}
              </span>
            ))}
          </div>
        ) : null}

        <ProjectVideo projectId={caseStudy.id} title={caseStudy.title} />
      </article>
    </Reveal>
  );
}
