import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { hero, profile } from '../data/content';
import HeroVisual from './HeroVisual';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-slate) 1px, transparent 1px), linear-gradient(90deg, var(--color-slate) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-xs font-semibold tracking-[0.25em] text-gradient"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[44px] font-extrabold leading-[1.08] tracking-tight text-navy md:text-[64px] lg:text-[72px]"
          >
            {hero.headlineParts.map((part, i) =>
              part.highlight ? (
                <span key={i} className="text-gradient">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            <p className="text-xl font-bold text-navy">{profile.name}</p>
            <p className="text-sm font-medium text-muted">{profile.title}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate"
          >
            {hero.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-from/20 transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-accent-from hover:text-accent-from dark:border-white/20 dark:text-white"
            >
              {hero.secondaryCta.label}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
