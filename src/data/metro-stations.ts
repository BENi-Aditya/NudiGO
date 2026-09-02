/** Bangalore Metro Station Data */

export type MetroLine = 'purple' | 'green' | 'blue';

export type MetroStation = {
  id: string;
  name: string;
  nameKannada: string;
  line: MetroLine;
  coordinates: { lat: number; lng: number };
  connections?: string[]; // IDs of connecting stations
};

export const metroStations: MetroStation[] = [
  // Purple Line (North-South)
  {
    id: 'challaghatta',
    name: 'Challaghatta',
    nameKannada: 'ಚಲ್ಲಘಟ್ಟ',
    line: 'purple',
    coordinates: { lat: 13.0374, lng: 77.5504 },
  },
  {
    id: 'pattandur-agrahara',
    name: 'Pattandur Agrahara',
    nameKannada: 'ಪಟ್ಟಂದೂರು ಅಗ್ರಹಾರ',
    line: 'purple',
    coordinates: { lat: 13.0254, lng: 77.5574 },
  },
  {
    id: 'kengeri-bus-terminal',
    name: 'Kengeri Bus Terminal',
    nameKannada: 'ಕೆಂಗೇರಿ ಬಸ್ ಟರ್ಮಿನಲ್',
    line: 'purple',
    coordinates: { lat: 12.9151, lng: 77.4850 },
  },
  {
    id: 'kengeri',
    name: 'Kengeri',
    nameKannada: 'ಕೆಂಗೇರಿ',
    line: 'purple',
    coordinates: { lat: 12.9072, lng: 77.4854 },
  },
  {
    id: 'mysore-road',
    name: 'Mysore Road',
    nameKannada: 'ಮೈಸೂರು ರೋಡ್',
    line: 'purple',
    coordinates: { lat: 12.9614, lng: 77.5497 },
  },
  {
    id: 'deepanjali-nagar',
    name: 'Deepanjali Nagar',
    nameKannada: 'ದೀಪಾಂಜಲಿ ನಗರ',
    line: 'purple',
    coordinates: { lat: 12.9681, lng: 77.5532 },
  },
  {
    id: 'attiguppe',
    name: 'Attiguppe',
    nameKannada: 'ಅಟ್ಟಿಗುಪ್ಪೆ',
    line: 'purple',
    coordinates: { lat: 12.9720, lng: 77.5565 },
  },
  {
    id: 'vijayanagar',
    name: 'Vijayanagar',
    nameKannada: 'ವಿಜಯನಗರ',
    line: 'purple',
    coordinates: { lat: 12.9750, lng: 77.5608 },
  },
  {
    id: 'hosahalli',
    name: 'Hosahalli',
    nameKannada: 'ಹೊಸಹಳ್ಳಿ',
    line: 'purple',
    coordinates: { lat: 12.9779, lng: 77.5655 },
  },
  {
    id: 'magadi-road',
    name: 'Magadi Road',
    nameKannada: 'ಮಾಗಡಿ ರೋಡ್',
    line: 'purple',
    coordinates: { lat: 12.9799, lng: 77.5698 },
  },
  {
    id: 'city-railway-station',
    name: 'City Railway Station',
    nameKannada: 'ಸಿಟಿ ರೈಲ್ವೆ ನಿಲ್ದಾಣ',
    line: 'purple',
    coordinates: { lat: 12.9778, lng: 77.5727 },
  },
  {
    id: 'majestic',
    name: 'Majestic',
    nameKannada: 'ಮೆಜೆಸ್ಟಿಕ್',
    line: 'purple',
    coordinates: { lat: 12.9766, lng: 77.5733 },
    connections: ['krantiveera-sangolli-rayanna'],
  },
  {
    id: 'krantiveera-sangolli-rayanna',
    name: 'Krantiveera Sangolli Rayanna',
    nameKannada: 'ಕ್ರಾಂತಿವೀರ ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ',
    line: 'green',
    coordinates: { lat: 12.9778, lng: 77.5727 },
    connections: ['majestic'],
  },
  {
    id: 'cubbon-park',
    name: 'Cubbon Park',
    nameKannada: 'ಕಬ್ಬನ್ ಪಾರ್ಕ್',
    line: 'purple',
    coordinates: { lat: 12.9766, lng: 77.5910 },
  },
  {
    id: 'vidhana-soudha',
    name: 'Vidhana Soudha',
    nameKannada: 'ವಿಧಾನ ಸೌಧ',
    line: 'purple',
    coordinates: { lat: 12.9788, lng: 77.5931 },
  },
  {
    id: 'central-college',
    name: 'Central College',
    nameKannada: 'ಸೆಂಟ್ರಲ್ ಕಾಲೇಜು',
    line: 'purple',
    coordinates: { lat: 12.9830, lng: 77.5977 },
  },
  {
    id: 'mg-road',
    name: 'MG Road',
    nameKannada: 'ಎಂ.ಜಿ. ರೋಡ್',
    line: 'purple',
    coordinates: { lat: 12.9753, lng: 77.6056 },
  },
  {
    id: 'trinity',
    name: 'Trinity',
    nameKannada: 'ಟ್ರಿನಿಟಿ',
    line: 'purple',
    coordinates: { lat: 12.9789, lng: 77.6408 },
  },
  {
    id: 'halasuru',
    name: 'Halasuru',
    nameKannada: 'ಹಾಲಸೂರು',
    line: 'purple',
    coordinates: { lat: 12.9816, lng: 77.6270 },
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    nameKannada: 'ಇಂದಿರಾನಗರ',
    line: 'purple',
    coordinates: { lat: 12.9784, lng: 77.6408 },
  },
  {
    id: 'swami-vivekananda-road',
    name: 'Swami Vivekananda Road',
    nameKannada: 'ಸ್ವಾಮಿ ವಿವೇಕಾನಂದ ರೋಡ್',
    line: 'purple',
    coordinates: { lat: 12.9751, lng: 77.6517 },
  },
  {
    id: 'baiyappanahalli',
    name: 'Baiyappanahalli',
    nameKannada: 'ಬಯ್ಯಪ್ಪನಹಳ್ಳಿ',
    line: 'purple',
    coordinates: { lat: 12.9698, lng: 77.6560 },
  },

  // Green Line (East-West)
  {
    id: 'nagasandra',
    name: 'Nagasandra',
    nameKannada: 'ನಾಗಸಂದ್ರ',
    line: 'green',
    coordinates: { lat: 13.0383, lng: 77.5024 },
  },
  {
    id: 'dasarahalli',
    name: 'Dasarahalli',
    nameKannada: 'ದಾಸರಹಳ್ಳಿ',
    line: 'green',
    coordinates: { lat: 13.0328, lng: 77.5220 },
  },
  {
    id: 'jalahalli',
    name: 'Jalahalli',
    nameKannada: 'ಜಲಹಳ್ಳಿ',
    line: 'green',
    coordinates: { lat: 13.0300, lng: 77.5380 },
  },
  {
    id: 'peenya-industry',
    name: 'Peenya Industry',
    nameKannada: 'ಪೀಣ್ಯ ಇಂಡಸ್ಟ್ರಿ',
    line: 'green',
    coordinates: { lat: 13.0294, lng: 77.5186 },
  },
  {
    id: 'peenya',
    name: 'Peenya',
    nameKannada: 'ಪೀಣ್ಯ',
    line: 'green',
    coordinates: { lat: 13.0282, lng: 77.5155 },
  },
  {
    id: 'goraguntepalya',
    name: 'Goraguntepalya',
    nameKannada: 'ಗೋರಗುಂಟೆಪಾಳ್ಯ',
    line: 'green',
    coordinates: { lat: 13.0126, lng: 77.5489 },
  },
  {
    id: 'yeshwanthpur',
    name: 'Yeshwanthpur',
    nameKannada: 'ಯಶವಂತಪುರ',
    line: 'green',
    coordinates: { lat: 13.0280, lng: 77.5536 },
  },
  {
    id: 'sandal-soap-factory',
    name: 'Sandal Soap Factory',
    nameKannada: 'ಸ್ಯಾಂಡಲ್ ಸೋಪ್ ಫ್ಯಾಕ್ಟರಿ',
    line: 'green',
    coordinates: { lat: 13.0138, lng: 77.5619 },
  },
  {
    id: 'mahalakshmi',
    name: 'Mahalakshmi',
    nameKannada: 'ಮಹಾಲಕ್ಷ್ಮಿ',
    line: 'green',
    coordinates: { lat: 13.0050, lng: 77.5706 },
  },
  {
    id: 'rajajinagar',
    name: 'Rajajinagar',
    nameKannada: 'ರಾಜಾಜಿನಗರ',
    line: 'green',
    coordinates: { lat: 12.9990, lng: 77.5548 },
  },
  {
    id: 'kuvempu-road',
    name: 'Kuvempu Road',
    nameKannada: 'ಕುವೆಂಪು ರೋಡ್',
    line: 'green',
    coordinates: { lat: 12.9886, lng: 77.5705 },
  },
  {
    id: 'srirampura',
    name: 'Srirampura',
    nameKannada: 'ಶ್ರೀರಾಮಪುರ',
    line: 'green',
    coordinates: { lat: 12.9870, lng: 77.5778 },
  },
  {
    id: 'mantri-square-sampige-road',
    name: 'Mantri Square Sampige Road',
    nameKannada: 'ಮಂತ್ರಿ ಸ್ಕ್ವೇರ್ ಸಂಪಿಗೆ ರೋಡ್',
    line: 'green',
    coordinates: { lat: 12.9875, lng: 77.5835 },
  },
  {
    id: 'chickpet',
    name: 'Chickpet',
    nameKannada: 'ಚಿಕ್ಪೇಟೆ',
    line: 'green',
    coordinates: { lat: 12.9730, lng: 77.5792 },
  },
  {
    id: 'kr-market',
    name: 'KR Market',
    nameKannada: 'ಕೆ.ಆರ್. ಮಾರ್ಕೆಟ್',
    line: 'green',
    coordinates: { lat: 12.9591, lng: 77.5743 },
  },
  {
    id: 'national-college',
    name: 'National College',
    nameKannada: 'ನ್ಯಾಷನಲ್ ಕಾಲೇಜು',
    line: 'green',
    coordinates: { lat: 12.9586, lng: 77.5826 },
  },
  {
    id: 'lalbagh',
    name: 'Lalbagh',
    nameKannada: 'ಲಾಲ್ ಬಾಗ್',
    line: 'green',
    coordinates: { lat: 12.9507, lng: 77.5848 },
  },
  {
    id: 'south-end-circle',
    name: 'South End Circle',
    nameKannada: 'ಸೌತ್ ಎಂಡ್ ಸರ್ಕಲ್',
    line: 'green',
    coordinates: { lat: 12.9395, lng: 77.5909 },
  },
  {
    id: 'jayanagar',
    name: 'Jayanagar',
    nameKannada: 'ಜಯನಗರ',
    line: 'green',
    coordinates: { lat: 12.9254, lng: 77.5931 },
  },
  {
    id: 'rashtreeya-vidyalaya-road',
    name: 'Rashtreeya Vidyalaya Road',
    nameKannada: 'ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾಲಯ ರೋಡ್',
    line: 'green',
    coordinates: { lat: 12.9199, lng: 77.5957 },
  },
  {
    id: 'banashankari',
    name: 'Banashankari',
    nameKannada: 'ಬನಶಂಕರಿ',
    line: 'green',
    coordinates: { lat: 12.9250, lng: 77.5486 },
  },
  {
    id: 'jp-nagar',
    name: 'JP Nagar',
    nameKannada: 'ಜೆ.ಪಿ. ನಗರ',
    line: 'green',
    coordinates: { lat: 12.9070, lng: 77.5954 },
  },
  {
    id: 'yelachenahalli',
    name: 'Yelachenahalli',
    nameKannada: 'ಏಲಚೇನಹಳ್ಳಿ',
    line: 'green',
    coordinates: { lat: 12.9009, lng: 77.5963 },
  },
  {
    id: 'konanakunte-cross',
    name: 'Konanakunte Cross',
    nameKannada: 'ಕೋನನಕುಂಟೆ ಕ್ರಾಸ್',
    line: 'green',
    coordinates: { lat: 12.8909, lng: 77.5982 },
  },
  {
    id: 'doddakallasandra',
    name: 'Doddakallasandra',
    nameKannada: 'ದೊಡ್ಡಕಲ್ಲಸಂದ್ರ',
    line: 'green',
    coordinates: { lat: 12.8830, lng: 77.5988 },
  },
  {
    id: 'vajarahalli',
    name: 'Vajarahalli',
    nameKannada: 'ವಜ್ರಹಳ್ಳಿ',
    line: 'green',
    coordinates: { lat: 12.8774, lng: 77.5995 },
  },
  {
    id: 'silk-institute',
    name: 'Silk Institute',
    nameKannada: 'ಸಿಲ್ಕ್ ಇನ್ಸ್ಟಿಟ್ಯೂಟ್',
    line: 'green',
    coordinates: { lat: 12.8545, lng: 77.6113 },
  },
];

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find the nearest metro station to a given coordinate
 */
export function findNearestMetro(
  lat: number,
  lng: number
): { station: MetroStation; distanceKm: number; walkMinutes: number } {
  let nearest = metroStations[0]!;
  let minDistance = haversineDistance(
    lat,
    lng,
    nearest.coordinates.lat,
    nearest.coordinates.lng
  );

  for (const station of metroStations.slice(1)) {
    const distance = haversineDistance(
      lat,
      lng,
      station.coordinates.lat,
      station.coordinates.lng
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearest = station;
    }
  }

  // Assume average walking speed of 5 km/h
  const walkMinutes = Math.round((minDistance / 5) * 60);

  return {
    station: nearest,
    distanceKm: Math.round(minDistance * 10) / 10,
    walkMinutes,
  };
}
