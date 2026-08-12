import { useLang } from '../i18n/LangContext'

export function Portfolio() {
  const { t } = useLang()

  return (
    <section className="section" id="works">
      <div className="container">
        <div className="works__head">
          <div>
            <p className="section-label reveal">{t.worksLabel}</p>
            <h2 className="section-title reveal">{t.worksTitle}</h2>
          </div>
          <p className="section-lead reveal">{t.worksLead}</p>
        </div>

        <div className="works__grid">
          {t.projects.map((project) => (
            <a
              className="work-card reveal"
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              style={{ ['--tone' as string]: project.accent }}
            >
              <div className="work-card__visual">
                <div className="work-card__pattern" />
              </div>
              <div className="work-card__body">
                <div className="work-card__cat">{project.category}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="work-card__link">
                  {t.openSite}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M3 11L11 3M11 3H5M11 3V9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
