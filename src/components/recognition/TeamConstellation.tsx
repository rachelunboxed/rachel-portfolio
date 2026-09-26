import { motion, useReducedMotion } from 'framer-motion';

const nodes = [
  { x: 60, y: 60, r: 14, delay: 0 },
  { x: 160, y: 30, r: 10, delay: 0.8 },
  { x: 260, y: 70, r: 16, delay: 1.6 },
  { x: 110, y: 130, r: 22, delay: 0.4, featured: true },
  { x: 220, y: 150, r: 12, delay: 1.2 },
  { x: 70, y: 210, r: 11, delay: 2 },
  { x: 190, y: 225, r: 15, delay: 0.6 },
];

const links = [
  [0, 3],
  [1, 3],
  [1, 2],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
];

export default function TeamConstellation() {
  const reduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 320 260" className="h-auto w-full max-w-sm text-warm-accent" aria-hidden="true">
      <defs>
        <linearGradient id="constellation-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--warm-accent)" />
          <stop offset="100%" stopColor="var(--warm-accent-2)" />
        </linearGradient>
      </defs>
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={node.featured ? 'url(#constellation-glow)' : 'currentColor'}
          fillOpacity={node.featured ? 1 : 0.35}
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
        />
      ))}
    </svg>
  );
}
