import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const countryPoints = {
  us: { x: 49, y: 38 },
  br: { x: 73, y: 63 },
};

const marketData = {
  us: {
    label: 'USA',
    buttonLabel: 'United States',
    rotate: { rotateY: 0, rotateZ: -5 },
  },
  br: {
    label: 'BR',
    buttonLabel: 'Brasil',
    rotate: { rotateY: -30, rotateZ: 7 },
  },
};

const clientTravelTarget = { x: 64, y: 40 };

function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function CountryButton({ countryKey, activeMarket, onSelect }) {
  const point = countryPoints[countryKey];
  const isActive = activeMarket === countryKey;
  const label = marketData[countryKey].label;

  return (
    <button
      type="button"
      aria-label={`Show ${marketData[countryKey].buttonLabel} clients`}
      onClick={() => onSelect(countryKey)}
      className="country-point pointer-events-auto group absolute z-50 flex h-24 w-24 -translate-x-1/2 -translate-y-full flex-col items-center justify-end"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      <span className="mb-3 block h-3 w-px bg-gradient-to-t from-white/45 to-transparent" />
      <span
        className={`relative grid h-5 w-5 place-items-center rounded-full border transition ${
          isActive
            ? 'border-white bg-white shadow-[0_0_34px_rgba(255,255,255,0.78)]'
            : 'border-white/25 bg-black/80 shadow-[0_0_18px_rgba(255,255,255,0.24)]'
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-white/75'}`} />
      </span>
      <span className="mt-2 block text-[0.62rem] font-black tracking-[0.28em] text-white/55 transition group-hover:text-white">
        {label}
      </span>
    </button>
  );
}

