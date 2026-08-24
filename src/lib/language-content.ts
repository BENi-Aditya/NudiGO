export interface Lesson {
  id: string;
  title: string;
  description: string;
  phrases: Phrase[];
}

export interface Phrase {
  kannada?: string;
  kashmiri?: string;
  transliteration: string;
  english: string;
  context?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  scenario: string;
  objectives: string[];
  language: "kannada" | "kashmiri";
}

// KANNADA LESSONS
export const kannadaLessons: Lesson[] = [
  {
    id: "kannada-1",
    title: "Greetings & Introductions",
    description: "Learn how to greet people and introduce yourself like a local",
    phrases: [
      {
        kannada: "ನಮಸ್ಕಾರ",
        transliteration: "Namaskara",
        english: "Hello/Greeting",
        context: "Respectful greeting for anyone"
      },
      {
        kannada: "ನೀವು ಹೇಗಿದ್ದೀರಿ?",
        transliteration: "Neevu hegiddiri?",
        english: "How are you?",
        context: "Formal way to ask someone's wellbeing"
      },
      {
        kannada: "ನನ್ನ ಹೆಸರು...",
        transliteration: "Nanna hesaru...",
        english: "My name is...",
        context: "Introducing yourself"
      },
      {
        kannada: "ನೀವು ಎಲ್ಲಿಂದ?",
        transliteration: "Neevu ellinda?",
        english: "Where are you from?",
        context: "Asking someone's origin"
      }
    ]
  },
  {
    id: "kannada-2",
    title: "Ordering Food & Drinks",
    description: "Master the art of ordering at a local café or restaurant",
    phrases: [
      {
        kannada: "ಒಂದು ಕಾಪಿ ಕೊಡಿ",
        transliteration: "Ondu kapi kodi",
        english: "Give me one coffee",
        context: "Ordering coffee at a café"
      },
      {
        kannada: "ಫಿಲ್ಟರ್ ಕಾಫಿ",
        transliteration: "Filter kapi",
        english: "Filter coffee",
        context: "The traditional Bengaluru coffee"
      },
      {
        kannada: "ಮಾವಿನ ಜೂಸ್",
        transliteration: "Maavina juice",
        english: "Mango juice",
        context: "Fresh juice order"
      },
      {
        kannada: "ಎಷ್ಟು ಬೆಲೆ?",
        transliteration: "Eshtu bele?",
        english: "How much does it cost?",
        context: "Asking for price"
      }
    ]
  },
  {
    id: "kannada-3",
    title: "Auto & Transportation",
    description: "Navigate the world of auto rickshaws like a pro",
    phrases: [
      {
        kannada: "ಮೀಟರ್ ಹಾಕಿ",
        transliteration: "Meter haki",
        english: "Turn on the meter",
        context: "Standard auto request"
      },
      {
        kannada: "ಈ ಜಾಗಕ್ಕೆ ಹೋಗಿ",
        transliteration: "Ee jagakke hogi",
        english: "Go to this place",
        context: "Directing auto driver"
      },
      {
        kannada: "ಎಷ್ಟು ದೂರ?",
        transliteration: "Eshtu dur?",
        english: "How far?",
        context: "Asking distance"
      },
      {
        kannada: "ಸರಿ, ಸರಿ",
        transliteration: "Sari, sari",
        english: "Okay, okay",
        context: "Casual agreement"
      }
    ]
  },
  {
    id: "kannada-4",
    title: "Shopping & Markets",
    description: "Shop confidently at local markets and shops",
    phrases: [
      {
        kannada: "ಇದು ಚೆನ್ನಾಗಿದೆ",
        transliteration: "Idu chengagide",
        english: "This is good",
        context: "Approving something"
      },
      {
        kannada: "ಬೆಲೆ ಕಮ್ಮಾ ಹೈತಿ",
        transliteration: "Bele kamma haiti",
        english: "Reduce the price",
        context: "Negotiating price"
      },
      {
        kannada: "ಚೆಕ್ಕು ಕೊಡಿ",
        transliteration: "Chekku kodi",
        english: "Give me the bill",
        context: "Asking for receipt"
      }
    ]
  },
  {
    id: "kannada-5",
    title: "Household & Family",
    description: "Everyday family conversations",
    phrases: [
      {
        kannada: "ಹೊತ್ತಿನ ಆಹಾರ ತಿಂದಿರಿ?",
        transliteration: "Hotting ahar tindiri?",
        english: "Did you eat lunch?",
        context: "Casual family question"
      },
      {
        kannada: "ನನ್ನೊಂದಿಗೆ ಬನ್ನಿ",
        transliteration: "Nannondig banni",
        english: "Come with me",
        context: "Inviting someone"
      },
      {
        kannada: "ಧನ್ಯವಾದ",
        transliteration: "Dhanyavad",
        english: "Thank you",
        context: "Gratitude"
      }
    ]
  }
];

