'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { projects, type Project } from '@/lib/data'
import ProjectsFilter from '@/components/ProjectsFilter'

// ---------------------------------------------------------------------------
// ProjectModal
// ---------------------------------------------------------------------------

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Focus the close button on mount
    closeButtonRef.current?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-surface border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-8 rounded-t-2xl"
          style={{
            background: `linear-gradient(135deg, ${project.accentFrom} 0%, ${project.accentTo} 100%)`,
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-gold font-mono text-sm">{project.number}</span>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="text-muted hover:text-body transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h3 className="text-3xl font-bold text-body mb-1">{project.title}</h3>
          <p className="text-muted text-sm mb-3">
            {project.category} · {project.role}
          </p>
          {project.badge && (
            <span className="inline-block bg-gold/20 text-gold text-xs font-medium px-3 py-1.5 rounded-full border border-gold/30">
              {project.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Stack */}
          <div>
            <p className="text-muted text-xs font-mono uppercase tracking-wider mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="bg-bg border border-border text-body text-xs px-3 py-1.5 rounded-lg font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Problem */}
          <div>
            <p className="text-gold text-xs font-mono uppercase tracking-wider mb-2">The Problem</p>
            <p className="text-muted text-sm leading-relaxed">{project.problem}</p>
          </div>

          {/* Solution */}
          <div>
            <p className="text-gold text-xs font-mono uppercase tracking-wider mb-2">What I Built</p>
            <p className="text-muted text-sm leading-relaxed">{project.solution}</p>
          </div>

          {/* Outcome */}
          {project.outcome && (
            <div>
              <p className="text-gold text-xs font-mono uppercase tracking-wider mb-2">Outcome</p>
              <p className="text-muted text-sm leading-relaxed">{project.outcome}</p>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4 border-t border-border">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-bg font-semibold text-sm px-6 py-3 rounded-full hover:bg-gold-light transition-colors"
              >
                View live site →
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 border border-border text-muted text-sm px-5 py-2.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Private repo · No live demo
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProjectCard
// ---------------------------------------------------------------------------

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="group border border-border rounded-2xl overflow-hidden bg-surface hover:border-gold/50 transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        {/* Colour thumbnail */}
        <div
          className="h-36 relative"
          style={{
            background: `linear-gradient(135deg, ${project.accentFrom} 0%, ${project.accentTo} 100%)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-white/5 select-none font-sans">
              {project.title}
            </span>
          </div>
          <span className="absolute top-4 left-4 text-gold font-mono text-sm">{project.number}</span>
          {project.badge && (
            <span className="absolute top-4 right-4 bg-gold/20 text-gold text-xs px-2.5 py-1 rounded-full border border-gold/30 font-medium">
              {project.badge.split(' ')[0]}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-body text-xl font-semibold group-hover:text-gold transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-muted text-sm mt-0.5">
                {project.category} · {project.role.split(' · ')[0]}
              </p>
            </div>
            <div className="text-muted group-hover:text-gold transition-colors duration-300 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </div>
          </div>
          <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">{project.problem}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-muted/70 bg-bg px-2 py-0.5 rounded border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProjectsPageClient
// ---------------------------------------------------------------------------

export default function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeStack, setActiveStack] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const uniqueCategories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  )

  const uniqueStacks = useMemo(
    () => ['All', ...Array.from(new Set(projects.flatMap((p) => p.stack))).sort()],
    []
  )

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const categoryMatch = activeCategory === 'All' || p.category === activeCategory
      const stackMatch = activeStack === 'All' || p.stack.includes(activeStack)
      return categoryMatch && stackMatch
    })
  }, [activeCategory, activeStack])

  return (
    <>
      {/* Detail modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <section className="bg-bg min-h-screen pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Page header */}
          <div className="mb-16">
            <p className="text-gold text-sm font-mono font-medium mb-3 tracking-wider uppercase">
              All projects
            </p>
            <h1 className="text-4xl lg:text-5xl font-sans font-bold text-body leading-tight mb-4">
              Things I&apos;ve{' '}
              <span className="font-serif italic text-gold">shipped.</span>
            </h1>
            <p className="text-muted max-w-lg text-sm leading-relaxed">
              Filter by category or technology. Click any card to read the full breakdown, stack,
              and outcomes.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <ProjectsFilter
              categories={uniqueCategories}
              stacks={uniqueStacks}
              activeCategory={activeCategory}
              activeStack={activeStack}
              onCategoryChange={setActiveCategory}
              onStackChange={setActiveStack}
            />
          </div>

          {/* Project grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.number}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-muted text-lg">No projects match your current filters.</p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveStack('All')
                }}
                className="mt-6 text-gold text-sm font-medium hover:underline transition-all"
              >
                Clear filters →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
