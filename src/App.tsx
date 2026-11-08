import { useState, useEffect } from 'react';
import { OpeningScreen } from '@/components/OpeningScreen';
import { Hero } from '@/components/Hero';
import { CoupleSection } from '@/components/CoupleSection';
import { Countdown } from '@/components/Countdown';
import { EventDetails } from '@/components/EventDetails';
import { Venue } from '@/components/Venue';
import { Invitation, Footer } from '@/components/Invitation';
import { IslamicMusic } from '@/components/IslamicMusic';
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
    <div className="relative min-h-screen bg-white">
      <OpeningScreen onOpen={() => setOpened(true)} />

      {opened && (
        <div className="card-frame relative min-h-screen">
          <IslamicMusic />
          <main className="relative z-10 px-10 sm:px-16 md:px-24">
            <Hero />
            {weddingConfig.couples.map((c, i) => (
              <CoupleSection key={c.id} couple={c} index={i} />
            ))}
            <Countdown />
            <EventDetails />
            <Venue />
            <Invitation />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
