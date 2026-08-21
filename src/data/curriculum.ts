/**
 * NudiGO curriculum - the single source of truth for the learning content.
 *
 * This mirrors the seeded Supabase tables (sections, units, lessons, concepts)
 * exactly, so the app renders the full path with zero backend configuration.
 * When Supabase is connected we still read curriculum from here (it never
 * changes at runtime) and use the database only for per-user progress.
 *
 * PRD rule 6: keep curriculum in structured data, not scattered in components.
 */

export type LessonKind = "lesson" | "speak" | "review";
export type ConceptKind = "word" | "phrase";

export type Section = {
  id: number;
  orderIndex: number;
  title: string;
  subtitle: string;
};

export type Unit = {
  id: number;
  sectionId: number;
  orderIndex: number;
  title: string;
  subtitle: string;
  isAvailable: boolean;
};

export type Lesson = {
  id: number;
  unitId: number;
  orderIndex: number;
  title: string;
  objective: string;
  kind: LessonKind;
};

export type Concept = {
  id: string;
  lessonId: number;
  unitId: number;
  orderIndex: number;
  kannada: string;
  transliteration: string;
  english: string;
  note: string;
  kind: ConceptKind;
};

export const sections: Section[] = [
  {
    id: 1,
    orderIndex: 1,
    title: "FIRST KANNADA",
    subtitle: "Your first words that work everywhere",
  },
  {
    id: 2,
    orderIndex: 2,
    title: "FOOD AND DRINK",
    subtitle: "Order like you live here",
  },
  {
    id: 3,
    orderIndex: 3,
    title: "GETTING AROUND",
    subtitle: "Autos, metro and directions",
  },
  {
    id: 4,
    orderIndex: 4,
    title: "SHOPPING",
    subtitle: "Prices, numbers, negotiation",
  },
  {
    id: 5,
    orderIndex: 5,
    title: "COLLEGE LIFE",
    subtitle: "Classmates and campus",
  },
  {
    id: 6,
    orderIndex: 6,
    title: "CONVERSATION",
    subtitle: "Ask, answer, keep talking",
  },
  {
    id: 7,
    orderIndex: 7,
    title: "BANGALORE CONFIDENCE",
    subtitle: "Final real-world challenges",
  },
];

