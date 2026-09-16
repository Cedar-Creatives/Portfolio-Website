# Requirements Document

## Introduction

This feature enhances the existing Next.js portfolio website for Ayorinde Joshua Adeyemi ("Cedar") — a full-stack developer and AI builder based in Lagos, Nigeria. The enhancements are scoped into six areas: (1) fixing dead Tailwind token names used in ExperienceTimeline and Footer, (2) building a rich `/about` page with personal narrative, education, values, AI capabilities, and skills, (3) building a `/projects` page with filter controls and detail modals, (4) adding section-level CTAs and teaser links on the home page, (5) introducing new shared components (SkillsGrid, ValuesBlock, AICapabilities, ProjectsFilter), and (6) updating the shared Nav to support multi-page routing to `/about` and `/projects`.

The design language is a dark theme (`#0B0B18` background) with a gold accent (`#C9A227`), Plus Jakarta Sans and Instrument Serif fonts, and Tailwind CSS v4 with custom design tokens defined in `globals.css`.

---

## Glossary

- **Portfolio Site**: The Next.js application located at the workspace root (`Portfolio Website/`).
- **Nav**: The shared navigation component at `components/Nav.tsx`, rendered on every page.
- **Hero**: The hero section component at `components/Hero.tsx`, rendered only on the home page.
- **ExperienceTimeline**: The component at `components/ExperienceTimeline.tsx` that renders the work history section.
- **Footer**: The component at `components/Footer.tsx` that renders the contact/footer section.
- **SelectedWork**: The component at `components/SelectedWork.tsx` that renders the project card grid on the home page.
- **WhatIDo**: The component at `components/WhatIDo.tsx` that renders the services/expertise section on the home page.
- **AboutPage**: The new page at `app/about/page.tsx` providing the rich personal narrative view.
- **ProjectsPage**: The new page at `app/projects/page.tsx` providing the full filterable project grid.
- **SkillsGrid**: The new component that renders skills grouped by category as tag-cloud style chips without proficiency ratings.
- **ValuesBlock**: The new component that renders three numbered personal philosophy/values principles.
- **AICapabilities**: The new component that renders Cedar's AI engineering specialisations as a standalone section.
- **ProjectsFilter**: The new component that renders category and stack filter controls for the projects grid.
- **Dead Token**: A Tailwind CSS class name referencing a CSS custom property not defined in `globals.css` (e.g., `text-accent`, `text-text-muted`, `bg-surface-border`, `border-surface-border`).
- **Live Token**: A Tailwind CSS class name referencing a CSS custom property that is defined in `globals.css` (e.g., `text-gold`, `text-muted`, `border-border`, `bg-surface`).
- **Detail Modal**: An overlay panel rendered over the projects grid that displays the full problem/solution/outcome narrative, stack, and live site link for a selected project.
- **Section CTA**: A call-to-action element (button or link) placed at the end of a section that directs the user to a related full page.

---

## Requirements

### Requirement 1 — Token Audit and Fix

**User Story:** As a developer maintaining the Portfolio Site, I want all Tailwind class names in ExperienceTimeline and Footer to reference only Live Tokens, so that styles render correctly without silent CSS failures.

#### Acceptance Criteria

1. THE Portfolio Site SHALL replace every occurrence of `text-accent` in ExperienceTimeline with `text-gold`.
2. THE Portfolio Site SHALL replace every occurrence of `text-text-muted` in ExperienceTimeline with `text-muted`.
3. THE Portfolio Site SHALL replace every occurrence of `bg-surface-border` in ExperienceTimeline with `bg-border` or an equivalent Live Token that maps to `#1E1E38`.
4. THE Portfolio Site SHALL replace every occurrence of `border-surface-border` in ExperienceTimeline with `border-border`.
5. THE Portfolio Site SHALL replace every occurrence of `text-accent` in Footer with `text-gold`.
6. THE Portfolio Site SHALL replace every occurrence of `text-text-muted` in Footer with `text-muted`.
7. THE Portfolio Site SHALL replace every occurrence of `bg-surface-border` in Footer with `bg-border` or an equivalent Live Token that maps to `#1E1E38`.
8. THE Portfolio Site SHALL replace every occurrence of `border-surface-border` in Footer with `border-border`.
9. WHEN the Portfolio Site is built after token fixes are applied, THE Portfolio Site SHALL produce zero Tailwind CSS warnings related to unresolved custom property references in ExperienceTimeline and Footer.

