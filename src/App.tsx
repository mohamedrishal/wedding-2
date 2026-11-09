import { useState, useEffect } from 'react';
import { OpeningScreen } from '@/components/OpeningScreen';
import { Hero } from '@/components/Hero';
import { CoupleSection } from '@/components/CoupleSection';
import { Countdown } from '@/components/Countdown';
import { EventDetails } from '@/components/EventDetails';
import { Venue } from '@/components/Venue';
import { Invitation, Footer } from '@/components/Invitation';
import { IslamicMusic } from '@/components/IslamicMusic';
import { InvitationBackdrop } from '@/components/InvitationBackdrop';
import { weddingConfig } from '@/config/wedding';

function App() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [covered, setCovered] = useState(true);

  useEffect(() => {
    document.body.style.overflow = covered ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [covered]);

  return (
    <div className="relative min-h-screen bg-[#F6F0E6]">
      <div className="card-frame relative min-h-screen">
          <InvitationBackdrop />
          <main className="relative z-10 px-6 sm:px-12 md:px-24">
            <Hero revealed={revealed} />
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
      <OpeningScreen
        onOpen={() => setOpened(true)}
        onReveal={() => setRevealed(true)}
        onDone={() => setCovered(false)}
      />
      <IslamicMusic active={opened} />
    </div>
  );
}

export default App;
