import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { FloralCorner, FloralDivider } from '@/components/decorations';

export function Hero() {
  const c1 = weddingConfig.couples[0];
  const c2 = weddingConfig.couples[1];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-radial"
    >
      {/* soft drifting blooms */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-lavender/15 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-blue/15 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      <FloralCorner className="pointer-events-none absolute left-4 top-20 h-28 w-28 text-lavender/40 sm:left-10 sm:h-36 sm:w-36" />
      <FloralCorner className="pointer-events-none absolute right-4 bottom-20 h-28 w-28 rotate-180 text-blue/40 sm:right-10 sm:h-36 sm:w-36" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-label text-[10px] uppercase tracking-luxe text-lavender-light/85 sm:text-xs"
        >
          {weddingConfig.blessing}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-4xl font-light leading-[1.1] text-ivory sm:text-6xl md:text-7xl"
        >
          A Double Wedding
          <span className="mt-2 block font-script text-6xl text-lavender-shimmer sm:text-8xl md:text-9xl">
            Celebration
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-8 flex justify-center"
        >
          <FloralDivider color="text-lavender-light" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10"
        >
          <HeroCouple name={c1.coupleName} />
          <span className="hidden font-script text-4xl text-lavender/60 sm:inline">&amp;</span>
          <HeroCouple name={c2.coupleName} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-12 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4"
        >
          <p className="font-display text-2xl italic text-ivory/90 sm:text-3xl">
            {weddingConfig.event.dateLong}
          </p>
          <span className="hidden h-5 w-px bg-lavender/40 sm:inline" />
          <p className="font-serif-body text-sm tracking-wide2 text-ivory/70">
            {weddingConfig.event.venueName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-ivory/50">
            <span className="font-label text-[10px] uppercase tracking-luxe">Scroll</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="block h-8 w-px bg-gradient-to-b from-lavender to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroCouple({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-script text-4xl text-ivory sm:text-6xl">{name}</span>
    </div>
  );
}
