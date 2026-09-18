import { projects } from '../../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'

type ProjectSectionProps = {
  onOpenProject: (slug: string) => void
}

export function ProjectSection({ onOpenProject }: ProjectSectionProps) {
  return (
    <section
      id="work"
      className="section-block work-section"
      aria-labelledby="work-title"
    >
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Projects built to answer a real question."
          description="Two shipped applications. Different domains, same approach: make the data and the rules legible."
          id="work-title"
        />

        <div className="projects-list work-projects">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onOpen={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  )
}