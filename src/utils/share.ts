import { weddingConfig } from '@/config/wedding';

const e = weddingConfig.event;

export function getWhatsAppUrl(): string {
  const text =
    `*Double Wedding Celebration*\n` +
    `${weddingConfig.couples[0].coupleName}  |  ${weddingConfig.couples[1].coupleName}\n` +
    `${e.dateLong}\n${e.time} (IST)\n` +
    `${e.venueName}, ${e.venueShort}\n\n` +
    `View invitation: ${weddingConfig.siteUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getGoogleCalendarUrl(): string {
  const start = e.startISO.replace(/[-:]/g, '').replace('.000', '');
  const end = e.endISO.replace(/[-:]/g, '').replace('.000', '');
  const details =
    'With the blessings of Allah, you are warmly invited to our double wedding celebration.';
  const location = `${e.venueName}, ${e.venueLine1}, ${e.venueLine2}`;
  const text = 'Double Wedding Celebration — Rishal & Amana | Rinsha & Rafeeque';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text,
    dates: `${start}/${end}`,
    details,
    location,
    ctz: e.timezone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export async function copyAddress(): Promise<boolean> {
  const address = `${e.venueName}, ${e.venueLine1}, ${e.venueLine2}`;
  try {
    await navigator.clipboard.writeText(address);
    return true;
  } catch {
    return false;
  }
}
