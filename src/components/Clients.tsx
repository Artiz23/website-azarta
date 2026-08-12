import { useLang } from '../i18n/LangContext'

const clients = [
  { name: 'Nordline', mark: 'N' },
  { name: 'Peak Studio', mark: 'P' },
  { name: 'Urban Box', mark: 'U' },
  { name: 'SoftNest', mark: 'S' },
  { name: 'Grain Co', mark: 'G' },
  { name: 'Pulse Lab', mark: 'PL' },
  { name: 'Horizon', mark: 'H' },
  { name: 'Maple Digit', mark: 'M' },
  { name: 'Vertex', mark: 'V' },
  { name: 'Orbit Media', mark: 'O' },
]

export function Clients() {
  const { t } = useLang()
  const row = [...clients, ...clients]

  return (
    <section className="clients" aria-label={t.clientsLabel}>
      <div className="clients__head container">
        <p className="clients__label">{t.clientsLabel}</p>
      </div>
      <div className="clients__marquee">
        <div className="clients__track">
          {row.map((client, index) => (
            <div className="clients__item" key={`${client.name}-${index}`}>
              <span className="clients__mark" aria-hidden>
                {client.mark}
              </span>
              <span className="clients__name">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