// KASHMIRI LESSONS
export const kashmiriLessons: Lesson[] = [
  {
    id: "kashmiri-1",
    title: "Greetings & Family Welcome",
    description: "Learn greetings and how to address family members respectfully",
    phrases: [
      {
        kashmiri: "السلام علیکم",
        transliteration: "Assalamu alaikum",
        english: "Peace be upon you (Hello)",
        context: "Traditional Islamic greeting, very common in Kashmir"
      },
      {
        kashmiri: "خوش آمدید",
        transliteration: "Khush amdid",
        english: "Welcome",
        context: "Welcoming someone to your home"
      },
      {
        kashmiri: "میرا نام ہے",
        transliteration: "Mera naam hai",
        english: "My name is",
        context: "Introducing yourself"
      },
      {
        kashmiri: "آپ کیسے ہیں؟",
        transliteration: "Aap kaise hain?",
        english: "How are you?",
        context: "Polite inquiry about wellbeing"
      },
      {
        kashmiri: "بہن",
        transliteration: "Behen",
        english: "Sister",
        context: "Respectful way to address women"
      },
      {
        kashmiri: "بھیا",
        transliteration: "Bhiya",
        english: "Brother",
        context: "Respectful way to address men"
      }
    ]
  },
  {
    id: "kashmiri-2",
    title: "Wazwan & Kashmiri Food",
    description: "Master the names of traditional Kashmiri dishes and food culture",
    phrases: [
      {
        kashmiri: "وازوان",
        transliteration: "Wazwan",
        english: "Traditional feast",
        context: "Traditional multi-course Kashmiri meal"
      },
      {
        kashmiri: "رستہ",
        transliteration: "Rista",
        english: "Meatballs in gravy",
        context: "Famous Kashmiri dish"
      },
      {
        kashmiri: "گوشتابہ",
        transliteration: "Goshtaba",
        english: "Minced meat balls",
        context: "Signature Kashmiri meatball"
      },
      {
        kashmiri: "چائے کریم",
        transliteration: "Chai Karem",
        english: "Salted tea",
        context: "Traditional Kashmiri pink tea"
      },
      {
        kashmiri: "فیرن",
        transliteration: "Feran",
        english: "Long traditional robe",
        context: "Traditional Kashmiri dress (what your spouse might wear)"
      },
      {
        kashmiri: "یہ بہت اچھا ہے",
        transliteration: "Yeh bahut acha hai",
        english: "This is very good",
        context: "Complimenting the food"
      }
    ]
  },
  {
    id: "kashmiri-3",
    title: "Daily Home Life",
    description: "Everyday household phrases and family interactions",
    phrases: [
      {
        kashmiri: "صبح کو کھانا کھایا؟",
        transliteration: "Subah ko khana khaya?",
        english: "Did you eat breakfast?",
        context: "Common family question"
      },
      {
        kashmiri: "مجھ سے محبت کرو",
        transliteration: "Mujhse mohabbat karo",
        english: "Love me",
        context: "Affectionate request to spouse/family"
      },
      {
        kashmiri: "ٹھیک ہے",
        transliteration: "Theek hai",
        english: "Okay/Alright",
        context: "Agreement"
      },
      {
        kashmiri: "شکریہ",
        transliteration: "Shukriya",
        english: "Thank you",
        context: "Gratitude"
      },
      {
        kashmiri: "معافی دیں",
        transliteration: "Maafi den",
        english: "I'm sorry",
        context: "Apology"
      }
    ]
  },
  {
    id: "kashmiri-4",
    title: "Shopping & Markets",
    description: "Navigate Kashmiri bazaars and markets",
    phrases: [
      {
        kashmiri: "یہ کتنے میں ہے؟",
        transliteration: "Yeh kitne mein hai?",
        english: "How much is this?",
        context: "Asking for price"
      },
      {
        kashmiri: "کیا یہ سست کر سکتے ہیں؟",
        transliteration: "Kya yeh sust kar sakte hain?",
        english: "Can you reduce the price?",
        context: "Negotiating"
      },
      {
        kashmiri: "کشمیری شال",
        transliteration: "Kashmiri Shawl",
        english: "Kashmiri shawl",
        context: "Famous Kashmiri craft"
      },
      {
        kashmiri: "بھری دوپٹہ",
        transliteration: "Bhari dupata",
        english: "Embroidered scarf",
        context: "Traditional female accessory"
      }
    ]
  },
  {
    id: "kashmiri-5",
    title: "Customs & Respect",
    description: "Important cultural customs and respectful behavior",
    phrases: [
      {
        kashmiri: "درود و سلام",
        transliteration: "Darood o Salam",
        english: "Blessings and peace",
        context: "Religious greeting"
      },
      {
        kashmiri: "مہمانی کا خیال رکھیں",
        transliteration: "Mehemani ka khyal rakhen",
        english: "Take care of guests",
        context: "Kashmiri tradition of hospitality"
      },
      {
        kashmiri: "خاندان پہلے",
        transliteration: "Khandaan pehle",
        english: "Family first",
        context: "Core Kashmiri value"
      },
      {
        kashmiri: "بزرگوں کا احترام کریں",
        transliteration: "Buzurgo ka ehteraam karen",
        english: "Respect elders",
        context: "Important cultural value"
      }
    ]
  }
];

