import { recognition } from '../../data/content';
import Reveal from '../Reveal';

export default function RecognitionQuote() {
  const { text, author, role } = recognition.quote;

  return (
    <div className="mt-28">
      <Reveal>
        <figure className="mx-auto max-w-4xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto block h-16 select-none overflow-hidden font-display text-[120px] leading-[1.1] text-warm-accent opacity-50 md:h-20 md:text-[150px]"
          >
            &ldquo;
          </span>
          <blockquote className="mt-3 font-display text-2xl font-semibold leading-snug text-navy md:text-[40px]">
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
