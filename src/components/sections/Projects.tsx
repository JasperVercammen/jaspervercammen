import { OTHER_PROJECTS, PROJECTS, type Project } from '../../data/projects'
import { Section } from '../Section'

type Props = {
  revealed: boolean
  onOpenProject: (project: Project) => void
}

export function Projects({ revealed, onOpenProject }: Props) {
  return (
    <Section id="projects" label="Featured projects — click one to open its case study" revealed={revealed}>
      {PROJECTS.map((project) => {
        const body = (
          <>
            {project.highlight && (
              <span className="project-card__star" role="img" aria-label="Personal favourite" title="Personal favourite">
                ★
              </span>
            )}
            <span className="project-card__main">
              <span className="project-card__title">
                {project.title}
                {project.status && (
                  <span
                    className={`status status--${project.status}`}
                    role="img"
                    aria-label={project.status === 'live' ? 'Still in production' : 'No longer in production'}
                    title={project.status === 'live' ? 'Still in production' : 'No longer in production'}
                  />
                )}
              </span>
              {project.tagline && <span className="project-card__tagline">{project.tagline}</span>}
            </span>
            {(project.tag || project.years) && (
              <span className="project-card__meta">
                {project.tag && <span className="project-card__tag">{project.tag}</span>}
                {project.years && <span className="project-card__year">{project.years}</span>}
              </span>
            )}
          </>
        )

        return project.what ? (
          <button key={project.id} className="project-card" onClick={() => onOpenProject(project)}>
            {body}
          </button>
        ) : (
          <div key={project.id} className="project-card project-card--stub">
            {body}
          </div>
        )
      })}
      <div className="legend">
        <span className="legend__item">
          <span className="legend__star">★</span> the ones I’m proudest of
        </span>
        <span className="legend__item">
          <span className="status status--live" /> still in production
        </span>
        <span className="legend__item">
          <span className="status status--retired" /> no longer in production
        </span>
      </div>
      <p className="others">{OTHER_PROJECTS}</p>
    </Section>
  )
}
