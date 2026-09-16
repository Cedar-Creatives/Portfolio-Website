'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  {
    number: '01',
    title: 'Full-Stack Development',
    description:
      'Web apps built end-to-end with React, Next.js, Node.js, and Prisma — from database schema to deployed product.',
    tags: ['React', 'Next.js', 'Node.js', 'Prisma', 'PostgreSQL'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Integration & Automation',
    description:
      'RAG pipelines, agentic systems, and voice/WhatsApp AI — built with FastAPI, LangGraph, and LLM APIs like Gemini and Whisper.',
    tags: ['FastAPI', 'LangGraph', 'Gemini', 'Whisper', 'ChromaDB'],
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
      'Teaching MERN stack and Scratch programming at Techpro Institute, plus independent bootcamps and curriculum design for beginners and career-switchers.',
    tags: ['MERN Stack', 'Scratch', 'Curriculum Design', 'Bootcamps'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Product & Brand Building',
    description:
      'Running Cedar Creatives Technology end-to-end — from visual identity to shipped product, not just code.',
    tags: ['Product Strategy', 'Brand Identity', 'Cedar Creatives', 'End-to-End'],
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
            From full-stack builds to AI systems to teaching the next generation — this is what Cedar Creatives Technology runs on.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
