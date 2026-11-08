import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

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

/** Geometric corner — arch, crescent, and eight-pointed stars. */
export function FloralCorner({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 130" className={className} fill="none" aria-hidden="true">
      <path
        d="M14 116 V62 C14 32 38 16 70 16"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M26 116 V66 C26 42 44 30 70 28"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.35"
      />
      <g className="text-lavender">
        <Crescent cx={78} cy={34} r={11} opacity={0.85} />
        <Star cx={96} cy={22} r={5} opacity={0.9} />
      </g>
      <g className="text-blue">
        <Star cx={28} cy={28} r={6} opacity={0.7} />
        <Diamond cx={48} cy={52} r={5} opacity={0.55} />
        <Star cx={22} cy={58} r={4} opacity={0.5} />
      </g>
    </svg>
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

/** Fixed geometric borders. Hidden below xl so mobile text stays clear. */
export function SideFloralBorders() {
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-20 hidden h-screen w-[64px] overflow-hidden xl:block">
        <div className="animate-border-grow h-full w-full">
          <SideGeometry side="left" />
        </div>
      </div>
      <div className="pointer-events-none fixed right-0 top-0 z-20 hidden h-screen w-[64px] overflow-hidden xl:block">
        <div className="animate-border-grow h-full w-full">
          <SideGeometry side="right" />
        </div>
      </div>
    </>
  );
}

function SideGeometry({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 64 1200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full text-lavender"
      fill="none"
      style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path d="M34 0 V1200" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <path d="M44 0 V1200" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
      {[70, 220, 370, 520, 670, 820, 970, 1120].map((y, i) => (
        <g key={y}>
          {i % 2 === 0 ? <Star cx={34} cy={y} r={8} opacity={0.75} /> : <Crescent cx={30} cy={y} r={8} opacity={0.7} />}
          <Diamond cx={34} cy={y + 70} r={4} opacity={0.4} />
        </g>
      ))}
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

/** Gold satin ribbon and bow, matching the printed invitation wrap. */
export function GoldRibbon({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 z-[5] ${className}`} aria-hidden="true">
      <div className="relative h-8 bg-gradient-to-b from-[#f8e7a8] via-[#e2b12a] to-[#b8891c] shadow-[0_10px_24px_rgba(12,28,52,0.28)] sm:h-10">
        <svg
          viewBox="0 0 140 90"
          className="absolute left-[6%] top-1/2 h-[4.5rem] w-[6.5rem] -translate-y-1/2 sm:left-[10%] sm:h-24 sm:w-32"
        >
          <path d="M70 46 C48 12 6 20 16 46 C6 72 48 80 70 46" fill="#f6dc78" stroke="#b8891c" strokeWidth="1.2" />
          <path d="M70 46 C92 12 134 20 124 46 C134 72 92 80 70 46" fill="#e8c14a" stroke="#b8891c" strokeWidth="1.2" />
          <ellipse cx="70" cy="46" rx="8" ry="7" fill="#f8e7a8" stroke="#8f6a14" strokeWidth="1" />
          <path d="M64 52 L52 84 L70 64 Z" fill="#e2b12a" />
          <path d="M76 52 L90 86 L70 64 Z" fill="#c49216" />
        </svg>
      </div>
    </div>
  );
}

export function FloralCluster({
  className = '',
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path d="M60 108 C58 78 60 58 60 36" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <path d="M60 90 C40 78 28 60 22 36" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <path d="M60 90 C80 78 94 60 100 38" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <g className="text-lavender">
        <Star cx={60} cy={36} r={12} opacity={0.85} />
        <Crescent cx={24} cy={34} r={8} opacity={0.7} />
        <Crescent cx={98} cy={36} r={8} opacity={0.7} />
      </g>
      <g className="text-blue">
        <Diamond cx={42} cy={62} r={5} opacity={0.55} />
        <Diamond cx={78} cy={62} r={5} opacity={0.55} />
        <Star cx={60} cy={84} r={5} opacity={0.5} />
      </g>
    </svg>
  );
}

export function Monogram({
  initials = 'R&A',
  className = '',
}: {
  initials?: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full text-lavender" fill="none" aria-hidden="true">
        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        <Star cx={40} cy={8} r={3.2} />
        <Star cx={40} cy={72} r={3.2} />
      </svg>
      <span className="font-label text-sm tracking-wide2 text-navy">{initials}</span>
    </div>
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

export function FloralSection({
  children,
  className = '',
  id,
  clusters = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  clusters?: boolean;
}) {
  return (
    <section id={id} className={`body-texture relative overflow-hidden py-24 sm:py-32 ${className}`}>
      {clusters && (
        <>
          <FloralCluster className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 text-lavender/40 sm:left-10 sm:translate-x-0" size={110} />
          <FloralCluster className="pointer-events-none absolute -bottom-4 right-1/2 translate-x-1/2 rotate-180 text-blue/35 sm:right-10 sm:translate-x-0" size={100} />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
