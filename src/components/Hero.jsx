import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function TypewriterText({ terms }) {
  const [termIndex, setTermIndex] = useState(0);
  const [displayText, setDisplayText] = useState(() => terms[0]?.slice(0, 1) || '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTerm = terms[termIndex];
    if (!currentTerm) return undefined;

    const isComplete = displayText === currentTerm;
    const isAtMinimum = displayText.length <= 1;
    const delay = isComplete && !isDeleting ? 1100 : isDeleting ? 42 : 74;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isAtMinimum) {
        setIsDeleting(false);
        setTermIndex((current) => (current + 1) % terms.length);
        return;
      }

      setDisplayText((current) =>
        isDeleting ? current.slice(0, -1) : currentTerm.slice(0, current.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, termIndex, terms]);

  useEffect(() => {
    setTermIndex(0);
    setDisplayText(terms[0]?.slice(0, 1) || '');
    setIsDeleting(false);
  }, [terms]);

  return (
    <span className="inline-flex min-h-[1.15em] items-center justify-center text-white [text-shadow:0_0_22px_rgba(255,255,255,0.48),0_0_68px_rgba(255,255,255,0.22)]">
      {displayText}
      <span className="ml-2 h-[0.86em] w-[3px] animate-pulse rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
    </span>
  );
}

function PremiereTimelineGhost() {
  const ghostRef = useRef(null);
  const isInView = useInView(ghostRef, { margin: '220px 0px 220px 0px' });
  const videoClips = [
    ['w-52', 'left-[8%]', 'top-[36%]', 0],
    ['w-72', 'left-[28%]', 'top-[36%]', 0.8],
    ['w-44', 'left-[64%]', 'top-[36%]', 1.6],
    ['w-64', 'left-[14%]', 'top-[52%]', 2.4],
    ['w-56', 'left-[48%]', 'top-[52%]', 3.2],
    ['w-40', 'left-[73%]', 'top-[52%]', 4],
  ];

  const audioClips = [
    ['w-64', 'left-[18%]', 'top-[70%]', 4.8],
    ['w-80', 'left-[45%]', 'top-[70%]', 5.6],
  ];

  return (
    <div ref={ghostRef} className="pointer-events-none absolute inset-x-[-8rem] top-28 z-0 block h-[24rem] opacity-[0.1] md:top-20 md:h-[28rem] md:opacity-[0.14]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.025] via-transparent to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[21rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] overflow-hidden rounded-xl border border-white/10 bg-black/35 shadow-[0_0_70px_rgba(255,255,255,0.055)] md:h-[24rem] md:w-[82rem]">
        <div className="flex h-10 items-center border-b border-white/10 bg-white/[0.035] px-5">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="ml-5 text-[0.65rem] font-black uppercase tracking-[0.36em] text-white/45">
            Premiere Timeline
          </span>
        </div>
        <div className="relative h-[calc(100%-2.5rem)]">
          <div className="absolute left-0 top-0 h-full w-24 border-r border-white/10 bg-black/30">
            {['V3', 'V2', 'V1', 'A1', 'A2'].map((track, index) => (
              <div
                key={track}
                className="flex h-14 items-center justify-center border-b border-white/10 text-[0.62rem] font-black tracking-[0.25em] text-white/35"
                style={{ marginTop: index === 0 ? '28px' : 0 }}
              >
                {track}
              </div>
            ))}
          </div>
          <div className="absolute left-24 right-0 top-0 h-8 border-b border-white/10 bg-white/[0.02]">
            <div className="film-strip h-full opacity-15" />
          </div>
          <div className="absolute left-24 right-0 top-8 bottom-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:92px_56px]" />
          <motion.div
            className="absolute bottom-0 top-8 w-px bg-white/45 shadow-[0_0_24px_rgba(255,255,255,0.5)]"
            initial={{ left: '18%' }}
            animate={isInView ? { left: '78%' } : { left: '18%' }}
            transition={{ duration: 9, ease: 'easeInOut' }}
          />

          {[...videoClips, ...audioClips].slice(0, 5).map(([width, left, top, delay], index) => (
            <motion.div
              key={`${left}-${top}-${index}`}
              className={`absolute ${left} ${top} ${width} h-10 origin-left rounded border border-white/15 bg-white/[0.075] shadow-[0_0_30px_rgba(255,255,255,0.08)]`}
              initial={{ opacity: 0, scaleX: 0.16, x: -14 }}
              animate={
                isInView
                  ? {
                    opacity: 0.52,
                    scaleX: 1,
                    x: 0,
                  }
                  : { opacity: 0.18, scaleX: 1, x: 0 }
              }
              transition={
                isInView
                  ? {
                    delay,
                    duration: 1.6,
                    ease: [0.22, 1, 0.36, 1],
                  }
                  : { duration: 0.3 }
              }
            >
              <motion.div
                className="mx-3 mt-2 h-1.5 rounded-full bg-white/40"
                animate={isInView ? { opacity: 0.55 } : { opacity: 0.35 }}
                transition={{ delay: delay + 0.2, duration: 0.6 }}
              />
              <motion.div
                className="mx-3 mt-2 h-1.5 w-2/3 rounded-full bg-white/20"
                animate={isInView ? { opacity: 0.32 } : { opacity: 0.22 }}
                transition={{ delay: delay + 0.4, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero({ terms }) {
  return (
    <section id="home" className="relative min-h-[52vh] overflow-hidden pt-24 md:min-h-[56vh] md:pt-20">
      <div className="absolute inset-0 bg-film-grid bg-[size:48px_48px] opacity-[0.08]" />
      <div className="absolute left-1/2 top-16 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-white/[0.045] blur-3xl" />
      <PremiereTimelineGhost />
      <div className="section-shell relative z-10 flex min-h-[calc(52vh-5rem)] items-center justify-center py-4 text-center md:min-h-[calc(56vh-5rem)]">
        <motion.div
          className="flex min-h-[9rem] items-center justify-center md:min-h-[11rem]"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-8xl xl:text-9xl">
            <TypewriterText terms={terms} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
