# Design Document — Portfolio Enhancement

## Overview

This document describes the architecture and implementation plan for the six enhancement groups defined in `requirements.md`. All work is contained within the existing Next.js (v16/App Router) + React 19 + Tailwind CSS v4 + TypeScript project. No new runtime dependencies are introduced. The design language — dark `#0B0B18` background, gold `#C9A227` accent, Plus Jakarta Sans + Instrument Serif — is maintained exactly as established.

---

## Architecture

### Page and Component Map

```
app/
├── layout.tsx          (unchanged — shared RootLayout for all pages)
├── page.tsx            (home — minor additions: Section CTAs)
├── about/
│   └── page.tsx        (new — AboutPage)
└── projects/
    └── page.tsx        (new — ProjectsPage)

components/
├── Nav.tsx             (modified — multi-page routing + active state)
├── Hero.tsx            (modified — add "About me →" CTA)
├── WhatIDo.tsx         (modified — add "See full experience →" CTA)
├── SelectedWork.tsx    (modified — add "View all projects →" CTA)
├── ExperienceTimeline.tsx  (modified — dead token fixes)
├── Footer.tsx          (modified — dead token fixes)
├── SkillsGrid.tsx      (new)
├── ValuesBlock.tsx     (new)
├── AICapabilities.tsx  (new)
└── ProjectsFilter.tsx  (new)
```

### Routing Strategy

The site uses the Next.js App Router. The home page (`/`) is a single-page-application style view with anchor-scroll navigation. Two new pages (`/about`, `/projects`) are true route pages. The `RootLayout` in `app/layout.tsx` is unchanged and wraps all three pages uniformly, providing consistent fonts, metadata defaults, and global CSS.

Navigation awareness is achieved via Next.js `usePathname()` hook in the Nav component. No client-side routing library is added — standard `next/link` `<Link>` handles all cross-page navigation.

### Data Architecture

All content data (projects, experience, skills, values, AI capabilities, education) is co-located as typed constant arrays within the component or page file that owns it. No external data-fetching layer, CMS, or API is needed for these static content enhancements. The projects data array is lifted from `SelectedWork.tsx` into a shared `lib/data.ts` file so both the home-page `SelectedWork` component and the `ProjectsPage` consume the same source of truth.

```
lib/
└── data.ts    (new — exports: projects, experiences, skills, values, aiCapabilities, education)
```

---

## Component Interfaces

### `lib/data.ts` — Shared Data Contracts

```typescript
export type Project = {
  number: string
  title: string
  category: string
  role: string
  stack: string[]
  liveUrl: string | null
  problem: string
  solution: string
  outcome: string | null
  badge: string | null
  accentFrom: string
  accentTo: string
}

export type SkillCategory = {
  label: string          // e.g. "Frontend"
  skills: string[]       // e.g. ["React", "Next.js", "Tailwind CSS"]
}

export type ValuePrinciple = {
  number: string         // "01" | "02" | "03"
  title: string
  body: string           // 2–3 sentence elaboration
}

export type AISpecialisation = {
  title: string          // e.g. "RAG Pipeline Design"
  descriptor: string     // 1-sentence description
}

export type EducationMilestone = {
  institution: string
  credential: string
  yearRange: string      // e.g. "2017 — 2019"
}

export const projects: Project[]
export const skillCategories: SkillCategory[]
export const valuePrinciples: ValuePrinciple[]
export const aiSpecialisations: AISpecialisation[]
export const educationMilestones: EducationMilestone[]
```

### `components/Nav.tsx` (Modified)

```typescript
// Key behaviour:
// - Reads pathname via usePathname()
// - On "/": renders anchor-scroll links + "About" and "Projects" page links
// - On "/about" or "/projects": renders "Home", "About", "Projects" page links only
// - Active page link receives gold underline + text-gold class
// - Mobile drawer updates to match whichever link set is active

type NavLink =
  | { kind: 'anchor'; href: string; label: string }   // scroll links for home
  | { kind: 'page';   href: string; label: string }   // route links for pages

function Nav(): JSX.Element
```

### `components/SkillsGrid.tsx` (New)

```typescript
type Props = {
  categories: SkillCategory[]
}
// Renders N category sections. Each section: category label (gold mono) +
// flex-wrap row of tag chips (border border-border rounded-full px-3 py-1).
// No proficiency bars, percentages, or stars — tags only.
export default function SkillsGrid({ categories }: Props): JSX.Element
```

### `components/ValuesBlock.tsx` (New)

```typescript
type Props = {
  principles: ValuePrinciple[]
}
// Renders exactly principles.length cards (caller passes exactly 3).
// Each card: number (gold mono), title (bold body), body (muted prose).
// Grid: 1 col mobile → 3 cols desktop.
export default function ValuesBlock({ principles }: Props): JSX.Element
```

