import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

interface QRProps {
  value: string;
  size?: number;
  className?: string;
  dark?: string;
  light?: string;
}

/** Renders a QR code as an SVG string. */
export function QRCodeImage({
  value,
  size = 160,
  className = '',
  dark = '#28215F',
  light = '#FFFFFF',
}: QRProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 1,
      color: { dark, light },
      errorCorrectionLevel: 'H',
    })
      .then(setDataUrl)
      .catch(() => setDataUrl(''));
  }, [value, size, dark, light]);

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <canvas ref={ref} className="hidden" />
      {dataUrl && (
        <img
          src={dataUrl}
          width={size}
          height={size}
          alt="QR code linking to venue location"
          className="block rounded-md"
        />
      )}
      {!dataUrl && (
        <div
          className="animate-pulse rounded-md bg-ivory-200"
          style={{ width: size, height: size }}
        />
      )}
    </div>
  );
}
