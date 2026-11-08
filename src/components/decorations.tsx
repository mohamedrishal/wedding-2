import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/* ============================================================
   Blue & lavender floral ornament system
   All florals use currentColor — set via Tailwind text-* classes.
   ============================================================ */

/** A single 5-petal bloom with a center, drawn with fills + delicate stroke. */
function Bloom({
  cx,
  cy,
  r,
  fill = 'currentColor',
  opacity = 0.9,
}: {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  opacity?: number;
}) {
  // five petals around center
  const petals = [0, 72, 144, 216, 288].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const px = cx + Math.cos(rad) * r * 0.7;
    const py = cy + Math.sin(rad) * r * 0.7;
    return { px, py };
  });
  return (
    <g opacity={opacity}>
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx={p.px}
          cy={p.py}
          rx={r * 0.5}
          ry={r * 0.34}
          fill={fill}
          transform={`rotate(${i * 72} ${p.px} ${p.py})`}
          opacity={0.85}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.26} fill="#fffdf8" opacity={0.9} />
      <circle cx={cx} cy={cy} r={r * 0.12} fill={fill} opacity={0.6} />
    </g>
  );
}

/** A small leaf shape. */
function Leaf({
  x,
  y,
  angle = 0,
  size = 8,
  opacity = 0.7,
}: {
  x: number;
  y: number;
  angle?: number;
  size?: number;
  opacity?: number;
}) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`} opacity={opacity}>
      <path
        d={`M ${x} ${y} Q ${x + size * 0.6} ${y - size * 0.4} ${x + size} ${y} Q ${x + size * 0.6} ${y + size * 0.4} ${x} ${y} Z`}
        fill="currentColor"
      />
      <path
        d={`M ${x} ${y} L ${x + size} ${y}`}
        stroke="#fffdf8"
        strokeWidth="0.4"
        opacity="0.5"
        fill="none"
      />
    </g>
  );
}

/** Delicate floral corner cluster — for top/bottom corners of sections. */
export function FloralCorner({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 130"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* curving stem */}
      <path
        d="M8 8 C 28 16, 44 30, 52 52 C 58 68, 56 84, 48 96"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
      <path
        d="M8 8 C 16 28, 30 44, 52 52"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.35"
        fill="none"
      />
      {/* leaves along stem */}
      <g className="text-blue">
        <Leaf x={20} y={20} angle={40} size={9} />
        <Leaf x={34} y={34} angle={-30} size={7} />
        <Leaf x={48} y={52} angle={60} size={8} />
      </g>
      {/* blooms */}
      <g className="text-lavender">
        <Bloom cx={52} cy={52} r={9} opacity={0.85} />
      </g>
      <g className="text-blue">
        <Bloom cx={26} cy={18} r={5} opacity={0.7} />
        <Bloom cx={18} cy={30} r={4} opacity={0.6} />
        <Bloom cx={56} cy={80} r={6} opacity={0.75} />
      </g>
      <g className="text-lavender">
        <Bloom cx={40} cy={70} r={4} opacity={0.6} />
      </g>
      {/* tiny dots */}
      <circle cx="60" cy="60" r="1.4" fill="currentColor" opacity="0.5" />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/** Horizontal ornamental divider with center bloom + side flourishes. */
export function FloralDivider({
  className = '',
  color = 'text-lavender',
  width = 280,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  return (
    <div className={`flex items-center justify-center gap-2 ${color} ${className}`}>
      {/* left flourish */}
      <svg width={width > 200 ? 90 : 56} height="30" viewBox="0 0 90 30" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M2 15 Q 22 15, 32 15" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <path d="M32 15 Q 42 8, 52 15" stroke="currentColor" strokeWidth="0.7" opacity="0.5" fill="none" />
        <Leaf x={26} y={15} angle={-20} size={6} opacity={0.6} />
        <Leaf x={40} y={12} angle={30} size={5} opacity={0.5} />
        <circle cx="52" cy="15" r="1.6" fill="currentColor" opacity="0.7" />
      </svg>

      {/* center bloom */}
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true" className="shrink-0">
        <g className="text-lavender">
          <Bloom cx={22} cy={22} r={8} opacity={0.9} />
        </g>
        <g className="text-blue" opacity="0.7">
          <Leaf x={22} y={32} angle={90} size={7} />
          <Leaf x={22} y={12} angle={-90} size={6} />
          <Leaf x={12} y={22} angle={180} size={6} />
          <Leaf x={32} y={22} angle={0} size={7} />
        </g>
      </svg>

      {/* right flourish (mirrored) */}
      <svg width={width > 200 ? 90 : 56} height="30" viewBox="0 0 90 30" fill="none" aria-hidden="true" className="shrink-0" style={{ transform: 'scaleX(-1)' }}>
        <path d="M2 15 Q 22 15, 32 15" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <path d="M32 15 Q 42 8, 52 15" stroke="currentColor" strokeWidth="0.7" opacity="0.5" fill="none" />
        <Leaf x={26} y={15} angle={-20} size={6} opacity={0.6} />
        <Leaf x={40} y={12} angle={30} size={5} opacity={0.5} />
        <circle cx="52" cy="15" r="1.6" fill="currentColor" opacity="0.7" />
      </svg>
    </div>
  );
}

/** Small decorative diamond/dot separator for inline use. */
export function DotSeparator({ className = '' }: { className?: string }) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" className={className} fill="none" aria-hidden="true">
      <circle cx="3" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
      <path d="M6 5 L 14 5" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <circle cx="10" cy="5" r="2" fill="currentColor" opacity="0.8" />
      <path d="M6 5 L 14 5" stroke="currentColor" strokeWidth="0.6" opacity="0.4" transform="translate(0 0)" />
      <circle cx="17" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/**
 * Vertical floral border running the full height of the page on each side.
 * Fixed position, pointer-events none, hidden on small screens to keep
 * mobile content readable.
 */
export function SideFloralBorders() {
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-20 hidden h-screen w-[70px] overflow-hidden xl:block">
        <div className="animate-border-grow h-full w-full">
          <SideVine side="left" />
        </div>
      </div>
      <div className="pointer-events-none fixed right-0 top-0 z-20 hidden h-screen w-[70px] overflow-hidden xl:block">
        <div className="animate-border-grow h-full w-full">
          <SideVine side="right" />
        </div>
      </div>
    </>
  );
}

function SideVine({ side }: { side: 'left' | 'right' }) {
  const flip = side === 'right' ? 'scaleX(-1)' : '';
  return (
    <svg
      viewBox="0 0 70 1200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full text-lavender"
      fill="none"
      style={{ transform: flip }}
      aria-hidden="true"
    >
      {/* main vertical stem */}
      <path
        d="M38 0 C 30 120, 46 240, 34 360 C 24 480, 44 600, 36 720 C 28 840, 44 960, 34 1080 C 30 1140, 36 1180, 38 1200"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />
      <path
        d="M34 0 C 40 100, 30 200, 38 300"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.25"
        fill="none"
      />
      {/* repeating leaves + blooms along the stem */}
      {[80, 230, 380, 530, 680, 830, 980, 1130].map((y, i) => (
        <g key={i}>
          <g className="text-blue">
            <Leaf x={28} y={y} angle={-150} size={9} opacity={0.55} />
            <Leaf x={44} y={y + 30} angle={20} size={8} opacity={0.5} />
          </g>
          {i % 2 === 0 ? (
            <g className="text-lavender">
              <Bloom cx={36} cy={y + 15} r={6} opacity={0.7} />
            </g>
          ) : (
            <g className="text-blue">
              <Bloom cx={36} cy={y + 15} r={5} opacity={0.6} />
            </g>
          )}
          <g className="text-lavender" opacity={0.5}>
            <Leaf x={30} y={y + 50} angle={-120} size={6} />
          </g>
        </g>
      ))}
      {/* top + bottom clusters */}
      <g className="text-lavender">
        <Bloom cx={36} cy={24} r={8} opacity={0.85} />
      </g>
      <g className="text-blue">
        <Bloom cx={28} cy={36} r={5} opacity={0.65} />
        <Leaf x={36} y={20} angle={-80} size={9} opacity={0.6} />
      </g>
      <g className="text-lavender">
        <Bloom cx={36} cy={1180} r={7} opacity={0.8} />
      </g>
      <g className="text-blue">
        <Bloom cx={42} cy={1168} r={4} opacity={0.6} />
        <Leaf x={36} y={1186} angle={100} size={8} opacity={0.55} />
      </g>
    </svg>
  );
}

/** A larger top-of-section floral cluster (corner spray). */
export function FloralCluster({
  className = '',
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* branches */}
      <path d="M60 110 C 56 80, 62 60, 48 40 C 40 28, 30 22, 18 20" stroke="currentColor" strokeWidth="0.8" opacity="0.4" fill="none" />
      <path d="M60 110 C 64 84, 58 64, 72 46 C 82 32, 92 26, 104 24" stroke="currentColor" strokeWidth="0.8" opacity="0.4" fill="none" />
      <path d="M60 110 C 60 86, 60 66, 60 44" stroke="currentColor" strokeWidth="0.6" opacity="0.3" fill="none" />

      <g className="text-lavender">
        <Bloom cx={60} cy={44} r={9} opacity={0.85} />
        <Bloom cx={20} cy={22} r={6} opacity={0.7} />
        <Bloom cx={100} cy={26} r={6} opacity={0.7} />
      </g>
      <g className="text-blue">
        <Bloom cx={48} cy={60} r={5} opacity={0.65} />
        <Bloom cx={74} cy={58} r={5} opacity={0.65} />
        <Bloom cx={60} cy={88} r={4} opacity={0.55} />
      </g>
      <g className="text-lavender" opacity={0.6}>
        <Leaf x={44} y={50} angle={-110} size={8} />
        <Leaf x={78} y={50} angle={110} size={8} />
        <Leaf x={60} y={70} angle={0} size={7} />
        <Leaf x={34} y={32} angle={-60} size={6} />
        <Leaf x={88} y={36} angle={60} size={6} />
      </g>
    </svg>
  );
}

/** Monogram ring with initials. */
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
        <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        <path d="M40 4 L 40 10 M 40 70 L 40 76 M 4 40 L 10 40 M 70 40 L 76 40" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <g className="text-blue" opacity="0.7">
          <Bloom cx={40} cy={6} r={3} opacity={0.7} />
          <Bloom cx={40} cy={74} r={3} opacity={0.7} />
        </g>
      </svg>
      <span className="font-script text-2xl text-navy">{initials}</span>
    </div>
  );
}

/** Animated section heading — script title, label eyebrow, floral divider. */
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
        className={`mt-3 font-script text-5xl sm:text-6xl md:text-7xl leading-[1.05] ${titleColor}`}
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

/** Wrapper that gives ivory sections the soft textured bg + top/bottom floral clusters. */
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
