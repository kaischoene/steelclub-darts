export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: "equipment" | "mode" | "merchandise";
  maxHoppRecommended: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  inStock: boolean;
}

const img = (slug: string) => `/img/products/${slug}.jpg`;

export const products: Product[] = [
  {
    id: 1,
    slug: "icon-darts-signature",
    name: "ICON DARTS Signature Set",
    price: 119.95,
    image: img("icon-darts-signature"),
    images: [img("icon-darts-signature")],
    category: "equipment",
    maxHoppRecommended: true,
    rating: 4.9,
    reviewCount: 412,
    description: "Das offizielle ICON DARTS Signature Set. Drei Premium Steel-Tip Darts mit lila-schwarzen Custom Flights und gravierten Barrels. Entwickelt für ambitionierte Spieler.",
    features: ["95% Tungsten", "24g Wettkampf-Gewicht", "Custom Purple Flights", "Premium Black Shafts", "Inkl. Transport-Case"],
    inStock: true,
  },
  {
    id: 2,
    slug: "icon-dartboard",
    name: "ICON DARTS Pro Board",
    price: 89.95,
    image: img("icon-dartboard"),
    images: [img("icon-dartboard")],
    category: "equipment",
    maxHoppRecommended: true,
    rating: 4.8,
    reviewCount: 234,
    description: "Wettkampf-Dartboard im ICON DARTS Design. Echte Sisal-Fasern, präzises Spider-Wire und integrierter LED-Lichtring in Lila für die perfekte Bühnenoptik.",
    features: ["Echte Sisal-Fasern", "Selbstheilende Oberfläche", "Integrierter LED-Ring", "Wettkampf-Standard", "Inkl. Wandhalterung"],
    inStock: true,
  },
  {
    id: 3,
    slug: "icon-tungsten-set",
    name: "ICON Tungsten Pro 22g",
    price: 79.95,
    image: img("icon-tungsten-set"),
    images: [img("icon-tungsten-set")],
    category: "equipment",
    maxHoppRecommended: false,
    rating: 4.7,
    reviewCount: 167,
    description: "Premium 3er-Dart-Set mit 95% Tungsten-Barrel im klassischen ICON-Look. Ausgewogen für Genauigkeit und Konsistenz.",
    features: ["95% Tungsten", "22g Standard-Gewicht", "Carbon-Shafts", "Premium Flights", "Inkl. Etui"],
    inStock: true,
  },
  {
    id: 4,
    slug: "icon-polo-shirt",
    name: "ICON DARTS Polo Shirt",
    price: 54.95,
    image: img("icon-polo-shirt"),
    images: [img("icon-polo-shirt")],
    category: "mode",
    maxHoppRecommended: true,
    rating: 4.7,
    reviewCount: 89,
    description: "Premium Performance-Polo im ICON DARTS Branding. Atmungsaktive Technical Fabric mit lila Akzenten. Getragen auf der Tour.",
    features: ["95% Polyester / 5% Elasthan", "Schweißableitend", "Größen S-XXL", "Lila Stickerei", "Maschinenwaschbar"],
    inStock: true,
  },
  {
    id: 5,
    slug: "icon-hoodie",
    name: "ICON DARTS Hoodie",
    price: 79.95,
    image: img("icon-hoodie"),
    images: [img("icon-hoodie")],
    category: "mode",
    maxHoppRecommended: false,
    rating: 4.8,
    reviewCount: 203,
    description: "Premium Oversized-Hoodie mit großem ICON DARTS Print. Heavyweight Cotton-Blend mit Fleece-Innenfutter. Streetwear meets Dartsport.",
    features: ["80% Baumwolle / 20% Polyester", "Heavyweight 350gsm", "Kapuze mit Kordelzug", "Känguru-Tasche", "Oversized Fit"],
    inStock: true,
  },
  {
    id: 6,
    slug: "icon-cap",
    name: "ICON DARTS Snapback Cap",
    price: 29.95,
    image: img("icon-cap"),
    images: [img("icon-cap")],
    category: "merchandise",
    maxHoppRecommended: false,
    rating: 4.6,
    reviewCount: 142,
    description: "Klassische Snapback Cap mit gestickter ICON DARTS Wortmarke in Lila. Verstellbar, One-Size-fits-all.",
    features: ["100% Baumwolle", "Verstellbar", "Gestickter Patch", "Flat Brim", "One Size"],
    inStock: true,
  },
  {
    id: 7,
    slug: "icon-keyring",
    name: "ICON DARTS Schlüsselanhänger",
    price: 12.95,
    image: img("icon-keyring"),
    images: [img("icon-keyring")],
    category: "merchandise",
    maxHoppRecommended: false,
    rating: 4.5,
    reviewCount: 67,
    description: "Premium Metall-Schlüsselanhänger im ICON DARTS Logo-Design. Hochwertige Zinklegierung mit Lila-Emaille-Einsätzen.",
    features: ["Zinklegierung", "Lila Emaille", "Lederband", "Stabile Kette"],
    inStock: true,
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
