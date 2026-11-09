const PETALS = [
  { left: '8%', delay: '0s', duration: '22s', size: 8 },
  { left: '22%', delay: '6s', duration: '26s', size: 6 },
  { left: '46%', delay: '3s', duration: '20s', size: 7 },
  { left: '68%', delay: '9s', duration: '24s', size: 9 },
  { left: '84%', delay: '1.5s', duration: '21s', size: 6 },
  { left: '93%', delay: '12s', duration: '27s', size: 8 },
];

/** Cream-and-gold atmosphere behind every invitation section. */
export function InvitationBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <EdgeFloral className="fixed left-0 top-0" />
      <EdgeFloral className="fixed right-0 top-0 -scale-x-100" />
      <EdgeFloral className="fixed bottom-0 left-0 -scale-y-100" />
      <EdgeFloral className="fixed bottom-0 right-0 -scale-x-100 -scale-y-100" />

      <div className="fixed inset-y-8 left-3 hidden w-px bg-gradient-to-b from-transparent via-[#C6A15A]/40 to-transparent md:block" />
      <div className="fixed inset-y-8 right-3 hidden w-px bg-gradient-to-b from-transparent via-[#C6A15A]/40 to-transparent md:block" />

      {PETALS.map((petal) => (
        <span
          key={petal.left}
          className="invite-petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size + 5,
            ['--petal-delay' as string]: petal.delay,
            ['--petal-duration' as string]: petal.duration,
          }}
        />
      ))}
    </div>
  );
}

function EdgeFloral({ className }: { className: string }) {
  return (
    <svg
      className={`h-32 w-32 text-[#C6A15A]/40 sm:h-44 sm:w-44 ${className}`}
      viewBox="0 0 140 140"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M10 128C34 112 48 86 50 52c14 22 34 36 62 42" />
        <path d="M36 96c12-20 12-36 2-54" />
        <path d="M52 84c16-8 30-8 46 4" />
        <path d="M24 108c18 2 30 10 40 24" />
      </g>
      <g fill="currentColor">
        <circle cx="50" cy="50" r="3.2" />
        <circle cx="70" cy="74" r="2.2" />
        <circle cx="92" cy="92" r="2.4" />
        <circle cx="22" cy="90" r="2" />
        <circle cx="108" cy="108" r="1.6" />
      </g>
    </svg>
  );
}
