import { recognition } from '../../data/content';
import Reveal from '../Reveal';

export default function RecognitionQuote() {
  const { text, author, role } = recognition.quote;

  return (
    <div className="mt-28">
      <Reveal>
        <figure className="relative mx-auto max-w-4xl text-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[130px] leading-none text-warm-accent opacity-25 md:-top-24 md:text-[170px]"
          >
            &ldquo;
          </span>
          <blockquote className="relative font-display text-2xl font-semibold leading-snug text-navy md:text-[40px]">
            {text}
          </blockquote>
          <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-gradient-warm" />
          <figcaption className="mt-6">
            <p className="text-base font-bold text-navy">{author}</p>
            <p className="text-sm font-medium text-warm-ink">{role}</p>
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}
