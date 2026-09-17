import type { Project } from '../types/project'
import { CaseStudy } from '../components/projects/CaseStudy'

type ProjectCaseStudyProps = {
  project: Project
  onBack: () => void
}

export function ProjectCaseStudy({ project, onBack }: ProjectCaseStudyProps) {
  return <CaseStudy project={project} onBack={onBack} />
}