### `components/AICapabilities.tsx` (New)

```typescript
type Props = {
  specialisations: AISpecialisation[]
}
// Renders a two-column grid of specialisation items.
// Each item: icon/bullet (gold ✦), title (body semibold), descriptor (muted text-sm).
// Section header follows existing gold mono label → bold headline pattern.
export default function AICapabilities({ specialisations }: Props): JSX.Element
```

### `components/ProjectsFilter.tsx` (New)

```typescript
type Props = {
  categories: string[]       // unique category values + "All"
  stacks: string[]           // unique stack values + "All"
  activeCategory: string
  activeStack: string
  onCategoryChange: (value: string) => void
  onStackChange: (value: string) => void
}
// Renders two pill-button rows. Active pill: bg-gold text-bg. Inactive: border-border text-muted hover:border-gold.
export default function ProjectsFilter(props: Props): JSX.Element
```

### `app/about/page.tsx` (New)

```typescript
// Server component (no 'use client' needed — metadata export requires RSC)
// Exports: export const metadata: Metadata
// Sections rendered top-to-bottom:
//   1. PageHero (inline section — name, headline, origin narrative)
//   2. BiographySection (inline prose section)
//   3. EducationSection (renders EducationMilestone cards)
//   4. GeographicReach (inline subsection)
//   5. <ValuesBlock principles={valuePrinciples} />
//   6. <AICapabilities specialisations={aiSpecialisations} />
//   7. <SkillsGrid categories={skillCategories} />
//   8. Section CTA → /projects
```

### `app/projects/page.tsx` (New)

```typescript
// 'use client' — requires useState for filter and modal state
// State:
//   activeCategory: string  (default "All")
//   activeStack: string     (default "All")
//   selectedProject: Project | null
//
// Derived values (useMemo):
//   filteredProjects: Project[]
//   uniqueCategories: string[]
//   uniqueStacks: string[]
//
// Exports: export const metadata: Metadata  (requires next/navigation generateMetadata pattern or static export)
// Renders:
//   <ProjectsFilter ... />
//   filtered project grid (3-col → 2-col → 1-col)
//   empty state message when filteredProjects.length === 0
//   <ProjectModal ... /> when selectedProject !== null
```

> Note on metadata with `'use client'`: Because the Projects page needs both client state and metadata, the page uses a thin RSC wrapper (`app/projects/page.tsx` as RSC) that exports `metadata` and renders a `'use client'` child component (`ProjectsPageClient.tsx`) for all interactive logic. This is the standard Next.js pattern.

---

## Data Models

### Skill Categories (initial data)

| Category | Skills |
|---|---|
| Frontend | React, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3 |
| Backend | Node.js, Express, NestJS, FastAPI, Prisma, PostgreSQL, MySQL, Redis |
| AI & ML | LangGraph, LangChain, ChromaDB, pgvector, Gemini API, OpenAI Whisper, RAG Pipelines, Voice AI |
| DevOps & Tooling | Git, Docker, AWS, Vercel, CI/CD, Socket.io, Paystack API |

### Value Principles (initial data)

1. **Ship real things** — Side projects are tools; production deployments are the proof. Cedar's work is measured by products used by real people, not by repositories.
2. **Teach to deepen** — Teaching MERN stack and Scratch at Techpro Institute is not a side activity; it forces rigour, exposes gaps, and sharpens every engineering decision.
3. **Build for context** — Technology choices are made in the context of Nigeria and West Africa — bandwidth constraints, local payment rails, multilingual users — not copied from Silicon Valley defaults.

### AI Specialisations (initial data)

| Specialisation | Descriptor |
|---|---|
| RAG Pipeline Design | Designing retrieval-augmented generation systems that connect LLMs to domain-specific knowledge bases. |
| Agentic Systems with LangGraph | Building multi-step AI agents with stateful graph workflows using LangGraph. |
| Voice AI (Whisper) | Integrating OpenAI Whisper for speech-to-text in multilingual voice assistants. |
| Multilingual NLP | Handling tonal African languages (Yoruba, Hausa, Igbo, Pidgin) in NLP pipelines. |
| WhatsApp AI Integrations | Shipping conversational AI directly into WhatsApp via webhook and messaging APIs. |
| Vector Database Management | Managing embeddings and similarity search with ChromaDB and pgvector. |

### Education Milestones (initial data)

| Institution | Credential | Year Range |
|---|---|---|
| Self-Directed Study | Full-Stack Web Development | 2017 — 2019 |
| Techpro Institute | Advanced JavaScript & MERN Stack | 2020 — 2021 |
| Cedar Creatives Practice | AI Engineering (LangGraph, RAG, Voice AI) | 2022 — Present |

---

## Token Fix Strategy

The dead tokens in `ExperienceTimeline.tsx` and `Footer.tsx` are straightforward string substitutions. The mapping is:

