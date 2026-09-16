# Cedar — Personal Portfolio

Personal portfolio site for Ayorinde Joshua Adeyemi (Cedar) — Software Engineer & AI Generalist. Built with Next.js, TypeScript, and Tailwind CSS v4.

**Live:** [cedar.dev](https://cedar.dev) *(update with actual URL)*

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, expertise, selected work, experience, contact |
| `/about` | Background, education, values, AI capabilities, full skill set |
| `/projects` | Filterable project gallery with detail modals |

---

## Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 with custom design tokens
- **Fonts** — Plus Jakarta Sans (sans), Instrument Serif (serif) via `next/font`
- **Icons** — Simple Icons CDN (skill grid)
- **Deployment** — Vercel

---

## Design Tokens

Defined in `app/globals.css`. Key tokens:

| Token | Value | Usage |
|---|---|---|
| `bg` | `#0B0B18` | Page background |
| `surface` | `#13131F` | Card backgrounds |
| `gold` | `#C9A227` | Accent colour |
| `body` | `#F0EDE6` | Primary text |
| `muted` | `#8A8A9A` | Secondary text |
| `border` | `#2A2A3A` | Borders |

---

## Project Structure

```
app/
  layout.tsx              # Root layout, metadata, fonts
  page.tsx                # Home page (RSC)
  about/
    page.tsx              # About page (RSC)
  projects/
    page.tsx              # Projects page wrapper (RSC, exports metadata)
    ProjectsPageClient.tsx # Interactive filter + modal (client component)

components/
  Nav.tsx                 # Responsive nav, active state, mobile drawer
  Hero.tsx                # Home hero section
  ScrollingMarquee.tsx    # Tech ticker + project card strip
  StatsRow.tsx            # Key stats
  WhatIDo.tsx             # Services / expertise cards
  SelectedWork.tsx        # Home project grid + detail modal
  ExperienceTimeline.tsx  # Work history timeline
  AICapabilities.tsx      # AI specialisations grid
  SkillsGrid.tsx          # Skill categories with Simple Icons
  ValuesBlock.tsx         # Principles cards
  Footer.tsx              # Contact CTA + footer links

lib/
  data.ts                 # Single source of truth — all typed content

public/
  icon.png                # Favicon + nav/footer logo
  portrait.png            # Hero portrait
```

---

## Data Layer

All site content lives in `lib/data.ts` as typed constants. To update projects, skills, education milestones, values, or AI specialisations, edit that file — every page that consumes the data updates automatically.

```ts
// Exported constants
projects: Project[]
skillCategories: SkillCategory[]        // includes icon slug per skill
valuePrinciples: ValuePrinciple[]
aiSpecialisations: AISpecialisation[]
educationMilestones: EducationMilestone[]
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Deployment

Deploys to Vercel. Push to `main` triggers a production deployment automatically. No environment variables required for the base site.

---

## License

Personal portfolio — all rights reserved. Code structure is reference only; content, copy, and imagery belong to Ayorinde Joshua Adeyemi.
