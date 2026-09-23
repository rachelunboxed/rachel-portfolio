import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { navLinks, profile } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import ThemeToggle from './ThemeToggle';

type NavbarProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((link) => link.href.replace('#', '')));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <a
          href="#home"
          className="font-display text-lg font-bold text-navy md:text-xl"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeId === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive ? 'text-navy' : 'text-muted hover:text-navy'
                }`}
              >
                {link.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-accent"
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-accent-from hover:text-accent-from dark:border-white/20 dark:text-white"
          >
            <Download size={15} />
            Download Resume
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-navy dark:text-white"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-surface lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-text hover:bg-surface-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 px-4 py-3 text-sm font-semibold text-navy dark:border-white/20 dark:text-white"
              >
                <Download size={15} />
                Download Resume
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