function ClientComets({ clients, activeMarket, selectedClient, travelingClient, onSelectClient }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeMarket}
        className="client-orbit-field pointer-events-none absolute inset-0 z-30"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {clients.map((client, index) => (
          <div
            key={client.name}
            className="globe-client-orbit pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2"
            style={{
              '--orbit-rotation': `${(360 / clients.length) * index}deg`,
              '--orbit-duration': '18s',
              '--orbit-delay': '0s',
            }}
          >
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                onSelectClient(client, index, event);
              }}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                onSelectClient(client, index, event);
              }}
              className={`pointer-events-auto absolute left-1/2 top-0 z-50 flex min-h-10 -translate-x-1/2 items-center gap-2 rounded-full border px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.18em] shadow-[0_0_28px_rgba(255,255,255,0.08)] backdrop-blur-xl transition hover:border-white/35 hover:bg-white hover:text-black ${
                selectedClient?.name === client.name || travelingClient?.client.name === client.name
                  ? 'border-white/40 bg-white text-black'
                  : 'border-white/10 bg-black/60 text-white/70'
              }`}
            >
              <span className="h-1 w-5 rounded-full bg-gradient-to-r from-transparent via-white/70 to-white/10" />
              {client.name}
            </button>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function WaveFlag({ activeMarket }) {
  const stripeYs = [30, 40, 50, 60, 70, 80];

  return (
    <AnimatePresence mode="wait">
      <motion.svg
        key={activeMarket}
        className="pointer-events-none absolute inset-[-8%] z-0 h-[116%] w-[116%] opacity-30"
        viewBox="0 0 240 240"
        fill="none"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.94, rotate: -4 }}
        animate={{ opacity: 0.3, scale: 1, rotate: [-4, -2.5, -4] }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <clipPath id={`wave-flag-${activeMarket}`}>
            <path d="M34 58 C76 38, 111 78, 151 56 C178 41, 201 49, 218 60 L207 169 C169 151, 132 183, 91 162 C65 149, 45 153, 25 168 Z" />
          </clipPath>
          <filter id={`flag-glow-${activeMarket}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          clipPath={`url(#wave-flag-${activeMarket})`}
          filter={`url(#flag-glow-${activeMarket})`}
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {activeMarket === 'us' ? (
            <>
              <rect x="21" y="39" width="205" height="142" fill="rgba(255,255,255,0.08)" />
              {stripeYs.map((y, index) => (
                <path
                  key={y}
                  d={`M22 ${y} C68 ${y - 18}, 111 ${y + 22}, 153 ${y} C180 ${y - 14}, 204 ${y - 5}, 224 ${y + 5}`}
                  stroke={index % 2 === 0 ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.28)'}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              ))}
              <path
                d="M32 58 C61 45, 85 66, 112 55 L107 105 C80 116, 57 94, 29 108 Z"
                fill="rgba(255,255,255,0.18)"
                stroke="rgba(255,255,255,0.42)"
              />
              {[48, 62, 76, 90].map((x, index) => (
                <circle key={x} cx={x + index * 5} cy={72 + (index % 2) * 11} r="2.2" fill="rgba(255,255,255,0.72)" />
              ))}
            </>
          ) : (
            <>
              <path
                d="M25 62 C71 42, 111 79, 153 57 C181 43, 204 50, 221 63 L207 168 C168 150, 132 182, 91 162 C64 149, 44 153, 26 168 Z"
                fill="rgba(255,255,255,0.11)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
              <path
                d="M119 68 190 113 121 157 52 113 Z"
                fill="rgba(255,255,255,0.16)"
                stroke="rgba(255,255,255,0.62)"
                strokeWidth="2.4"
              />
              <ellipse
                cx="121"
                cy="113"
                rx="32"
                ry="27"
                fill="rgba(0,0,0,0.28)"
                stroke="rgba(255,255,255,0.58)"
                strokeWidth="2"
              />
              <path
                d="M92 111 C109 103, 132 105, 151 119"
                stroke="rgba(255,255,255,0.78)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          )}
        </motion.g>
      </motion.svg>
    </AnimatePresence>
  );
}

function SelectedClientCard({ client, onClose }) {
  return (
    <AnimatePresence mode="wait">
      {client && (
        <motion.div
          key={client.name}
          data-client-card="true"
          className="pointer-events-auto absolute left-[58%] top-[39%] z-40 w-[12.25rem] rounded-2xl border border-white/14 bg-black/72 p-4 text-center shadow-[0_0_70px_rgba(255,255,255,0.10)] backdrop-blur-2xl sm:left-[64%] sm:w-[13.5rem]"
          initial={{ opacity: 0, x: '-50%', y: '-50%', scale: 0.28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: '-50%', y: '-50%', scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: '-50%', y: '-50%', scale: 0.72, filter: 'blur(8px)' }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            aria-label="Close client"
            onClick={onClose}
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/60 text-white/60 shadow-[0_0_24px_rgba(255,255,255,0.08)] backdrop-blur-xl transition hover:border-white/25 hover:bg-white hover:text-black"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mx-auto grid h-16 w-16 place-items-center overflow-hidden rounded-full border border-white/20 bg-white/[0.04] shadow-[0_0_30px_rgba(255,255,255,0.12)]">
            <img src={client.avatar} alt="" className="h-full w-full object-cover" />
          </div>
          <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-white">
            {client.name}
          </p>
          <p className="mt-1 text-xs font-semibold text-white/55">
            {client.subscribers}
          </p>
          {client.description && (
            <p className="mt-3 text-xs font-semibold leading-5 text-white/66">
              {client.description}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ClientEnergyTravel({ travel, travelKey }) {
  if (!travel) return null;

  const start = travel.from;
  const end = clientTravelTarget;
  const center = { x: 50, y: 52 };
  const distanceX = start.x - center.x;
  const distanceY = start.y - center.y;
  const distance = Math.max(Math.sqrt(distanceX ** 2 + distanceY ** 2), 1);
  const outsideOrbit = {
    x: start.x + (distanceX / distance) * 18,
    y: start.y + (distanceY / distance) * 18,
  };
  const curve = `M ${start.x} ${start.y} C ${outsideOrbit.x} ${outsideOrbit.y}, ${end.x - 32} ${end.y + 22}, ${end.x} ${end.y}`;

  return (
    <AnimatePresence>
      <motion.div
        key={travelKey}
        className="pointer-events-none absolute inset-0 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute grid h-12 w-12 place-items-center rounded-full border border-white/18 bg-black/65 text-[0.58rem] font-black uppercase tracking-[0.1em] text-white shadow-[0_0_35px_rgba(255,255,255,0.13)] backdrop-blur-xl"
          style={{ left: `${start.x}%`, top: `${start.y}%` }}
          initial={{ opacity: 1, x: '-50%', y: '-50%', scale: 1 }}
          animate={{
            opacity: [1, 0.7, 0],
            x: '-50%',
            y: '-50%',
            scale: [1, 0.38, 0.08],
            filter: ['blur(0px)', 'blur(1px)', 'blur(7px)'],
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {getInitials(travel.client.name)}
        </motion.div>

        <motion.svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.path
            d={curve}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="1 2.4"
            strokeWidth="0.46"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d={curve}
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeLinecap="round"
            strokeWidth="1"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: [0, 0.34, 0], pathOffset: [0, 0.55, 1] }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.circle
            r="1.08"
            fill="white"
            filter="url(#clientTravelGlow)"
            initial={{ cx: start.x, cy: start.y, opacity: 0 }}
            animate={{ cx: end.x, cy: end.y, opacity: [0, 1, 0] }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <filter id="clientTravelGlow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </motion.svg>
      </motion.div>
    </AnimatePresence>
  );
}

function FastTravel({ from, to, travelKey }) {
  if (!from || from === to) return null;

  const start = countryPoints[from];
  const end = countryPoints[to];
  const curve = `M ${start.x} ${start.y} C ${start.x + 16} ${start.y - 24}, ${end.x - 22} ${end.y - 26}, ${end.x} ${end.y}`;

  return (
    <AnimatePresence>
      <motion.svg
        key={travelKey}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.path
          d={curve}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.45"
          strokeDasharray="1 2.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d={curve}
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeLinecap="round"
          strokeWidth="0.95"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: [0, 0.22, 0], pathOffset: [0, 0.72, 1] }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          r="1.05"
          fill="white"
          filter="url(#fastTravelGlow)"
          initial={{ cx: start.x, cy: start.y, opacity: 0 }}
          animate={{ cx: end.x, cy: end.y, opacity: [0, 1, 0] }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <filter id="fastTravelGlow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>
    </AnimatePresence>
  );
}

function AmericasMap({ activeMarket }) {
  return (
    <motion.svg
      className="absolute inset-[5%] h-[90%] w-[90%]"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      animate={{
        x: activeMarket === 'br' ? -12 : 0,
        y: activeMarket === 'br' ? -4 : 0,
        scale: activeMarket === 'br' ? 1.05 : 1,
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <g className="earth-grid" opacity="0.72">
        <circle cx="100" cy="100" r="86" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <ellipse cx="100" cy="100" rx="86" ry="22" stroke="rgba(255,255,255,0.12)" />
        <ellipse cx="100" cy="100" rx="80" ry="43" stroke="rgba(255,255,255,0.09)" />
        <ellipse cx="100" cy="100" rx="43" ry="86" stroke="rgba(255,255,255,0.11)" />
        <ellipse cx="100" cy="100" rx="20" ry="86" stroke="rgba(255,255,255,0.08)" />
        <path d="M14 100h172" stroke="rgba(255,255,255,0.08)" />
        <path d="M100 14v172" stroke="rgba(255,255,255,0.08)" />
      </g>

      <g className="americas-outline" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M39 54 C47 45, 58 39, 72 39 C84 39, 91 45, 101 47 C112 49, 119 56, 115 66 C112 73, 102 73, 94 72 C86 80, 77 82, 68 77 C61 84, 53 83, 47 76 C38 74, 31 67, 31 60 C31 56, 34 54, 39 54Z"
          fill="rgba(255,255,255,0.10)"
          stroke="rgba(255,255,255,0.46)"
          strokeWidth="1.6"
        />
        <path
          d="M66 81 C75 82, 80 88, 84 95 C92 94, 100 97, 104 104 C100 111, 91 112, 84 108 C79 102, 70 102, 63 95 C59 89, 60 84, 66 81Z"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="1.2"
        />
        <path
          d="M110 103 C121 105, 132 113, 138 125 C143 136, 135 142, 143 153 C150 164, 141 179, 128 187 C118 180, 117 168, 121 157 C115 149, 108 141, 109 131 C111 122, 103 114, 110 103Z"
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.7"
        />
        <path
          d="M101 91 C108 94, 114 99, 115 106 C111 111, 104 113, 98 108 C94 101, 96 95, 101 91Z"
          fill="rgba(255,255,255,0.10)"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="1.1"
        />
        <path
          d="M43 77 C53 82, 57 92, 62 101"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
        />
        <path
          d="M121 186 C119 194, 124 199, 132 196"
          stroke="rgba(255,255,255,0.26)"
          strokeWidth="1.1"
        />
      </g>

      <motion.circle
        cx="98"
        cy="76"
        r="11"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.2)"
        initial={{ opacity: activeMarket === 'us' ? 1 : 0.38 }}
        animate={{ opacity: activeMarket === 'us' ? 1 : 0.38 }}
      />
      <motion.circle
        cx="146"
        cy="126"
        r="11"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.2)"
        initial={{ opacity: activeMarket === 'br' ? 1 : 0.38 }}
        animate={{ opacity: activeMarket === 'br' ? 1 : 0.38 }}
      />
    </motion.svg>
  );
}

export default function ClientGlobe({ activeMarket = 'us', clients, onMarketChange, t }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [travelingClient, setTravelingClient] = useState(null);
  const [previousMarket, setPreviousMarket] = useState(null);
  const [travelKey, setTravelKey] = useState(0);
  const [clientTravelKey, setClientTravelKey] = useState(0);
  const panelRef = useRef(null);
  const revealTimeoutRef = useRef(null);
  const market = marketData[activeMarket];

  const selectMarket = (nextMarket) => {
    if (nextMarket === activeMarket) return;
    window.clearTimeout(revealTimeoutRef.current);
    setSelectedClient(null);
    setTravelingClient(null);
    setPreviousMarket(activeMarket);
    onMarketChange?.(nextMarket);
    setTravelKey((key) => key + 1);
  };

  const selectClient = (client, index, event) => {
    window.clearTimeout(revealTimeoutRef.current);

    const panelRect = panelRef.current?.getBoundingClientRect();
    const buttonRect = event?.currentTarget?.getBoundingClientRect();
    const from =
      panelRect && buttonRect
        ? {
          x: ((buttonRect.left + buttonRect.width / 2 - panelRect.left) / panelRect.width) * 100,
          y: ((buttonRect.top + buttonRect.height / 2 - panelRect.top) / panelRect.height) * 100,
        }
        : {
          x: 50 + Math.cos(index * 1.35 - Math.PI / 2) * 34,
          y: 52 + Math.sin(index * 1.35 - Math.PI / 2) * 34,
        };

    setSelectedClient(null);
    setTravelingClient({
      client,
      from,
    });
    setClientTravelKey((key) => key + 1);

    revealTimeoutRef.current = window.setTimeout(() => {
      setSelectedClient(client);
      setTravelingClient(null);
    }, 540);
  };

  const closeClient = () => {
    window.clearTimeout(revealTimeoutRef.current);
    setTravelingClient(null);
    setSelectedClient(null);
  };

  useEffect(() => {
    window.clearTimeout(revealTimeoutRef.current);
    setSelectedClient(null);
    setTravelingClient(null);
  }, [clients]);

  useEffect(() => () => window.clearTimeout(revealTimeoutRef.current), []);

  return (
    <div
      ref={panelRef}
      className="relative mx-auto flex min-h-[22rem] w-full max-w-[25rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35 px-4 py-7 shadow-[0_0_90px_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:min-h-[25rem] sm:max-w-[27rem] lg:min-h-[35rem] lg:max-w-[34rem] lg:py-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.12),transparent_20rem),radial-gradient(circle_at_64%_39%,rgba(255,255,255,0.06),transparent_13rem)]" />
      <div className="absolute inset-x-10 top-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <ClientEnergyTravel travel={travelingClient} travelKey={clientTravelKey} />
      <SelectedClientCard client={selectedClient} onClose={closeClient} />

      <motion.div
        className="relative z-10 h-[12.75rem] w-[12.75rem] sm:h-[15.5rem] sm:w-[15.5rem] lg:h-[24rem] lg:w-[24rem]"
        animate={
          travelingClient || selectedClient
            ? { x: '-24%', y: '18%', scale: 0.68, opacity: 0.72, filter: 'blur(0.7px)' }
            : { x: '0%', y: '0%', scale: 1, opacity: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
      >
        <WaveFlag activeMarket={activeMarket} />

        <ClientComets
          activeMarket={activeMarket}
          clients={clients}
          onSelectClient={selectClient}
          selectedClient={selectedClient}
          travelingClient={travelingClient}
        />

        <motion.div
          className="absolute inset-[9%] z-10 rounded-full border border-white/20 bg-black/75 shadow-[inset_-42px_0_90px_rgba(255,255,255,0.05),inset_28px_0_70px_rgba(255,255,255,0.035),0_0_95px_rgba(255,255,255,0.10)]"
          animate={market.rotate}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.14),transparent_22%),linear-gradient(112deg,transparent_0_45%,rgba(255,255,255,0.055)_49%_52%,transparent_57%)]" />
            <AmericasMap activeMarket={activeMarket} />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_60%_46%,transparent_0_45%,rgba(0,0,0,0.34)_78%,rgba(0,0,0,0.78)_100%)]" />
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-[9%] z-20 overflow-visible rounded-full">
          <FastTravel from={previousMarket} to={activeMarket} travelKey={travelKey} />
          <CountryButton countryKey="us" activeMarket={activeMarket} onSelect={selectMarket} />
          <CountryButton countryKey="br" activeMarket={activeMarket} onSelect={selectMarket} />
        </div>

      </motion.div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 w-full -translate-x-1/2 px-6 text-center">
        <p className="text-[0.64rem] font-black uppercase tracking-[0.32em] text-white/35">
          {t.globeEyebrow}
        </p>
        <p className="mx-auto mt-2 max-w-[19rem] text-[0.68rem] font-semibold leading-5 text-white/45 sm:max-w-[23rem] sm:text-xs">
          {t.globeHelp}
        </p>
        <p className="mt-2 text-sm font-semibold text-white/70">
          {activeMarket === 'us' ? t.usClients : t.brClients}
        </p>
      </div>
    </div>
  );
}
