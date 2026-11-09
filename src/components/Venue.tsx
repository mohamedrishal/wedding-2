import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Copy, Check } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';
import { SectionHeading } from '@/components/decorations';
import { QRCodeImage } from '@/components/QRCodeImage';
import { copyAddress } from '@/utils/share';

export function Venue() {
  const e = weddingConfig.event;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyAddress();
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="venue" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Location"
          title="The Wedding Venue"
          subtitle={`${e.venueName} · ${e.venueShort}`}
        />

        <div className="mx-auto mt-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-lavender/50 text-lavender-dark">
                <MapPin size={18} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-2xl text-navy sm:text-3xl">{e.venueName}</h3>
                <p className="mt-2 font-serif-body text-sm leading-relaxed text-navy/70">
                  {e.venueLine1}
                  <br />
                  {e.venueLine2}
                </p>
              </div>
            </div>

            {/* QR + actions */}
            <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
              <div className="flex flex-col items-center">
                <div className="rounded-2xl border border-lavender/30 bg-ivory-50 p-3 shadow-luxe-sm">
                  <QRCodeImage value={e.mapsUrl} size={150} dark="#6E5424" light="#FFFBF5" />
                </div>
                <span className="mt-3 font-label text-[10px] uppercase tracking-luxe text-navy/50">
                  Scan for Directions
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <ActionButton
                  href={e.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<Navigation size={16} strokeWidth={1.6} />}
                  label="Get Directions"
                />
                <ActionButton
                  href={e.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<ExternalLink size={16} strokeWidth={1.6} />}
                  label="Open in Google Maps"
                />
                <button
                  onClick={handleCopy}
                  className="group flex items-center justify-between rounded-xl border border-lavender/25 bg-ivory-50 px-5 py-3.5 font-label text-xs uppercase tracking-wide2 text-navy/80 transition-all hover:border-lavender/50 hover:bg-lavender/5"
                >
                  <span>Copy Address</span>
                  {copied ? (
                    <Check size={16} className="text-green-600" strokeWidth={2} />
                  ) : (
                    <Copy size={16} strokeWidth={1.6} className="text-lavender-dark" />
                  )}
                </button>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="-mt-1 font-serif-body text-[11px] text-green-600"
                  >
                    Address copied to clipboard
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ActionButton({
  href,
  target,
  rel,
  icon,
  label,
}: {
  href: string;
  target?: string;
  rel?: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="group flex items-center justify-between rounded-xl border border-lavender/25 bg-ivory-50 px-5 py-3.5 font-label text-xs uppercase tracking-wide2 text-navy/80 transition-all hover:border-lavender/50 hover:bg-lavender/5"
    >
      <span>{label}</span>
      <span className="text-lavender-dark transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
    </a>
  );
}
