'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const services = [
  {
    number: '01',
    title: 'Software Engineering',
    description:
      'Full-stack applications built across the entire depth — React and Next.js on the frontend, Node.js, NestJS, Django, and FastAPI on the backend, with Python carrying both server-side and AI workloads. Clean REST APIs, sound data models, and software designed to hold up in production.',
    tags: ['React', 'Next.js', 'Node.js', 'Python', 'Django', 'DRF', 'NestJS', 'REST APIs', 'Prisma', 'PostgreSQL'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Integration & Intelligent Systems',
    description:
      'Crafting AI-powered solutions for businesses — RAG pipelines, agentic systems, and voice/WhatsApp AI built with FastAPI, LangGraph, and LLM APIs like Gemini and Whisper. From scoping the problem to deploying the solution, the focus is on AI that actually works inside real products.',
    tags: ['FastAPI', 'LangGraph', 'Gemini', 'Whisper', 'ChromaDB', 'Agentic Systems'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Tech Education',
    description:
      'Running cohort-based, skill and career-focused tutorship through Cedar-Learn — structured programmes that take developers from zero to job-ready. Also teaching MERN stack and Scratch at Techpro Institute and designing curriculum for beginners and career-switchers.',
    tags: ['Cedar-Learn', 'Cohort Programmes', 'MERN Stack', 'Curriculum Design'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Content & Brand Creation',
    description:
      'Creating content across the full stack — copywriting, video production, and editing, all amplified with AI tools. Running Cedar Creatives Technology end-to-end: from visual identity and brand voice to shipped product. The generalist edge means the message and the product are built by the same hand.',
    tags: ['Copywriting', 'Video Production', 'Video Editing', 'AI-Assisted', 'Brand Identity'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="group h-full border border-border rounded-2xl p-7 bg-surface hover:border-gold/50 hover:bg-surface/70 transition-all duration-300 flex flex-col gap-5">
        {/* Number + icon row */}
        <div className="flex items-start justify-between">
          <span className="text-gold font-mono text-sm font-medium">{service.number}</span>
          <div className="text-muted group-hover:text-gold transition-colors duration-300">
            {service.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-body text-xl font-semibold leading-snug group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed flex-1">{service.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {service.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-muted/70 bg-bg px-2.5 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WhatIDo() {
  return (
    <section id="expertise" className="bg-bg py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-gold text-sm font-mono font-medium mb-3 tracking-wider uppercase">What I do</p>
            <h2 className="text-4xl lg:text-5xl font-sans font-bold text-body leading-tight">
              Where I focus my{' '}
              <span className="font-serif italic text-gold">craft.</span>
            </h2>
          </div>
          <p className="text-muted max-w-xs lg:text-right text-sm leading-relaxed">
            Software engineering, AI systems, developer education, and content — four disciplines, one practice.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-block border border-border text-body font-semibold px-7 py-3.5 rounded-full hover:border-gold hover:text-gold transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            See full experience →
          </Link>
        </div>
      </div>
    </section>
  )
}
