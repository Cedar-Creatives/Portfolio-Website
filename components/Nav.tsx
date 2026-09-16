'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// Home page nav links — anchor-scroll for sections that don't have pages,
// page-routing for About and Projects (replaces the old duplicate pageLinks)
const homeLinks = [
  { href: '/', label: 'Home', scroll: false },
  { href: '/about', label: 'About', scroll: false },
  { href: '#expertise', label: 'Expertise', scroll: true },
  { href: '/projects', label: 'Projects', scroll: false },
  { href: '#experience', label: 'Experience', scroll: true },
  { href: '#contact', label: 'Contact', scroll: true },
]

// Sub-page nav links — shown when pathname !== '/'
const subPageLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
          {/* Monogram — scrolls to top on home, navigates home elsewhere */}
          {isHome ? (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center gap-2.5 group"
            >
              <Image src="/icon.png" alt="Cedar logo" width={36} height={36} className="rounded-lg" />
              <span className="text-body font-sans font-semibold text-sm hidden sm:block tracking-wide">
                Cedar<span className="text-gold">.</span>
              </span>
            </a>
          ) : (
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image src="/icon.png" alt="Cedar logo" width={36} height={36} className="rounded-lg" />
              <span className="text-body font-sans font-semibold text-sm hidden sm:block tracking-wide">
                Cedar<span className="text-gold">.</span>
              </span>
            </Link>
          )}

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              <>
                {homeLinks.map((link) =>
                  link.scroll ? (
                    // Anchor-scroll link
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-muted text-sm font-medium hover:text-body transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                    </a>
                  ) : (
                    // Page-routing link — active state for Home (href="/")
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={link.href === '/' ? 'page' : undefined}
                      className={`text-sm font-medium transition-colors duration-200 relative group ${
                        link.href === '/' ? 'text-gold' : 'text-muted hover:text-body'
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                          link.href === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  )
                )}
              </>
            ) : (
              <>
                {subPageLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`text-sm font-medium transition-colors duration-200 relative group ${
                        isActive ? 'text-gold' : 'text-muted hover:text-body'
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  )
                })}
              </>
            )}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            {isHome ? (
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="hidden md:inline-flex items-center gap-2 bg-gold text-bg text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gold-light transition-colors duration-200"
              >
                Work with me →
              </a>
            ) : (
              <Link
                href="/#contact"
                className="hidden md:inline-flex items-center gap-2 bg-gold text-bg text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gold-light transition-colors duration-200"
              >
                Work with me →
              </Link>
            )}
            <button
              className="md:hidden text-body p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
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
          {isHome ? (
            <>
              {homeLinks.map((link) =>
                link.scroll ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-muted text-base font-medium hover:text-gold transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={link.href === '/' ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base font-medium transition-colors py-1 ${
                      link.href === '/' ? 'text-gold' : 'text-muted hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="mt-2 inline-flex items-center justify-center bg-gold text-bg text-sm font-semibold px-5 py-3 rounded-full"
              >
                Work with me →
              </a>
            </>
          ) : (
            <>
              {subPageLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base font-medium transition-colors py-1 ${
                      isActive ? 'text-gold' : 'text-muted hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center bg-gold text-bg text-sm font-semibold px-5 py-3 rounded-full"
              >
                Work with me →
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
