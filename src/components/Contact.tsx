import { useState } from 'react'
import type { FormEvent } from 'react'
import { contacts } from '../data/content'
import { formDelivery } from '../config/formDelivery'
import { useLang } from '../i18n/LangContext'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

async function sendToTelegram(text: string) {
  const { telegramBotToken, telegramChatId } = formDelivery
  if (!telegramBotToken || !telegramChatId) {
    throw new Error('Telegram is not configured')
  }

  const response = await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text,
        parse_mode: 'HTML',
      }),
    },
  )

  const payload = (await response.json()) as { ok?: boolean }
  if (!response.ok || !payload.ok) {
    throw new Error('Telegram send failed')
  }
}

export function Contact() {
  const { lang, t } = useLang()
  const [status, setStatus] = useState<FormStatus>('idle')
  const contactName = lang === 'en' ? contacts.nameEn : contacts.name
  const telegramReady = Boolean(
    formDelivery.telegramBotToken && formDelivery.telegramChatId,
  )

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const service = String(data.get('service') || '').trim()
    const message = String(data.get('message') || '').trim()
    const honeypot = String(data.get('_gotcha') || '')

    if (honeypot) {
      setStatus('sent')
      form.reset()
      return
    }

    setStatus('sending')

    const text = [
      `<b>Новая заявка Azarta</b>`,
      ``,
      `<b>Имя:</b> ${name}`,
      `<b>Телефон:</b> ${phone}`,
      `<b>Услуга:</b> ${service}`,
      `<b>Сообщение:</b> ${message || t.mailEmpty}`,
    ].join('\n')

    try {
      if (!telegramReady) {
        throw new Error('Telegram is not configured')
      }
      await sendToTelegram(text)
      setStatus('sent')
      form.reset()
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
          className={`form reveal${status === 'sent' ? ' is-sent' : ''}`}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="form__success" role="status">
            <strong>{t.formSuccess}</strong>
            <span>{t.formSuccessHint}</span>
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

            {status === 'error' && (
              <p className="form__error" role="alert">
                {telegramReady ? t.formError : t.formSetupNeeded}
              </p>
            )}

            <div className="form__footer">
              <p className="form__note">{t.formNote}</p>
              <button
                type="submit"
                className="btn btn--primary"
                data-cursor="hover"
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
