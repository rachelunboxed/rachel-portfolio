import { footer, profile } from '../data/content';
import { GithubGlyph, LinkedinGlyph } from './BrandIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-2 py-14">
      <div className="container-page">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold text-navy">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">{profile.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{footer.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate transition-colors hover:text-navy"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.linkedin.startsWith('[') ? '#contact' : profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-slate transition-colors hover:border-accent-from hover:text-navy"
            >
              <LinkedinGlyph size={16} />
            </a>
            <a
              href={profile.github.startsWith('[') ? '#contact' : profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-slate transition-colors hover:border-accent-from hover:text-navy"
            >
              <GithubGlyph size={16} />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {year} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
