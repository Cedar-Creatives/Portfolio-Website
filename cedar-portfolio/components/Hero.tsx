'use client'

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center bg-bg overflow-hidden pt-20"
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,162,39,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div className="order-2 lg:order-1">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2.5 bg-surface border border-border rounded-full px-4 py-2 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-muted text-sm font-medium">Available for freelance work</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-sans font-bold text-body leading-[1.05] tracking-tight mb-6">
              Full-stack developer &{' '}
              <span className="font-serif italic text-gold">AI builder.</span>
            </h1>

            {/* Tagline */}
            <p className="text-muted text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
              I build AI-integrated web apps and teach the next wave of developers how to do the same.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 bg-gold text-bg font-semibold px-7 py-3.5 rounded-full hover:bg-gold-light transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                See my work →
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 border border-border text-body font-semibold px-7 py-3.5 rounded-full hover:border-gold hover:text-gold transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                Work with me →
              </a>
            </div>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-2 mt-10">
              {['Next.js', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'Prisma', 'LangGraph', 'PostgreSQL'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-muted border border-border rounded px-2.5 py-1 hover:border-gold/50 hover:text-gold/80 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — portrait */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Portrait card */}
              <div className="relative w-72 h-96 lg:w-80 lg:h-[440px] rounded-3xl overflow-hidden border border-border bg-surface">
                {/* Portrait placeholder — gradient background with initials */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a35] to-bg flex flex-col items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mb-4 text-gold text-4xl font-serif font-bold">
                    A
                  </div>
                  <p className="text-muted text-xs font-medium tracking-widest uppercase">Portrait</p>
                  <p className="text-muted/50 text-xs">Coming soon</p>
                </div>

                {/* Bottom label overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/90 via-bg/60 to-transparent p-5">
                  <p className="text-body font-semibold text-sm">Ayorinde Joshua Adeyemi</p>
                  <p className="text-gold text-xs font-medium mt-0.5">Cedar · Full-Stack & AI Builder</p>
                </div>
              </div>

              {/* Floating badge — location */}
              <div className="absolute -bottom-4 -left-4 bg-surface border border-border rounded-xl px-4 py-3 shadow-2xl">
                <p className="text-xs text-muted leading-none mb-0.5">Based in</p>
                <p className="text-body text-sm font-semibold">Lagos, Nigeria 🇳🇬</p>
              </div>

              {/* Floating badge — hackathon */}
              <div className="absolute -top-4 -right-4 bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 shadow-2xl">
                <p className="text-gold text-xs font-semibold">🏆 2nd Place</p>
                <p className="text-muted text-xs mt-0.5">CANEX Create-Thon 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
