# Implementation Plan: Portfolio Enhancement

## Overview

Six enhancement groups implemented in strict dependency order: token fixes to unblock correct rendering, a shared data layer to unblock all new components and pages, new standalone components, Nav multi-page routing, home-page CTAs, the `/about` page, and finally the `/projects` page. The existing design language (dark `#0B0B18` / gold `#C9A227`, Plus Jakarta Sans + Instrument Serif, Tailwind CSS v4) is maintained throughout. All work is in TypeScript with Next.js App Router.

---

## Tasks

- [x] 1. Fix dead Tailwind tokens in ExperienceTimeline and Footer
  - [x] 1.1 Fix dead tokens in `components/ExperienceTimeline.tsx`
    - Replace every `text-accent` → `text-gold`
    - Replace every `text-text-muted` → `text-muted`
    - Replace every `border-surface-border` → `border-border`
    - Replace every `bg-surface-border` → `bg-border`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 1.2 Fix dead tokens in `components/Footer.tsx`
    - Replace every `text-accent` → `text-gold`
    - Replace every `text-text-muted` → `text-muted`
    - Replace every `border-surface-border` → `border-border`
    - Replace every `bg-surface-border` → `bg-border`
    - _Requirements: 1.5, 1.6, 1.7, 1.8_

- [x] 2. Create shared data layer in `lib/data.ts`
  - [x] 2.1 Create `lib/data.ts` with all exported types and data constants
    - Define and export `Project`, `SkillCategory`, `ValuePrinciple`, `AISpecialisation`, `EducationMilestone` TypeScript types
    - Lift the existing `projects` array from `SelectedWork.tsx` into `lib/data.ts` as the `projects` constant (same data, same shape, typed as `Project[]`)
    - Add `skillCategories: SkillCategory[]` — four categories: Frontend, Backend, AI & ML, DevOps & Tooling with their respective skills
    - Add `valuePrinciples: ValuePrinciple[]` — exactly 3 numbered principles (Ship real things, Teach to deepen, Build for context) as per design
    - Add `aiSpecialisations: AISpecialisation[]` — 6 specialisations: RAG Pipeline Design, Agentic Systems with LangGraph, Voice AI (Whisper), Multilingual NLP, WhatsApp AI Integrations, Vector Database Management
    - Add `educationMilestones: EducationMilestone[]` — 3 milestones as per design
    - _Requirements: 4.5, 4.6, 4.8, 5.1, 6.7_

  - [x] 2.2 Write unit tests for `lib/data.ts` data contracts
    - Assert `projects` array has the expected length (5) and each item satisfies the `Project` type shape
    - Assert `skillCategories` has exactly 4 entries with non-empty `skills` arrays
    - Assert `valuePrinciples` has exactly 3 entries, each with truthy `number`, `title`, and `body`
    - Assert `aiSpecialisations` has at least 6 entries, each with truthy `title` and `descriptor`
    - _Requirements: 4.5, 4.6, 4.8, 5.1_

