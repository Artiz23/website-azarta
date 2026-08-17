import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          Azarta<span>.</span>
        </div>
        <div className="footer__links">
          <Link to="/agree-personal/">{t.privacyLink}</Link>
          <p className="footer__copy">
            © {new Date().getFullYear()} {t.footerCopy}
          </p>
        </div>
      </div>
    </footer>
  )
}
