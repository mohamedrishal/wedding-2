export interface Person {
  name: string;
  label: string; // "The Groom" / "The Bride"
  parents: { father: string; mother: string };
  residence: string;
}

export interface Couple {
  id: string;
  tagline: string; // "First Wedding"
  pronounOrder: 'groom-bride' | 'bride-groom';
  personA: Person; // shown left / top
  personB: Person; // shown right / bottom
  coupleName: string; // "Rishal & Amana"
  accent: 'lavender' | 'blue';
}

export const weddingConfig = {
  blessing: 'Together With The Blessings of Allah',
  arabicBlessing: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
  title: 'Wedding Celebration',
  verse: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
    english:
      'And of His signs is that He created for you mates from among yourselves, that you may find tranquillity in them.',
    ref: 'Surah Ar-Rum 30:21',
  },
  music: {
    title: 'Nazar Lagi',
    artist: 'Goldie Sohel & Asees Kaur',
    src: '/music/nazar-lagi.mp3',
  },
  couples: [
    {
      id: 'rishal-amana',
      tagline: 'First Wedding',
      pronounOrder: 'groom-bride' as const,
      coupleName: 'Rishal & Amana',
      accent: 'lavender' as const,
      personA: {
        name: 'Mohamed Rishal',
        label: 'The Groom',
        parents: { father: 'Mr. Abdul Razack M.', mother: 'Mrs. Shahidha T.' },
        residence:
          'Mundekkat (H), Tirur, Chembra, Meenadathur P.O., Malappuram, Kerala.',
      },
      personB: {
        name: 'Amana',
        label: 'The Bride',
        parents: { father: 'Mr. Abdul Majeed V.', mother: 'Mrs. Husnu Banu M.' },
        residence:
          'Vallil (H), Chellikkad, Tanur, Malappuram, Kerala.',
      },
    },
    {
      id: 'rinsha-rafeeque',
      tagline: 'Second Wedding',
      pronounOrder: 'bride-groom' as const,
      coupleName: 'Rinsha & Rafeeque',
      accent: 'blue' as const,
      personA: {
        name: 'Rinsha Febin',
        label: 'The Bride',
        parents: { father: 'Mr. Abdul Razack M.', mother: 'Mrs. Shahidha T.' },
        residence:
          'Mundekkat (H), Tirur, Chembra, Meenadathur P.O., Malappuram, Kerala.',
      },
      personB: {
        name: 'Rafeeque',
        label: 'The Groom',
        parents: { father: 'Mr. Hussain C.', mother: 'Mrs. Ummu Kulsu I.P.' },
        residence:
          'Chatheri (H), Ovungal, Thalakkadathur P.O., Malappuram, Kerala.',
      },
    },
  ] satisfies Couple[],
  event: {
    dateLong: 'Sunday, 13 December 2026',
    dateShort: '13.12.2026',
    time: '11:00 AM – 4:30 PM',
    startISO: '2026-12-13T11:00:00+05:30',
    endISO: '2026-12-13T16:30:00+05:30',
    timezone: 'Asia/Kolkata',
    timezoneLabel: 'IST',
    venueName: 'Crown Convention Center',
    venueLine1: 'Tanur Road, Moochikal, Tirur',
    venueLine2: 'Malappuram, Kerala — 676307',
    venueShort: 'Moochikal, Tirur, Kerala',
    mapsUrl:
      'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KZN0IfUFsqc7MdWLXwxIJdlS&daddr=Tanur+Road,+Moochikal,+Tirur,+Keralam+676307',
  },
  invitationMessage: [
    'With the blessings of Allah and the love of our families, we invite you to celebrate these two marriages — two unions, one blessing.',
    'Your presence and your duas will complete our joy.',
  ],
  // Update after deployment to the live URL.
  siteUrl: 'https://double-wedding-rishal-amana-rinsha-rafeeque.app',
};

export type WeddingConfig = typeof weddingConfig;