- [x] 3. Build new standalone components

  - [x] 3.1 Create `components/SkillsGrid.tsx`
    - Accept `categories: SkillCategory[]` prop
    - Render one labelled section per category (gold mono label)
    - Render each skill as a tag-chip: `border border-border rounded-full px-3 py-1 text-xs font-mono text-muted`
    - No `<progress>`, `<meter>`, percentage text, or star-rating elements anywhere in the output
    - Follow existing `IntersectionObserver` fade-in pattern for scroll animation
    - _Requirements: 4.8, 4.9, 6.1_

  - [x] 3.2 Write property test for `SkillsGrid` — one section per category (Property 5)
    - **Property 5: SkillsGrid renders one section per category**
    - **Validates: Requirements 4.8**
    - For any array of `SkillCategory` objects, assert the rendered output contains exactly `categories.length` labelled sections

  - [x] 3.3 Write property test for `SkillsGrid` — no rating elements (Property 6)
    - **Property 6: SkillsGrid renders skills as tag-chips with no rating elements**
    - **Validates: Requirements 4.9**
    - For any array of `SkillCategory` objects, assert no `<progress>`, `<meter>`, `%`, or star elements are present in the rendered output

  - [x] 3.4 Create `components/ValuesBlock.tsx`
    - Accept `principles: ValuePrinciple[]` prop
    - Render exactly `principles.length` cards in a `grid-cols-1 md:grid-cols-3` layout
    - Each card: number (gold mono), title (bold body text), body (muted prose, 2–3 sentences)
    - Follow existing `IntersectionObserver` fade-in with stagger delay
    - _Requirements: 4.5, 6.2_

  - [x] 3.5 Write property test for `ValuesBlock` — renders all principles (Property 4)
    - **Property 4: ValuesBlock renders all supplied principles with required fields**
    - **Validates: Requirements 4.5**
    - For any array of `ValuePrinciple` objects, assert rendered output contains exactly `principles.length` cards, each with the principle's number, title, and body text

  - [x] 3.6 Create `components/AICapabilities.tsx`
    - Accept `specialisations: AISpecialisation[]` prop
    - Render a section header following existing gold mono label → bold headline pattern
    - Render a two-column grid of items: gold `✦` bullet, title (body semibold), descriptor (muted text-sm)
    - Follow existing `IntersectionObserver` fade-in pattern
    - _Requirements: 4.6, 4.7, 6.3_

  - [x] 3.7 Create `components/ProjectsFilter.tsx`
    - Accept props: `categories: string[]`, `stacks: string[]`, `activeCategory: string`, `activeStack: string`, `onCategoryChange`, `onStackChange`
    - Render two pill-button rows (category row, stack row)
    - Active pill style: `bg-gold text-bg`; inactive: `border border-border text-muted hover:border-gold`
    - All filter button sets must be derived strictly from the passed-in `categories`/`stacks` props
    - _Requirements: 5.2, 5.3, 6.4_

  - [x] 3.8 Write property test for `ProjectsFilter` — category buttons match data (Property 8)
    - **Property 8: ProjectsFilter category buttons match data categories**
    - **Validates: Requirements 5.2**
    - For any `projects` array, assert the rendered category buttons equal the unique `category` values plus exactly one "All" button — no more, no fewer

  - [x] 3.9 Write property test for `ProjectsFilter` — stack buttons match data (Property 9)
    - **Property 9: ProjectsFilter stack buttons match data stacks**
    - **Validates: Requirements 5.3**
    - For any `projects` array, assert the rendered stack buttons equal the unique combined `stack` values plus exactly one "All" button — no more, no fewer

- [x] 4. Checkpoint — Ensure all component unit and property tests pass, ask the user if questions arise.

- [x] 5. Update `components/Nav.tsx` for multi-page routing
  - [x] 5.1 Refactor Nav to support home anchor-scroll links AND page-routing links
    - Add `'use client'` directive; import `usePathname` from `'next/navigation'` and `Link` from `'next/link'`
    - When `pathname === '/'`: render the existing anchor-scroll links plus "About" (`/about`) and "Projects" (`/projects`) page links
    - When `pathname !== '/'`: render only page-routing links — "Home" (`/`), "About" (`/about`), "Projects" (`/projects`) — and hide anchor-scroll links
    - Apply active visual state (`text-gold` + full-width underline pseudo-element) to the link whose `href` matches the current `pathname`
    - Add `aria-current="page"` to the active page link
    - Update mobile drawer to mirror the same conditional link set
    - Keep the mobile drawer toggle `aria-label="Toggle menu"` and `aria-expanded={mobileOpen}` attributes
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 5.2 Write property test for Nav active state (Property 1)
    - **Property 1: Nav active state matches current pathname**
    - **Validates: Requirements 2.3, 2.4**
    - For pathnames `"/"`, `"/about"`, `"/projects"`, assert the active visual state is applied to exactly the matching link and to no other link

  - [x] 5.3 Write property test for Nav anchor-scroll link hiding (Property 2)
    - **Property 2: Nav hides anchor-scroll links on non-home pages**
    - **Validates: Requirement 2.6**
    - For any pathname that is not `"/"`, assert that none of the anchor-scroll links (`#about`, `#expertise`, `#projects`, `#experience`, `#contact`) are rendered