export const units: Unit[] = [
  {
    id: 1,
    sectionId: 1,
    orderIndex: 1,
    title: "Hello Bengaluru",
    subtitle: "Greet anyone, anywhere",
    isAvailable: true,
  },
  {
    id: 2,
    sectionId: 1,
    orderIndex: 2,
    title: "Meet Me",
    subtitle: "Say who you are",
    isAvailable: true,
  },
  {
    id: 3,
    sectionId: 1,
    orderIndex: 3,
    title: "Survival Kannada",
    subtitle: "Rescue phrases for real conversations",
    isAvailable: true,
  },
  {
    id: 4,
    sectionId: 2,
    orderIndex: 4,
    title: "Order Something",
    subtitle: "Ask for what you want",
    isAvailable: true,
  },
  {
    id: 5,
    sectionId: 2,
    orderIndex: 5,
    title: "Coffee and Tea",
    subtitle: "Darshini Kannada",
    isAvailable: true,
  },
  {
    id: 6,
    sectionId: 2,
    orderIndex: 6,
    title: "Restaurant Kannada",
    subtitle: "Handle a full meal",
    isAvailable: true,
  },
  {
    id: 7,
    sectionId: 2,
    orderIndex: 7,
    title: "Paying",
    subtitle: "Money without confusion",
    isAvailable: true,
  },
  {
    id: 8,
    sectionId: 3,
    orderIndex: 8,
    title: "Autos",
    subtitle: "Win the auto conversation",
    isAvailable: true,
  },
  {
    id: 9,
    sectionId: 3,
    orderIndex: 9,
    title: "Directions",
    subtitle: "Left, right, straight",
    isAvailable: false,
  },
  {
    id: 10,
    sectionId: 3,
    orderIndex: 10,
    title: "Metro and Bus",
    subtitle: "Namma Metro Kannada",
    isAvailable: false,
  },
  {
    id: 11,
    sectionId: 3,
    orderIndex: 11,
    title: "Places Around You",
    subtitle: "Shops, parks, landmarks",
    isAvailable: false,
  },
  {
    id: 12,
    sectionId: 4,
    orderIndex: 12,
    title: "Prices",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 13,
    sectionId: 4,
    orderIndex: 13,
    title: "Numbers",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 14,
    sectionId: 4,
    orderIndex: 14,
    title: "Buying Things",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 15,
    sectionId: 4,
    orderIndex: 15,
    title: "Polite Negotiation",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 16,
    sectionId: 5,
    orderIndex: 16,
    title: "Meet Classmates",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 17,
    sectionId: 5,
    orderIndex: 17,
    title: "Classroom Kannada",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 18,
    sectionId: 5,
    orderIndex: 18,
    title: "Ask for Help",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 19,
    sectionId: 5,
    orderIndex: 19,
    title: "Hostel / Daily Life",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 20,
    sectionId: 6,
    orderIndex: 20,
    title: "Questions",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 21,
    sectionId: 6,
    orderIndex: 21,
    title: "Answers",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 22,
    sectionId: 6,
    orderIndex: 22,
    title: "Likes and Dislikes",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 23,
    sectionId: 6,
    orderIndex: 23,
    title: "Plans",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 24,
    sectionId: 6,
    orderIndex: 24,
    title: "Small Talk",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 25,
    sectionId: 7,
    orderIndex: 25,
    title: "Food Challenge",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 26,
    sectionId: 7,
    orderIndex: 26,
    title: "Auto Challenge",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 27,
    sectionId: 7,
    orderIndex: 27,
    title: "Shopping Challenge",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 28,
    sectionId: 7,
    orderIndex: 28,
    title: "Conversation Challenge",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 29,
    sectionId: 7,
    orderIndex: 29,
    title: "Listening Challenge",
    subtitle: "",
    isAvailable: false,
  },
  {
    id: 30,
    sectionId: 7,
    orderIndex: 30,
    title: "Final Bengaluru Challenge",
    subtitle: "",
    isAvailable: false,
  },
];

