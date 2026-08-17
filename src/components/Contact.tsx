import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { contacts } from '../data/content'
import { useLang } from '../i18n/LangContext'
import { PhoneField } from './PhoneField'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contacts.email}`

export function Contact() {
  const { lang, t } = useLang()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [phone, setPhone] = useState('+7')
  const [phoneValid, setPhoneValid] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const contactName = lang === 'en' ? contacts.nameEn : contacts.name

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('sent') === '1' || window.location.hash.includes('sent=1')) {
      setStatus('sent')
    }
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    if (!phoneValid) {
      setStatus('error')
      return
    }

    if (!agreed) {
      setStatus('error')
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    const honeypot = String(data.get('_gotcha') || '')

    if (honeypot) {
      setStatus('sent')
      form.reset()
      return
    }

    setStatus('sending')

    const payload = new FormData()
    payload.append('name', String(data.get('name') || '').trim())
    payload.append('phone', phone)
    payload.append('service', String(data.get('service') || '').trim())
    payload.append(
      'message',
      String(data.get('message') || '').trim() || t.mailEmpty,
    )
    payload.append('_subject', `${t.mailSubject} — ${String(data.get('name') || '').trim()}`)
    payload.append('_template', 'table')
    payload.append('_honey', '')
    payload.append('_url', 'https://artiz23.github.io/website-azarta/')
    payload.append('email', contacts.email)

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Failed to send')

      setStatus('sent')
      form.reset()
      setAgreed(false)
      setPhone('+7')
      setPhoneValid(false)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__layout">
        <div className="contact__panel reveal">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactLead}</p>

          <div className="contact__links">
            <a className="contact__link" href={contacts.phoneHref}>
              <small>
                {t.phoneLabel} · {contactName}
              </small>
              <strong>{contacts.phone}</strong>
            </a>
            <a className="contact__link" href={contacts.emailHref}>
              <small>{t.emailLabel}</small>
              <strong>{contacts.email}</strong>
            </a>
            <a
              className="contact__link"
              href={contacts.telegram}
              target="_blank"
              rel="noreferrer"
            >
              <small>{t.telegramLabel}</small>
              <strong>{t.telegramCta}</strong>
            </a>
          </div>
        </div>

        <form
          className={`form reveal${status === 'sent' ? ' is-sent' : ''}`}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="form__success" role="status">
            <strong>{t.formSuccess}</strong>
            <span>{t.formSuccessHint}</span>
            <span className="form__success-note">{t.formActivateHint}</span>
          </div>

          <div className="form__fields">
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="form__honeypot"
            />

            <div className="form__row">
              <div className="field">
                <label htmlFor="name">{t.formName}</label>
                <input id="name" name="name" required placeholder={t.formNamePh} />
              </div>
              <PhoneField
                lang={lang}
                label={t.formPhone}
                required
                onChangePhone={(full, valid) => {
                  setPhone(full)
                  setPhoneValid(valid)
                  if (status === 'error') setStatus('idle')
                }}
              />
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

            <label className="form__consent">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                  if (status === 'error') setStatus('idle')
                }}
                required
              />
              <span>
                {t.formConsentBefore}{' '}
                <Link to="/agree-personal/">{t.formConsentLink}</Link>
                {t.formConsentAfter}
              </span>
            </label>

            {status === 'error' && (
              <p className="form__error" role="alert">
                {!agreed
                  ? t.formConsentError
                  : !phoneValid
                    ? t.formPhoneError
                    : t.formError}
              </p>
            )}

            <div className="form__footer">
              <p className="form__note">{t.formNote}</p>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t.formSending : t.formSubmit}
                {status !== 'sending' && <span aria-hidden>↗</span>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
