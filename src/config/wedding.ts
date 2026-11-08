export interface Person {
  name: string;
  label: string; // "The Groom" / "The Bride"
  parents: { father: string; mother: string };
  residence: string;
  photo: string;
  photoAlt: string;
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
  title: 'A Double Wedding Celebration',
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
        photo:
          'https://images.pexels.com/photos/33049965/pexels-photo-33049965.jpeg?auto=compress&cs=tinysrgb&h=1100&w=750',
        photoAlt: 'Mohamed Rishal — Groom (placeholder portrait)',
      },
      personB: {
        name: 'Amana',
        label: 'The Bride',
        parents: { father: 'Mr. Abdul Majeed V.', mother: 'Mrs. Husnu Banu M.' },
        residence:
          'Vallil (H), Chellikkad, Tanur, Malappuram, Kerala.',
        photo:
          'https://images.pexels.com/photos/40641303/pexels-photo-40641303.jpeg?auto=compress&cs=tinysrgb&h=1100&w=750',
        photoAlt: 'Amana — Bride (placeholder portrait)',
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
        photo:
          'https://images.pexels.com/photos/34250444/pexels-photo-34250444.jpeg?auto=compress&cs=tinysrgb&h=1100&w=750',
        photoAlt: 'Rinsha Febin — Bride (placeholder portrait)',
      },
      personB: {
        name: 'Rafeeque',
        label: 'The Groom',
        parents: { father: 'Mr. Hussain C.', mother: 'Mrs. Ummu Kulsu I.P.' },
        residence:
          'Chatheri (H), Ovungal, Thalakkadathur P.O., Malappuram, Kerala.',
        photo:
          'https://images.pexels.com/photos/32379178/pexels-photo-32379178.jpeg?auto=compress&cs=tinysrgb&h=1100&w=750',
        photoAlt: 'Rafeeque — Groom (placeholder portrait)',
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
    // Static venue photograph — real auditorium of Crown Convention Center (placeholder).
    venuePhoto:
      'https://images.pexels.com/photos/3866658/pexels-photo-3866658.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400',
    venuePhotoAlt: 'Crown Convention Center auditorium (placeholder)',
  },
  invitationMessage: [
    'With the blessings of Allah and the love of our families, we invite you to join us in celebrating these two beautiful beginnings.',
    'Your presence and blessings will make our celebration truly special.',
  ],
  // Replaced when real photographs are uploaded.
  gallery: [
    {
      src: 'https://images.pexels.com/photos/27635496/pexels-photo-27635496.jpeg?auto=compress&cs=tinysrgb&h=900&w=1300',
      alt: 'Wedding ceremony floral decor',
      span: 'tall',
    },
    {
      src: 'https://images.pexels.com/photos/26990489/pexels-photo-26990489.jpeg?auto=compress&cs=tinysrgb&h=800&w=1100',
      alt: 'South Asian couple celebrating',
      span: 'wide',
    },
    {
      src: 'https://images.pexels.com/photos/35069916/pexels-photo-35069916.jpeg?auto=compress&cs=tinysrgb&h=1100&w=800',
      alt: 'Indian couple in traditional attire',
      span: 'normal',
    },
    {
      src: 'https://images.pexels.com/photos/13156145/pexels-photo-13156145.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      alt: 'Luxurious wedding stage with floral arch',
      span: 'wide',
    },
    {
      src: 'https://images.pexels.com/photos/38781130/pexels-photo-38781130.jpeg?auto=compress&cs=tinysrgb&h=1100&w=800',
      alt: 'Indian couple wedding moment',
      span: 'tall',
    },
    {
      src: 'https://images.pexels.com/photos/27865553/pexels-photo-27865553.jpeg?auto=compress&cs=tinysrgb&h=800&w=1100',
      alt: 'Joyful couple with floral decor',
      span: 'normal',
    },
    {
      src: 'https://images.pexels.com/photos/28411910/pexels-photo-28411910.jpeg?auto=compress&cs=tinysrgb&h=1100&w=800',
      alt: 'South Asian couple celebrating love',
      span: 'tall',
    },
    {
      src: 'https://images.pexels.com/photos/32495457/pexels-photo-32495457.jpeg?auto=compress&cs=tinysrgb&h=1100&w=800',
      alt: 'Bride and groom under veil',
      span: 'normal',
    },
    {
      src: 'https://images.pexels.com/photos/27635420/pexels-photo-27635420.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      alt: 'Adorned Indian couple traditional attire',
      span: 'wide',
    },
  ] as { src: string; alt: string; span: 'normal' | 'tall' | 'wide' }[],
  // Update after deployment to the live URL.
  siteUrl: 'https://double-wedding-rishal-amana-rinsha-rafeeque.app',
};

export type WeddingConfig = typeof weddingConfig;
