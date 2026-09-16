'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '9+', label: 'Years coding', sub: 'since 2017' },
  { value: '14', label: 'Products shipped', sub: 'end to end' },
  { value: '300+', label: 'Users served', sub: 'across platforms' },
  { value: '2nd', label: 'National hackathon', sub: 'CANEX Create-Thon 2026' },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="group border border-border rounded-2xl p-7 lg:p-8 bg-surface hover:border-gold/50 transition-all duration-300 hover:bg-surface/70">
        <div className="text-5xl lg:text-6xl font-sans font-bold text-gold mb-2 tracking-tight">
          {stat.value}
        </div>
        <div className="text-body font-semibold text-base mb-1">{stat.label}</div>
        <div className="text-muted text-sm">{stat.sub}</div>
      </div>
    </div>
  )
}

export default function StatsRow() {
  return (
    <section className="bg-bg py-16 lg:py-20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
