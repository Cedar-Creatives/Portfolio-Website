import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ValuesBlock from '@/components/ValuesBlock'
import AICapabilities from '@/components/AICapabilities'
import SkillsGrid from '@/components/SkillsGrid'
import {
  educationMilestones,
  valuePrinciples,
  aiSpecialisations,
  skillCategories,
  type EducationMilestone,
} from '@/lib/data'

export const metadata: Metadata = {
  title: 'About — Cedar | Ayorinde Joshua Adeyemi',
  description:
    'Software engineer and AI generalist based in Lagos, Nigeria. Read the story behind Cedar Creatives Technology — from self-taught origins to production AI systems.',
}

// ---------------------------------------------------------------------------
// PageHero — inline RSC section
// ---------------------------------------------------------------------------
function PageHero() {
  return (
    <section className="relative bg-bg pt-32 pb-20 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,162,39,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Label */}
        <p className="text-gold text-sm font-mono font-medium mb-4 tracking-wider uppercase">
          About
        </p>

        {/* Headline */}
        <h1 className="text-5xl lg:text-7xl font-sans font-bold text-body leading-[1.05] tracking-tight max-w-3xl mb-8">
          Building things that{' '}
          <span className="font-serif italic text-gold">actually work.</span>
        </h1>

        {/* Origin sub-line */}
        <p className="text-muted text-lg lg:text-xl leading-relaxed max-w-2xl">
          Ayorinde Joshua Adeyemi — Cedar — is a software engineer and AI generalist. Since 2017,
          the work has been about one thing: shipping software that solves real problems for real people.
        </p>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// BiographySection — inline RSC section
// ---------------------------------------------------------------------------
function BiographySection() {
  return (
    <section className="bg-bg py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Label column */}
          <div className="lg:col-span-3">
            <p className="text-gold text-sm font-mono font-medium tracking-wider uppercase sticky top-24">
              Background
            </p>
          </div>

          {/* Prose column */}
          <div className="lg:col-span-9 space-y-6 text-muted text-base lg:text-lg leading-relaxed">
            <p>
              The journey started in 2017 with pure curiosity — HTML, CSS, and JavaScript tutorials
              consumed obsessively, no formal instruction, just a browser and a determination to
              understand how the web worked. By 2019 those experiments had become functional
              projects, and what started as a hobby had turned into a craft worth taking seriously.
            </p>

            <p>
              From 2020 to 2021, a structured deep-dive at Techpro Institute sharpened that
              foundation into professional-grade skill: advanced JavaScript patterns, the full MERN
              stack, and the discipline of building systems designed to last. That same institute
              later became the classroom where Cedar would return as the instructor — teaching MERN
              stack and Scratch programming to the next cohort of developers.
            </p>

            <p>
              From 2022 onward, the focus expanded into AI engineering. Not the tutorial kind —
              the production kind. LangGraph for agentic workflows. ChromaDB and pgvector for
              retrieval systems. OpenAI Whisper for multilingual voice AI. Every specialisation
              was earned through hands-on execution: Cedar-Learn (an LMS built and deployed for active cohorts), IṢẸ́ (a
              multilingual WhatsApp voice assistant built at a hackathon), and leading the product pitch and launch presentation for QwikCare (a healthtech
              platform presented at OSDLS 2.0).
            </p>
            

            <p>
              Today Cedar operates under Cedar Creatives Technology — a practice that covers
              software engineering, AI system design, and developer education, with a deliberate
              focus on the Nigerian and West African context where most platforms are built for
              somewhere else.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// EducationCard — individual milestone card
// ---------------------------------------------------------------------------
function EducationCard({ milestone, index }: { milestone: EducationMilestone; index: number }) {
  return (
    <div
      className="border border-border rounded-2xl p-6 lg:p-8 bg-surface hover:border-gold/40 transition-all duration-300 flex flex-col gap-3"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Year range */}
      <span className="text-gold font-mono text-sm font-semibold">{milestone.yearRange}</span>

      {/* Credential */}
      <h3 className="text-body text-lg font-bold leading-snug">{milestone.credential}</h3>

      {/* Institution */}
      <p className="text-muted text-sm font-medium">{milestone.institution}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EducationSection — inline RSC section
// ---------------------------------------------------------------------------
function EducationSection() {
  return (
    <section className="bg-bg py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-gold text-sm font-mono font-medium mb-3 tracking-wider uppercase">
            Education & Training
          </p>
          <h2 className="text-4xl lg:text-5xl font-sans font-bold text-body leading-tight">
            How the skills{' '}
            <span className="font-serif italic text-gold">were built.</span>
          </h2>
        </div>

        {/* Education cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {educationMilestones.map((milestone, i) => (
            <EducationCard key={milestone.institution} milestone={milestone} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// GeographicReach — inline RSC subsection
// ---------------------------------------------------------------------------
function GeographicReach() {
  return (
    <section className="bg-surface/50 border-y border-border py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Label */}
          <div className="lg:col-span-3">
            <p className="text-gold text-sm font-mono font-medium tracking-wider uppercase">
              Geographic Reach
            </p>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Base */}
              <div className="flex flex-col gap-1.5">
                <span className="text-muted text-xs font-mono uppercase tracking-wider">
                  Base
                </span>
                <span className="text-body text-lg font-semibold">Lagos, Nigeria 🇳🇬</span>
                <span className="text-muted text-sm">WAT / UTC+1</span>
              </div>

              {/* Availability */}
              <div className="flex flex-col gap-1.5">
                <span className="text-muted text-xs font-mono uppercase tracking-wider">
                  Work mode
                </span>
                <span className="text-body text-lg font-semibold">Remote · Open to relocation</span>
                <span className="text-muted text-sm">Contract & full-time considered</span>
              </div>

              {/* Focus region */}
              <div className="flex flex-col gap-1.5">
                <span className="text-muted text-xs font-mono uppercase tracking-wider">
                  Primary context
                </span>
                <span className="text-body text-lg font-semibold">Nigeria & West Africa</span>
                <span className="text-muted text-sm">
                  Local rails, bandwidth constraints, multilingual users
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// AboutPage — RSC
// ---------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <main className="bg-bg min-h-screen">
      <Nav />
      <PageHero />
      <BiographySection />
      <EducationSection />
      <GeographicReach />
      <ValuesBlock principles={valuePrinciples} />
      <AICapabilities specialisations={aiSpecialisations} />

      {/* Skills section with its own header wrapper */}
      <section className="bg-bg py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section header */}
          <div className="mb-12">
            <p className="text-gold text-sm font-mono font-medium mb-3 tracking-wider uppercase">
              Technical Skills
            </p>
            <h2 className="text-4xl lg:text-5xl font-sans font-bold text-body leading-tight">
              The full{' '}
              <span className="font-serif italic text-gold">toolkit.</span>
            </h2>
          </div>

          <SkillsGrid categories={skillCategories} />
        </div>
      </section>

      {/* Section CTA */}
      <section className="bg-bg pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-border text-body font-semibold px-7 py-3.5 rounded-full hover:border-gold hover:text-gold transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            View all projects →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
