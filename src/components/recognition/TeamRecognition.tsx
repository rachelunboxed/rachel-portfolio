import { recognition } from '../../data/content';
import Reveal from '../Reveal';
import AchievementTimeline from './AchievementTimeline';
import BehindTheScenes from './BehindTheScenes';
import HowILead from './HowILead';
import PhilosophyStatement from './PhilosophyStatement';
import RecognitionMoments from './RecognitionMoments';
import RecognitionQuote from './RecognitionQuote';
import RecognitionWall from './RecognitionWall';
import TeamConstellation from './TeamConstellation';

export default function TeamRecognition() {
  const { eyebrow, title, subtitle, intro } = recognition;

  return (
    <section id="recognition" className="relative overflow-hidden bg-warm-bg py-24 md:py-32">
      <span
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-warm-accent/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -right-24 top-[40%] h-[26rem] w-[26rem] rounded-full bg-warm-accent-2/15 blur-3xl [animation-delay:-7s]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-ink">{eyebrow}</p>
            <h2 className="mt-3 text-[34px] font-bold leading-tight text-navy md:text-[48px]">{title}</h2>
            <p className="mt-4 text-lg text-slate md:text-xl">{subtitle}</p>
          </Reveal>
          <Reveal delay={0.15} className="hidden justify-self-center lg:col-span-2 lg:block">
            <TeamConstellation />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <blockquote className="relative mt-12 rounded-3xl border border-warm-border bg-warm-surface p-8 shadow-sm md:p-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-2 select-none font-display text-[90px] leading-none text-warm-accent opacity-30"
            >
              &ldquo;
            </span>
            <div className="relative space-y-4 text-base leading-relaxed text-slate md:text-lg">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </blockquote>
        </Reveal>

        <PhilosophyStatement />
        <RecognitionWall />
        <BehindTheScenes />
        <AchievementTimeline />
        <RecognitionMoments />
        <HowILead />
        <RecognitionQuote />
      </div>
    </section>
  );
}
