import { motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';
import { FloralDivider } from '@/components/decorations';
import { getGoogleCalendarUrl } from '@/utils/share';

export function Invitation() {
  const cal = getGoogleCalendarUrl();

  return (
    <section
      id="invite"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-navy/5 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-lavender/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-2 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="font-label text-lg italic text-navy"
        >
          A Blessing for the Marriage
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.08 }}
          lang="ar"
          dir="rtl"
          className="mt-6 font-arabic text-3xl leading-relaxed text-navy sm:text-4xl"
        >
          {weddingConfig.verse.arabic}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-xl italic leading-relaxed text-navy sm:text-2xl"
        >
          {weddingConfig.verse.english}
        </motion.h2>
        <p className="mt-3 font-label text-sm uppercase tracking-luxe text-blue">
          {weddingConfig.verse.ref}
        </p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 flex justify-center"
        >
          <FloralDivider color="text-lavender" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-10 font-display text-xl italic leading-relaxed text-navy sm:text-2xl"
        >
          {weddingConfig.invitationMessage[0]}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-6 font-serif-body text-base leading-relaxed text-blue"
        >
          {weddingConfig.invitationMessage[1]}
        </motion.p>

        {/* share buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href={cal}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 font-label text-xs uppercase tracking-wide2 text-ivory transition-all hover:bg-navy-800"
          >
            <CalendarPlus size={16} strokeWidth={1.7} />
            Add to Google Calendar
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-10 py-20 text-center sm:px-16 sm:py-28">
      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="font-script text-4xl text-navy sm:text-5xl">
          Rishal &amp; Amana · Rinsha &amp; Rafeeque
        </p>
        <div className="mx-auto my-5 h-px w-40 bg-gradient-to-r from-transparent via-lavender to-transparent" />
        <p className="font-label text-sm uppercase tracking-luxe text-blue">
          {weddingConfig.event.dateLong} · {weddingConfig.event.venueName}
        </p>
        <p className="mt-5 font-arabic text-2xl text-navy" lang="ar" dir="rtl">
          بارك الله لكما
        </p>
        <p className="mt-2 font-label text-sm uppercase tracking-wide2 text-blue">
          With the blessings of Allah
        </p>
      </div>
    </footer>
  );
}
