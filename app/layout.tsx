import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cedar — Software Engineer & AI Generalist | Ayorinde Joshua Adeyemi',
  description:
    'I build AI-integrated web apps and teach the next wave of developers how to do the same. Software engineer, AI generalist, and founder of Cedar Creatives Technology — based in Lagos, Nigeria.',
  keywords: [
    'Software Engineer Nigeria',
    'Full-Stack Developer Nigeria',
    'AI Engineer Lagos',
    'Next.js Developer',
    'React Developer',
    'Cedar Creatives Technology',
    'Ayorinde Joshua Adeyemi',
    'MERN Stack',
    'LangGraph',
    'RAG Pipelines',
    'Freelance Developer',
  ],
  authors: [{ name: 'Ayorinde Joshua Adeyemi' }],
  openGraph: {
    title: 'Cedar — Software Engineer & AI Generalist',
    description:
      'I build AI-integrated web apps and teach the next wave of developers how to do the same.',
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cedar — Software Engineer & AI Generalist',
    description:
      'I build AI-integrated web apps and teach the next wave of developers how to do the same.',
    creator: '@Adeximania',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${instrumentSerif.variable} font-sans bg-bg text-body antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
