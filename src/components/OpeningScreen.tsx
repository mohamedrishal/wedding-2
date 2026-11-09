import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';

interface Props {
  onOpen: () => void;
  onReveal: () => void;
  onDone: () => void;
}

const ease = [0.76, 0, 0.24, 1] as const;

const MARK = {
  fontFamily: 'Cormorant Garamond, Georgia, serif',
  fontStyle: 'italic' as const,
  fontSize: 16,
  fill: '#6E5424',
};

export function OpeningScreen({ onOpen, onReveal, onDone }: Props) {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const handleOpen = () => {
    if (opening) return;
    onOpen();
    if (reduce) {
      onReveal();
      setVisible(false);
      onDone();
      return;
    }
    setOpening(true);
    window.setTimeout(onReveal, 2500);
    window.setTimeout(() => {
      setVisible(false);
      onDone();
    }, 3600);
  };

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        handleOpen();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [opening]);

  if (!visible) return null;

  return (
    <motion.button
      type="button"
      onClick={handleOpen}
      aria-label="Tap or press Enter to open invitation"
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden text-left"
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.9, delay: opening ? 2.45 : 0, ease }}
    >
      <Scene />
      <GoldDust opening={opening} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.div
          className="mb-4 text-center"
          animate={opening ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-label text-[11px] uppercase tracking-luxe text-[#A6843E]">A celebration of two unions</p>
          <h1 className="mt-1 font-display text-3xl italic text-[#6E5424] sm:text-5xl">You're Invited</h1>
        </motion.div>

        <Envelope opening={opening} reduce={reduce} />

        <motion.p
          className="mt-5 font-label text-[11px] uppercase tracking-luxe text-[#A6843E]"
          animate={opening ? { opacity: 0 } : { opacity: reduce ? 1 : [0.35, 1, 0.35] }}
          transition={opening || reduce ? { duration: 0.25 } : { duration: 2.2, repeat: Infinity }}
        >
          Tap to open
        </motion.p>
      </div>
    </motion.button>
  );
}

function Scene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[#F6F0E6]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,248,230,0.95),transparent_42%),radial-gradient(circle_at_12%_18%,rgba(243,214,214,0.45),transparent_28%),radial-gradient(circle_at_88%_80%,rgba(214,196,150,0.35),transparent_30%)]" />
      <CornerFloral className="left-0 top-0" />
      <CornerFloral className="right-0 top-0 -scale-x-100" />
      <CornerFloral className="bottom-0 left-0 -scale-y-100" />
      <CornerFloral className="bottom-0 right-0 -scale-x-100 -scale-y-100" />
    </div>
  );
}

function Envelope({ opening, reduce }: { opening: boolean; reduce: boolean }) {
  return (
    <motion.div
      className="relative w-[min(88vw,440px)]"
      animate={opening || reduce ? { y: 0 } : { y: [0, -6, 0] }}
      transition={opening ? { duration: 0.4 } : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ perspective: '1400px' }}
    >
      <div className={`relative h-[min(38vh,280px)] w-full ${opening ? 'overflow-visible' : 'overflow-hidden'}`}>
        <div className="absolute inset-0 rounded-[4px] bg-[#E7D7BF] shadow-[0_28px_60px_rgba(110,84,36,0.22)]" />

        <motion.div
          className="absolute inset-x-[8%] top-[24%] z-10 h-[210px] overflow-hidden rounded-[3px] border border-[#E4D2B0] bg-[#FFFBF5] px-4 pt-6 text-center shadow-[0_10px_24px_rgba(110,84,36,0.12)]"
          initial={false}
          animate={opening ? { y: '-92%' } : { y: '8%' }}
          transition={{ duration: 1.15, delay: opening ? 0.72 : 0, ease }}
        >
          <InviteCard />
        </motion.div>

        <div
          className="absolute inset-x-0 bottom-0 z-20 h-[78%] bg-gradient-to-b from-[#FBF7F0] to-[#F3E7D4]"
          style={{
            clipPath: 'polygon(0 10%, 50% 26%, 100% 10%, 100% 100%, 0 100%)',
            filter: 'drop-shadow(0 -8px 10px rgba(110,84,36,0.06))',
          }}
        />

        <motion.div
          className="absolute inset-x-0 top-0 z-30 h-[66%]"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center top' }}
          initial={false}
          animate={opening ? { rotateX: -168 } : { rotateX: 0 }}
          transition={{ duration: 1.05, delay: opening ? 0.28 : 0, ease: [0.65, 0, 0.35, 1] }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#FFF9F1] to-[#F4E6D0]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}
          />
          <div
            className="absolute inset-0 bg-[#F8E7D8]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
              backgroundImage:
                'radial-gradient(circle at 50% 40%, rgba(198,161,90,0.35), transparent 46%), repeating-linear-gradient(135deg, rgba(198,161,90,0.16) 0 1px, transparent 1px 10px)',
            }}
          />
        </motion.div>

        <div className="absolute left-1/2 top-[58%] z-40 w-[30%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={false}
            animate={opening ? { scale: 0.2, opacity: 0 } : { scale: reduce ? 1 : [1, 1.04, 1], opacity: 1 }}
            transition={opening ? { duration: 0.4, ease } : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <WaxSeal />
          </motion.div>
        </div>
      </div>
      {opening && <SparkBurst />}
    </motion.div>
  );
}

