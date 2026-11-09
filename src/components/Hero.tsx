import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { FloralDivider, MihrabArch } from '@/components/decorations';

const HERO_MOTES = [
  { left: '12%', top: '22%', delay: '0s', duration: '7.5s' },
  { left: '80%', top: '16%', delay: '1.1s', duration: '9s' },
  { left: '90%', top: '64%', delay: '0.4s', duration: '8s' },
  { left: '16%', top: '72%', delay: '1.8s', duration: '10s' },
  { left: '48%', top: '12%', delay: '2.2s', duration: '6.8s' },
  { left: '70%', top: '78%', delay: '0.8s', duration: '8.6s' },
];

export function Hero({ revealed }: { revealed: boolean }) {
  const couples = weddingConfig.couples;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* soft drifting blooms */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-navy/5 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-blue/10 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />

      {HERO_MOTES.map((mote) => (
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

      <MihrabArch className="pointer-events-none absolute left-1/2 top-[46%] h-[70vh] w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 text-blue/30" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-12 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.9, delay: revealed ? 0.15 : 0 }}
          lang="ar"
          dir="rtl"
          className="font-arabic text-3xl text-navy sm:text-5xl"
        >
          {weddingConfig.arabicBlessing}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: revealed ? 0.3 : 0 }}
          className="mt-3 font-label text-lg italic text-navy sm:text-2xl"
        >
          {weddingConfig.blessing}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 1, delay: revealed ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8"
        >
          {couples.map((couple) => (
            <div key={couple.id} className="flex flex-col items-center">
              <p className="font-script text-[2.35rem] leading-none text-navy sm:text-5xl md:text-6xl">{couple.personA.name}</p>
              <p className="my-2 font-script text-2xl text-blue">weds</p>
              <p className="font-display text-3xl font-semibold leading-none text-lavender sm:text-4xl">{couple.personB.name}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={revealed ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.9, delay: revealed ? 0.7 : 0 }}
          className="mt-8 flex justify-center"
        >
          <FloralDivider color="text-blue" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: revealed ? 0.85 : 0 }}
          className="mt-12 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4"
        >
          <p className="font-display text-2xl italic text-navy sm:text-3xl">
            {weddingConfig.event.dateLong}
          </p>
          <span className="hidden h-5 w-px bg-lavender/70 sm:inline" />
          <p className="font-serif-body text-sm tracking-wide2 text-blue">
            {weddingConfig.event.venueName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: revealed ? 1.05 : 0 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-blue">
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