---

### Requirement 2 — Nav Multi-Page Routing

**User Story:** As a visitor to the Portfolio Site, I want the navigation to include links to the About and Projects pages, so that I can reach all sections of the site from any page.

#### Acceptance Criteria

1. THE Nav SHALL render an "About" link that navigates to `/about` using Next.js `<Link>` routing.
2. THE Nav SHALL render a "Projects" link that navigates to `/projects` using Next.js `<Link>` routing.
3. WHEN the visitor's current pathname is `/about`, THE Nav SHALL apply an active visual state (gold underline or gold text) to the "About" link.
4. WHEN the visitor's current pathname is `/projects`, THE Nav SHALL apply an active visual state (gold underline or gold text) to the "Projects" link.
5. WHEN the visitor's current pathname is `/` (home), THE Nav SHALL render the existing anchor-scroll links (`#about`, `#expertise`, `#projects`, `#experience`, `#contact`) alongside the new page links, without removing them.
6. WHEN the visitor's current pathname is `/about` or `/projects`, THE Nav SHALL render only the page-routing links (About, Projects, and a Home link back to `/`), hiding the home-page anchor-scroll links that are irrelevant outside the home page.
7. THE Nav SHALL remain fully responsive on viewports narrower than 768px, including the updated link set, with no layout overflow.

---

### Requirement 3 — Home Page Section CTAs

**User Story:** As a visitor on the home page, I want each major section to offer a clear path to a dedicated full page, so that I can explore more detail without scrolling back to the navigation.

#### Acceptance Criteria

1. THE WhatIDo section SHALL render a Section CTA at the bottom of the section with the label "See full experience →" that navigates to `/about`.
2. THE SelectedWork section SHALL render a Section CTA at the bottom of the project grid with the label "View all projects →" that navigates to `/projects`.
3. THE Hero section SHALL render a teaser link in the existing CTA button row with the label "About me →" that navigates to `/about`.
4. WHEN a visitor clicks any Section CTA, THE Portfolio Site SHALL navigate to the target page within 300 ms without a full browser reload (client-side navigation).
5. THE Section CTAs SHALL use the same visual language as the existing ghost-button CTAs in the site (border, rounded-full, hover:border-gold, hover:text-gold).

---

### Requirement 4 — /about Page

**User Story:** As a visitor who wants to learn more about Cedar, I want a dedicated About page with a rich personal narrative, background, values, AI capabilities, and skills, so that I can understand Cedar's background and philosophy in depth.

#### Acceptance Criteria

1. THE AboutPage SHALL render a page-level hero with Cedar's name, professional headline, and a brief (~60 word) personal origin narrative covering the journey from Lagos, Nigeria.
2. THE AboutPage SHALL render a biography section covering Cedar's progression from early coding interest (2017) through current AI engineering work (2022–present), structured as flowing prose rather than bullet points.
3. THE AboutPage SHALL render an education section listing Cedar's formal or self-directed learning milestones, including institution name, credential type, and year range.
4. THE AboutPage SHALL render a geographic reach subsection noting that Cedar is based in Lagos, Nigeria (WAT / UTC+1) and serves clients internationally.
5. THE ValuesBlock component SHALL render exactly three numbered principle cards. Each card SHALL display a number (01, 02, 03), a title, and a 2–3 sentence elaboration of the principle.
6. THE AICapabilities component SHALL render Cedar's AI engineering specialisations as a standalone section, listing at minimum: RAG pipeline design, agentic systems with LangGraph, voice AI (Whisper), multilingual NLP, WhatsApp AI integrations, and vector database management (ChromaDB, pgvector).
7. THE AICapabilities component SHALL present each specialisation as a labelled item with a short (1-sentence) descriptor — not as a plain unordered list.
8. THE SkillsGrid component SHALL render skills grouped into at minimum four categories: Frontend, Backend, AI & ML, and DevOps & Tooling.
9. THE SkillsGrid component SHALL render each skill as a tag-chip (rounded pill with border) and SHALL NOT render any proficiency bars, percentage values, or star ratings.
10. WHEN a visitor loads `/about`, THE AboutPage SHALL set the HTML `<title>` to "About — Cedar | Ayorinde Joshua Adeyemi" using Next.js metadata.
11. THE AboutPage SHALL include a Section CTA at the bottom inviting the visitor to view projects, linking to `/projects`.
12. WHILE the viewport width is below 768px, THE AboutPage SHALL render all multi-column sections in a single-column stacked layout.

