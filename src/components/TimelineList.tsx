import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function TimelineList({ children, className = '' }: { children: ReactNode; className?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={listRef} className={`relative max-w-4xl ${className}`}>
      <span aria-hidden="true" className="absolute bottom-6 left-5 top-6 w-0.5 -translate-x-1/2 bg-warm-border" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: fill, transformOrigin: 'top' }}
        className="absolute bottom-6 left-5 top-6 w-0.5 -translate-x-1/2 bg-gradient-warm"
      />
      {children}
    </ol>
  );
}
