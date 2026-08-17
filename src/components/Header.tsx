import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { contacts } from '../data/content'
import { useLang } from '../i18n/LangContext'

type HeaderProps = {
  onOpenContact: () => void
}

export function Header({ onOpenContact }: HeaderProps) {
  const { lang, setLang, t } = useLang()
  const navigate = useNavigate()
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

  const goSection = (href: string) => {
    close()
    if (href.startsWith('#')) {
      navigate({ pathname: '/', hash: href.slice(1) })
      return
    }
    navigate(href)
  }

  const LangSwitch = ({ className = '' }: { className?: string }) => (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t.langAria}>
      <button
        type="button"
        className={lang === 'ru' ? 'is-active' : ''}
        onClick={() => setLang('ru')}
      >
        RU
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  )

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header__inner">
          <Link to="/" className="logo" onClick={close}>
            Azarta<span>.</span>
          </Link>

          <nav className="nav" aria-label={t.navAria}>
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  goSection(link.href)
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <LangSwitch className="lang-switch--desktop" />
            <a
              href="#contact"
              className="header__cta"
              onClick={(e) => {
                e.preventDefault()
                onOpenContact()
                goSection('#contact')
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
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault()
              goSection(link.href)
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            goSection('#contact')
          }}
        >
          {t.ctaRequestShort}
        </a>
        <a href={contacts.phoneHref}>{contacts.phone}</a>
      </div>
    </>
  )
}