// KASHMIRI MISSIONS
export const kashmiriMissions: Mission[] = [
  {
    id: "kashmiri-mission-1",
    title: "Welcome Your Spouse's Family",
    description: "Greet your Kashmiri spouse's parents with respect and warmth",
    scenario: "Your spouse's parents are visiting. You need to greet them properly and make them feel welcome.",
    objectives: [
      "Use proper Islamic greetings",
      "Address them respectfully (Bhiya/Behen)",
      "Ask how they are",
      "Invite them for tea"
    ],
    language: "kashmiri"
  },
  {
    id: "kashmiri-mission-2",
    title: "Order at a Wazwan Feast",
    description: "Navigate a traditional Kashmiri feast and order food politely",
    scenario: "You're at a family gathering where traditional Wazwan is being served. You need to ask about dishes and express your appreciation.",
    objectives: [
      "Ask what each dish is",
      "Compliment the food",
      "Ask for more (if you like it)",
      "Thank the host"
    ],
    language: "kashmiri"
  },
  {
    id: "kashmiri-mission-3",
    title: "Shop for Kashmiri Crafts",
    description: "Buy traditional Kashmiri items at a local bazaar",
    scenario: "You're in a Kashmiri market buying souvenirs and gifts. You need to negotiate and ask about authentic items.",
    objectives: [
      "Ask prices in Kashmiri",
      "Negotiate respectfully",
      "Ask about authenticity",
      "Complete the purchase politely"
    ],
    language: "kashmiri"
  },
  {
    id: "kashmiri-mission-4",
    title: "Family Dinner Conversation",
    description: "Have a comfortable conversation with your spouse during family dinner",
    scenario: "It's dinner time with your spouse and extended family. You need to participate in natural conversation.",
    objectives: [
      "Ask about their day",
      "Discuss food and compliment it",
      "Show interest in family stories",
      "Express your feelings"
    ],
    language: "kashmiri"
  },
  {
    id: "kashmiri-mission-5",
    title: "Navigate a Local Festival",
    description: "Participate in a Kashmiri cultural celebration",
    scenario: "A local festival is happening. You want to understand what's going on and participate respectfully.",
    objectives: [
      "Ask about festival traditions",
      "Participate in greetings",
      "Compliment traditional dress",
      "Show genuine interest"
    ],
    language: "kashmiri"
  }
];
