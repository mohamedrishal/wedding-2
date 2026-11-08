import { motion } from 'framer-motion';
import { MessageCircle, CalendarPlus } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';
import { FloralDivider, FloralCorner } from '@/components/decorations';
import { getWhatsAppUrl, getGoogleCalendarUrl } from '@/utils/share';

export function Invitation() {
  const wa = getWhatsAppUrl();
  const cal = getGoogleCalendarUrl();

  return (
    <section
      id="invite"
      className="relative overflow-hidden bg-navy-radial py-28 sm:py-36"
    >
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-lavender/12 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-blue/12 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <FloralCorner className="pointer-events-none absolute left-6 top-10 h-24 w-24 text-lavender/40 sm:h-32 sm:w-32" />
      <FloralCorner className="pointer-events-none absolute right-6 bottom-10 h-24 w-24 rotate-180 text-blue/40 sm:h-32 sm:w-32" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="font-label text-[11px] uppercase tracking-luxe text-lavender-light/85"
        >
          With Love
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-script text-6xl text-ivory sm:text-7xl"
        >
          Our Invitation
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 flex justify-center"
        >
          <FloralDivider color="text-lavender-light" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-10 font-display text-xl italic leading-relaxed text-ivory/90 sm:text-2xl"
        >
          {weddingConfig.invitationMessage[0]}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-6 font-serif-body text-base leading-relaxed text-ivory/75"
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
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-green-400/40 bg-green-500/10 px-7 py-3.5 font-label text-xs uppercase tracking-wide2 text-green-300 transition-all hover:border-green-400 hover:bg-green-500 hover:text-white"
          >
            <MessageCircle size={16} strokeWidth={1.7} />
            Share on WhatsApp
          </a>
          <a
            href={cal}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-lavender/50 bg-lavender/10 px-7 py-3.5 font-label text-xs uppercase tracking-wide2 text-lavender-light transition-all hover:border-lavender-light hover:bg-lavender hover:text-navy"
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
    <footer className="relative overflow-hidden bg-navy-900 py-14 text-center">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-script text-4xl text-lavender-shimmer sm:text-5xl">
          Rishal &amp; Amana · Rinsha &amp; Rafeeque
        </p>
        <div className="mx-auto my-5 h-px w-40 bg-gradient-to-r from-transparent via-lavender/40 to-transparent" />
        <p className="font-label text-[11px] uppercase tracking-luxe text-ivory/50">
          {weddingConfig.event.dateLong} · {weddingConfig.event.venueName}
        </p>
        <p className="mt-4 font-label text-[10px] uppercase tracking-wide2 text-ivory/35">
          With the blessings of Allah
        </p>
      </div>
    </footer>
  );
}
