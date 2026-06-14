import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from '../utils/youtube.js';

const QUALITY_ATTEMPTS = [450, 1200, 2600, 4600];

const VideoCard = memo(function VideoCard({ video, isActive, isShorts, isCarousel, onActivate, onClose }) {
  const iframeRef = useRef(null);
  const origin = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.origin;
  }, []);
  const embedUrl = getYouTubeEmbedUrl(video.url, origin);
  const thumbnailUrl = getYouTubeThumbnailUrl(video.url);
  const canPlay = Boolean(embedUrl);

  const aspectClass = isShorts ? 'aspect-[9/16]' : 'aspect-video';
  const sizeClass = isShorts
    ? 'mx-auto w-full max-w-[360px] sm:max-w-[320px] lg:max-w-none'
    : isCarousel
      ? 'w-[82vw] flex-none snap-center sm:w-[30rem] lg:w-[34rem]'
      : 'w-full';

  useEffect(() => {
    if (!isActive || !embedUrl) return undefined;

    let volumeInterval = null;
    const timers = [];

    const sendCommand = (func, args = []) => {
      const playerWindow = iframeRef.current?.contentWindow;
      if (!playerWindow) return;

      playerWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func,
          args,
        }),
        'https://www.youtube.com',
      );
    };

    const primePlayer = () => {
      sendCommand('setVolume', [0]);
      sendCommand('setPlaybackQuality', ['hd1080']);
      sendCommand('playVideo');
    };

    QUALITY_ATTEMPTS.forEach((delay) => {
      timers.push(window.setTimeout(primePlayer, delay));
    });

    timers.push(
      window.setTimeout(() => {
        sendCommand('unMute');
        sendCommand('setVolume', [0]);

        let volume = 0;
        volumeInterval = window.setInterval(() => {
          volume = Math.min(volume + 5, 50);
          sendCommand('setVolume', [volume]);
          sendCommand('setPlaybackQuality', ['hd1080']);

          if (volume >= 50) {
            window.clearInterval(volumeInterval);
          }
        }, 280);
      }, 900),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (volumeInterval) window.clearInterval(volumeInterval);
    };
  }, [embedUrl, isActive]);

  return (
    <motion.article
      className={`${sizeClass} group relative`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`relative ${aspectClass} overflow-hidden bg-black shadow-[0_22px_70px_rgba(0,0,0,0.42)]`}
      >
        {isActive && embedUrl ? (
          <>
            <iframe
              ref={iframeRef}
              key={embedUrl}
              title={video.title}
              src={embedUrl}
              className="block h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
            <button
              type="button"
              aria-label="Back to thumbnail"
              onClick={onClose}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white shadow-[0_0_22px_rgba(255,255,255,0.18)] backdrop-blur-md transition duration-300 hover:bg-white hover:text-black"
            >
              <X size={17} strokeWidth={2.4} />
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={!canPlay}
            onClick={onActivate}
            className="relative h-full w-full overflow-hidden text-left disabled:cursor-not-allowed"
            aria-label={`Play ${video.title}`}
            data-cursor="button"
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035] group-hover:saturate-125"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.16),transparent_19rem),linear-gradient(135deg,#090909,#1c1c1c)]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/16 to-black/14 transition duration-300 group-hover:bg-black/34" />
            <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.18em] text-white/78">
              {video.label}
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-[0_0_34px_rgba(255,255,255,0.32)] transition duration-300 group-hover:scale-105">
                <Play size={22} fill="currentColor" strokeWidth={0} className="ml-1" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white [text-shadow:0_0_18px_rgba(255,255,255,0.28)]">
                {video.title}
              </h3>
            </div>
          </button>
        )}
      </div>
    </motion.article>
  );
});

export default function VideoShowcase({ activeFormat, videos }) {
  const isShorts = activeFormat === 'shorts';
  const trackRef = useRef(null);
  const interactionTimerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousFrameRef = useRef(null);
  const [activeVideoKey, setActiveVideoKey] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const displayedVideos = isShorts || videos.length < 2 ? videos : [...videos, ...videos];

  useEffect(() => {
    setActiveVideoKey(null);
    setIsInteracting(false);
    previousFrameRef.current = null;
    trackRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [activeFormat]);

  useEffect(() => {
    return () => window.clearTimeout(interactionTimerRef.current);
  }, []);

  const pauseTemporarily = () => {
    setIsInteracting(true);
    window.clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 900);
  };

  useEffect(() => {
    if (isShorts || videos.length < 2 || activeVideoKey || isInteracting) return undefined;

    const animate = (timestamp) => {
      const track = trackRef.current;
      if (!track) return;

      if (previousFrameRef.current === null) {
        previousFrameRef.current = timestamp;
      }

      const elapsed = Math.min(timestamp - previousFrameRef.current, 50);
      previousFrameRef.current = timestamp;
      track.scrollLeft += elapsed * 0.075;

      const loopPoint = track.scrollWidth / 2;
      if (track.scrollLeft >= loopPoint) {
        track.scrollLeft -= loopPoint;
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      previousFrameRef.current = null;
    };
  }, [activeVideoKey, isInteracting, isShorts, videos.length]);

  const scrollCarousel = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    pauseTemporarily();
    const distance = Math.min(track.clientWidth * 0.78, 580);
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  const containerClass = isShorts
    ? 'mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
    : 'mt-8 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden';

  return (
    <div className="relative">
      {!isShorts && videos.length > 1 && (
        <div className="absolute right-0 top-[-3.35rem] z-10 hidden gap-2 sm:flex">
          {[
            { label: 'Previous video', icon: ChevronLeft, direction: -1 },
            { label: 'Next video', icon: ChevronRight, direction: 1 },
          ].map((control) => {
            const Icon = control.icon;

            return (
              <button
                key={control.label}
                type="button"
                aria-label={control.label}
                onClick={() => scrollCarousel(control.direction)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/78 text-white/68 shadow-[0_0_24px_rgba(255,255,255,0.05)] transition duration-200 hover:border-white/30 hover:bg-white hover:text-black"
              >
                <Icon size={18} strokeWidth={2.4} />
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          ref={trackRef}
          key={activeFormat}
          className={containerClass}
          onPointerEnter={pauseTemporarily}
          onPointerMove={pauseTemporarily}
          onPointerDown={pauseTemporarily}
          onWheel={pauseTemporarily}
          onFocusCapture={pauseTemporarily}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {displayedVideos.map((video, index) => {
            const videoKey = `${activeFormat}-${video.url}-${index}`;

            return (
              <VideoCard
                key={videoKey}
                video={video}
                isShorts={isShorts}
                isCarousel={!isShorts}
                isActive={activeVideoKey === videoKey}
                onActivate={() => setActiveVideoKey(videoKey)}
                onClose={() => setActiveVideoKey(null)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
