import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Rishal & Amana', href: '#couple-1' },
  { label: 'Rinsha & Rafeeque', href: '#couple-2' },
  { label: 'Countdown', href: '#countdown' },
  { label: 'Venue', href: '#venue' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Invite', href: '#invite' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-luxe-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => handleNav('#home')}
            className={`font-script text-2xl transition-colors ${
              scrolled ? 'text-navy' : 'text-ivory'
            }`}
          >
            <span className="text-lavender">R</span>&amp;<span className="text-lavender">A</span>
            <span className="mx-1 text-lavender/40">·</span>
            <span className="text-lavender">R</span>&amp;<span className="text-lavender">R</span>
          </button>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className={`font-label text-[11px] uppercase tracking-wide2 transition-colors hover:text-lavender-dark ${
                    scrolled ? 'text-navy/70' : 'text-ivory/80'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden ${scrolled ? 'text-navy' : 'text-ivory'}`}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-radial lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-script text-3xl text-lavender">Menu</span>
              <button onClick={() => setOpen(false)} className="text-ivory" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <ul className="mt-10 flex flex-col items-center gap-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <button
                    onClick={() => handleNav(l.href)}
                    className="font-script text-3xl text-ivory/90 hover:text-lavender"
                  >
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
