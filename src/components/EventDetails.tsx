import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';
import { SectionHeading, FloralDivider } from '@/components/decorations';

export function EventDetails() {
  const e = weddingConfig.event;

  const items = [
    { icon: CalendarDays, label: 'The Date', lines: [e.dateLong] },
    { icon: Clock, label: 'The Time', lines: [e.time, `${e.timezoneLabel} · ${e.timezone}`] },
    { icon: MapPin, label: 'The Venue', lines: [e.venueName, e.venueShort] },
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Join Us"
          title="The Wedding"
          subtitle="We look forward to welcoming you, and to your duas on our special day."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="card-soft group flex flex-col items-center rounded-2xl p-8 text-center transition-all duration-500 hover:border-lavender/50"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-lavender/50 text-lavender-dark transition-transform duration-500 group-hover:scale-110">
                <it.icon size={22} strokeWidth={1.4} />
              </span>
              <span className="mt-5 font-label text-[10px] uppercase tracking-luxe text-lavender-dark">
                {it.label}
              </span>
              {it.lines.map((line) => (
                <p key={line} className="mt-2 font-display text-xl text-navy sm:text-2xl">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <FloralDivider color="text-lavender" />
        </motion.div>
      </div>
    </section>
  );
}
