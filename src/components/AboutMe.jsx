import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { assetPath } from '../utils/assets.js';

const toolIcons = {
  'Adobe Premiere Pro': {
    initials: 'Pr',
    className: 'border-violet-300/45 bg-violet-400/10 text-violet-100 shadow-[0_0_24px_rgba(196,181,253,0.16)]',
  },
  'Media Encoder': {
    initials: 'Me',
    className: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100 shadow-[0_0_24px_rgba(110,231,183,0.13)]',
  },
};

export default function AboutMe({ t }) {
  const audioRef = useRef(null);
  const startTimerRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const [vinylActive, setVinylActive] = useState(false);
  const [needleDropped, setNeedleDropped] = useState(false);

  const clearTimers = () => {
    window.clearTimeout(startTimerRef.current);
    window.clearInterval(fadeTimerRef.current);
  };

  const fadeAudioTo = (targetVolume, onComplete) => {
    const audio = audioRef.current;

    if (!audio) return;

    window.clearInterval(fadeTimerRef.current);

    fadeTimerRef.current = window.setInterval(() => {
      const nextVolume = audio.volume + (targetVolume > audio.volume ? 0.018 : -0.026);
      const reachedTarget =
        targetVolume > audio.volume ? nextVolume >= targetVolume : nextVolume <= targetVolume;

      audio.volume = reachedTarget ? targetVolume : Math.max(0, Math.min(0.5, nextVolume));

      if (reachedTarget) {
        window.clearInterval(fadeTimerRef.current);
        onComplete?.();
      }
    }, 45);
  };

  const startVinylMoment = () => {
    const audio = audioRef.current;

    clearTimers();
    setVinylActive(true);
    setNeedleDropped(false);

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
      audio.muted = true;
      audio.play().catch(() => {});
    }

    startTimerRef.current = window.setTimeout(() => {
      setNeedleDropped(true);

      if (audio) {
        audio.muted = false;
        audio.play().catch(() => {});
        fadeAudioTo(0.5);
      }
    }, 1150);
  };

  const stopVinylMoment = () => {
    const audio = audioRef.current;

    clearTimers();
    setVinylActive(false);
    setNeedleDropped(false);

    if (audio) {
      fadeAudioTo(0, () => {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = true;
      });
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return (
    <section
      id="sobre-mim"
      className="relative scroll-mt-28 py-14 sm:py-16"
    >
      <div className="section-shell grid items-center gap-8 lg:grid-cols-[0.72fr_1fr]">
        <motion.div
          className="group/vinyl relative mx-auto w-full max-w-[16rem] outline-none sm:max-w-[18rem] lg:max-w-[19rem]"
          initial={{ opacity: 0, scale: 0.94, y: 26 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onPointerEnter={startVinylMoment}
          onPointerLeave={stopVinylMoment}
          onFocus={startVinylMoment}
          onBlur={stopVinylMoment}
          tabIndex={0}
          role="button"
          aria-label="Play vinyl hover animation"
        >
          <div className="absolute inset-8 rounded-full bg-white/12 blur-2xl" />
          <div className="absolute inset-0 rounded-full border border-white/18 bg-white/[0.055]" />
          <div
            className={`absolute left-1/2 top-1/2 z-20 h-[72%] w-[0.42rem] origin-[50%_12%] -translate-x-1/2 -translate-y-[66%] rounded-full bg-white/80 shadow-[0_0_24px_rgba(255,255,255,0.45)] transition-all duration-700 ease-out before:absolute before:left-1/2 before:top-0 before:h-8 before:w-8 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:border-white/25 before:bg-black/80 before:shadow-[0_0_28px_rgba(255,255,255,0.22)] after:absolute after:bottom-[-0.42rem] after:left-1/2 after:h-3 after:w-3 after:-translate-x-1/2 after:rounded-full after:bg-white after:shadow-[0_0_20px_rgba(255,255,255,0.8)] ${
              vinylActive
                ? 'translate-x-[6.15rem] -translate-y-[7.25rem] rotate-[44deg] opacity-100 sm:translate-x-[6.9rem] lg:translate-x-[7.45rem]'
                : 'translate-x-[9.5rem] -translate-y-[8.5rem] rotate-[62deg] opacity-0'
            } ${needleDropped ? 'scale-100' : 'scale-95'}`}
          />
          <div className="relative overflow-hidden rounded-full border border-white/20 bg-white/[0.04] p-1.5 shadow-[0_0_70px_rgba(255,255,255,0.13)]">
            <motion.div
              className="absolute inset-[10%] z-10 rounded-full border border-white/12 opacity-0 transition-opacity duration-500 group-hover/vinyl:opacity-100"
              animate={{
                rotate: vinylActive ? 360 : 0,
                filter: vinylActive ? 'blur(1.15px)' : 'blur(0px)',
              }}
              transition={
                vinylActive
                  ? { rotate: { duration: 5.8, ease: 'linear', repeat: Infinity }, filter: { duration: 0.4 } }
                  : { rotate: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }, filter: { duration: 0.65 } }
              }
            >
              <div className="absolute inset-[16%] rounded-full border border-white/10" />
              <div className="absolute inset-[31%] rounded-full border border-white/10" />
              <div className="absolute inset-[46%] rounded-full border border-white/15 bg-black/20 backdrop-blur-[1px]" />
            </motion.div>
            <motion.img
              src={assetPath('mateus-photo-optimized.jpg')}
              alt="Mateus Fernandez"
              width="760"
              height="760"
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-full object-cover object-[45%_35%] grayscale"
              animate={{
                rotate: vinylActive ? 360 : 0,
                filter: vinylActive ? 'blur(1.35px)' : 'blur(0px)',
                scale: vinylActive ? 1.015 : 1,
              }}
              transition={
                vinylActive
                  ? {
                      rotate: { duration: 5.8, ease: 'linear', repeat: Infinity },
                      filter: { duration: 0.45 },
                      scale: { duration: 0.45 },
                    }
                  : {
                      rotate: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
                      filter: { duration: 0.75 },
                      scale: { duration: 0.75 },
                    }
              }
            />
          </div>
          <audio
            ref={audioRef}
            preload="metadata"
            src={assetPath('audio/vinyl-hover.m4a')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/55">{t.eyebrow}</p>
          <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{t.body}</p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            {t.tags.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5">
                <p className="text-xs font-black text-white [text-shadow:0_0_18px_rgba(255,255,255,0.18)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/40">
              {t.toolsLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {t.tools.map((tool) => {
                return (
                  <div
                    key={tool}
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-bold text-white/75 shadow-[0_0_18px_rgba(255,255,255,0.035)]"
                  >
                    <motion.span
                      className={`grid h-7 w-7 place-items-center rounded-md border text-[0.68rem] font-black tracking-tight ${
                        toolIcons[tool]?.className || 'border-white/15 bg-white/10 text-white'
                      }`}
                      whileHover={{ y: -1, scale: 1.06 }}
                    >
                      {toolIcons[tool]?.initials || tool.slice(0, 2)}
                    </motion.span>
                    {tool}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