- [x] 6. Add Section CTAs to home page components
  - [x] 6.1 Add "About me →" CTA to `components/Hero.tsx`
    - Import `Link` from `'next/link'`
    - Insert a `<Link href="/about">` ghost-button inside the existing `flex flex-wrap gap-4` CTA row as the third button after "See my work →" and "Work with me →"
    - Use the identical ghost-button class pattern already on "Work with me →": `border border-border text-body font-semibold px-7 py-3.5 rounded-full hover:border-gold hover:text-gold transition-all duration-200 hover:scale-[1.02] active:scale-95`
    - _Requirements: 3.3, 3.4, 3.5_

  - [x] 6.2 Add "See full experience →" CTA to `components/WhatIDo.tsx`
    - Import `Link` from `'next/link'`
    - Add a centred `<Link href="/about">` ghost-button below the cards grid `div`, inside the section container
    - _Requirements: 3.1, 3.4, 3.5_

  - [x] 6.3 Add "View all projects →" CTA to `components/SelectedWork.tsx`
    - Import `Link` from `'next/link'`
    - Remove the inline `projects` array (it will now come from `lib/data.ts`)
    - Import `projects` from `'@/lib/data'`
    - Add a centred `<Link href="/projects">` ghost-button after the `3 + 2` grid layout, inside the section container
    - _Requirements: 3.2, 3.4, 3.5_

- [x] 7. Build the `/about` page
  - [x] 7.1 Create `app/about/page.tsx` — RSC with metadata and inline sections
    - Export `metadata: Metadata` with `title: 'About — Cedar | Ayorinde Joshua Adeyemi'`
    - Import and render inline sections in order: PageHero, BiographySection, EducationSection (using `educationMilestones`), GeographicReach subsection
    - Import and render `<ValuesBlock principles={valuePrinciples} />`
    - Import and render `<AICapabilities specialisations={aiSpecialisations} />`
    - Import and render `<SkillsGrid categories={skillCategories} />`
    - Add Section CTA at the bottom: `<Link href="/projects">` with label "View all projects →" using ghost-button pattern
    - Include shared `<Nav />` at the top of the page
    - BiographySection: flowing prose (no bullet lists) covering 2017 → 2022 → present arc
    - EducationSection: render each `EducationMilestone` card showing institution, credential, and year range — all three fields visible
    - Apply single-column responsive layout for all multi-column sections on mobile (`< 768px`)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 6.5, 6.8_

  - [x] 7.2 Write property test for EducationSection — all milestone fields rendered (Property 3)
    - **Property 3: Education milestones render all required fields**
    - **Validates: Requirements 4.3**
    - For any array of `EducationMilestone` objects, assert each milestone's institution, credential, and year range are all present in the rendered output

