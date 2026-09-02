/** Hidden Gems of Bangalore - Curated Local Favorites */

import { findNearestMetro } from './metro-stations';

export type Category = 'food' | 'nature' | 'culture' | 'shopping' | 'nightlife';

export type HiddenGem = {
  id: string;
  name: string;
  nameKannada: string;
  category: Category;
  subcategory?: string;
  description: string;
  longDescription?: string;

  location: {
    area: string;
    address?: string;
    coordinates: { lat: number; lng: number };
    nearestMetro: {
      station: string;
      line: string;
      distanceKm: number;
      walkMinutes: number;
    };
  };

  images: {
    main: string;
    gallery: string[];
  };

  kannadaLearning: {
    usefulPhrase: string;
    transliteration: string;
    english: string;
    context: string;
  };

  metadata: {
    source: 'curated' | 'reddit' | 'community' | 'google';
    sourceUrl?: string;
    discoveredAt: string;
    curatorNotes?: string;
    tags: string[];
  };
};

// Placeholder images from Unsplash - replace with real images later
const PLACEHOLDER_IMAGES = {
  food: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  culture: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
  shopping: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
  nightlife: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
};

// Helper function to auto-calculate nearest metro
function createGem(
  data: Omit<HiddenGem, 'location'> & {
    location: Omit<HiddenGem['location'], 'nearestMetro'>;
  }
): HiddenGem {
  const { lat, lng } = data.location.coordinates;
  const nearest = findNearestMetro(lat, lng);

  return {
    ...data,
    location: {
      ...data.location,
      nearestMetro: {
        station: nearest.station.name,
        line: nearest.station.line,
        distanceKm: nearest.distanceKm,
        walkMinutes: nearest.walkMinutes,
      },
    },
  };
}

