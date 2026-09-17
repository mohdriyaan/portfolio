import { Hero } from '../components/home/Hero'
import { ProjectSection } from '../components/home/ProjectSection'
import { AboutSection } from '../components/home/AboutSection'
import { ContactSection } from '../components/home/ContactSection'

type HomeProps = {
  onOpenProject: (slug: string) => void
}

export function Home({ onOpenProject }: HomeProps) {
  return (
    <main id="main-content">
      <Hero />
      <ProjectSection onOpenProject={onOpenProject} />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
