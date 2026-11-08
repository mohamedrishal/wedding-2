import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { FloralCluster } from '@/components/decorations';

interface Props {
  onOpen: () => void;
}

const MOTES = [
  { left: '8%', top: '16%', delay: '0s', duration: '7s' },
  { left: '18%', top: '72%', delay: '1.4s', duration: '9s' },
  { left: '86%', top: '20%', delay: '0.6s', duration: '8s' },
  { left: '74%', top: '78%', delay: '1.8s', duration: '10s' },
  { left: '46%', top: '10%', delay: '2.1s', duration: '6.5s' },
  { left: '92%', top: '48%', delay: '0.3s', duration: '8.4s' },
  { left: '6%', top: '46%', delay: '1.1s', duration: '7.8s' },
];

const MARK = {
  fontFamily: 'Cormorant Garamond, Georgia, serif',
  fontStyle: 'italic' as const,
  fontSize: 15,
  fill: '#28215F',
};

const ease = [0.76, 0, 0.24, 1] as const;

export function OpeningScreen({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const handleOpen = () => {
    if (opening) return;
    if (reduce) {
      setVisible(false);
      onOpen();
      return;
    }
    setOpening(true);
    window.setTimeout(onOpen, 560);
    window.setTimeout(() => setVisible(false), 1900);
  };

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') handleOpen();
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
      className="card-frame fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden text-left"
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.75, delay: opening ? 1.05 : 0, ease }}
    >
      {MOTES.map((mote) => (
        <span
          key={`${mote.left}-${mote.top}`}
          className="gold-mote pointer-events-none"
          style={{
            left: mote.left,
            top: mote.top,
            ['--mote-delay' as string]: mote.delay,
            ['--mote-duration' as string]: mote.duration,
          }}
        />
      ))}
      <FloralCluster className="pointer-events-none absolute -left-6 top-6 h-40 w-40 text-[#AAB8CF]/80" size={160} />
      <FloralCluster className="pointer-events-none absolute -right-6 bottom-6 h-40 w-40 rotate-180 text-[#C3BDD5]" size={160} />

      <motion.div
        className="relative z-10 flex w-full flex-col items-center px-6"
        initial={reduce ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[min(92vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C3BDD5]/30 blur-3xl" />

        <motion.p
          className="relative mb-8 font-label text-lg italic text-[#28215F]"
          animate={opening ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {weddingConfig.blessing}
        </motion.p>

        <Envelope opening={opening} reduce={reduce} />

        <motion.p
          className="relative mt-10 font-label text-[11px] uppercase tracking-luxe text-[#7D90B2]"
          animate={opening ? { opacity: 0 } : { opacity: reduce ? 1 : [0.35, 0.9, 0.35] }}
          transition={opening || reduce ? { duration: 0.3 } : { duration: 2.2, repeat: Infinity }}
        >
          Tap to open
        </motion.p>
      </motion.div>
    </motion.button>
  );
}

function Envelope({ opening, reduce }: { opening: boolean; reduce: boolean }) {
  return (
    <div className="relative w-[min(88vw,420px)]" style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}>
      <motion.div
        className="relative h-[250px] sm:h-[280px]"
        animate={opening || reduce ? { y: opening ? 28 : 0, scale: opening ? 0.96 : 1 } : { y: [0, -7, 0], scale: 1 }}
        transition={
          opening || reduce
            ? { duration: 0.9, delay: 0.4, ease }
            : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <div className="absolute inset-0 overflow-hidden rounded-sm bg-[#F4F6FB] shadow-[0_28px_70px_rgba(40,33,95,0.16)]">
          <motion.div
            className="absolute inset-x-8 top-7 z-0 rounded-sm border border-[#C3BDD5] bg-white px-4 py-5 text-center shadow-sm"
            initial={false}
            animate={opening ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: opening ? 0.4 : 0 }}
          >
            <p className="font-label text-sm italic text-[#7D90B2]">You are invited</p>
            <p className="mt-2 font-script text-3xl text-[#28215F]">Rishal &amp; Amana</p>
            <p className="font-script text-3xl text-[#4A3F96]">Rinsha &amp; Rafeeque</p>
          </motion.div>
          <div className="absolute inset-0 bg-[#EEF1F8]" style={{ clipPath: 'polygon(0 0, 46% 62%, 0 100%)' }} />
          <div className="absolute inset-0 bg-[#E3E7F2]" style={{ clipPath: 'polygon(100% 0, 54% 62%, 100% 100%)' }} />
          <div
            className="absolute inset-0 bg-[#E7E9EF]"
            style={{ clipPath: 'polygon(0 46%, 50% 78%, 100% 46%, 100% 100%, 0 100%)' }}
          />
        </div>

        <motion.div
          className="absolute inset-x-0 top-0 z-20 h-[68%] overflow-hidden bg-white shadow-[0_8px_20px_rgba(40,33,95,0.08)]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'center top',
            backfaceVisibility: 'hidden',
          }}
          animate={opening ? { rotateX: -168 } : { rotateX: 0 }}
          transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
        >
          <FloralCluster className="absolute left-3 top-2 h-16 w-16 text-[#AAB8CF]" size={64} />
          <FloralCluster className="absolute right-3 top-2 h-16 w-16 text-[#C3BDD5]" size={64} />
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#E6E3F2]/90 to-transparent"
              initial={{ x: '-140%' }}
              animate={opening ? { x: '280%' } : { x: ['-140%', '280%'] }}
              transition={
                opening
                  ? { duration: 0.85, ease: 'easeInOut' }
                  : { duration: 4.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }
              }
            />
          )}
        </motion.div>

        <div className="absolute left-1/2 top-[58%] z-30 h-28 w-28 -translate-x-1/2 -translate-y-1/2">
          <div className="seal-halo pointer-events-none absolute -inset-3 rounded-full border border-[#AAB8CF]" />
          <div
            className="seal-halo pointer-events-none absolute -inset-6 rounded-full border border-dashed border-[#C3BDD5]"
            style={{ animationDuration: '34s', animationDirection: 'reverse' }}
          />
          <motion.div
            className="relative h-full w-full"
            animate={
              opening
                ? { scale: 0.3, opacity: 0, y: 18 }
                : { scale: reduce ? 1 : [1, 1.045, 1], opacity: 1, y: 0 }
            }
            transition={
              opening
                ? { duration: 0.5, ease }
                : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <Seal />
          </motion.div>
          {opening && <SparkBurst />}
        </div>
      </motion.div>
    </div>
  );
}