| Dead Token | Live Token | Resolves To |
|---|---|---|
| `text-accent` | `text-gold` | `#C9A227` |
| `text-text-muted` | `text-muted` | `#8B89A6` |
| `bg-surface-border` | `bg-border` | `#1E1E38` |
| `border-surface-border` | `border-border` | `#1E1E38` |

`bg-border` is valid because Tailwind CSS v4 automatically generates background-color utilities from all `--color-*` tokens. Since `--color-border: #1E1E38` is defined in `globals.css`, `bg-border` resolves correctly.

---

## Nav Routing Logic

The Nav component's conditional rendering is driven by `usePathname()`:

```typescript
const pathname = usePathname()
const isHome = pathname === '/'

// Link sets
const anchorLinks = ['#about', '#expertise', '#projects', '#experience', '#contact']
const pageLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
]

// On home (/): render anchorLinks + pageLinks (About, Projects)
// On sub-pages: render [{ href: '/', label: 'Home' }, ...pageLinks]

// Active state: apply `text-gold` + `w-full` on the underline pseudo-element
//   when pathname === link.href
```

The mobile drawer mirrors the same conditional logic, ensuring the hamburger menu is consistent with the desktop link set.

---

## Filter Logic (`/projects` page)

```typescript
const filteredProjects = useMemo(() => {
  return projects.filter((p) => {
    const categoryMatch = activeCategory === 'All' || p.category === activeCategory
    const stackMatch = activeStack === 'All' || p.stack.includes(activeStack)
    return categoryMatch && stackMatch
  })
}, [activeCategory, activeStack])

const uniqueCategories = useMemo(
  () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
  []
)

const uniqueStacks = useMemo(
  () => ['All', ...Array.from(new Set(projects.flatMap((p) => p.stack))).sort()],
  []
)
```

Filters are purely in-memory over the static `projects` array. No URL state synchronisation is needed for MVP — filter state lives in component `useState`.

---

## Section CTAs

Each CTA uses the existing ghost-button pattern and Next.js `<Link>` for zero-reload navigation:

```tsx
import Link from 'next/link'

// Ghost button pattern (matches existing border CTAs in Hero.tsx)
<Link
  href="/projects"
  className="inline-flex items-center gap-2 border border-border text-body font-semibold px-7 py-3.5 rounded-full hover:border-gold hover:text-gold transition-all duration-200 hover:scale-[1.02] active:scale-95"
>
  View all projects →
</Link>
```

Placement in each section:
- **Hero**: added to the existing `flex flex-wrap gap-4` CTA row as a third button after "See my work →" and "Work with me →"
- **WhatIDo**: added after the cards grid `div`, centred below the grid
- **SelectedWork**: added after the `3 + 2` project grid layout, centred

---

## Detail Modal — Body Scroll Lock

The `ProjectModal` component (existing in `SelectedWork.tsx`, reused pattern in `ProjectsPage`) applies scroll lock via:

```typescript
useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => { document.body.style.overflow = '' }
}, [])
```

This is already implemented in the existing `ProjectModal` in `SelectedWork.tsx` and will be replicated exactly in the `ProjectsPage` modal.

---

## Scroll Animation Pattern

All new sections follow the existing `IntersectionObserver` pattern used across the site:

```typescript
const [isVisible, setIsVisible] = useState(false)
const ref = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
    { threshold: 0.1 }
  )
  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])

// Applied: className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
```

Staggered delay for grid children uses `style={{ transitionDelay: \`${index * 80}ms\` }}`.

---

## Error Handling

All components consume statically typed data from `lib/data.ts`. Because all data is compile-time constants (no async fetching, no API calls), runtime errors from data loading do not apply.

The only conditional rendering concern is:
- **Empty filter results** (`/projects`): handled with an explicit empty-state branch rendering a centred "No projects match your current filters." message.
- **Missing `liveUrl`** on a project: handled in the modal with the existing `private repo / no live demo` indicator pattern from `SelectedWork.tsx`.

TypeScript strict mode catches all null/undefined scenarios at compile time via the `Project.liveUrl: string | null` type.

---

## Accessibility

