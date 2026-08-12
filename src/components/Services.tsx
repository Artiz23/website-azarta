import { useLang } from '../i18n/LangContext'

export function Services() {
  const { t } = useLang()

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="services__head">
          <div>
            <p className="section-label reveal">{t.servicesLabel}</p>
            <h2 className="section-title reveal">{t.servicesTitle}</h2>
          </div>
          <p className="section-lead reveal">{t.servicesLead}</p>
        </div>

        <div className="services__grid">
          {t.services.map((service) => (
            <article className="service-card reveal" key={service.num}>
              <div className="service-card__num">{service.num}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
