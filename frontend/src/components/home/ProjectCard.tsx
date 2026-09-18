import type { Project } from '../../types/project'
import { useReveal } from '../../hooks/useReveal'
import { Badge } from '../ui/Badge'
import { ProjectScreenshot } from '../projects/ProjectScreenshot'

type ProjectCardProps = {
  project: Project
  onOpen: (slug: string) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      className={`project-card reveal ${visible ? 'is-visible' : ''}`}
    >
      <ProjectScreenshot
        src={project.screenshot}
        alt={project.screenshotAlt}
        label={`${project.number} · ${project.category}`}
        action={<span>Project screenshot</span>}
      />

      <div className="project-card-body">
        <div className="project-card-topline">
          <span className="project-number">{project.number}</span>
          <span className="project-category">{project.category}</span>
        </div>

        <div className="project-card-copy">
          <h3>{project.name}</h3>

          <p className="project-one-liner">
            {project.oneLiner}
          </p>

          <p>{project.description}</p>
        </div>

        <div className="badge-row">
          {project.stack
            .slice(0, 6)
            .map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
        </div>

        <div className="project-card-actions">
          <button
            type="button"
            className="text-link"
            onClick={() => onOpen(project.slug)}
          >
            Read case study <span>↗</span>
          </button>

          <div className="external-links">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live ↗
            </a>

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Code ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}