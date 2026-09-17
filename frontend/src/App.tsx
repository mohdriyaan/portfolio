import { useEffect } from 'react'
import { projects } from './data/projects'
import { useHashRouter } from './hooks/useHashRouter'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { ProjectCaseStudy } from './pages/ProjectCaseStudy'

export default function App() {
  const { path, navigate } = useHashRouter()
  const match = path.match(/^work\/([^/]+)$/)
  const project = match ? projects.find((item) => item.slug === match[1]) : undefined

  useEffect(() => {
    document.title = project ? `${project.name} — Mohammed Riyaan` : 'Mohammed Riyaan — Full-Stack Developer'
  }, [project])

  useEffect(() => {
    if (path && !project && path !== 'work') {
      window.location.hash = '/'
    }
  }, [path, project])

  const handleHome = () => navigate('')
  const openProject = (slug: string) => navigate(`work/${slug}`)

  return (
    <div className="app-shell">
      <Navbar isCaseStudy={Boolean(project)} onHome={handleHome} />
      {project ? <ProjectCaseStudy project={project} onBack={handleHome} /> : <Home onOpenProject={openProject} />}
      <Footer />
    </div>
  )
}
