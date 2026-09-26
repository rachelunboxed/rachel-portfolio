import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { contact, profile } from '../data/content';
import { GithubGlyph, LinkedinGlyph } from './BrandIcons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [sent, setSent] = useState(false);

  const emailConfigured = !profile.email.startsWith('[');
  const phoneConfigured = !profile.phone.startsWith('[');

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const to = emailConfigured ? profile.email : '';
    const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom ${form.name} (${form.email})`);

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
    setForm(initialState);
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="Get in touch" title={contact.title} subtitle={contact.text} />

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent-from"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange('email')}
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent-from"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange('subject')}
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent-from"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent-from"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Send Message
                <Send size={15} />
              </button>

              <p className="text-xs text-muted">
                {emailConfigured
                  ? 'Submitting opens your email client with this message pre-filled.'
                  : 'Contact email not yet configured. This form will open a blank email client until profile.email is set in src/data/content.ts, or a form service (e.g. Formspree) is connected.'}
              </p>

              {sent ? (
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Your email client should now be open with your message ready to send.
                </p>
              ) : null}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-5 rounded-2xl border border-border bg-surface-2/60 p-7">
              {emailConfigured ? (
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-accent-ink" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Email</p>
                    <p className="text-sm font-medium text-slate">{profile.email}</p>
                  </div>
                </div>
              ) : null}
              {phoneConfigured ? (
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 text-accent-ink" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Phone</p>
                    <p className="text-sm font-medium text-slate">{profile.phone}</p>
                  </div>
                </div>
              ) : null}
              <div className="flex items-start gap-3">
                <LinkedinGlyph size={18} className="mt-0.5 text-accent-ink" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">LinkedIn</p>
                  <p className="text-sm font-medium text-slate">{profile.linkedin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GithubGlyph size={18} className="mt-0.5 text-accent-ink" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">GitHub</p>
                  <p className="text-sm font-medium text-slate">{profile.github}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-accent-ink" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Location</p>
                  <p className="text-sm font-medium text-slate">{profile.location}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
