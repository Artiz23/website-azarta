import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Clients } from './components/Clients'
import { Marquee } from './components/Marquee'
import { Services } from './components/Services'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { PrivacyPage } from './components/PrivacyPage'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { LangProvider } from './i18n/LangContext'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [location.pathname, location.hash])

  return null
}

function HomePage() {
  useSmoothScroll()

  const openContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header onOpenContact={openContact} />
      <main>
        <Hero />
        <Clients />
        <Marquee />
        <Services />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function PrivacyLayout() {
  const navigate = useNavigate()

  const openContact = () => {
    navigate({ pathname: '/', hash: 'contact' })
  }

  return (
    <>
      <Header onOpenContact={openContact} />
      <PrivacyPage />
      <Footer />
    </>
  )
}

function AppShell() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <div className="noise" aria-hidden />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agree-personal" element={<PrivacyLayout />} />
        <Route path="/agree-personal/" element={<PrivacyLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  )
}

export default App
