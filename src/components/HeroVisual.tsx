import { motion } from 'framer-motion';

type Node = {
  label: string;
  x: number;
  y: number;
};

const nodes: Node[] = [
  { label: 'BUSINESS', x: 250, y: 70 },
  { label: 'CUSTOMER', x: 430, y: 250 },
  { label: 'TEAM', x: 250, y: 430 },
  { label: 'TECHNOLOGY', x: 70, y: 250 },
];

const center = { x: 250, y: 250 };

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      <svg
        viewBox="0 0 500 500"
        className="h-full w-full"
        role="img"
        aria-label="Diagram showing Product at the center, connected to Business, Customer, Technology, and Team"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {nodes.map((node, i) => (
          <motion.line
            key={`line-${node.label}`}
            x1={center.x}
            y1={center.y}
            x2={node.x}
            y2={node.y}
            stroke="url(#lineGradient)"
            strokeWidth={1.5}
            strokeOpacity={0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: 'easeInOut' }}
          />
        ))}

        {nodes.map((node, i) => (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={46}
              className="fill-surface stroke-border"
              strokeWidth={1.5}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate text-[11px] font-semibold tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx={center.x} cy={center.y} r={72} fill="url(#lineGradient)" opacity={0.12} />
          <circle
            cx={center.x}
            cy={center.y}
            r={62}
            className="fill-surface stroke-accent-from"
            strokeWidth={2}
          />
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-navy text-[15px] font-bold tracking-wide"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            PRODUCT
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
