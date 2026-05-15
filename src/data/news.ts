export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  category: "Breaking" | "Profi" | "Lokal" | "Equipment" | "Interview";
  image: string;
  heroImage: string;
  author: string;
  authorAvatar: string;
  date: string;
  dateLabel: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const img = (slug: string) => `/img/news/${slug}.jpg`;
const playerAvatar = (slug: string) => `/img/players/${slug}.jpg`;

export const news: NewsArticle[] = [
  {
    id: 1,
    slug: "van-gerwen-gewinnt-grand-slam",
    title: "Van Gerwen sichert sich Grand Slam Titel",
    category: "Breaking",
    image: img("van-gerwen-gewinnt-grand-slam"),
    heroImage: img("van-gerwen-gewinnt-grand-slam"),
    author: "Sarah Becker",
    authorAvatar: playerAvatar("sarah-weber"),
    date: "2026-05-08",
    dateLabel: "vor 3 Tagen",
    readTime: "4 Min Lesezeit",
    excerpt: "Michael van Gerwen hat beim Grand Slam of Darts seinen siebten Major-Titel der Saison gewonnen.",
    content: "Michael van Gerwen krönt sich mit einem 16:10 Sieg gegen Peter Wright zum Grand Slam Champion. Es war ein hochklassiges Finale, das die Zuschauer von Anfang an in seinen Bann zog. Der niederländische Dart-Star zeigte erneut, warum er als einer der besten Spieler aller Zeiten gilt.\n\nMit einem Average von 105.4 und 12 Doppel-Checkouts dominierte van Gerwen weite Teile des Spiels. Peter Wright konnte zwar zwischenzeitlich aufholen, doch im entscheidenden Moment war 'Mighty Mike' nicht zu stoppen.",
    tags: ["Grand Slam", "Van Gerwen", "Wright", "Final"],
  },
  {
    id: 2,
    slug: "max-hopp-startet-trainingscamp",
    title: "Max Hopp startet eigenes Trainingscamp",
    category: "Profi",
    image: img("max-hopp-startet-trainingscamp"),
    heroImage: img("max-hopp-startet-trainingscamp"),
    author: "Thomas Müller",
    authorAvatar: playerAvatar("max-hopp"),
    date: "2026-05-05",
    dateLabel: "vor 6 Tagen",
    readTime: "6 Min Lesezeit",
    excerpt: "Der deutsche Dart-Star Max Hopp eröffnet sein eigenes Trainingscamp in Heiligenroth und bietet exklusive Workshops für ambitionierte Spieler.",
    content: "Max Hopp eröffnet in Heiligenroth sein eigenes Trainingscamp. Im hochmodernen Icon Media Room mit 5 Wettkampf-Boards, Lichtringen und automatischem Zählsystem bietet er ab sofort exklusive Workshops für ambitionierte Hobbyspieler und aufstrebende Profis an.\n\n'Es ist mein Herzensprojekt', so Hopp. 'Ich möchte die nächste Generation deutscher Dartspieler fördern und das Niveau in unserem Land auf ein neues Level heben.'",
    tags: ["Max Hopp", "Training", "Heiligenroth"],
  },
  {
    id: 3,
    slug: "malle-pally-2026-vorschau",
    title: "Malle Pally 2026 – die Amateur-WM steht bevor",
    category: "Profi",
    image: img("malle-pally-2026-vorschau"),
    heroImage: img("malle-pally-2026-vorschau"),
    author: "Lisa König",
    authorAvatar: playerAvatar("lisa-koenig"),
    date: "2026-05-02",
    dateLabel: "vor 9 Tagen",
    readTime: "8 Min Lesezeit",
    excerpt: "200 Spieler, exklusive Special Guests und Partyatmosphäre pur: Das erwartet die Teilnehmer beim Malle Pally 2026.",
    content: "Im Oktober 2026 ist es soweit: Das größte Amateur-Dart-Event Europas, das Malle Pally, kehrt zurück in den legendären Bierkönig auf Mallorca. 200 Spieler aus ganz Europa kämpfen um die Krone und ein Preisgeld von 200.000 €.\n\nNeben dem sportlichen Wettkampf erwartet die Teilnehmer eine unvergessliche Partyatmosphäre mit Live-Musik, Special Guests und einer Bühnen-Show, die ihresgleichen sucht.",
    tags: ["Malle Pally", "Bierkönig", "Amateur-WM"],
  },
  {
    id: 4,
    slug: "neue-darts-kollektion",
    title: "Icon launcht neue Performance-Kollektion",
    category: "Equipment",
    image: img("neue-darts-kollektion"),
    heroImage: img("neue-darts-kollektion"),
    author: "Marco Schulz",
    authorAvatar: playerAvatar("david-bauer"),
    date: "2026-04-28",
    dateLabel: "vor 13 Tagen",
    readTime: "5 Min Lesezeit",
    excerpt: "Die neue Icon Performance-Kollektion ist da: Wettkampf-Darts und Premium-Apparel im modernen Design.",
    content: "Mit der neuen Performance-Kollektion setzt THE ICON DARTS neue Maßstäbe. Die Wettkampf-Darts aus 95% Tungsten wurden in Zusammenarbeit mit Max Hopp entwickelt und garantieren Präzision auf höchstem Niveau.\n\nErgänzt wird die Kollektion durch atmungsaktive Performance-Polos, funktionale Hoodies und stylische Caps – alles im Icon Design.",
    tags: ["Equipment", "Launch", "Icon"],
  },
  {
    id: 5,
    slug: "interview-maximilian-mueller",
    title: "Interview: Maximilian Müller über seinen Aufstieg",
    category: "Interview",
    image: img("interview-maximilian-mueller"),
    heroImage: img("interview-maximilian-mueller"),
    author: "Anna Richter",
    authorAvatar: playerAvatar("lisa-koenig"),
    date: "2026-04-25",
    dateLabel: "vor 16 Tagen",
    readTime: "10 Min Lesezeit",
    excerpt: "Vom Hobbyspieler in die A-Klasse: Maximilian Müller spricht über seinen rasanten Aufstieg im deutschen Dartsport.",
    content: "Maximilian Müller ist der Shootingstar der deutschen A-Klasse. Im Interview spricht er über Training, Druck und seine Ziele für die kommende Saison.\n\n'Ich war drei Jahre lang reiner Hobbyspieler, bis ich gemerkt habe, dass mehr in mir steckt. Das Icon Ökosystem hat mir die Tür zur professionellen Dart-Welt geöffnet.'",
    tags: ["Interview", "Müller", "A-Klasse"],
  },
  {
    id: 6,
    slug: "ki-scorer-update",
    title: "KI-Scorer 2.0: Noch präziseres Tracking via Smartphone",
    category: "Equipment",
    image: img("ki-scorer-update"),
    heroImage: img("ki-scorer-update"),
    author: "Daniel Hoffmann",
    authorAvatar: playerAvatar("gabriel-clemens"),
    date: "2026-04-20",
    dateLabel: "vor 21 Tagen",
    readTime: "7 Min Lesezeit",
    excerpt: "Das Icon Team präsentiert das große KI-Scorer Update mit verbesserter Treffer-Erkennung.",
    content: "Mit dem KI-Scorer 2.0 hebt THE ICON DARTS das automatische Zählen auf ein neues Level. Die neue Version erkennt Treffer mit einer Präzision von über 99% – ganz ohne teure Hardware oder spezielle Boards.\n\nEinfach das Smartphone aufstellen, App starten und losspielen. Der KI-Scorer übernimmt die Zählung in Echtzeit.",
    tags: ["KI-Scorer", "Update", "App"],
  },
];

export const getNewsBySlug = (slug: string) => news.find((n) => n.slug === slug);
