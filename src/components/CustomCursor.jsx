import { useEffect, useRef, useState } from 'react';

const interactiveSelector = [
  'a',
  'button',
  '[role="button"]',
  '[data-cursor="button"]',
  'input',
  'iframe',
  'textarea',
  'select',
  'summary',
].join(',');

const textSelector = [
  'input',
  'textarea',
  '[contenteditable="true"]',
  '[data-cursor="text"]',
].join(',');

function CursorShape({ variant }) {
  if (variant === 'text') {
    return (
      <div className="relative h-8 w-5">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white shadow-[0_0_14px_rgba(255,255,255,0.75)]" />
        <span className="absolute left-1/2 top-0 h-px w-4 -translate-x-1/2 bg-white" />
        <span className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 bg-white" />
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <div className="grid h-9 w-9 place-items-center rounded-full border border-white/35 bg-black/90 shadow-[0_0_24px_rgba(255,255,255,0.28)]">
        <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.95)]" />
      </div>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 drop-shadow-[0_0_12px_rgba(255,255,255,0.32)]"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M6.4 4.8 25.2 15a1.6 1.6 0 0 1-.19 2.9l-7.46 2.63a1.6 1.6 0 0 0-.91.78l-3.5 6.58a1.6 1.6 0 0 1-2.99-.49L4.12 6.48A1.6 1.6 0 0 1 6.4 4.8Z"
        fill="#050505"
        stroke="rgba(255,255,255,0.72)"
        strokeWidth="2.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const variantRef = useRef('default');
  const isVisibleRef = useRef(false);
  const [variant, setVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const updatePointer = () => setIsFinePointer(pointerQuery.matches);

    updatePointer();
    pointerQuery.addEventListener('change', updatePointer);

    return () => pointerQuery.removeEventListener('change', updatePointer);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return undefined;

    const renderCursor = () => {
      frameRef.current = null;
      const cursor = cursorRef.current;
      const glow = glowRef.current;
      const { x, y } = pointerRef.current;

      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }

      if (glow) {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
      }

      const target = document.elementFromPoint(x, y);
      const element = target instanceof Element ? target : null;
      let nextVariant = 'default';

      if (element?.closest(textSelector)) {
        nextVariant = 'text';
      } else if (element?.closest(interactiveSelector)) {
        nextVariant = 'button';
      }

      if (variantRef.current !== nextVariant) {
        variantRef.current = nextVariant;
        setVariant(nextVariant);
      }
    };

    const moveCursor = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(renderCursor);
      }
    };

    const hideCursor = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('pointermove', moveCursor);
    window.addEventListener('pointerleave', hideCursor);
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      isVisibleRef.current = false;
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerleave', hideCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9998] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-xl transition-opacity duration-200 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9999] transition-[opacity,filter] duration-150 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${variant === 'button' || variant === 'text' ? '-translate-x-1/2 -translate-y-1/2' : '-translate-x-1 -translate-y-1'}`}
      >
        <CursorShape variant={variant} />
      </div>
    </>
  );
}
