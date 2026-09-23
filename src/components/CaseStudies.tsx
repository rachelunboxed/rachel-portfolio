import { caseStudies } from '../data/content';
import CaseStudyCard from './CaseStudyCard';
import SectionHeading from './SectionHeading';

export default function CaseStudies() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          title="Featured Projects"
          subtitle="Products I've conceived, built, and shipped."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy, i) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