export const lessons: Lesson[] = [
  {
    id: 11,
    unitId: 1,
    orderIndex: 1,
    title: "Hello Bengaluru 1",
    objective: "Greet people and say yes",
    kind: "lesson",
  },
  {
    id: 12,
    unitId: 1,
    orderIndex: 2,
    title: "Hello Bengaluru 2",
    objective: "Say no, thank you and okay",
    kind: "lesson",
  },
  {
    id: 13,
    unitId: 1,
    orderIndex: 3,
    title: "Hello Bengaluru - Speak",
    objective: "Say every phrase out loud",
    kind: "speak",
  },
  {
    id: 14,
    unitId: 1,
    orderIndex: 4,
    title: "Hello Bengaluru - Unit Review",
    objective: "Mixed review of the whole unit",
    kind: "review",
  },
  {
    id: 21,
    unitId: 2,
    orderIndex: 1,
    title: "Meet Me 1",
    objective: "Give your name and ask where",
    kind: "lesson",
  },
  {
    id: 22,
    unitId: 2,
    orderIndex: 2,
    title: "Meet Me 2",
    objective: "Talk about being a student and friends",
    kind: "lesson",
  },
  {
    id: 23,
    unitId: 2,
    orderIndex: 3,
    title: "Meet Me - Speak",
    objective: "Say every phrase out loud",
    kind: "speak",
  },
  {
    id: 24,
    unitId: 2,
    orderIndex: 4,
    title: "Meet Me - Unit Review",
    objective: "Mixed review of the whole unit",
    kind: "review",
  },
  {
    id: 31,
    unitId: 3,
    orderIndex: 1,
    title: "Survival Kannada 1",
    objective: "Rescue yourself in a fast conversation",
    kind: "lesson",
  },
  {
    id: 32,
    unitId: 3,
    orderIndex: 2,
    title: "Survival Kannada 2",
    objective: "Ask politely for help",
    kind: "lesson",
  },
  {
    id: 33,
    unitId: 3,
    orderIndex: 3,
    title: "Survival Kannada - Speak",
    objective: "Say every phrase out loud",
    kind: "speak",
  },
  {
    id: 34,
    unitId: 3,
    orderIndex: 4,
    title: "Survival Kannada - Unit Review",
    objective: "Mixed review of the whole unit",
    kind: "review",
  },
  {
    id: 41,
    unitId: 4,
    orderIndex: 1,
    title: "Order Something 1",
    objective: "Order one of anything",
    kind: "lesson",
  },
  {
    id: 42,
    unitId: 4,
    orderIndex: 2,
    title: "Order Something 2",
    objective: "Ask the price and say what you want",
    kind: "lesson",
  },
  {
    id: 43,
    unitId: 4,
    orderIndex: 3,
    title: "Order Something - Speak",
    objective: "Say every phrase out loud",
    kind: "speak",
  },
  {
    id: 44,
    unitId: 4,
    orderIndex: 4,
    title: "Order Something - Unit Review",
    objective: "Mixed review of the whole unit",
    kind: "review",
  },
  {
    id: 51,
    unitId: 5,
    orderIndex: 1,
    title: "Coffee and Tea 1",
    objective: "Coffee, tea and milk",
    kind: "lesson",
  },
  {
    id: 52,
    unitId: 5,
    orderIndex: 2,
    title: "Coffee and Tea 2",
    objective: "Sugar, hot and no sugar",
    kind: "lesson",
  },
  {
    id: 53,
    unitId: 5,
    orderIndex: 3,
    title: "Coffee and Tea - Speak",
    objective: "Say every phrase out loud",
    kind: "speak",
  },
  {
    id: 54,
    unitId: 5,
    orderIndex: 4,
    title: "Coffee and Tea - Unit Review",
    objective: "Mixed review of the whole unit",
    kind: "review",
  },
  {
    id: 61,
    unitId: 6,
    orderIndex: 1,
    title: "Restaurant Kannada 1",
    objective: "Meals and breakfast items",
    kind: "lesson",
  },
  {
    id: 62,
    unitId: 6,
    orderIndex: 2,
    title: "Restaurant Kannada 2",
    objective: "Taste, bill and one more",
    kind: "lesson",
  },
  {
    id: 63,
    unitId: 6,
    orderIndex: 3,
    title: "Restaurant Kannada - Speak",
    objective: "Say every phrase out loud",
    kind: "speak",
  },
  {
    id: 64,
    unitId: 6,
    orderIndex: 4,
    title: "Restaurant Kannada - Unit Review",
    objective: "Mixed review of the whole unit",
    kind: "review",
  },
  {
    id: 71,
    unitId: 7,
    orderIndex: 1,
    title: "Paying 1",
    objective: "Money, change and cards",
    kind: "lesson",
  },
  {
    id: 72,
    unitId: 7,
    orderIndex: 2,
    title: "Paying 2",
    objective: "Confirm the amount",
    kind: "lesson",
  },
  {
    id: 73,
    unitId: 7,
    orderIndex: 3,
    title: "Paying - Speak",
    objective: "Say every phrase out loud",
    kind: "speak",
  },
  {
    id: 74,
    unitId: 7,
    orderIndex: 4,
    title: "Paying - Unit Review",
    objective: "Mixed review of the whole unit",
    kind: "review",
  },
  {
    id: 81,
    unitId: 8,
    orderIndex: 1,
    title: "Autos 1",
    objective: "Get in and set the meter",
    kind: "lesson",
  },
  {
    id: 82,
    unitId: 8,
    orderIndex: 2,
    title: "Autos 2",
    objective: "Say where you are going and stop",
    kind: "lesson",
  },
  {
    id: 83,
    unitId: 8,
    orderIndex: 3,
    title: "Autos - Speak",
    objective: "Say every phrase out loud",
    kind: "speak",
  },
  {
    id: 84,
    unitId: 8,
    orderIndex: 4,
    title: "Autos - Unit Review",
    objective: "Mixed review of the whole unit",
    kind: "review",
  },
];

