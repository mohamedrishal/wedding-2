import { motion } from 'framer-motion';
import type { Couple } from '@/config/wedding';
import { FloralDivider, DotSeparator } from '@/components/decorations';

interface Props {
  couple: Couple;
  index: number; // 0 or 1
}

export function CoupleSection({ couple, index }: Props) {
  // Both couples share the same gold and emerald weight.
  const accentText = 'text-lavender-dark';
  const isOdd = index === 1;
  const id = `couple-${index + 1}`;

  return (
    <section
      id={id}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
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
            <span className="block">{couple.personA.name}</span>
            <span className="my-1 block font-script text-[0.42em] text-blue">weds</span>
            <span className="block font-display text-[0.62em] font-semibold not-italic tracking-wide text-lavender">
              {couple.personB.name}
            </span>
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

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12">
          <FamilyCard person={couple.personA} delay={0.1} flip={isOdd} />
          <FamilyCard person={couple.personB} delay={0.2} flip={isOdd} />
        </div>
      </div>
    </section>
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
      whileHover={{ y: -8, transition: { duration: 0.35, delay: 0 } }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card-soft relative rounded-2xl p-7 text-center transition-shadow duration-500 hover:shadow-[0_24px_50px_-20px_rgba(110,84,36,0.18)] sm:p-9"
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
