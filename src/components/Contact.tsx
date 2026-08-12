import { useState } from 'react'
import type { FormEvent } from 'react'
import { contacts } from '../data/content'
import { useLang } from '../i18n/LangContext'

export function Contact() {
  const { lang, t } = useLang()
  const [sent, setSent] = useState(false)
  const contactName = lang === 'en' ? contacts.nameEn : contacts.name

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const service = String(data.get('service') || '').trim()
    const message = String(data.get('message') || '').trim()

    const subject = encodeURIComponent(`${t.mailSubject} — ${name}`)
    const body = encodeURIComponent(
      [
        `${t.mailName}: ${name}`,
        `${t.mailPhone}: ${phone}`,
        `${t.mailService}: ${service}`,
        '',
        message || t.mailEmpty,
      ].join('\n'),
    )

    window.location.href = `${contacts.emailHref}?subject=${subject}&body=${body}`
    setSent(true)
    form.reset()
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__layout">
        <div className="contact__panel reveal">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactLead}</p>

          <div className="contact__links">
            <a className="contact__link" href={contacts.phoneHref} data-cursor="hover">
              <small>
                {t.phoneLabel} · {contactName}
              </small>
              <strong>{contacts.phone}</strong>
            </a>
            <a className="contact__link" href={contacts.emailHref} data-cursor="hover">
              <small>{t.emailLabel}</small>
              <strong>{contacts.email}</strong>
            </a>
            <a
              className="contact__link"
              href={contacts.telegram}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
            >
              <small>{t.telegramLabel}</small>
              <strong>{t.telegramCta}</strong>
            </a>
          </div>
        </div>

        <form
          className={`form reveal${sent ? ' is-sent' : ''}`}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="form__success" role="status">
            {t.formSuccess} {contacts.email} {t.formSuccessOr} {contacts.phone}.
          </div>

          <div className="form__fields">
            <div className="form__row">
              <div className="field">
                <label htmlFor="name">{t.formName}</label>
                <input id="name" name="name" required placeholder={t.formNamePh} />
              </div>
              <div className="field">
                <label htmlFor="phone">{t.formPhone}</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder={t.formPhonePh}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="service">{t.formService}</label>
              <select id="service" name="service" defaultValue={t.serviceOptions[0]} key={lang}>
                {t.serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="message">{t.formMessage}</label>
              <textarea
                id="message"
                name="message"
                placeholder={t.formMessagePh}
              />
            </div>

            <div className="form__footer">
              <p className="form__note">
                {t.formNote} {contacts.email}
              </p>
              <button type="submit" className="btn btn--primary" data-cursor="hover">
                {t.formSubmit}
                <span aria-hidden>↗</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
