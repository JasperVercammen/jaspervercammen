import { OTHER_PROJECTS, PROJECTS, type Project } from '../../data/projects'
import { Section } from '../Section'

type Props = {
  revealed: boolean
  onOpenProject: (project: Project) => void
}

export function Projects({ revealed, onOpenProject }: Props) {
  return (
    <Section id="projects" label="Featured projects — click one to open its case study" revealed={revealed}>
      {PROJECTS.map((project) => (
        <button key={project.id} className="project-card" onClick={() => onOpenProject(project)}>
          <span className="project-card__main">
            <span className="project-card__title">{project.title}</span>
            <span className="project-card__tagline">{project.tagline}</span>
          </span>
          <span className="project-card__tag">{project.tag}</span>
        </button>
      ))}
      <p className="others">{OTHER_PROJECTS}</p>
    </Section>
  )
}
