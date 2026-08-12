import { useEffect, useState } from 'react'
import { contacts } from '../data/content'
import { useLang } from '../i18n/LangContext'

type HeaderProps = {
  onOpenContact: () => void
}

export function Header({ onOpenContact }: HeaderProps) {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  const LangSwitch = ({ className = '' }: { className?: string }) => (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t.langAria}>
      <button
        type="button"
        className={lang === 'ru' ? 'is-active' : ''}
        onClick={() => setLang('ru')}
        data-cursor="hover"
      >
        RU
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
        data-cursor="hover"
      >
        EN
      </button>
    </div>
  )

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header__inner">
          <a href="#top" className="logo" data-cursor="hover">
            Azarta<span>.</span>
          </a>

          <nav className="nav" aria-label={t.navAria}>
            {t.nav.map((link) => (
              <a key={link.href} href={link.href} data-cursor="hover">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <LangSwitch className="lang-switch--desktop" />
            <a
              href="#contact"
              className="header__cta"
              data-cursor="hover"
              onClick={(e) => {
                e.preventDefault()
                onOpenContact()
              }}
            >
              {t.ctaRequest}
              <span aria-hidden>↗</span>
            </a>
            <button
              className={`burger${open ? ' is-open' : ''}`}
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${open ? ' is-open' : ''}`}>
        <LangSwitch className="lang-switch--mobile" />
        {t.nav.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a href="#contact" onClick={close}>
          {t.ctaRequestShort}
        </a>
        <a href={contacts.phoneHref}>{contacts.phone}</a>
      </div>
    </>
  )
}
