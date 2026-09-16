import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsRow from '@/components/StatsRow'
import ScrollingMarquee from '@/components/ScrollingMarquee'
import WhatIDo from '@/components/WhatIDo'
import SelectedWork from '@/components/SelectedWork'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-bg min-h-screen">
      <Nav />
      <Hero />
      <StatsRow />
      <ScrollingMarquee />
      <WhatIDo />
      <SelectedWork />
      <ExperienceTimeline />
      <Footer />
    </main>
  )
}
