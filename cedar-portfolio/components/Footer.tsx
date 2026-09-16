'use client'

import { useState } from 'react'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const email = 'mailer.ayorinde.adeyemi@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer id="contact" className="bg-bg border-t border-surface-border/60 relative overflow-hidden pt-20 pb-12">
      {/* Background glow effects */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Main CTA section */}
        <div className="bg-gradient-to-br from-surface to-surface/40 border border-surface-border/80 rounded-3xl p-8 md:p-16 mb-20 text-center relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center space-x-2 text-accent text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Have a project in mind?</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Let&apos;s build something <br className="hidden md:inline" />
            <span className="font-serif italic font-normal text-accent">extraordinary</span> together.
          </h2>

          <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            I&apos;m currently available for freelance engagements, full-time engineering roles, and high-impact AI consultations.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${email}`}
              className="px-8 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-accent/20 flex items-center space-x-2 text-sm md:text-base"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Send Me an Email</span>
            </a>

            <button
              onClick={copyEmail}
              className="px-6 py-4 bg-surface border border-surface-border text-white font-medium rounded-xl hover:bg-surface-border/50 hover:border-accent/40 transition-all duration-300 text-sm md:text-base flex items-center space-x-2"
            >
              <span>{copied ? 'Copied to Clipboard! ✓' : email}</span>
            </button>
          </div>
        </div>

        {/* Footer links & info grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-surface-border/60">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center font-bold text-accent">
                C+T
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                Cedar <span className="text-accent">Creatives</span>
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-md leading-relaxed">
              Ayorinde Joshua Adeyemi (Cedar) — Lead Software & AI Engineer based in Lagos, Nigeria (WAT / UTC+1). Crafting high-performance web applications and intelligent systems.
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-accent transition-colors">
                  Expertise
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-accent transition-colors">
                  Selected Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-accent transition-colors">
                  Experience
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a
                  href="https://github.com/cedarcreatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex items-center space-x-1"
                >
                  <span>GitHub</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ayorinde-adeyemi-cedar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex items-center space-x-1"
                >
                  <span>LinkedIn</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/cedarcreatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex items-center space-x-1"
                >
                  <span>X / Twitter</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} Ayorinde Joshua Adeyemi (Cedar). All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Built with Next.js, React & Tailwind CSS</span>
            <span>•</span>
            <span className="text-accent/80 font-mono">Designed for Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
