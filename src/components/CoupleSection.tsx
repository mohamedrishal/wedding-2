import { motion } from 'framer-motion';
import type { Couple } from '@/config/wedding';
import { FloralDivider, FloralCluster, DotSeparator } from '@/components/decorations';

interface Props {
  couple: Couple;
  index: number; // 0 or 1
}

export function CoupleSection({ couple, index }: Props) {
  // Both couples use lavender/blue accents — equal visual weight, no gold.
  const accentText = 'text-lavender-dark';
  const accentBorder = 'border-lavender/40';
  const accentRing = 'ring-lavender/30';
  const isOdd = index === 1;
  const id = `couple-${index + 1}`;

  return (
    <section
      id={id}
      className="body-texture relative overflow-hidden py-24 sm:py-32"
    >
      <FloralCluster className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-lavender/40 sm:left-12 sm:translate-x-0" size={120} />
      <FloralCluster className="pointer-events-none absolute -bottom-6 right-1/2 translate-x-1/2 rotate-180 text-blue/35 sm:right-12 sm:translate-x-0" size={110} />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className={`font-label text-[11px] uppercase tracking-luxe ${accentText}`}
          >
            {couple.tagline}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-script text-5xl text-navy sm:text-7xl md:text-8xl"
          >
            {couple.coupleName.split('&')[0].trim()}
            <span className="mx-1 text-lavender">&amp;</span>
            {couple.coupleName.split('&')[1].trim()}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5"
          >
            <FloralDivider color="text-lavender" />
          </motion.div>
        </div>

        {/* Portraits */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-6 md:gap-12">
          <PortraitCard person={couple.personA} accent={accentBorder} ring={accentRing} delay={0.1} flip={isOdd} />
          <PortraitCard person={couple.personB} accent={accentBorder} ring={accentRing} delay={0.28} flip={isOdd} />
        </div>

        {/* Family info */}
        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12">
          <FamilyCard person={couple.personA} delay={0.1} flip={isOdd} />
          <FamilyCard person={couple.personB} delay={0.2} flip={isOdd} />
        </div>
      </div>
    </section>
  );
}

function PortraitCard({
  person,
  accent,
  ring,
  delay,
  flip,
}: {
  person: Couple['personA'];
  accent: string;
  ring: string;
  delay: number;
  flip: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateZ: flip ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-sm"
    >
      {/* decorative frame */}
      <div className={`relative rounded-[2rem] border ${accent} p-3 shadow-luxe`}>
        <div className="relative overflow-hidden rounded-[1.5rem]">
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.3, delay: delay + 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="aspect-[3/4] overflow-hidden"
          >
            <img
              src={person.photo}
              alt={person.photoAlt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-navy/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/75 to-transparent" />
          {/* label */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-5">
            <DotSeparator className="text-lavender-light" />
            <span className="mt-2 font-label text-[10px] uppercase tracking-luxe text-lavender-light/90">
              {person.label}
            </span>
            <span className="mt-1 font-script text-3xl text-ivory sm:text-4xl">
              {person.name}
            </span>
          </div>
        </div>
      </div>
      {/* floating monogram dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.6 }}
        className={`absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full bg-ivory shadow-luxe-sm ring-2 ${ring}`}
      >
        <span className="font-script text-3xl text-lavender-dark">
          {person.name.charAt(0)}
        </span>
      </motion.div>
    </motion.div>
  );
}

function FamilyCard({
  person,
  delay,
  flip,
}: {
  person: Couple['personA'];
  delay: number;
  flip: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: flip ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card-soft relative rounded-2xl p-7 text-center sm:p-9"
    >
      <h3 className="font-script text-3xl text-navy sm:text-4xl">{person.name}</h3>
      <p className="mt-1 font-label text-[10px] uppercase tracking-luxe text-lavender-dark">
        {person.label}
      </p>

      <div className="mx-auto my-5 flex justify-center">
        <DotSeparator className="text-lavender" />
      </div>

      <p className="font-label text-[11px] uppercase tracking-wide2 text-navy/50">
        Beloved Parents
      </p>
      <p className="mt-2 font-display text-lg italic leading-relaxed text-navy/85">
        {person.parents.father}
      </p>
      <p className="font-display text-lg italic leading-relaxed text-navy/85">
        &amp; {person.parents.mother}
      </p>

      <div className="mx-auto my-5 h-px w-16 bg-lavender/30" />

      <p className="font-label text-[11px] uppercase tracking-wide2 text-navy/50">
        Residence
      </p>
      <p className="mt-2 font-serif-body text-sm leading-relaxed text-navy/70">
        {person.residence}
      </p>
    </motion.div>
  );
}
