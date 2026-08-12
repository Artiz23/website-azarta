import { useLang } from '../i18n/LangContext'

export function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden>
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__grid" />
      </div>

      <div className="hero__content">
        <h1 className="hero__brand reveal">
          Azarta<span>.</span>
        </h1>
        <p className="hero__title reveal">{t.heroTitle}</p>
        <p className="hero__text reveal">{t.heroText}</p>
        <div className="hero__actions reveal">
          <a href="#contact" className="btn btn--primary" data-cursor="hover">
            {t.discuss}
            <span aria-hidden>↗</span>
          </a>
          <a href="#works" className="btn btn--ghost" data-cursor="hover">
            {t.viewWorks}
          </a>
        </div>

        <div className="hero__meta reveal">
          {t.stats.map((stat) => (
            <div className="hero__stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
