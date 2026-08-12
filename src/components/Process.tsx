import { useLang } from '../i18n/LangContext'

export function Process() {
  const { t } = useLang()

  return (
    <section className="section process" id="process">
      <div className="container">
        <p className="section-label reveal">{t.processLabel}</p>
        <h2 className="section-title reveal">{t.processTitle}</h2>
        <p className="section-lead reveal">{t.processLead}</p>

        <div className="process__list">
          {t.steps.map((step, index) => (
            <article className="process-item reveal" key={step.title}>
              <div className="process-item__num">{index + 1}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