function SparkBurst() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#AAB8CF]"
            style={{ boxShadow: '0 0 8px #C3BDD5' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * 86,
              y: Math.sin(angle) * 54,
              opacity: 0,
              scale: 0.35,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
    </div>
  );
}

function Seal() {
  const scallops = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2 - Math.PI / 2;
    return { cx: 60 + Math.cos(angle) * 48, cy: 60 + Math.sin(angle) * 48 };
  });
  const marks = [
    { label: 'R & A', y: 52 },
    { label: 'R & R', y: 74 },
  ];

  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28 drop-shadow-[0_14px_28px_rgba(40,33,95,0.18)]" aria-hidden="true">
      {scallops.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="7.5" fill="#E7E9EF" stroke="#AAB8CF" strokeWidth="1" />
      ))}
      <circle cx="60" cy="60" r="40" fill="#FFFFFF" stroke="#C3BDD5" strokeWidth="3" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#28215F" strokeWidth="0.7" />
      <line x1="44" y1="63" x2="76" y2="63" stroke="#AAB8CF" strokeWidth="0.6" />
      {marks.map((mark) => (
        <text key={mark.label} x="60" y={mark.y} textAnchor="middle" {...MARK}>
          {mark.label}
        </text>
      ))}
    </svg>
  );
}
