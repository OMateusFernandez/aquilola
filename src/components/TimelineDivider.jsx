import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Film, Music2, Type } from 'lucide-react';

const tracks = ['V2', 'V1', 'A1', 'A2'];

const clips = [
  { name: 'Gameplay.mp4', track: 'V1', left: '8%', width: '34%', type: 'video' },
  { name: 'Facecam.mov', track: 'V2', left: '38%', width: '22%', type: 'video' },
  { name: 'Caption.srt', track: 'V2', left: '64%', width: '20%', type: 'text' },
  { name: 'lofi.mp3', track: 'A1', left: '13%', width: '47%', type: 'audio' },
  { name: 'SFX_hit.wav', track: 'A2', left: '58%', width: '24%', type: 'audio' },
];

const typeStyles = {
  video: {
    icon: Film,
    className: 'border-white/18 bg-white/[0.12] text-white',
    line: 'bg-white/45',
  },
  audio: {
    icon: Music2,
    className: 'border-white/12 bg-white/[0.07] text-white/80',
    line: 'bg-white/28',
  },
  text: {
    icon: Type,
    className: 'border-white/14 bg-black/65 text-white/82',
    line: 'bg-white/35',
  },
};

export default function TimelineDivider({ onMouseEnter, onMouseLeave }) {
  const timelineRef = useRef(null);

  return (
    <motion.section
      className="relative mt-8 w-full py-2"
      aria-label="Interactive editing timeline"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: -18, height: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, height: 'auto', filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, height: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-white/[0.08] bg-black/42 shadow-[0_0_70px_rgba(255,255,255,0.055)] backdrop-blur-xl">
        <div className="flex h-9 items-center border-b border-white/[0.07] bg-white/[0.025] px-4">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/35" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
          </div>
          <span className="ml-4 text-[0.58rem] font-black uppercase tracking-[0.28em] text-white/34">
            Assembly 01
          </span>
        </div>

        <div ref={timelineRef} className="relative h-56 overflow-hidden sm:h-64">
          <div className="absolute left-0 top-0 z-10 h-full w-16 border-r border-white/[0.07] bg-black/55 sm:w-20">
            {tracks.map((track) => (
              <div
                key={track}
                className="grid h-12 place-items-center border-b border-white/[0.07] text-[0.62rem] font-black tracking-[0.22em] text-white/36 sm:h-14"
              >
                {track}
              </div>
            ))}
          </div>

          <div className="absolute left-16 right-0 top-0 h-full sm:left-20">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_48px]" />
            <div className="absolute inset-x-0 top-0 h-7 border-b border-white/[0.07] bg-white/[0.018]">
              <div className="film-strip h-full opacity-10" />
            </div>
            <motion.div
              className="absolute bottom-0 top-0 z-20 w-px bg-white/55 shadow-[0_0_22px_rgba(255,255,255,0.48)]"
              initial={{ left: '14%' }}
              animate={{ left: ['14%', '84%', '14%'] }}
              transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
            />

            {clips.map((clip, index) => {
              const trackIndex = tracks.indexOf(clip.track);
              const style = typeStyles[clip.type];
              const Icon = style.icon;

              return (
                <motion.button
                  key={clip.name}
                  type="button"
                  drag="x"
                  dragConstraints={timelineRef}
                  dragMomentum={false}
                  whileDrag={{
                    scale: 1.045,
                    zIndex: 40,
                    boxShadow: '0 0 42px rgba(255,255,255,0.16)',
                  }}
                  whileHover={{ scale: 1.018, y: -1 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.055, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute z-30 flex h-9 min-w-28 items-center gap-2 overflow-hidden rounded-md border px-2.5 text-left text-[0.66rem] font-black tracking-[0.02em] shadow-[0_0_24px_rgba(255,255,255,0.045)] backdrop-blur-xl transition sm:h-10 sm:min-w-36 sm:text-xs ${style.className}`}
                  style={{
                    left: clip.left,
                    top: `${34 + trackIndex * 56}px`,
                    width: clip.width,
                    touchAction: 'none',
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                  <span className="truncate">{clip.name}</span>
                  <span className={`absolute bottom-1 left-2 right-2 h-1 rounded-full ${style.line}`} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
