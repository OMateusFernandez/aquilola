import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import { assetPath } from '../utils/assets.js';

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#sobre-mim' },
  { key: 'contact', href: '#contact' },
];

const languageOptions = [
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'en', label: 'English', short: 'EN' },
];

function LanguageDropdown({ language, setLanguage, compact = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = languageOptions.find((option) => option.code === language) || languageOptions[0];
  const label = language === 'pt' ? 'Línguas' : 'Language';

  const chooseLanguage = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative ${compact ? 'mx-auto w-fit' : 'ml-2'}`}
      onBlur={(event) => {
        const nextFocus = event.relatedTarget;

        if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={language === 'pt' ? 'Selecionar idioma' : 'Select language'}
        className={`group inline-flex items-center justify-center gap-2 font-semibold text-white/75 transition [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.28))] hover:text-white hover:[filter:drop-shadow(0_0_20px_rgba(255,255,255,0.68))] ${
          compact ? 'text-[0.68rem]' : 'text-sm'
        }`}
      >
        <span>{label}</span>
        <span className="relative grid place-items-center">
          <Globe2 className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} transition duration-300 group-hover:rotate-12`} />
          <span className="absolute -right-1 -top-1 rounded-full border border-white/15 bg-black/80 px-1 text-[0.48rem] font-black leading-3 text-white/70">
            {current.short}
          </span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            className={`absolute right-0 top-full z-[60] mt-3 overflow-hidden rounded-2xl border border-white/12 bg-black/90 p-1.5 shadow-[0_0_34px_rgba(255,255,255,0.1)] ${
              compact ? 'min-w-[8.5rem]' : 'min-w-[10rem]'
            }`}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {languageOptions.map((option) => {
              const isActive = option.code === language;

              return (
                <motion.button
                  key={option.code}
                  type="button"
                  role="menuitem"
                  onClick={() => chooseLanguage(option.code)}
                  whileHover={{ x: isActive ? 0 : 4, scale: isActive ? 1 : 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group/item flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-black uppercase tracking-[0.16em] transition ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-white/62 hover:translate-x-1 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_28px_rgba(255,255,255,0.10)]'
                  }`}
                >
                  <span>{option.label}</span>
                  <span
                    className={`ml-3 rounded-full border px-1.5 py-0.5 text-[0.58rem] transition ${
                      isActive
                        ? 'border-black/20 text-black'
                        : 'border-white/12 text-white/45 group-hover/item:border-white/25 group-hover/item:text-white/75'
                    }`}
                  >
                    {option.short}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ language, setLanguage, t }) {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/82 backdrop-blur-md"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#home" className="group flex items-center gap-3" aria-label="Mateus Fernandez home">
          <span className="relative grid h-14 w-20 place-items-center">
            <span className="absolute inset-2 rounded-full bg-white/12 blur-xl opacity-60 transition duration-500 group-hover:scale-125 group-hover:bg-white/22 group-hover:opacity-100 group-hover:blur-2xl" />
            <img
              src={assetPath('mateus-logo-transparent.png')}
              alt="Mateus Fernandez"
              className="relative h-12 w-auto object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.42)] transition duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_32px_rgba(255,255,255,0.92)]"
            />
          </span>
        </a>
        <div className="ml-auto hidden items-center gap-7 px-1 py-3 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-semibold text-white/75 transition [text-shadow:0_0_16px_rgba(255,255,255,0.28)] hover:text-white hover:[text-shadow:0_0_26px_rgba(255,255,255,0.72)]"
            >
              {t.nav[item.key]}
            </a>
          ))}
          <LanguageDropdown language={language} setLanguage={setLanguage} />
        </div>
      </nav>
      <div className="section-shell pb-3 md:hidden">
        <div className="grid grid-cols-[0.85fr_1.1fr_0.82fr_1.23fr] items-center px-1 py-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-1 py-1 text-center text-[0.56rem] font-bold leading-none text-white/75 transition [text-shadow:0_0_14px_rgba(255,255,255,0.28)] hover:text-white min-[380px]:text-[0.62rem]"
            >
              {t.nav[item.key]}
            </a>
          ))}
          <LanguageDropdown language={language} setLanguage={setLanguage} compact />
        </div>
      </div>
    </motion.header>
  );
}
