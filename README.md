# Rachel Relox — Portfolio

A premium, responsive personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Editing content

All copy, career history, skills, case studies, certifications, and contact info live in one file:

**[`src/data/content.ts`](src/data/content.ts)**

Components never hardcode text — they import from this file. Update the values there and every section updates automatically.

## Before publishing — action items

Search the codebase for `[ADD` to find every placeholder. Key ones:

- **Resume file**: `Download Resume` buttons link to `/resume.pdf`. Add your actual resume PDF at `public/resume.pdf`.
- **Contact email**: `profile.email` in `content.ts` is a placeholder. Once set, the contact form's "Send Message" button will open the visitor's email client pre-addressed to you. For a fully server-side form (no email client required), wire the form in `src/components/Contact.tsx` to a service like Formspree or EmailJS.
- **LinkedIn / GitHub URLs**: `profile.linkedin` / `profile.github` in `content.ts`.
- **Career Journey dates**: the four `careerJourney` entries in `content.ts` use a best-effort mapping onto Cognizant / the CBRE account / the Alaska Airlines program from your earlier draft. Verify the company/stage mapping and fill in the `[ADD DATES]` placeholders.
- **Certification years & credential IDs/URLs**: in the `certifications` array.
- **Case study details**: the three case studies in `content.ts` have `[ADD INFORMATION]` placeholders in their expandable-modal detail fields (context, stakeholders, role, challenges, solution, lessons learned) and `[Add measurable result]` outcome placeholders — fill these in with real specifics for the strongest impact.
- **Future certification card**: replace the placeholder name/provider/year once you have something to add.

## Project structure

```
src/
  data/content.ts       # All editable copy and structured content
  components/           # One component per section (Navbar, Hero, About, CareerTimeline, ...)
  hooks/                # useTheme (dark mode), useActiveSection (nav scroll-spy)
  index.css             # Design tokens (colors, fonts) + Tailwind v4 setup
```

Dark mode is class-based (`.dark` on `<html>`) and persisted to `localStorage`; light mode is the default for new visitors.
