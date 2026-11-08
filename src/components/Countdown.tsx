import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { SectionHeading } from '@/components/decorations';

function getRemaining(target: number) {
  const total = Math.max(0, target - Date.now());
  const days = Math.floor(total / 86400000);
  const hours = Math.floor((total % 86400000) / 3600000);
  const minutes = Math.floor((total % 3600000) / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const target = new Date(weddingConfig.event.startISO).getTime();
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = window.setInterval(() => setTime(getRemaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <motion.div
        className="pointer-events-none absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-navy/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Counting Down"
          title="Until the Wedding"
          accent="light"
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {units.map((u, i) => (
            <CountdownCard key={u.label} label={u.label} value={u.value} delay={i * 0.1} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center font-display text-xl italic text-navy sm:text-2xl"
        >
          {weddingConfig.event.dateLong}
          <span className="mx-3 text-lavender/40">·</span>
          {weddingConfig.event.time} IST
        </motion.p>
      </div>
    </section>
  );
}

function CountdownCard({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const prev = useRef(value);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setPulse(true);
      prev.current = value;
      const t = window.setTimeout(() => setPulse(false), 350);
      return () => window.clearTimeout(t);
    }
  }, [value]);

  const display = String(value).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card-soft relative rounded-2xl px-4 py-8 text-center sm:py-10"
    >
      <div className="relative h-16 overflow-hidden sm:h-20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: pulse ? -24 : 0, opacity: pulse ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="block font-display text-5xl font-light text-navy sm:text-7xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 block font-label text-[10px] uppercase tracking-luxe text-blue">
        {label}
      </span>
    </motion.div>
  );
}