---

### Requirement 5 — /projects Page

**User Story:** As a visitor who wants to explore Cedar's portfolio in detail, I want a full filterable projects page with expandable detail modals, so that I can find and examine projects by category or technology.

#### Acceptance Criteria

1. THE ProjectsPage SHALL render all five projects from the existing `projects` data array (Cedar-Learn, IṢẸ́, QwikCare, Kaytop, Kopamart), plus any additional projects added in the future.
2. THE ProjectsFilter component SHALL render a set of category filter buttons derived dynamically from the categories present in the projects data array.
3. THE ProjectsFilter component SHALL render a set of stack/technology filter buttons derived dynamically from the unique stack values present in the projects data array.
4. WHEN a visitor selects a category filter, THE ProjectsPage SHALL display only the projects matching the selected category and SHALL hide all non-matching projects without a full page reload.
5. WHEN a visitor selects a stack filter, THE ProjectsPage SHALL display only the projects whose stack array contains the selected technology and SHALL hide all non-matching projects without a full page reload.
6. WHEN a visitor selects both a category filter and a stack filter simultaneously, THE ProjectsPage SHALL display only projects that satisfy both filter conditions.
7. WHEN a visitor selects the "All" filter option, THE ProjectsPage SHALL display all projects regardless of category or stack.
8. WHEN a visitor clicks a project card, THE ProjectsPage SHALL render a Detail Modal overlaying the page with the full problem, solution, outcome, stack, role, and live site link (or private repo indicator) for that project.
9. WHEN the Detail Modal is open and the visitor presses the Escape key, THE ProjectsPage SHALL close the Detail Modal.
10. WHEN the Detail Modal is open and the visitor clicks outside the modal panel, THE ProjectsPage SHALL close the Detail Modal.
11. WHEN a visitor loads `/projects`, THE ProjectsPage SHALL set the HTML `<title>` to "Projects — Cedar | Ayorinde Joshua Adeyemi" using Next.js metadata.
12. WHILE the ProjectsPage has no projects matching the active filters, THE ProjectsPage SHALL render an empty-state message of "No projects match your current filters."
13. WHILE the viewport width is below 768px, THE ProjectsPage SHALL render the project grid as a single-column layout.
14. WHEN the Detail Modal is open, THE Portfolio Site SHALL prevent the page body from scrolling.

---

### Requirement 6 — New Components Structure

**User Story:** As a developer building the enhancement features, I want each new UI concern encapsulated in its own component file, so that the codebase remains modular and each component is independently maintainable.

#### Acceptance Criteria

1. THE Portfolio Site SHALL place the SkillsGrid component at `components/SkillsGrid.tsx`.
2. THE Portfolio Site SHALL place the ValuesBlock component at `components/ValuesBlock.tsx`.
3. THE Portfolio Site SHALL place the AICapabilities component at `components/AICapabilities.tsx`.
4. THE Portfolio Site SHALL place the ProjectsFilter component at `components/ProjectsFilter.tsx`.
5. THE Portfolio Site SHALL place the AboutPage at `app/about/page.tsx`.
6. THE Portfolio Site SHALL place the ProjectsPage at `app/projects/page.tsx`.
7. WHEN the Portfolio Site is built with `next build`, THE Portfolio Site SHALL produce zero TypeScript compilation errors across all new and modified files.
8. THE Portfolio Site SHALL share the same `RootLayout` (defined in `app/layout.tsx`) across the home page, AboutPage, and ProjectsPage, so that fonts, metadata defaults, and global CSS are applied consistently.
