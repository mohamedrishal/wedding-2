import { motion } from 'framer-motion';

/* Emerald and gold Islamic ornament system.
   Motifs use currentColor — tint them with Tailwind text-* classes. */

function Star({
  cx,
  cy,
  r,
  opacity = 0.85,
}: {
  cx: number;
  cy: number;
  r: number;
  opacity?: number;
}) {
  const points = Array.from({ length: 16 }, (_, i) => {
    const ang = -Math.PI / 2 + (i * Math.PI) / 8;
    const rad = i % 2 === 0 ? r : r * 0.42;
    return `${cx + Math.cos(ang) * rad},${cy + Math.sin(ang) * rad}`;
  }).join(' ');
  return <polygon points={points} fill="currentColor" opacity={opacity} />;
}

function Crescent({
  cx,
  cy,
  r,
  opacity = 0.9,
}: {
  cx: number;
  cy: number;
  r: number;
  opacity?: number;
}) {
  return (
    <path
      d={`M ${cx - r * 0.15} ${cy - r}
          A ${r} ${r} 0 1 0 ${cx - r * 0.15} ${cy + r}
          A ${r * 0.72} ${r * 0.78} 0 1 1 ${cx - r * 0.15} ${cy - r} Z`}
      fill="currentColor"
      opacity={opacity}
    />
  );
}

function Diamond({
  cx,
  cy,
  r,
  opacity = 0.7,
}: {
  cx: number;
  cy: number;
  r: number;
  opacity?: number;
}) {
  return (
    <polygon
      points={`${cx},${cy - r} ${cx + r * 0.62},${cy} ${cx},${cy + r} ${cx - r * 0.62},${cy}`}
      fill="currentColor"
      opacity={opacity}
    />
  );
}

/** Horizontal divider: ruled line, diamonds, crescent and star. */
export function FloralDivider({
  className = '',
  color = 'text-lavender',
  width = 280,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  const flourish = width > 200 ? 90 : 56;
  return (
    <div className={`flex items-center justify-center gap-2 ${color} ${className}`}>
      <svg width={flourish} height="24" viewBox="0 0 90 24" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M2 12 H58" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
        <Diamond cx={68} cy={12} r={4} opacity={0.7} />
        <circle cx="82" cy="12" r="1.4" fill="currentColor" opacity="0.7" />
      </svg>
      <svg width="52" height="36" viewBox="0 0 52 36" fill="none" aria-hidden="true" className="shrink-0">
        <Crescent cx={18} cy={18} r={9} />
        <Star cx={36} cy={16} r={6} opacity={0.95} />
      </svg>
      <svg
        width={flourish}
        height="24"
        viewBox="0 0 90 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
        style={{ transform: 'scaleX(-1)' }}
      >
        <path d="M2 12 H58" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
        <Diamond cx={68} cy={12} r={4} opacity={0.7} />
        <circle cx="82" cy="12" r="1.4" fill="currentColor" opacity="0.7" />
      </svg>
    </div>
  );
}

export function DotSeparator({ className = '' }: { className?: string }) {
  return (
    <svg width="28" height="12" viewBox="0 0 28 12" className={className} fill="none" aria-hidden="true">
      <circle cx="3" cy="6" r="1.2" fill="currentColor" opacity="0.55" />
      <Diamond cx={14} cy={6} r={4} opacity={0.8} />
      <circle cx="25" cy="6" r="1.2" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

/** Mihrab arch, drawn behind a heading. */
export function MihrabArch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 240" className={className} fill="none" aria-hidden="true">
      <path
        d="M36 228 V128 C36 58 112 22 210 22 C308 22 384 58 384 128 V228"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M58 228 V132 C58 74 122 42 210 42 C298 42 362 74 362 132 V228"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.55"
      />
      <Star cx={210} cy={78} r={10} opacity={0.8} />
      <Crescent cx={168} cy={96} r={8} opacity={0.55} />
      <Crescent cx={252} cy={96} r={8} opacity={0.55} />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  accent = 'light',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: 'light' | 'dark';
}) {
  const titleColor = accent === 'dark' ? 'text-ivory' : 'text-navy';
  const eyebrowColor = accent === 'dark' ? 'text-lavender-light' : 'text-lavender-dark';
  const dividerColor = accent === 'dark' ? 'text-lavender-light' : 'text-lavender';
  const subColor = accent === 'dark' ? 'text-ivory/70' : 'text-navy/60';

  return (
    <div className="flex flex-col items-center text-center">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`font-label text-[11px] uppercase tracking-luxe ${eyebrowColor}`}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-3 font-script text-5xl leading-[1.05] sm:text-6xl md:text-7xl ${titleColor}`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-5"
      >
        <FloralDivider color={dividerColor} />
      </motion.div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className={`mt-6 max-w-xl font-serif-body text-base leading-relaxed ${subColor}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
