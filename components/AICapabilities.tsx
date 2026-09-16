'use client'

import { useEffect, useRef, useState } from 'react'
import type { AISpecialisation } from '@/lib/data'

function CapabilityItem({
  specialisation,
  index,
}: {
  specialisation: AISpecialisation
  index: number
}) {
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
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="group flex items-start gap-4 border border-border rounded-2xl p-6 bg-surface hover:border-gold/50 hover:bg-surface/70 transition-all duration-300">
        {/* Gold bullet */}
        <span className="text-gold text-lg leading-none mt-0.5 shrink-0">✦</span>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-body text-base font-semibold leading-snug group-hover:text-gold transition-colors duration-300">
            {specialisation.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed">{specialisation.descriptor}</p>
        </div>
      </div>
    </div>
  )
}

export default function AICapabilities({
  specialisations,
}: {
  specialisations: AISpecialisation[]
}) {
  return (
    <section className="bg-bg py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-gold text-sm font-mono font-medium mb-3 tracking-wider uppercase">
              AI Capabilities
            </p>
            <h2 className="text-4xl lg:text-5xl font-sans font-bold text-body leading-tight">
              Where AI meets{' '}
              <span className="font-serif italic text-gold">real product.</span>
            </h2>
          </div>
          <p className="text-muted max-w-xs lg:text-right text-sm leading-relaxed">
            Specialisations built through shipped systems — not tutorials.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialisations.map((spec, i) => (
            <CapabilityItem key={spec.title} specialisation={spec} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
