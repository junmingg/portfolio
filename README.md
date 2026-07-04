# Jun Ming Chen — Portfolio

A modern, glassmorphism-inspired personal portfolio with a light/dark theme, built as a fast
single-page React app. It leads with projects and impact, and demonstrates reactive, animated UI.

**Live:** https://junmingg.github.io/portfolio/

<!-- Optional: drop a screenshot at docs/preview.png and uncomment
![Preview](docs/preview.png)
-->

## Features

- **Light / dark theme** with a soft off-white and a warm near-black (not pure white/black), persisted
  to `localStorage` with a no-flash inline script.
- **Glassmorphism** surfaces tuned per theme (backdrop blur, hairline borders, subtle highlights).
- **Reactive, animated** sections — staggered scroll reveals, hover states, and layout animations via
  Framer Motion.
- **Projects-first** information architecture with category filtering.
- **Theme-aware company logos** and content-driven sections (experience, education, certifications, skills).
- **Host-agnostic deploy** — the same build runs on Vercel (root) and GitHub Pages (subpath).

## Tech stack

| Area | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first theming) |
| Components | shadcn/ui-style components on Radix primitives (accordion, dialog, tabs) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Fonts | Fraunces (display), Geist (body), JetBrains Mono (technical) |

## Getting started

```bash
npm install
npm run dev        # start the dev server at http://localhost:5173
```

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

## Editing content

Content is separated from components — edit the typed data modules in `src/data/` (no JSX changes needed):

| File | Contains |
|---|---|
| `src/data/site.ts` | Name, role, tagline, About paragraphs, socials, nav |
| `src/data/projects.ts` | Projects + categories |
| `src/data/experience.ts` | Work experience (with theme-aware logos) |
| `src/data/education.ts` | Schools, coursework, certifications, skills |

## Deployment

The base path is host-agnostic via `VITE_BASE` (see `vite.config.ts`):

- **Vercel / root domain** — no config needed; base defaults to `/`.
- **GitHub Pages (project site)** — build with the repo subpath:
  ```bash
  VITE_BASE=/portfolio/ npm run build
  ```
  The included GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) builds with this base and
  deploys to Pages. In the repo, set **Settings → Pages → Source: GitHub Actions**.

## Project structure

```
src/
  main.tsx, App.tsx, index.css      # entry + Tailwind theme tokens + .glass utility
  components/                       # Navbar, Hero, Projects, Experience, About, Contact, Footer, ...
  components/ui/                    # shadcn-style primitives (button, badge, tabs, accordion, ...)
  data/                             # site, projects, experience, education (typed content)
  hooks/use-theme.tsx               # ThemeProvider + useTheme
  assets/                           # logos + project media
public/                             # resume.pdf, favicons, .nojekyll
```

## License

Code is available under the MIT License. Personal content — copy, résumé, images, and branding — is
© Chen Jun Ming and not licensed for reuse.
