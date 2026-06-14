import { useState } from 'react';
import { motion } from 'framer-motion';
import VideoShowcase from './VideoShowcase.jsx';
import { videoShowcase } from '../data/videoShowcase.js';

export default function WorkShowcase({ t }) {
  const [activeFormat, setActiveFormat] = useState('longForm');
  const isShorts = activeFormat === 'shorts';
  const activeTitle = isShorts ? t.shorts.eyebrow : t.longForm.eyebrow;
  const videos = isShorts ? videoShowcase.shorts : videoShowcase.longForm;
  const switchOptions = [
    { key: 'longForm', label: t.longForm.eyebrow },
    { key: 'shorts', label: t.shorts.eyebrow },
  ];

  return (
    <section id="work" className="relative scroll-mt-24 pb-16 pt-8 sm:pb-24 sm:pt-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 top-8 h-72 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.075),transparent_34rem)]" />

      <div className="section-shell relative">
        <div className="flex flex-col items-start gap-5">
          <div
            className="grid grid-cols-2 rounded-full border border-white/10 bg-black/72 p-1 shadow-[0_0_24px_rgba(255,255,255,0.045)]"
            aria-label={t.work.switchLabel}
          >
            {switchOptions.map((option) => {
              const isActive = activeFormat === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFormat(option.key)}
                  className={`relative isolate overflow-hidden rounded-full px-5 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] transition duration-200 sm:px-7 ${
                    isActive
                      ? 'bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.18)]'
                      : 'text-white/48 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{option.label}</span>
                </button>
              );
            })}
          </div>

          <div>
            <p className="text-[0.66rem] font-black uppercase tracking-[0.36em] text-white/42">
              {t.work.eyebrow}
            </p>
            <motion.h2
              key={activeFormat}
              className="mt-3 text-4xl font-black tracking-tight text-white [text-shadow:0_0_28px_rgba(255,255,255,0.20)] sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTitle}
            </motion.h2>
          </div>
        </div>

        <div id="long-form" className="scroll-mt-28" />
        <div id="shorts" className="scroll-mt-28" />

        <VideoShowcase activeFormat={activeFormat} videos={videos} />
      </div>
    </section>
  );
}
