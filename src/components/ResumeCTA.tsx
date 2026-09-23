import { Download, Mail } from 'lucide-react';
import { profile, resumeCta } from '../data/content';
import Reveal from './Reveal';

export default function ResumeCTA() {
  return (
    <section className="bg-surface-2 py-24 md:py-28">
      <div className="container-page text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-[30px] font-bold leading-tight text-navy md:text-[42px]">
            {resumeCta.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate">{resumeCta.supporting}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-accent-from hover:text-accent-from dark:border-white/20 dark:text-white"
            >
              <Mail size={16} />
              Get In Touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
