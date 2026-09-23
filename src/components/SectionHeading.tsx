import Reveal from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const mutedClass = tone === 'dark' ? 'text-slate-300' : 'text-muted';
  const titleClass = tone === 'dark' ? 'text-white' : 'text-navy';

  return (
    <Reveal className={isCenter ? 'text-center' : 'text-left'}>
      <div className={isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gradient">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={`text-[34px] leading-tight font-bold md:text-[48px] ${titleClass}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={`mt-4 text-base md:text-lg ${mutedClass}`}>{subtitle}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
