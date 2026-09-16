'use client'

import { useEffect, useRef, useState } from 'react'
import type { ValuePrinciple } from '@/lib/data'

type Props = {
  principles: ValuePrinciple[]
}

function ValueCard({ principle, index }: { principle: ValuePrinciple; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="h-full border border-border rounded-2xl p-7 bg-surface hover:border-gold/40 transition-all duration-300 flex flex-col gap-4 group">
        {/* Number */}
        <span className="text-gold font-mono text-sm font-semibold">{principle.number}</span>

        {/* Title */}
        <h3 className="text-body text-xl font-bold leading-snug group-hover:text-gold transition-colors duration-300">
          {principle.title}
        </h3>

        {/* Body */}
        <p className="text-muted text-sm leading-relaxed flex-1">{principle.body}</p>
      </div>
    </div>
  )
}

export default function ValuesBlock({ principles }: Props) {
  return (
    <section className="bg-bg py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-gold text-sm font-mono font-medium mb-3 tracking-wider uppercase">
            What I believe
          </p>
          <h2 className="text-4xl lg:text-5xl font-sans font-bold text-body leading-tight">
            Principles that{' '}
            <span className="font-serif italic text-gold">guide the work.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {principles.map((principle, i) => (
            <ValueCard key={principle.number} principle={principle} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