export const concepts: Concept[] = [
  {
    id: "namaskara",
    lessonId: 11,
    unitId: 1,
    orderIndex: 0,
    kannada: "ನಮಸ್ಕಾರ",
    transliteration: "namaskara",
    english: "hello",
    note: "The all-purpose Kannada greeting. Works morning to night.",
    kind: "word",
  },
  {
    id: "hegiddira",
    lessonId: 11,
    unitId: 1,
    orderIndex: 1,
    kannada: "ಹೇಗಿದ್ದೀರಾ?",
    transliteration: "hegiddira?",
    english: "how are you?",
    note: "Polite form. With friends say hegiddi?",
    kind: "word",
  },
  {
    id: "haudu",
    lessonId: 11,
    unitId: 1,
    orderIndex: 2,
    kannada: "ಹೌದು",
    transliteration: "haudu",
    english: "yes",
    note: "Say it with a small nod.",
    kind: "word",
  },
  {
    id: "illa",
    lessonId: 12,
    unitId: 1,
    orderIndex: 0,
    kannada: "ಇಲ್ಲ",
    transliteration: "illa",
    english: "no",
    note: "Also means there isn't any.",
    kind: "word",
  },
  {
    id: "dhanyavada",
    lessonId: 12,
    unitId: 1,
    orderIndex: 1,
    kannada: "ಧನ್ಯವಾದ",
    transliteration: "dhanyavada",
    english: "thank you",
    note: "Used constantly in shops and autos.",
    kind: "word",
  },
  {
    id: "sari",
    lessonId: 12,
    unitId: 1,
    orderIndex: 2,
    kannada: "ಸರಿ",
    transliteration: "sari",
    english: "okay",
    note: "The Kannada okay / correct.",
    kind: "word",
  },
  {
    id: "hesaru",
    lessonId: 21,
    unitId: 2,
    orderIndex: 0,
    kannada: "ಹೆಸರು",
    transliteration: "hesaru",
    english: "name",
    note: "Base word for name.",
    kind: "word",
  },
  {
    id: "nanna-hesaru",
    lessonId: 21,
    unitId: 2,
    orderIndex: 1,
    kannada: "ನನ್ನ ಹೆಸರು",
    transliteration: "nanna hesaru",
    english: "my name is",
    note: "Add your name after it.",
    kind: "phrase",
  },
  {
    id: "elli",
    lessonId: 21,
    unitId: 2,
    orderIndex: 2,
    kannada: "ಎಲ್ಲಿ",
    transliteration: "elli",
    english: "where",
    note: "Question word.",
    kind: "word",
  },
  {
    id: "inda",
    lessonId: 22,
    unitId: 2,
    orderIndex: 0,
    kannada: "ಇಂದ",
    transliteration: "inda",
    english: "from",
    note: "Attaches after a place name.",
    kind: "word",
  },
  {
    id: "vidyarthi",
    lessonId: 22,
    unitId: 2,
    orderIndex: 1,
    kannada: "ವಿದ್ಯಾರ್ಥಿ",
    transliteration: "vidyarthi",
    english: "student",
    note: "Useful all over campus.",
    kind: "word",
  },
  {
    id: "snehita",
    lessonId: 22,
    unitId: 2,
    orderIndex: 2,
    kannada: "ಸ್ನೇಹಿತ",
    transliteration: "snehita",
    english: "friend",
    note: "Female friend: snehite.",
    kind: "word",
  },
  {
    id: "artha-agalilla",
    lessonId: 31,
    unitId: 3,
    orderIndex: 0,
    kannada: "ನನಗೆ ಅರ್ಥ ಆಗಲಿಲ್ಲ",
    transliteration: "nanage artha agalilla",
    english: "I do not understand",
    note: "Your most important sentence.",
    kind: "phrase",
  },
  {
    id: "nidhanavagi-heli",
    lessonId: 31,
    unitId: 3,
    orderIndex: 1,
    kannada: "ನಿಧಾನವಾಗಿ ಹೇಳಿ",
    transliteration: "nidhanavagi heli",
    english: "please speak slowly",
    note: "nidhanavagi means slowly.",
    kind: "phrase",
  },
  {
    id: "innomme-heli",
    lessonId: 31,
    unitId: 3,
    orderIndex: 2,
    kannada: "ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ",
    transliteration: "innomme heli",
    english: "say it again",
    note: "innomme means once more.",
    kind: "phrase",
  },
  {
    id: "dayavittu",
    lessonId: 32,
    unitId: 3,
    orderIndex: 0,
    kannada: "ದಯವಿಟ್ಟು",
    transliteration: "dayavittu",
    english: "please",
    note: "Polite softener before a request.",
    kind: "word",
  },
  {
    id: "sahaya-madi",
    lessonId: 32,
    unitId: 3,
    orderIndex: 1,
    kannada: "ಸಹಾಯ ಮಾಡಿ",
    transliteration: "sahaya madi",
    english: "please help",
    note: "madi is the polite do.",
    kind: "phrase",
  },
  {
    id: "idu-enu",
    lessonId: 32,
    unitId: 3,
    orderIndex: 2,
    kannada: "ಇದು ಏನು?",
    transliteration: "idu enu?",
    english: "what is this?",
    note: "Point and ask.",
    kind: "phrase",
  },
  {
    id: "ondu",
    lessonId: 41,
    unitId: 4,
    orderIndex: 0,
    kannada: "ಒಂದು",
    transliteration: "ondu",
    english: "one",
    note: "Used before the item you want.",
    kind: "word",
  },
  {
    id: "kodi",
    lessonId: 41,
    unitId: 4,
    orderIndex: 1,
    kannada: "ಕೊಡಿ",
    transliteration: "kodi",
    english: "give",
    note: "Turns any noun into a polite order.",
    kind: "word",
  },
  {
    id: "ondu-kafi-kodi",
    lessonId: 41,
    unitId: 4,
    orderIndex: 2,
    kannada: "ಒಂದು ಕಾಫಿ ಕೊಡಿ",
    transliteration: "ondu kafi kodi",
    english: "give me one coffee",
    note: "The Bengaluru starter sentence.",
    kind: "phrase",
  },
  {
    id: "eshtu",
    lessonId: 42,
    unitId: 4,
    orderIndex: 0,
    kannada: "ಎಷ್ಟು?",
    transliteration: "eshtu?",
    english: "how much?",
    note: "The price question.",
    kind: "word",
  },
  {
    id: "niru",
    lessonId: 42,
    unitId: 4,
    orderIndex: 1,
    kannada: "ನೀರು",
    transliteration: "niru",
    english: "water",
    note: "Ask ondu niru kodi.",
    kind: "word",
  },
  {
    id: "beku",
    lessonId: 42,
    unitId: 4,
    orderIndex: 2,
    kannada: "ಬೇಕು",
    transliteration: "beku",
    english: "I want",
    note: "Opposite is beda, do not want.",
    kind: "word",
  },
  {
    id: "kafi",
    lessonId: 51,
    unitId: 5,
    orderIndex: 0,
    kannada: "ಕಾಫಿ",
    transliteration: "kafi",
    english: "coffee",
    note: "Filter coffee capital.",
    kind: "word",
  },
  {
    id: "ti",
    lessonId: 51,
    unitId: 5,
    orderIndex: 1,
    kannada: "ಟೀ",
    transliteration: "ti",
    english: "tea",
    note: "Also called chaha.",
    kind: "word",
  },
  {
    id: "halu",
    lessonId: 51,
    unitId: 5,
    orderIndex: 2,
    kannada: "ಹಾಲು",
    transliteration: "halu",
    english: "milk",
    note: "halu kafi is milk coffee.",
    kind: "word",
  },
  {
    id: "sakkare",
    lessonId: 52,
    unitId: 5,
    orderIndex: 0,
    kannada: "ಸಕ್ಕರೆ",
    transliteration: "sakkare",
    english: "sugar",
    note: "Say it before they pour.",
    kind: "word",
  },
  {
    id: "bisi",
    lessonId: 52,
    unitId: 5,
    orderIndex: 1,
    kannada: "ಬಿಸಿ",
    transliteration: "bisi",
    english: "hot",
    note: "bisi niru is hot water.",
    kind: "word",
  },
  {
    id: "sakkare-beda",
    lessonId: 52,
    unitId: 5,
    orderIndex: 2,
    kannada: "ಸಕ್ಕರೆ ಬೇಡ",
    transliteration: "sakkare beda",
    english: "no sugar",
    note: "beda means do not want.",
    kind: "phrase",
  },
  {
    id: "uta",
    lessonId: 61,
    unitId: 6,
    orderIndex: 0,
    kannada: "ಊಟ",
    transliteration: "uta",
    english: "meal",
    note: "uta agitha? means have you eaten?",
    kind: "word",
  },
  {
    id: "dose",
    lessonId: 61,
    unitId: 6,
    orderIndex: 1,
    kannada: "ದೋಸೆ",
    transliteration: "dose",
    english: "dosa",
    note: "Order ondu dose kodi.",
    kind: "word",
  },
  {
    id: "idli",
    lessonId: 61,
    unitId: 6,
    orderIndex: 2,
    kannada: "ಇಡ್ಲಿ",
    transliteration: "idli",
    english: "idli",
    note: "Breakfast staple.",
    kind: "word",
  },
  {
    id: "ruchi",
    lessonId: 62,
    unitId: 6,
    orderIndex: 0,
    kannada: "ರುಚಿ",
    transliteration: "ruchi",
    english: "taste",
    note: "tumba ruchi means very tasty.",
    kind: "word",
  },
  {
    id: "bill-kodi",
    lessonId: 62,
    unitId: 6,
    orderIndex: 1,
    kannada: "ಬಿಲ್ ಕೊಡಿ",
    transliteration: "bill kodi",
    english: "give me the bill",
    note: "End of the meal.",
    kind: "phrase",
  },
  {
    id: "innondu",
    lessonId: 62,
    unitId: 6,
    orderIndex: 2,
    kannada: "ಇನ್ನೊಂದು",
    transliteration: "innondu",
    english: "one more",
    note: "innondu kafi kodi.",
    kind: "word",
  },
  {
    id: "hana",
    lessonId: 71,
    unitId: 7,
    orderIndex: 0,
    kannada: "ಹಣ",
    transliteration: "hana",
    english: "money",
    note: "Cash in general.",
    kind: "word",
  },
  {
    id: "chillare",
    lessonId: 71,
    unitId: 7,
    orderIndex: 1,
    kannada: "ಚಿಲ್ಲರೆ",
    transliteration: "chillare",
    english: "change",
    note: "chillare illa means no change.",
    kind: "word",
  },
  {
    id: "card-nadeyutta",
    lessonId: 71,
    unitId: 7,
    orderIndex: 2,
    kannada: "ಕಾರ್ಡ್ ನಡೆಯುತ್ತಾ?",
    transliteration: "card nadeyutta?",
    english: "do you accept card?",
    note: "nadeyutta means does it work.",
    kind: "phrase",
  },
  {
    id: "eshtu-ayitu",
    lessonId: 72,
    unitId: 7,
    orderIndex: 0,
    kannada: "ಎಷ್ಟು ಆಯಿತು?",
    transliteration: "eshtu ayitu?",
    english: "how much was it?",
    note: "Ask at the counter.",
    kind: "phrase",
  },
  {
    id: "illi-kodi",
    lessonId: 72,
    unitId: 7,
    orderIndex: 1,
    kannada: "ಇಲ್ಲಿ ಕೊಡಿ",
    transliteration: "illi kodi",
    english: "give it here",
    note: "illi means here.",
    kind: "phrase",
  },
  {
    id: "sariyagide",
    lessonId: 72,
    unitId: 7,
    orderIndex: 2,
    kannada: "ಸರಿಯಾಗಿದೆ",
    transliteration: "sariyagide",
    english: "it is correct",
    note: "Confirm the amount.",
    kind: "word",
  },
  {
    id: "auto",
    lessonId: 81,
    unitId: 8,
    orderIndex: 0,
    kannada: "ಆಟೋ",
    transliteration: "auto",
    english: "auto rickshaw",
    note: "Say it exactly like that.",
    kind: "word",
  },
  {
    id: "ellige",
    lessonId: 81,
    unitId: 8,
    orderIndex: 1,
    kannada: "ಎಲ್ಲಿಗೆ?",
    transliteration: "ellige?",
    english: "where to?",
    note: "The driver asks this first.",
    kind: "word",
  },
  {
    id: "meter-haki",
    lessonId: 81,
    unitId: 8,
    orderIndex: 2,
    kannada: "ಮೀಟರ್ ಹಾಕಿ",
    transliteration: "meter haki",
    english: "put the meter on",
    note: "Confident and polite.",
    kind: "phrase",
  },
  {
    id: "illi-nillisi",
    lessonId: 82,
    unitId: 8,
    orderIndex: 0,
    kannada: "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ",
    transliteration: "illi nillisi",
    english: "stop here",
    note: "Use it as you arrive.",
    kind: "phrase",
  },
  {
    id: "hogabeku",
    lessonId: 82,
    unitId: 8,
    orderIndex: 1,
    kannada: "ಹೋಗಬೇಕು",
    transliteration: "hogabeku",
    english: "I need to go",
    note: "Majestic-ge hogabeku.",
    kind: "word",
  },
  {
    id: "eshtu-aguttade",
    lessonId: 82,
    unitId: 8,
    orderIndex: 2,
    kannada: "ಎಷ್ಟು ಆಗುತ್ತದೆ?",
    transliteration: "eshtu aguttade?",
    english: "how much will it be?",
    note: "Ask before getting in.",
    kind: "phrase",
  },
];

