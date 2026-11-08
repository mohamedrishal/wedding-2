import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { FloralDivider, FloralCorner } from '@/components/decorations';

interface Props {
  onOpen: () => void;
}

export function OpeningScreen({ onOpen }: Props) {
  const [exiting, setExiting] = useState(false);

  const handleOpen = () => {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(onOpen, 1300);
  };

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') handleOpen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const c1 = weddingConfig.couples[0];
  const c2 = weddingConfig.couples[1];

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-radial"
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* drifting lavender/blue petals */}
          {[...Array(16)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + (i % 3) * 3,
                height: 4 + (i % 3) * 3,
                left: `${(i * 67) % 100}%`,
                top: `${(i * 41) % 100}%`,
                background: i % 2 ? 'rgba(168,155,201,0.25)' : 'rgba(159,184,212,0.22)',
              }}
              animate={{ y: [0, -26, 0], opacity: [0.12, 0.55, 0.12] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.35 }}
            />
          ))}

          {/* Corner floral clusters */}
          <FloralCorner className="pointer-events-none absolute left-6 top-6 h-24 w-24 text-lavender/50 sm:h-32 sm:w-32" />
          <FloralCorner className="pointer-events-none absolute right-6 top-6 h-24 w-24 rotate-90 text-lavender/50 sm:h-32 sm:w-32" />
          <FloralCorner className="pointer-events-none absolute bottom-6 left-6 h-24 w-24 -rotate-90 text-blue/50 sm:h-32 sm:w-32" />
          <FloralCorner className="pointer-events-none absolute bottom-6 right-6 h-24 w-24 rotate-180 text-blue/50 sm:h-32 sm:w-32" />

          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-label text-[10px] uppercase tracking-luxe text-lavender-light/80 sm:text-xs"
            >
              Bismillah ir-Rahman ir-Rahim
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-script text-4xl text-lavender-shimmer sm:text-6xl"
            >
              {weddingConfig.blessing}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="mt-8 flex justify-center"
            >
              <FloralDivider color="text-lavender-light" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-display text-3xl font-light leading-tight text-ivory sm:text-5xl"
            >
              A Double Wedding
              <span className="block italic text-lavender-light">Celebration</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="mt-10 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-8"
            >
              <CoupleLine name={c1.coupleName} delay={1.5} />
              <span className="hidden font-script text-3xl text-lavender/60 sm:inline">&amp;</span>
              <CoupleLine name={c2.coupleName} delay={1.65} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.85 }}
              className="mt-10 font-serif-body text-sm tracking-wide2 text-ivory/70"
            >
              {weddingConfig.event.dateLong}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.1 }}
              onClick={handleOpen}
              className="group mt-12 inline-flex items-center gap-3 rounded-full border border-lavender/50 bg-lavender/10 px-8 py-3.5 font-label text-xs uppercase tracking-luxe text-lavender-light backdrop-blur-sm transition-all duration-500 hover:border-lavender-light hover:bg-lavender hover:text-navy"
            >
              Open Invitation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500 group-hover:translate-x-1">
                <path d="M2 7 L 12 7 M 8 3 L 12 7 L 8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(5,15,36,0.6)_100%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CoupleLine({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay }}
      className="font-script text-3xl text-ivory/95 sm:text-4xl"
    >
      {name}
    </motion.span>
  );
}
