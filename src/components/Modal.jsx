// Modal.jsx — Panneau de contenu portfolio
import { useEffect, useCallback } from 'react'

// ── Icônes SVG inline ─────────────────────────────────────────────
const Icons = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
}

// ── Rendus selon le type de contenu ─────────────────────────────

function ExperienceContent({ content }) {
  return (
    <div className="experience-company">
      <div className="experience-company__name">{content.company}</div>
      <div className="experience-company__meta">
        {content.location} &nbsp;·&nbsp; {content.contract}
      </div>
      {content.roles.map((role, i) => (
        <div key={i} className="experience-role">
          <div className="experience-role__header">
            <div className="experience-role__title">{role.title}</div>
            <div className="experience-role__period">{role.period}</div>
          </div>
          <ul className="experience-role__tasks">
            {role.tasks.map((t, j) => <li key={j}>{t}</li>)}
          </ul>
          <div className="experience-role__tools">
            {role.tools.map((tool) => (
              <span key={tool} className="tool-tag">{tool}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function EducationContent({ content }) {
  return (
    <div className="education-list">
      {content.items.map((item, i) => (
        <div key={i} className="education-item">
          <div className="education-item__period">{item.period}</div>
          <div className="education-item__school">{item.school}</div>
          <div className="education-item__degree">{item.degree}</div>
          <div className="education-item__skills">
            {item.skills.map((s) => (
              <span key={s} className="tool-tag">{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectsContent({ content }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {content.projects.map((proj, i) => (
        <div key={i} className="project-card">
          <div className="project-card__number">{String(i + 1).padStart(2, '0')}</div>
          <div className="project-card__title">{proj.title}</div>
          <div className="project-card__desc">{proj.description}</div>
        </div>
      ))}
    </div>
  )
}

function ContactContent({ content }) {
  return (
    <>
      <p className="contact-intro">{content.intro}</p>
      <div className="contact-links">
        {content.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-link ${link.icon === 'github' ? '' : 'contact-link--gold'}`}
          >
            {Icons[link.icon]}
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}

// ── Composant Modal principal ────────────────────────────────────
export function Modal({ artwork, onClose }) {
  if (!artwork) return null

  // Fermeture par Échap
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const stopProp = useCallback((e) => e.stopPropagation(), [])

  const renderContent = () => {
    switch (artwork.type) {
      case 'experience': return <ExperienceContent content={artwork.content} />
      case 'education':  return <EducationContent  content={artwork.content} />
      case 'projects':   return <ProjectsContent   content={artwork.content} />
      case 'contact':    return <ContactContent     content={artwork.content} />
      default: return null
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={stopProp}>
        <div className="modal__header">
          <div className="modal__eyebrow">{artwork.eyebrow}</div>
          <h2 className="modal__title">{artwork.label}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Fermer">
            {Icons.close}
          </button>
        </div>
        <div className="modal__body">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
