import type { CSSProperties } from 'react'
import { COMPANIES } from '../data/assets'
import type { Project } from '../data/projects'

type Props = {
  project: Project
  onClose: () => void
}

export function CaseStudy({ project, onClose }: Props) {
  const company = COMPANIES[project.company]

  return (
    <div className="case-study">
      <div>
        <button className="case-study__close" onClick={onClose}>
          ← close()
        </button>
      </div>

      <div className="case-study__head">
        <h2 className="case-study__title">{project.title}</h2>
        {project.role && <div className="case-study__role">{project.role}</div>}
        <div className="built-at">
          <span className="built-at__label">built at</span>
          <div
            className="built-at__logo"
            role="img"
            aria-label={company.name}
            style={{ '--logo': `url(${company.logo})`, '--logo-w': company.logoWidth } as CSSProperties}
          />
          {project.years && <span className="built-at__years">{project.years}</span>}
          {project.status && (
            <span className="built-at__status">
              <span className={`status status--${project.status}`} aria-hidden="true" />
              {project.status === 'live' ? 'still live' : 'no longer live'}
            </span>
          )}
        </div>
        {project.links && (
          <div className="links-row">
            {project.links.map((link) => (
              <a key={link.href} className="link" href={link.href} target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      {project.what && (
        <div className="cs-block">
          <h3 className="label">What</h3>
          <p className="cs-block__body">{project.what}</p>
        </div>
      )}

      {project.tasks && (
        <div className="cs-block">
          <h3 className="label">Tasks &amp; responsibilities</h3>
          <p className="cs-block__body">{project.tasks}</p>
        </div>
      )}

      {project.more && (
        <div className="cs-block">
          <h3 className="label">More</h3>
          <p className="cs-block__body">{project.more}</p>
        </div>
      )}

      {project.shots && (
        <div className="cs-block cs-shots">
          <h3 className="label">Screenshots</h3>
          <div className="shots">
            {project.shots.map((shot, i) => (
              <img
                key={shot}
                className={project.shotAspect === 'phone' ? 'shot shot--phone' : 'shot shot--desktop'}
                src={shot}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}

      {project.stack && (
        <div className="cs-stack">
          <h3 className="label">Stack</h3>
          <div className="chip-row">
            {project.stack.map((item) =>
              typeof item === 'string' ? (
                <span key={item} className="chip chip--accent">
                  {item}
                </span>
              ) : (
                <a
                  key={item.label}
                  className="chip chip--accent chip--link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label} ↗
                </a>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
