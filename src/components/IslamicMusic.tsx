import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

const track = weddingConfig.music;

/** One wedding song. The button is always visible; playback starts when the envelope opens. */
export function IslamicMusic({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !active) return;
    audio.volume = 0.32;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [active]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  return (
    <div className="fixed right-4 top-4 z-[130] sm:right-6 sm:top-6">
      <audio ref={audioRef} src={track.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause wedding song' : 'Play wedding song'}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-ivory shadow-luxe transition-transform hover:scale-105"
      >
        {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>
    </div>
  );
}
