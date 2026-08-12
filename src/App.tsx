import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Services } from './components/Services'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { LangProvider } from './i18n/LangContext'

function AppShell() {
  useSmoothScroll()

  const openContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="noise" aria-hidden />
      <CustomCursor />
      <Header onOpenContact={openContact} />
      <main>
        <Hero />
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

function App() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  )
}

export default App
