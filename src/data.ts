import { Therapist, TherapistStatus, Service, Review } from "./types";

export const CATEGORIES = [
  "Lava Clamshell Massage",
  "Spa Highlights",
  "Leisure Packages",
  "Single Massage",
  "Couple Massage",
  "Combination Packages",
  "VIP Signature Services",
  "30-Minute Combo Treatments"
];

export const ABU_DHABI_AREAS = [
  "Al Zahiyah (Tourist Club Area)",
  "Al Khalidiyah",
  "Al Reem Island",
  "Al Maryah Island",
  "Saadiyat Island",
  "Yas Island",
  "Al Bateen",
  "Al Mushrif",
  "Al Muroor",
  "Mohammed Bin Zayed City",
  "Khalifa City",
  "Yasmeen & Al Raha Beach"
];

export const INITIAL_THERAPISTS: Therapist[] = [
  {
    id: "therapist-1",
    name: "Mary",
    nationality: "Filipino",
    specialties: ["Lava Clamshell Treatment", "Relaxation Massage", "VIP Signature Services"],
    rating: 4.9,
    reviewsCount: 184,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    status: TherapistStatus.AVAILABLE_NOW,
    bio: "Mary is a master of deep-tissue heat therapies and the legendary Lava Clamshell massage. Highly requested for her calming aura."
  },
  {
    id: "therapist-2",
    name: "Wahidah",
    nationality: "Indonesian",
    specialties: ["Single Massage", "Couple Massage", "Spa Highlights", "Traditional Balinese"],
    rating: 4.8,
    reviewsCount: 142,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    status: TherapistStatus.UNAVAILABLE,
    nextAvailableTime: "Today 6:30 PM",
    bio: "Wahidah specializes in authentic Indonesian Balinese strokes that improve circulation and alleviate severe muscular fatigue."
  },
  {
    id: "therapist-3",
    name: "Jackey",
    nationality: "Thai",
    specialties: ["Lymphatic Drainage Massage", "Combination Packages", "Traditional Thai stretching"],
    rating: 4.9,
    reviewsCount: 198,
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150",
    status: TherapistStatus.AVAILABLE_NOW,
    bio: "Jackey blends rhythmic compression and acupressure to detoxify and release myofascial tightness. Expert in combination packages."
  },
  {
    id: "therapist-4",
    name: "Smile",
    nationality: "Vietnamese",
    specialties: ["Anti-Cellulite Maderotherapy", "VIP Signature Services", "30-Minute Combo Treatments"],
    rating: 4.9,
    reviewsCount: 130,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    status: TherapistStatus.UNAVAILABLE,
    nextAvailableTime: "Tomorrow 10:00 AM",
    bio: "Smile is famous for her rejuvenating wooden roller techniques (Maderotherapy) and custom fast-acting tension combos."
  }
];

