'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { SkillCategory, Skill } from '@/lib/data'

interface SkillsGridProps {
  categories: SkillCategory[]
}

function SkillCard({ skill }: { skill: Skill }) {
  const iconUrl = `https://cdn.simpleicons.org/${skill.icon}/C9A227`
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-surface hover:border-gold/50 hover:bg-surface/70 transition-all duration-200 group">
      <div className="w-5 h-5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
        {!imgError ? (
          <Image
            src={iconUrl}
            alt={skill.name}
            width={20}
            height={20}
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-gold text-xs font-mono leading-none">✦</span>
        )}
      </div>
      <span className="text-xs font-mono text-muted group-hover:text-body transition-colors duration-200 leading-none">
        {skill.name}
      </span>
    </div>
  )
}

function CategorySection({
  category,
  index,
}: {
  category: SkillCategory
  index: number
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
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <p className="text-gold text-xs font-mono font-semibold tracking-wider uppercase mb-4">
        {category.label}
      </p>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export default function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {categories.map((category, index) => (
        <CategorySection key={category.label} category={category} index={index} />
      ))}
    </div>
  )
}
