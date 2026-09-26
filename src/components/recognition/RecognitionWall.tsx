import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LifeBuoy, Users, type LucideIcon } from 'lucide-react';
import { recognition, recognitionCategories } from '../../data/content';
import Reveal from '../Reveal';
import CategoryFilter from './CategoryFilter';

const avatarIcons: Record<string, LucideIcon> = {
  'production-support-team': LifeBuoy,
  'scrum-team': Users,
};

const labelClass = 'text-xs font-semibold uppercase tracking-wider text-warm-ink';

export default function RecognitionWall() {
  const { title, cards } = recognition.wall;
  const [active, setActive] = useState<string | null>(null);

  const presentCategories = recognitionCategories.filter((category) =>
    cards.some((card) => card.categories.includes(category)),
  );
  const visible = active ? cards.filter((card) => card.categories.includes(active)) : cards;

  return (
    <div className="mt-24">
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h3 className="font-display text-[28px] font-bold leading-tight text-navy md:text-[36px]">
            {title}
          </h3>
          <CategoryFilter
            categories={presentCategories}
            active={active}
            onChange={setActive}
            label="Filter the recognition wall by category"
          />
        </div>
      </Reveal>

      <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((card) => {
            const Icon = avatarIcons[card.id] ?? Users;
            return (
              <motion.article
                key={card.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col rounded-3xl border border-warm-border bg-warm-surface p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-warm-accent/10"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-warm text-white">
                    <Icon size={24} />
                  </span>
                  <div>
                    <p className={labelClass}>Team</p>
                    <h4 className="text-xl font-bold text-navy">{card.team}</h4>
                  </div>
                </div>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className={labelClass}>What they did</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-slate">{card.did}</dd>
                  </div>
                  <div>
                    <dt className={labelClass}>Why it mattered</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-slate">{card.why}</dd>
                  </div>
                  <div>
                    <dt className={labelClass}>Recognition</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-warm-border bg-warm-bg px-3 py-1 text-xs font-medium text-warm-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