export const SERVICES: Service[] = [
  // Lava Clamshell Massage
  {
    id: "srv-1",
    name: "Lava Clamshell Treatment Massage",
    duration: 90,
    price: 350,
    category: "Lava Clamshell Massage",
    description: "Our signature treatment using heated natural clamshells and organic aromatherapy oils. Melts muscle tension and deeply relaxes mind and body.",
    popular: true
  },
  {
    id: "srv-1b",
    name: "Lava Clamshell Premium Session",
    duration: 120,
    price: 450,
    category: "Lava Clamshell Massage",
    description: "Extended clamshell therapy combined with focused head-and-foot reflexology.",
  },
  // Spa Highlights
  {
    id: "srv-2",
    name: "Lymphatic Drainage Detox Massage",
    duration: 75,
    price: 290,
    category: "Spa Highlights",
    description: "Gentle, rhythmic massage technique that stimulates lymph flow, helps body detoxification, reduces swelling, and boosts immune health.",
    popular: true
  },
  {
    id: "srv-3",
    name: "Anti-Cellulite Maderotherapy",
    duration: 60,
    price: 280,
    category: "Spa Highlights",
    description: "A highly effective body-contouring treatment using custom anatomical wooden rollers to break down stubborn cellulite and improve lymphatic fluid flows."
  },
  // Leisure Packages
  {
    id: "srv-4",
    name: "Serene Leisure Retreat",
    duration: 100,
    price: 390,
    category: "Leisure Packages",
    description: "Combination of full-body Swedish massage, hot stone back treatment, and deep facial hydration for complete distress."
  },
  // Single Massage
  {
    id: "srv-5",
    name: "Classic Relaxation Swedish Massage",
    duration: 60,
    price: 200,
    category: "Single Massage",
    description: "Long, flowing strokes designed to relax the entire body, improve circulation, and relieve general daily pressures.",
    popular: true
  },
  {
    id: "srv-6",
    name: "Classic Relaxation Swedish Massage (Extended)",
    duration: 90,
    price: 270,
    category: "Single Massage",
    description: "Deep relaxation journey covering all muscle groups with extra care on shoulders, neck, and lower back."
  },
  {
    id: "srv-7",
    name: "Deep Tissue & Sports Recovery Massage",
    duration: 75,
    price: 260,
    category: "Single Massage",
    description: "Intense pressure targeting the deepest layers of muscle tissue and fascia. Ideal for active lifestyles or chronic tension.",
  },
  // Couple Massage
  {
    id: "srv-8",
    name: "Luxury Couple Royal Home Spa",
    duration: 90,
    price: 520,
    category: "Couple Massage",
    description: "Double relaxation journey with two dedicated therapists arriving together at your home. Includes custom aromatherapy and premium massage kits.",
    popular: true
  },
  {
    id: "srv-9",
    name: "Unwind Couple Clamshell Massage",
    duration: 90,
    price: 650,
    category: "Couple Massage",
    description: "A gorgeous, synchrony-rich heated lava clamshell massage for two people. Experience deep peace together."
  },
  // Combination Packages
  {
    id: "srv-10",
    name: "Signature Combination Massage",
    duration: 90,
    price: 320,
    category: "Combination Packages",
    description: "A specialized blend of traditional Thai stretching, Balinese pressure, and European Swedish strokes for custom relief."
  },
  // VIP Signature Services
  {
    id: "srv-11",
    name: "Innovative Elite 4-Hand Massage",
    duration: 75,
    price: 490,
    category: "VIP Signature Services",
    description: "The ultimate luxury treatment. Two expert therapists coordinate in perfect unison to deliver a hypnotic, incredibly relaxing session.",
    popular: true
  },
  // 30-Minute Combo Treatments
  {
    id: "srv-12",
    name: "Quick Tension Release (Neck & Back)",
    duration: 30,
    price: 130,
    category: "30-Minute Combo Treatments",
    description: "Targeted deep therapy to quickly untangle tight knots in your neck, shoulders, and lower back."
  },
  {
    id: "srv-13",
    name: "Revitalizing Foot Reflexology",
    duration: 30,
    price: 120,
    category: "30-Minute Combo Treatments",
    description: "Stimulates acupressure zones on the soles of your feet to reset energy levels and calm the nervous system."
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Fatima Al Mansoori",
    rating: 5,
    date: "2026-05-20",
    comment: "The Lava Clamshell treatment with Mary was extraordinary. She brought absolute bliss to my living room in Al Khalidiyah! Highly elegant setup and very professional.",
    treatment: "Lava Clamshell Treatment Massage",
    verified: true
  },
  {
    id: "rev-2",
    author: "Elena Petrova",
    rating: 5,
    date: "2026-05-18",
    comment: "Excellent service on Reem Island! Jackey has amazing skills. Extremely convenient home service, they bring a high-quality massage table, beautiful soft towels, and beautiful calming music.",
    treatment: "Lymphatic Drainage Detox Massage",
    verified: true
  },
  {
    id: "rev-3",
    author: "Zayed Al Nahyan",
    rating: 5,
    date: "2026-05-15",
    comment: "Beautiful couples session for my anniversary. The therapists Wahidah and Mary were incredibly respectful, masked, and arrived exactly on time. Highly recommended.",
    treatment: "Luxury Couple Royal Home Spa",
    verified: true
  },
  {
    id: "rev-4",
    author: "Sarah Smith",
    rating: 4,
    date: "2026-05-10",
    comment: "Smile’s Maderotherapy is very effective. You can feel the cellulite fading in real-time. It’s a bit intense, but totally worth it. App payment is neat!",
    treatment: "Anti-Cellulite Maderotherapy",
    verified: true
  },
  {
    id: "rev-5",
    author: "Amna Salem",
    rating: 5,
    date: "2026-05-02",
    comment: "I order Jackey for immediate service yesterday using the Available Now button. She arrived in 40 minutes at my door in Tourist Club Area. Exceptional massage, very dynamic!",
    treatment: "Quick Tension Release (Neck & Back)",
    verified: true
  }
];
