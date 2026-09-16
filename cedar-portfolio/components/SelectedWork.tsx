'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'Cedar-Learn',
    category: 'EdTech',
    role: 'Full-Stack Engineer · Solo',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://cedar-learn.onrender.com',
    problem: "Techpro Institute needed a real learning platform for its MERN stack and Scratch programming classes, not another generic course-hosting tool. Most off-the-shelf LMS platforms are either bloated with features an instructor-led bootcamp doesn't need, or too rigid to adapt to a curriculum that mixes live teaching with self-paced modules.",
    solution: 'A production-grade LMS from the ground up, schema to deployment. Designed the data model in Prisma, built the course and progress-tracking system, shipped a UI focused on the actual daily workflow of an instructor running structured cohorts.',
    outcome: 'Actively used by 20 students across current Techpro Institute classes.',
    badge: null,
    accentFrom: '#1e1b4b',
    accentTo: '#0B0B18',
  },
  {
    number: '02',
    title: 'IṢẸ́',
    category: 'AI / Voice Systems',
    role: 'AI Engineer · Solo · Hackathon',
    stack: ['FastAPI', 'OpenAI Whisper', 'ChromaDB', 'Gemini 2.5 Flash'],
    liveUrl: null,
    problem: "Voice AI assistants overwhelmingly default to English, locking out the majority of everyday users across Nigeria who are far more comfortable speaking Yoruba, Hausa, Igbo, or Pidgin. IṢẸ́ set out to close that gap directly on WhatsApp — the platform most Nigerians already use daily.",
    solution: "A multilingual WhatsApp voice AI with a working webhook and a loaded knowledge base, using Whisper for transcription, ChromaDB for retrieval, and Gemini 2.5 Flash for generation — built and demoed within the hackathon's timeframe.",
    outcome: 'A real challenge worth naming: Whisper struggled with tonal Yoruba and Igbo words — a genuine open problem in multilingual voice AI, not a solved one.',
    badge: 'Artificial Future Hackathon 2026',
    accentFrom: '#451a03',
    accentTo: '#0B0B18',
  },
  {
    number: '03',
    title: 'QwikCare',
    category: 'HealthTech',
    role: 'Full-Stack Developer · Team',
    stack: ['NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'Socket.io', 'Paystack'],
    liveUrl: 'https://qwikcare.org',
    problem: "Nigeria's healthcare system runs on a severely strained doctor-to-patient ratio, and over 70 million Nigerians spend more than 40% of their income on healthcare. QwikCare was founded after a near-tragic personal experience with delayed care exposed how disconnected patients, doctors, nurses, and pharmacies really are.",
    solution: 'Joined as full-stack developer, working across the NestJS backend and Next.js frontend within a larger platform architecture covering booking, records, pharmacy, and HMO insurance flows.',
    outcome: '40+ verified healthcare professionals onboarded and 500 patient users. Pitched at OSDLS 2.0 (Osun State Digital Literacy Summit 2026).',
    badge: 'OSDLS 2.0 — Pitched',
    accentFrom: '#052e16',
    accentTo: '#0B0B18',
  },
  {
    number: '04',
    title: 'Kaytop',
    category: 'FinTech',
    role: 'Frontend Developer · Team',
    stack: ['Next.js'],
    liveUrl: 'https://kaytop.online',
    problem: 'Microfinance platforms need to serve very different users under one roof — everyday customers managing loans and savings, and internal staff who need clear operational control. Getting both right in one system is a real interface design challenge.',
    solution: "Designed and built the System Admin and HQ Manager dashboards, plus the platform's authentication pages, as part of the frontend team.",
    outcome: null,
    badge: null,
    accentFrom: '#172554',
    accentTo: '#0B0B18',
  },
  {
    number: '05',
    title: 'Kopamart',
    category: 'Marketplace',
    role: 'Frontend Developer · Team',
    stack: ['React'],
    liveUrl: 'https://kopamart.com',
    problem: "Kopamart was built to address the real struggles NYSC corps members face: little to no business visibility, financial insufficiency, expensive accommodation, and a lack of networking and job information.",
    solution: 'Built general UI components used across the app as part of the frontend team.',
    outcome: '800+ users.',
    badge: null,
    accentFrom: '#2e1065',
    accentTo: '#0B0B18',
  },
]

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" />
      <div
        className="relative bg-surface border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-8 rounded-t-2xl"
          style={{ background: `linear-gradient(135deg, ${project.accentFrom} 0%, ${project.accentTo} 100%)` }}
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-gold font-mono text-sm">{project.number}</span>
            <button
              onClick={onClose}
              className="text-muted hover:text-body transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h3 className="text-3xl font-bold text-body mb-1">{project.title}</h3>
          <p className="text-muted text-sm mb-3">{project.category} · {project.role}</p>
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
                <span key={t} className="bg-bg border border-border text-body text-xs px-3 py-1.5 rounded-lg font-mono">
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

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
      <div
        ref={ref}
        className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        <div
          className="group border border-border rounded-2xl overflow-hidden bg-surface hover:border-gold/50 transition-all duration-300 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          {/* Colour thumbnail */}
          <div
            className="h-36 relative"
            style={{ background: `linear-gradient(135deg, ${project.accentFrom} 0%, ${project.accentTo} 100%)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-white/5 select-none font-sans">{project.title}</span>
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
                <p className="text-muted text-sm mt-0.5">{project.category} · {project.role.split(' · ')[0]}</p>
              </div>
              <div className="text-muted group-hover:text-gold transition-colors duration-300 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">{project.problem}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tag) => (
                <span key={tag} className="text-xs font-mono text-muted/70 bg-bg px-2 py-0.5 rounded border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function SelectedWork() {
  return (
    <section id="projects" className="bg-bg py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-gold text-sm font-mono font-medium mb-3 tracking-wider uppercase">Selected work</p>
            <h2 className="text-4xl lg:text-5xl font-sans font-bold text-body leading-tight">
              Things I&apos;ve{' '}
              <span className="font-serif italic text-gold">built.</span>
            </h2>
          </div>
          <p className="text-muted max-w-xs lg:text-right text-sm leading-relaxed">
            Five case studies — click any card to read the full breakdown, stack, and outcomes.
          </p>
        </div>

        {/* 3 + 2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 3).map((p, i) => <ProjectCard key={p.number} project={p} index={i} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {projects.slice(3).map((p, i) => <ProjectCard key={p.number} project={p} index={i + 3} />)}
        </div>
      </div>
    </section>
  )
}