function InviteCard() {
  return (
    <div>
      <p className="font-label text-[10px] uppercase tracking-luxe text-[#A6843E]">You're Invited</p>
      <div className="mx-auto mt-3 h-px w-16 bg-[#C6A15A]" />
      {weddingConfig.couples.map((couple) => (
        <p key={couple.id} className="mt-3 font-script text-3xl text-[#6E5424]">
          {couple.coupleName}
        </p>
      ))}
      <p className="mt-4 font-label text-sm text-[#8C7350]">{weddingConfig.event.dateLong}</p>
    </div>
  );
}

function WaxSeal() {
  const scallops = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
    return { cx: 60 + Math.cos(angle) * 46, cy: 60 + Math.sin(angle) * 46 };
  });
  return (
    <svg viewBox="0 0 120 120" className="h-auto w-full drop-shadow-[0_12px_18px_rgba(110,84,36,0.28)]" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#F3E2B0" />
          <stop offset="55%" stopColor="#D4B06A" />
          <stop offset="100%" stopColor="#A6853E" />
        </radialGradient>
      </defs>
      {scallops.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="8" fill="url(#wax)" />
      ))}
      <circle cx="60" cy="60" r="38" fill="url(#wax)" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="#F8E7C0" strokeWidth="0.8" />
      <text x="60" y="52" textAnchor="middle" {...MARK}>
        R & A
      </text>
      <text x="60" y="74" textAnchor="middle" {...MARK}>
        R & R
      </text>
    </svg>
  );
}

function GoldDust({ opening }: { opening: boolean }) {
  const motes = Array.from({ length: 16 }, (_, i) => ({
    left: `${(i * 61) % 100}%`,
    top: `${(i * 37) % 100}%`,
    delay: (i % 6) * 0.35,
    size: i % 3 === 0 ? 3 : 2,
  }));
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {motes.map((mote) => (
        <motion.span
          key={`${mote.left}-${mote.top}`}
          className="absolute rounded-full bg-[#E4C98A]"
          style={{ left: mote.left, top: mote.top, width: mote.size, height: mote.size }}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 4.5 + mote.delay, delay: mote.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function SparkBurst() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#E8D29A]"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(angle) * 110, y: Math.sin(angle) * 70, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </div>
  );
}

function CornerFloral({ className }: { className: string }) {
  return (
    <svg className={`absolute h-36 w-36 text-[#C6A15A]/45 sm:h-48 sm:w-48 ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M8 112c18-8 28-24 30-46 8 16 22 26 42 30" />
        <path d="M28 86c8-14 8-26 2-38" />
        <path d="M40 78c12-6 22-6 34 2" />
      </g>
      <g fill="currentColor">
        <circle cx="30" cy="48" r="3" />
        <circle cx="46" cy="70" r="2.2" />
        <circle cx="62" cy="86" r="2.4" />
        <circle cx="18" cy="78" r="2" />
      </g>
    </svg>
  );
}
