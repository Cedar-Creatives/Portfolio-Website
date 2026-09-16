'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Monogram */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-bg font-serif font-bold text-sm leading-none tracking-tight">CT</span>
            </div>
            <span className="text-body font-sans font-semibold text-sm hidden sm:block tracking-wide">
              Cedar<span className="text-gold">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-muted text-sm font-medium hover:text-body transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden md:inline-flex items-center gap-2 bg-gold text-bg text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gold-light transition-colors duration-200"
            >
              Work with me →
            </a>
            <button
              className="md:hidden text-body p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className={`block h-0.5 bg-body transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-body transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-body transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-surface/95 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-muted text-base font-medium hover:text-gold transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-2 inline-flex items-center justify-center bg-gold text-bg text-sm font-semibold px-5 py-3 rounded-full"
          >
            Work with me →
          </a>
        </div>
      </div>
    </nav>
  )
}
