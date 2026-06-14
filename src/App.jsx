import { useEffect, useMemo, useState } from 'react';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import AboutMe from './components/AboutMe.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import WorkShowcase from './components/WorkShowcase.jsx';
import { translations } from './data/translations.js';
import { assetPath } from './utils/assets.js';

export default function App() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'pt';

    const savedLanguage = window.localStorage.getItem('portfolio-language');
    return savedLanguage === 'en' || savedLanguage === 'pt' ? savedLanguage : 'pt';
  });
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    window.localStorage.setItem('portfolio-language', language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-platinum selection:bg-white selection:text-black">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url("${assetPath('fixed-background.avif')}")` }}
      />
      <CustomCursor />
      <Header language={language} setLanguage={setLanguage} t={t} />
      <main className="relative z-10">
        <Hero terms={t.typingTerms} />
        <WorkShowcase t={t} />
        <AboutMe t={t.about} />
        <Contact t={t.contact} />
      </main>
      <div className="relative z-10">
        <Footer t={t.footer} />
      </div>
    </div>
  );
}