- [x] 8. Build the `/projects` page
  - [x] 8.1 Create `app/projects/page.tsx` — thin RSC wrapper exporting metadata
    - Export `metadata: Metadata` with `title: 'Projects — Cedar | Ayorinde Joshua Adeyemi'`
    - Render `<Nav />` and `<ProjectsPageClient />` (no client state here)
    - _Requirements: 5.11, 6.6, 6.8_

  - [x] 8.2 Create `app/projects/ProjectsPageClient.tsx` — interactive client component
    - Add `'use client'` directive
    - Import `projects` from `'@/lib/data'`
    - Declare state: `activeCategory` (default `"All"`), `activeStack` (default `"All"`), `selectedProject: Project | null` (default `null`)
    - Derive `uniqueCategories` and `uniqueStacks` via `useMemo` using the filter logic from the design (`Array.from(new Set(...))`, sorted for stacks)
    - Derive `filteredProjects` via `useMemo`: filter by category AND stack, both default to "All" showing everything
    - Render `<ProjectsFilter>` wired to state setters
    - Render filtered project grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
    - Render empty-state message `"No projects match your current filters."` when `filteredProjects.length === 0`
    - Reuse the `ProjectCard` and `ProjectModal` patterns from `SelectedWork.tsx` (copy and adapt — both components take a `Project` from `lib/data.ts`)
    - `ProjectModal`: apply scroll-lock (`document.body.style.overflow = 'hidden'`) and unlock on close; close on Escape key; close on overlay click with `e.stopPropagation()` on panel; focus the close button on mount via `useEffect` + `ref`; include `aria-label` on close button
    - _Requirements: 5.1, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.12, 5.13, 5.14_

  - [x] 8.3 Write property test for ProjectsPage — all projects rendered with "All" filter (Property 7)
    - **Property 7: ProjectsPage renders all projects from the data array**
    - **Validates: Requirements 5.1**
    - For any `projects` array of length N, assert that with `activeCategory = "All"` and `activeStack = "All"`, exactly N project cards are rendered

  - [x] 8.4 Write property test for category filter (Property 10)
    - **Property 10: Category filter shows only matching projects**
    - **Validates: Requirements 5.4**
    - For any `projects` array and any non-"All" `selectedCategory`, assert only projects where `project.category === selectedCategory` are in the visible output

  - [x] 8.5 Write property test for stack filter (Property 11)
    - **Property 11: Stack filter shows only projects containing that technology**
    - **Validates: Requirements 5.5**
    - For any `projects` array and any non-"All" `selectedStack`, assert only projects where `project.stack.includes(selectedStack)` are visible

  - [x] 8.6 Write property test for combined filter (Property 12)
    - **Property 12: Combined category + stack filter satisfies both conditions**
    - **Validates: Requirements 5.6**
    - For any `projects` array with both `selectedCategory` and `selectedStack` non-"All", assert only projects satisfying both conditions are visible

  - [x] 8.7 Write property test for "All" filter restoration (Property 13)
    - **Property 13: "All" filter restores full project list**
    - **Validates: Requirements 5.7**
    - After applying any category/stack filter, setting both back to "All" asserts all N projects are visible

  - [x] 8.8 Write property test for Detail Modal field completeness (Property 14)
    - **Property 14: Detail Modal contains all project fields for any project**
    - **Validates: Requirements 5.8**
    - For any project in the data array, opening the modal asserts `problem`, `solution`, `stack` items, and `role` are all present; and that either a live site link or private-repo indicator is rendered based on `liveUrl` being non-null or null

- [x] 9. Final checkpoint — Ensure all tests pass and `next build` completes with zero TypeScript errors, ask the user if questions arise.
  - Run `npx tsc --noEmit` to verify zero compilation errors across all new and modified files
  - _Requirements: 6.7_

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Token fixes (Task 1) must be completed before any visual review — they unblock correct rendering
- `lib/data.ts` (Task 2.1) is the critical path blocker for Tasks 3–8; do not start components or pages until it exists
- `SelectedWork.tsx` (Task 6.3) must have its inline `projects` array removed and replaced with the import from `lib/data.ts` to keep the home page and the `/projects` page in sync
- The `/projects` page uses the RSC wrapper + client component pattern to satisfy Next.js's constraint: metadata export requires a Server Component, but filter/modal state requires `'use client'`
- All property tests reference properties defined in `design.md` by their property number
- Checkpoints ensure incremental validation at natural breaks

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "3.1", "3.4", "3.6", "3.7"] },
    { "id": 3, "tasks": ["3.2", "3.3", "3.5", "3.8", "3.9", "5.1", "6.1", "6.2", "6.3"] },
    { "id": 4, "tasks": ["5.2", "5.3", "7.1", "8.1", "8.2"] },
    { "id": 5, "tasks": ["7.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"] }
  ]
}
```
