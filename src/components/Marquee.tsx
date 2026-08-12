import { useLang } from '../i18n/LangContext'

export function Marquee() {
  const { t } = useLang()
  const row = [...t.marquee, ...t.marquee]

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {row.map((item, i) => (
          <div className="marquee__item" key={`${item}-${i}`}>
            <span>●</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
