'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    period: '2022 — Present',
    role: 'Lead Software & AI Engineer',
    company: 'Cedar Creatives / Studio',
    type: 'Freelance & Contract',
    description:
      'Architecting and shipping full-stack web applications and AI-driven platforms for clients and internal products across EdTech, Healthcare, and E-commerce.',
    highlights: [
      'Built AI learning platforms, medical queue management systems, and e-commerce architectures.',
      'Specialized in Next.js, TypeScript, Node.js, Python/FastAPI, LangGraph, and vector databases.',
      'Led project lifecycles end-to-end from system design to cloud deployment.',
    ],
    skills: ['Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    period: '2020 — 2022',
    role: 'Senior Software Engineer',
    company: 'Contract & Agency Work',
    type: 'Full-Time & Contract',
    description:
      'Led engineering on web and backend projects across multiple client engagements — API design, database architecture, and frontend delivery for product teams.',
    highlights: [
      'Designed and maintained RESTful APIs across high-traffic web products.',
      'Mentored junior developers and established code review and CI/CD standards.',
      'Worked across React, Node.js, PostgreSQL, and Docker on production systems.',
    ],
    skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'GraphQL', 'AWS'],
  },
  {
    period: '2017 — 2020',
    role: 'Full-Stack Developer',
    company: 'Independent & Startups',
    type: 'Freelance',
    description:
      'Developed custom web applications, responsive client websites, and cross-platform UI components for diverse tech startups.',
    highlights: [
      'Delivered 10+ custom web solutions for clients in Africa and internationally.',
      'Translated client design vision into performant, accessible web user interfaces.',
    ],
    skills: ['JavaScript', 'React', 'HTML5/CSS3', 'PHP', 'MySQL', 'Git'],
  },
]

export default function ExperienceTimeline() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center space-x-2 text-gold text-sm font-semibold tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Work <span className="font-serif italic font-normal text-gold">Experience</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl text-lg">
            Building and shipping software since 2017 — across freelance, contract, and independent work.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-border/60 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-8 md:pl-12 transition-all duration-700 delay-${index * 150} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-bg border-2 border-gold shadow-[0_0_10px_rgba(201,162,39,0.5)]" />

              {/* Date tag for desktop (left aligned) */}
              <div className="hidden md:block absolute -left-36 top-1 text-sm font-mono font-semibold text-gold/90 w-28 text-right">
                {exp.period}
              </div>

              {/* Card */}
              <div className="bg-surface/80 border border-border/80 rounded-2xl p-6 md:p-8 hover:border-gold/40 transition-all duration-300 group shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="md:hidden text-xs font-mono font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                    {exp.period}
                  </span>
                  <span className="text-xs text-muted font-medium px-2.5 py-1 rounded-full bg-border/40">
                    {exp.type}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gold transition-colors duration-200">
                  {exp.role}
                </h3>
                <p className="text-sm font-medium text-muted/80 mt-1 mb-4">
                  {exp.company}
                </p>

                <p className="text-muted leading-relaxed mb-4 text-sm md:text-base">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start text-sm text-muted/90">
                      <span className="text-gold mr-2 mt-0.5">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs rounded-md bg-border/30 text-muted font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