- All interactive elements (filter pills, modal close button, project cards) include `aria-label` attributes where icon-only or ambiguous.
- The Detail Modal sets focus to the close button on open (via `useEffect` + `ref.current?.focus()`).
- Escape key closes the modal (`keydown` event listener in `useEffect`).
- Click-outside closes the modal via an overlay `onClick` handler, with `e.stopPropagation()` on the modal panel itself.
- Nav links use `aria-current="page"` on the active page link.
- The mobile drawer toggle button has `aria-label="Toggle menu"` and `aria-expanded={mobileOpen}`.
- Color contrast: gold (`#C9A227`) on dark background (`#0B0B18`) meets WCAG AA for large text; muted (`#8B89A6`) on `#0B0B18` meets WCAG AA for normal body text at 14px+.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Property Reflection:**
Before writing the final properties, redundant candidates were removed:
- Requirements 2.3 and 2.4 (active state for "/about" and "/projects" individually) are subsumed by a single property over all pathnames.
- Requirements 5.2 and 5.3 (category filter buttons and stack filter buttons) follow the same "derived from data" pattern and are kept as two separate properties because they operate on different data dimensions (category vs stack).
- Requirements 5.4, 5.5, and 5.6 (category filter, stack filter, combined filter) are distinct filtering behaviours and are each preserved.
- Requirements 4.8 and 4.9 on SkillsGrid are kept separate: one tests category count, the other tests chip rendering and absence of rating elements.

---

### Property 1: Nav active state matches current pathname

*For any* pathname in the set `{"/", "/about", "/projects"}`, the Nav component SHALL apply the active visual state (gold text and/or full-width underline) to exactly the link whose `href` matches the current pathname, and SHALL NOT apply the active state to any other link.

**Validates: Requirements 2.3, 2.4**

---

### Property 2: Nav hides anchor-scroll links on non-home pages

*For any* pathname that is not `"/"`, the Nav component SHALL NOT render any of the home-page anchor-scroll links (`#about`, `#expertise`, `#projects`, `#experience`, `#contact`).

**Validates: Requirement 2.6**

---

### Property 3: Education milestones render all required fields

*For any* array of `EducationMilestone` objects, the AboutPage education section SHALL render, for each milestone, the institution name, credential type, and year range — all three fields visible in the output.

**Validates: Requirement 4.3**

---

### Property 4: ValuesBlock renders all supplied principles with required fields

*For any* array of `ValuePrinciple` objects passed to `ValuesBlock`, the component SHALL render exactly `principles.length` cards, and each card SHALL contain the principle's number, title, and body text.

**Validates: Requirement 4.5**

---

### Property 5: SkillsGrid renders one section per category

*For any* array of `SkillCategory` objects passed to `SkillsGrid`, the component SHALL render exactly one labelled category section per item in the array.

**Validates: Requirement 4.8**

---

### Property 6: SkillsGrid renders skills as tag-chips with no rating elements

*For any* array of `SkillCategory` objects passed to `SkillsGrid`, every skill SHALL be rendered as a tag-chip element (pill/rounded border), and the rendered output SHALL contain no `<progress>`, `<meter>`, percentage text, or star-rating elements.

**Validates: Requirement 4.9**

---

### Property 7: ProjectsPage renders all projects from the data array

*For any* `projects` data array of length N, the ProjectsPage (with "All" filters active) SHALL render exactly N project cards visible on screen.

**Validates: Requirement 5.1**

---

### Property 8: ProjectsFilter category buttons match data categories

*For any* `projects` data array, the set of category filter buttons rendered by `ProjectsFilter` SHALL equal the set of unique `category` values from the data array, plus one "All" button — no more, no fewer.

**Validates: Requirement 5.2**

---

### Property 9: ProjectsFilter stack buttons match data stacks

*For any* `projects` data array, the set of stack filter buttons rendered by `ProjectsFilter` SHALL equal the set of unique values from all `stack` arrays in the data, plus one "All" button — no more, no fewer.

**Validates: Requirement 5.3**

---

### Property 10: Category filter shows only matching projects

*For any* `projects` data array and any selected `category` string (other than "All"), the visible project cards on the ProjectsPage SHALL include only projects where `project.category === selectedCategory`, and SHALL exclude all others.

**Validates: Requirement 5.4**

---

### Property 11: Stack filter shows only projects containing that technology

*For any* `projects` data array and any selected `stack` value (other than "All"), the visible project cards on the ProjectsPage SHALL include only projects where `project.stack.includes(selectedStack)`, and SHALL exclude all others.

**Validates: Requirement 5.5**

---

### Property 12: Combined category + stack filter satisfies both conditions

*For any* `projects` data array, any selected `category`, and any selected `stack` value (both non-"All"), the visible project cards SHALL include only projects where `project.category === selectedCategory` AND `project.stack.includes(selectedStack)`.

**Validates: Requirement 5.6**

---

### Property 13: "All" filter restores full project list

*For any* `projects` data array, setting both `activeCategory` and `activeStack` to "All" SHALL result in all N projects being visible — regardless of what filters were previously applied.

**Validates: Requirement 5.7**

---

### Property 14: Detail Modal contains all project fields for any project

*For any* project object in the `projects` data array, opening the Detail Modal for that project SHALL render the project's `problem`, `solution`, `stack` items, and `role` in the modal body, and SHALL render either a live site link (when `liveUrl` is non-null) or the private-repo indicator (when `liveUrl` is null).

**Validates: Requirement 5.8**
