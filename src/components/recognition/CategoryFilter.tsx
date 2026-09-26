type CategoryFilterProps = {
  categories: readonly string[];
  active: string | null;
  onChange: (category: string | null) => void;
  label: string;
};

export default function CategoryFilter({ categories, active, onChange, label }: CategoryFilterProps) {
  if (categories.length < 2) return null;

  const chip = (selected: boolean) =>
    `rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
      selected
        ? 'border-transparent bg-warm-strong text-white'
        : 'border-warm-border bg-warm-surface text-slate hover:border-warm-accent'
    }`;

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      <button type="button" aria-pressed={active === null} onClick={() => onChange(null)} className={chip(active === null)}>
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={active === category}
          onClick={() => onChange(active === category ? null : category)}
          className={chip(active === category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
