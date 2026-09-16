import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import ProjectsPageClient from './ProjectsPageClient'

export const metadata: Metadata = {
  title: 'Projects — Cedar | Ayorinde Joshua Adeyemi',
  description:
    'All projects built by Cedar — software engineering, AI systems, and more. Filter by category or technology stack.',
}

export default function ProjectsPage() {
  return (
    <main className="bg-bg min-h-screen">
      <Nav />
      <ProjectsPageClient />
    </main>
  )
}