export const hiddenGems: HiddenGem[] = [
  // FOOD - Hidden Cafes & Restaurants
  createGem({
    id: 'koshy-bar-restaurant',
    name: "Koshy's Bar & Restaurant",
    nameKannada: 'ಕೋಶಿಸ್ ಬಾರ್ ಮತ್ತು ರೆಸ್ಟೋರೆಂಟ್',
    category: 'food',
    subcategory: 'cafe',
    description:
      'Iconic 1940s Irani cafe where Bangalore intellectuals have gathered for decades. Old-world charm with wooden furniture and vintage vibes.',
    longDescription:
      "A Bangalore institution since 1940, Koshy's is where the city's artists, writers, and thinkers have gathered for generations. The menu hasn't changed much - classic English breakfast, mutton cutlets, and filter coffee served in steel tumblers. The wooden interiors and leisurely pace transport you to old Bangalore.",
    location: {
      area: 'St. Marks Road',
      address: "39, St Mark's Rd, Shanthala Nagar, Ashok Nagar",
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', // Classic cafe interior
      gallery: ['https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಒಂದು ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ',
      transliteration: 'Ondu filter kaapi kodi',
      english: 'Give me one filter coffee',
      context: 'Order their famous filter coffee like a local!',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['hidden', 'historic', 'cafe', 'breakfast', 'vintage'],
      curatorNotes: 'Must-visit for anyone interested in Bangalore history',
    },
  }),

  // FOOD - Veena Stores
  createGem({
    id: 'veena-stores',
    name: 'Veena Stores',
    nameKannada: 'ವೀಣಾ ಸ್ಟೋರ್ಸ್',
    category: 'food',
    subcategory: 'street-food',
    description:
      'Tiny hole-in-the-wall famous for crispy masala dosas. Get here early - they sell out by 11am!',
    longDescription:
      'This unassuming eatery near Malleshwaram has been serving perfect masala dosas since 1953. The secret? Paper-thin dosas with a spicy potato filling and generous dollop of butter. Locals queue up from 7am, and they often sell out by mid-morning. Cash only, no seating - eat standing at the tiny counter.',
    location: {
      area: 'Malleshwaram',
      address: '9th Cross Rd, Malleshwaram',
      coordinates: { lat: 13.0067, lng: 77.5682 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80', // South Indian dosa
      gallery: ['https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಎರಡು ಮಸಾಲಾ ದೋಸೆ ಕೊಡಿ',
      transliteration: 'Eradu masala dose kodi',
      english: 'Give me two masala dosas',
      context: "Always order at least two - they're that good!",
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['hidden', 'street-food', 'breakfast', 'budget-friendly', 'local-favorite'],
      curatorNotes: 'Get there before 9am to avoid the crowd',
    },
  }),

  createGem({
    id: 'Airlines-hotel',
    name: 'Airlines Hotel',
    nameKannada: 'ಏರ್‌ಲೈನ್ಸ್ ಹೋಟೆಲ್',
    category: 'food',
    subcategory: 'restaurant',
    description:
      'Legendary Udupi restaurant serving authentic South Indian meals on banana leaves since 1971.',
    longDescription:
      'Despite its name, Airlines Hotel has nothing to do with aviation. This Lavelle Road institution serves unlimited South Indian thalis on banana leaves. The crispy rava dosas are massive, and the filter coffee is perfection. Family-run since 1971, it maintains old-school service and quality.',
    location: {
      area: 'Lavelle Road',
      address: '1, Lavelle Rd, Kumara Park East',
      coordinates: { lat: 12.9729, lng: 77.5958 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80', // South Indian thali
      gallery: ['https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಮತ್ತು ಸ್ವಲ್ಪ ಸಾಂಬಾರ್ ಕೊಡಿ',
      transliteration: 'Mattu swalpa sambar kodi',
      english: 'Give me some more sambar',
      context: 'Unlimited refills are the tradition - ask freely!',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['hidden', 'authentic', 'south-indian', 'family-friendly', 'budget-friendly'],
    },
  }),

  // NATURE - Parks & Green Spaces
  createGem({
    id: 'bugle-rock-park',
    name: 'Bugle Rock Park',
    nameKannada: 'ಬ್ಯೂಗಲ್ ರಾಕ್ ಪಾರ್ಕ್',
    category: 'nature',
    subcategory: 'park',
    description:
      'Ancient 3000-year-old monolithic rock formation offering panoramic city views. Peaceful morning walks.',
    longDescription:
      'This hidden gem in Basavanagudi features a massive 3000-year-old rock that dominates the landscape. Climb the steps to the top for stunning sunrise views of the city. The park is quieter than Lalbagh, perfect for morning walks and bird watching. The rock is geologically significant and has mythological connections to the Ramayana.',
    location: {
      area: 'Basavanagudi',
      address: 'Bugle Rock Rd, Basavanagudi',
      coordinates: { lat: 12.9432, lng: 77.5748 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಈ ಬಂಡೆ ಎಷ್ಟು ಹಳೆಯದು?',
      transliteration: 'Ee bande eshtu haleyadu?',
      english: 'How old is this rock?',
      context: 'Ask locals about the rock\'s history - they love sharing!',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['hidden', 'nature', 'sunrise', 'historic', 'free-entry'],
    },
  }),

  createGem({
    id: 'kaveri-river-mekedatu',
    name: 'Mekedatu',
    nameKannada: 'ಮೇಕೆದಾಟು',
    category: 'nature',
    subcategory: 'river',
    description:
      "Where the Kaveri river squeezes through narrow gorge. Dramatic rock formations and emerald waters. Day trip from Bangalore.",
    longDescription:
      'Mekedatu means "goat\'s leap" in Kannada - legend says a goat escaped a tiger by leaping across the narrow gorge. The Kaveri river forces through a 100-foot gap between towering cliffs, creating spectacular views. 100km from Bangalore, perfect for a weekend day trip. Best visited post-monsoon (Nov-Jan) when water levels are high.',
    location: {
      area: 'Kanakapura Road',
      address: 'Mekedatu, Kanakapura Taluk',
      coordinates: { lat: 12.4167, lng: 77.3667 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ನೀರು ತುಂಬಾ ತಂಪಾಗಿದೆ',
      transliteration: 'Neeru thumba thampagide',
      english: 'The water is very cold',
      context: 'Perfect phrase when dipping your feet in the river!',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['nature', 'day-trip', 'adventure', 'photography', 'river'],
      curatorNotes: 'Check river levels before visiting - closed during heavy monsoon',
    },
  }),

  createGem({
    id: 'kaikondrahalli-lake',
    name: 'Kaikondrahalli Lake',
    nameKannada: 'ಕಾಯ್ಕೊಂದ್ರಹಳ್ಳಿ ಕೆರೆ',
    category: 'nature',
    subcategory: 'lake',
    description:
      'Bird watcher\'s paradise with 120+ species. Restored lake with walking trail and floating islands.',
    longDescription:
      'Once a dying lake, Kaikondrahalli was restored by residents and is now a biodiversity hotspot. Home to 120+ bird species including rare migrants. The floating islands created with native plants are engineering marvels. Early morning (6-8am) is best for bird watching. Bring binoculars!',
    location: {
      area: 'Sarjapur Road',
      address: 'Kaikondrahalli, Near Sarjapur Road',
      coordinates: { lat: 12.9117, lng: 77.6736 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಅದು ಯಾವ ಹಕ್ಕಿ?',
      transliteration: 'Adu yaava hakki?',
      english: 'Which bird is that?',
      context: 'Ask the regular bird watchers - they know every species!',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['nature', 'bird-watching', 'lake', 'free-entry', 'morning-walk'],
    },
  }),

  // CULTURE - Temples & Heritage
  createGem({
    id: 'gavi-gangadhareshwara-temple',
    name: 'Gavi Gangadhareshwara Temple',
    nameKannada: 'ಗವಿ ಗಂಗಾಧರೇಶ್ವರ ದೇವಸ್ಥಾನ',
    category: 'culture',
    subcategory: 'temple',
    description:
      'Cave temple with astronomical precision. Sunlight illuminates the idol twice a year (Sankranti). 9th century architecture.',
    longDescription:
      'This rock-cut cave temple is an architectural marvel. On Makara Sankranti (Jan 14/15), sunlight passes through the horns of Nandi and precisely illuminates the Shiva linga inside the cave - a feat of ancient astronomy. The temple has four monolithic pillars and a mysterious underground chamber. Best visited during Sankranti for the light phenomenon.',
    location: {
      area: 'Gavipuram',
      address: 'Gavipuram Guttahalli, Basavangudi',
      coordinates: { lat: 12.9507, lng: 77.5610 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ದೇವಸ್ಥಾನ ಎಲ್ಲಿದೆ?',
      transliteration: 'Devasthana ellide?',
      english: 'Where is the temple?',
      context: 'Use this to find temples or get directions',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['culture', 'temple', 'historic', 'architecture', 'free-entry'],
      curatorNotes: 'Visit during Makara Sankranti for the sunlight phenomenon',
    },
  }),

  createGem({
    id: 'devanahalli-fort',
    name: 'Devanahalli Fort',
    nameKannada: 'ದೇವನಹಳ್ಳಿ ಕೋಟೆ',
    category: 'culture',
    subcategory: 'fort',
    description:
      "Tipu Sultan's birthplace. 15th century mud fort with intact ramparts and bastions. Uncrowded heritage site.",
    longDescription:
      'Built in 1501, this mud fort is where Tipu Sultan was born in 1750. Unlike crowded tourist spots, Devanahalli Fort remains relatively unknown. Walk along the intact ramparts, explore the bastions, and visit the small Tipu Sultan museum. The fort complex includes 12 Muslim tombs and ancient temples. Peaceful atmosphere perfect for history buffs.',
    location: {
      area: 'Devanahalli',
      address: 'Devanahalli, North Bangalore',
      coordinates: { lat: 13.2429, lng: 77.7189 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಇದು ಎಷ್ಟು ಹಳೆಯದು?',
      transliteration: 'Idu eshtu haleyadu?',
      english: 'How old is this?',
      context: 'Great question to start conversations about history',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['culture', 'historic', 'fort', 'tipu-sultan', 'day-trip'],
    },
  }),

  // SHOPPING - Local Markets
  createGem({
    id: 'avenue-road',
    name: 'Avenue Road Market',
    nameKannada: 'ಅವೆನ್ಯೂ ರೋಡ್ ಮಾರುಕಟ್ಟೆ',
    category: 'shopping',
    subcategory: 'market',
    description:
      'Wholesale spice and dry fruits market. Chaotic lanes filled with aromas. Best deals in the city if you bargain.',
    longDescription:
      'Avenue Road is sensory overload in the best way. Narrow lanes packed with wholesale shops selling spices, dry fruits, pulses, and traditional ingredients. The air is thick with the smell of cardamom, cloves, and coffee. Prices are wholesale rates - bargain hard. Best visited early morning (7-9am) when vendors are setting up.',
    location: {
      area: 'Avenue Road',
      address: 'Avenue Road, Near City Market',
      coordinates: { lat: 12.9725, lng: 77.5747 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?',
      transliteration: 'Idara bele eshtu?',
      english: 'How much does this cost?',
      context: 'Essential phrase for bargaining in markets!',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['shopping', 'market', 'wholesale', 'spices', 'budget-friendly'],
      curatorNotes: "Bring cash - most shops don't accept cards",
    },
  }),

  createGem({
    id: 'gandhi-bazaar',
    name: 'Gandhi Bazaar',
    nameKannada: 'ಗಾಂಧಿ ಬಜಾರ್',
    category: 'shopping',
    subcategory: 'market',
    description:
      'Traditional neighborhood market. Fresh produce, flowers, and sweets. Try VV Puram Food Street nearby!',
    longDescription:
      'Gandhi Bazaar is old Bangalore charm personified. This Basavanagudi market has been serving locals since the 1960s. Fresh vegetables, fragrant flower garlands, traditional sweets, and tiny shops selling everything. After shopping, walk to VV Puram Food Street for dosas and chaats. Best visited Sunday morning for the full bustle.',
    location: {
      area: 'Basavanagudi',
      address: 'Gandhi Bazaar Main Road, Basavanagudi',
      coordinates: { lat: 12.9425, lng: 77.5758 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಹಣ್ಣು ತಾಜಾ ಇದೆಯಾ?',
      transliteration: 'Hannu taaja ideya?',
      english: 'Is the fruit fresh?',
      context: 'Use when buying produce - shows you know your stuff!',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['shopping', 'market', 'food-street', 'traditional', 'local-favorite'],
    },
  }),

  // NIGHTLIFE - Unique Experiences
  createGem({
    id: 'bangalore-turf-club',
    name: 'Bangalore Turf Club',
    nameKannada: 'ಬೆಂಗಳೂರು ಟರ್ಫ್ ಕ್ಲಬ್',
    category: 'nightlife',
    subcategory: 'entertainment',
    description:
      'Historic horse racing track since 1920. Colonial architecture, live racing on weekends. Dress code enforced.',
    longDescription:
      'Step back in time at this colonial-era race course. Founded in 1920, the Bangalore Turf Club hosts live horse racing on weekends (Nov-July season). The elegant grandstand, manicured lawns, and betting windows preserve old-world charm. Entry is affordable, dress code is smart casual. Great place to spend a lazy Sunday afternoon.',
    location: {
      area: 'Race Course Road',
      address: 'Race Course Road, Opposite Cubbon Park',
      coordinates: { lat: 12.9889, lng: 77.5976 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಕುದುರೆ ಓಟ ಯಾವಾಗ ಆರಂಭವಾಗುತ್ತೆ?',
      transliteration: 'Kudure ota yaavaga arambhavaagutte?',
      english: 'When does the horse race start?',
      context: 'Perfect question to ask at the ticket counter',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['nightlife', 'entertainment', 'historic', 'colonial', 'weekend'],
      curatorNotes: 'Check racing season dates (Nov-July) before visiting',
    },
  }),

  createGem({
    id: 'biere-street',
    name: 'Biere Street',
    nameKannada: 'ಬಿಯರ್ ಸ್ಟ್ರೀಟ್',
    category: 'nightlife',
    subcategory: 'bar',
    description:
      'Cozy underground bar with 50+ craft beers. Board games, live music weekends. Hidden entrance adds to the charm.',
    longDescription:
      'This speakeasy-style bar is literally underground - descend the stairs from the street to find a cozy den with exposed brick walls and dim lighting. The beer menu has 50+ craft brews from across India and Belgium. Thursday nights feature live acoustic music. Board games are free to play. The burgers pair perfectly with their IPAs.',
    location: {
      area: 'Indiranagar',
      address: '12th Main Road, HAL 2nd Stage, Indiranagar',
      coordinates: { lat: 12.9716, lng: 77.6412 },
    },
    images: {
      main: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    },
    kannadaLearning: {
      usefulPhrase: 'ಯಾವ ಬಿಯರ್ ಒಳ್ಳೆಯದು?',
      transliteration: 'Yaava beer olleyadu?',
      english: 'Which beer is good?',
      context: 'Ask the bartender for recommendations!',
    },
    metadata: {
      source: 'curated',
      discoveredAt: '2026-09-01',
      tags: ['nightlife', 'bar', 'craft-beer', 'live-music', 'hidden-entrance'],
    },
  }),
];

// Utility functions
export function getGemsByCategory(category: Category): HiddenGem[] {
  return hiddenGems.filter((gem) => gem.category === category);
}

export function searchGems(query: string): HiddenGem[] {
  const lowerQuery = query.toLowerCase();
  return hiddenGems.filter(
    (gem) =>
      gem.name.toLowerCase().includes(lowerQuery) ||
      gem.nameKannada.includes(query) ||
      gem.description.toLowerCase().includes(lowerQuery) ||
      gem.location.area.toLowerCase().includes(lowerQuery) ||
      gem.metadata.tags.some((tag) => tag.includes(lowerQuery))
  );
}

export function getGemById(id: string): HiddenGem | undefined {
  return hiddenGems.find((gem) => gem.id === id);
}
