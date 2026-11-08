import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

const track = weddingConfig.music;

/** One wedding nasheed. Starts after the invitation is opened. */
export function IslamicMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.32;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

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
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      <audio ref={audioRef} src={track.src} loop preload="none" />
      <div className="flex items-center gap-3 rounded-full bg-navy px-2 py-2 text-ivory shadow-luxe">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause wedding nasheed' : 'Play wedding nasheed'}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy transition-transform hover:scale-105"
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <div className="min-w-0 pr-2">
          <p className="font-label text-[9px] uppercase tracking-luxe text-lavender-light">Song</p>
          <p className="max-w-[9.5rem] truncate font-serif-body text-sm leading-tight text-ivory">
            {track.title}
          </p>
        </div>
      </div>
    </div>
  );
}
