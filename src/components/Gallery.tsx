import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';
import { SectionHeading } from '@/components/decorations';

const gallery = weddingConfig.gallery;

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    [],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') close();
      if (ev.key === 'ArrowLeft') prev();
      if (ev.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, prev, next]);

  return (
    <section id="gallery" className="body-texture relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Cherished Moments"
          title="Wedding Gallery"
          subtitle="A collection of moments from our journey together. Tap any photo to view it full screen."
        />

        {/* Masonry-style grid */}
        <div className="mt-16 columns-2 gap-4 sm:gap-5 md:columns-3">
          {gallery.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-lavender/20 shadow-luxe-sm sm:mb-5"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  img.span === 'tall'
                    ? 'aspect-[3/4]'
                    : img.span === 'wide'
                      ? 'aspect-[4/3]'
                      : 'aspect-square'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 right-3 translate-y-2 font-label text-[10px] uppercase tracking-wide2 text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-90">
                {img.alt}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/95 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-lavender/30 text-ivory transition-colors hover:bg-lavender/15"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <button
              onClick={(ev) => { ev.stopPropagation(); prev(); }}
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-lavender/30 text-ivory transition-colors hover:bg-lavender/15 sm:left-8"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(ev) => { ev.stopPropagation(); next(); }}
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-lavender/30 text-ivory transition-colors hover:bg-lavender/15 sm:right-8"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>

            <motion.img
              key={active}
              src={gallery[active].src}
              alt={gallery[active].alt}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(ev) => ev.stopPropagation()}
              className="max-h-[82vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-ivory/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="font-label text-[10px] uppercase tracking-luxe text-lavender-light">
                {active + 1} / {gallery.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