// ---------- Selectors ----------

const bySectionOrder = (a: { orderIndex: number }, b: { orderIndex: number }) =>
  a.orderIndex - b.orderIndex;

export function getSection(id: number): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function getUnit(id: number): Unit | undefined {
  return units.find((u) => u.id === id);
}

export function getLesson(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function unitsForSection(sectionId: number): Unit[] {
  return units.filter((u) => u.sectionId === sectionId).sort(bySectionOrder);
}

export function lessonsForUnit(unitId: number): Lesson[] {
  return lessons.filter((l) => l.unitId === unitId).sort(bySectionOrder);
}

/** Concepts directly attached to a lesson (empty for speak/review lessons). */
export function conceptsForLesson(lessonId: number): Concept[] {
  return concepts.filter((c) => c.lessonId === lessonId).sort(bySectionOrder);
}

export function conceptsForUnit(unitId: number): Concept[] {
  return concepts
    .filter((c) => c.unitId === unitId)
    .sort((a, b) => {
      if (a.lessonId !== b.lessonId) return a.lessonId - b.lessonId;
      return a.orderIndex - b.orderIndex;
    });
}

export function getConcept(id: string): Concept | undefined {
  return concepts.find((c) => c.id === id);
}

/**
 * The concepts a lesson teaches or exercises. Content lessons use their own
 * concepts; speak/review lessons pull from the whole unit.
 */
export function lessonConcepts(lesson: Lesson): Concept[] {
  const own = conceptsForLesson(lesson.id);
  if (own.length > 0) return own;
  return conceptsForUnit(lesson.unitId);
}

/** All lessons in play order (unit order, then lesson order). */
export function orderedLessons(): Lesson[] {
  return [...lessons].sort((a, b) => {
    const ua = getUnit(a.unitId)?.orderIndex ?? 0;
    const ub = getUnit(b.unitId)?.orderIndex ?? 0;
    if (ua !== ub) return ua - ub;
    return a.orderIndex - b.orderIndex;
  });
}

/** Every lesson that has playable content (all available units are seeded). */
export function playableLessons(): Lesson[] {
  return orderedLessons().filter((l) => getUnit(l.unitId)?.isAvailable);
}
