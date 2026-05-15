export interface Stream {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  isLive: boolean;
  viewerCount?: string;
  duration?: string;
  views?: string;
  category: "live" | "ondemand" | "creator" | "highlights";
  player1?: { name: string; score: number; avatar: string };
  player2?: { name: string; score: number; avatar: string };
  scheduledFor?: string;
}

const img = (slug: string) => `/img/streams/${slug}.jpg`;
const playerAvatar = (slug: string) => `/img/players/${slug}.jpg`;

export const streams: Stream[] = [
  {
    id: 1,
    slug: "german-darts-open-finale",
    title: "German Darts Open – Finale",
    subtitle: "Michael van Gerwen vs Peter Wright",
    thumbnail: img("german-darts-open-finale"),
    isLive: true,
    viewerCount: "12.5K",
    category: "live",
    player1: {
      name: "Michael van Gerwen",
      score: 19,
      avatar: playerAvatar("michael-van-gerwen"),
    },
    player2: {
      name: "Peter Wright",
      score: 25,
      avatar: playerAvatar("peter-wright"),
    },
  },
  {
    id: 2,
    slug: "icon-darts-championship-halbfinale",
    title: "Icon Championship – Halbfinale",
    subtitle: "Max Hopp vs Gabriel Clemens",
    thumbnail: img("icon-darts-championship-halbfinale"),
    isLive: true,
    viewerCount: "8.2K",
    category: "live",
    player1: {
      name: "Max Hopp",
      score: 12,
      avatar: playerAvatar("max-hopp"),
    },
    player2: {
      name: "Gabriel Clemens",
      score: 14,
      avatar: playerAvatar("gabriel-clemens"),
    },
  },
  {
    id: 3,
    slug: "highlights-world-championship-2025",
    title: "Highlights: World Championship 2025",
    subtitle: "Die besten Würfe und Momente",
    thumbnail: img("highlights-world-championship-2025"),
    isLive: false,
    duration: "15:30",
    views: "152K",
    category: "highlights",
  },
  {
    id: 4,
    slug: "creator-content-best-tricks",
    title: "Creator-Content: Best Tricks",
    subtitle: "Verrückte Tricks von Fionntime",
    thumbnail: img("creator-content-best-tricks"),
    isLive: false,
    duration: "08:45",
    views: "89K",
    category: "creator",
  },
  {
    id: 5,
    slug: "match-highlights-malle-pally",
    title: "Match Highlights: Malle Pally 2025",
    subtitle: "Die spektakulärsten Momente",
    thumbnail: img("match-highlights-malle-pally"),
    isLive: false,
    duration: "22:18",
    views: "245K",
    category: "highlights",
  },
  {
    id: 6,
    slug: "max-hopp-training-session",
    title: "Max Hopp: Training Session",
    subtitle: "Exklusiver Einblick ins Profi-Training",
    thumbnail: img("max-hopp-training-session"),
    isLive: false,
    duration: "18:05",
    views: "67K",
    category: "creator",
  },
  {
    id: 7,
    slug: "ndl-finale-2026",
    title: "NDL Finale 2026",
    subtitle: "Amateur-Stars im Showdown",
    thumbnail: img("ndl-finale-2026"),
    isLive: false,
    duration: "01:24:33",
    views: "34K",
    category: "ondemand",
  },
  {
    id: 8,
    slug: "premier-league-match-day-5",
    title: "Premier League Match Day 5",
    subtitle: "Alle Spiele in voller Länge",
    thumbnail: img("premier-league-match-day-5"),
    isLive: false,
    duration: "02:15:00",
    views: "98K",
    category: "ondemand",
  },
];

export const getStreamBySlug = (slug: string) => streams.find((s) => s.slug === slug);
