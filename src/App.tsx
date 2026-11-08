import { useState, useEffect } from 'react';
import { OpeningScreen } from '@/components/OpeningScreen';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { CoupleSection } from '@/components/CoupleSection';
import { Countdown } from '@/components/Countdown';
import { EventDetails } from '@/components/EventDetails';
import { Venue } from '@/components/Venue';
import { Gallery } from '@/components/Gallery';
import { Invitation, Footer } from '@/components/Invitation';
import { SideFloralBorders } from '@/components/decorations';
import { weddingConfig } from '@/config/wedding';

function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  return (
    <div className="relative min-h-screen body-texture">
      <OpeningScreen onOpen={() => setOpened(true)} />

      {opened && (
        <>
          <SideFloralBorders />
          <Navigation />
          <main>
            <Hero />
            {weddingConfig.couples.map((c, i) => (
              <CoupleSection key={c.id} couple={c} index={i} />
            ))}
            <Countdown />
            <EventDetails />
            <Venue />
            <Gallery />
            <Invitation />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
