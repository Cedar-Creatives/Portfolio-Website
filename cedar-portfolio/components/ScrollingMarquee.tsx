'use client'

const techItems = [
  'Next.js', '✦', 'React', '✦', 'TypeScript', '✦', 'Node.js', '✦', 'FastAPI', '✦',
  'Prisma', '✦', 'PostgreSQL', '✦', 'LangGraph', '✦', 'ChromaDB', '✦', 'Gemini', '✦',
  'Whisper', '✦', 'NestJS', '✦', 'RAG Pipelines', '✦', 'Voice AI', '✦', 'WhatsApp API', '✦',
  'Full-Stack Dev', '✦', 'AI Integration', '✦', 'Tech Education', '✦', 'Product Building', '✦',
]

const projects = [
  { name: 'Cedar-Learn', category: 'EdTech', color: 'from-indigo-900/60 to-bg' },
  { name: 'IṢẸ́', category: 'Voice AI', color: 'from-amber-900/60 to-bg' },
  { name: 'QwikCare', category: 'HealthTech', color: 'from-emerald-900/60 to-bg' },
  { name: 'Kaytop', category: 'FinTech', color: 'from-blue-900/60 to-bg' },
  { name: 'Kopamart', category: 'Marketplace', color: 'from-purple-900/60 to-bg' },
]

// Triple so the seamless loop is guaranteed at any screen width
const tripled = [...techItems, ...techItems, ...techItems]
const tripledProjects = [...projects, ...projects, ...projects]

export default function ScrollingMarquee() {
  return (
    <section className="bg-bg py-12 overflow-hidden border-b border-border">
      {/* Tech ticker strip */}
      <div className="relative mb-8 flex">
        <div className="flex gap-8 animate-marquee whitespace-nowrap will-change-transform">
          {tripled.map((item, i) => (
            <span
              key={i}
              className={`text-sm font-medium flex-shrink-0 ${item === '✦' ? 'text-gold' : 'text-muted'}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Project card strip — reverse direction */}
      <div className="relative flex">
        <div className="flex gap-5 animate-marquee2 whitespace-nowrap will-change-transform">
          {tripledProjects.map((project, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-52 h-32 rounded-2xl bg-gradient-to-br ${project.color} border border-border flex flex-col justify-end p-4 cursor-default hover:border-gold/40 transition-colors duration-300 group`}
            >
              <p className="text-muted text-xs font-medium mb-0.5 group-hover:text-gold/70 transition-colors">
                {project.category}
              </p>
              <p className="text-body text-sm font-semibold leading-tight">{project.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
