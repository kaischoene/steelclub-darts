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
    slug: "professional-dartboard",
    name: "Professional Dartboard",
    price: 49.95,
    image: img("professional-dartboard"),
    images: [img("professional-dartboard")],
    category: "equipment",
    maxHoppRecommended: true,
    rating: 4.8,
    reviewCount: 234,
    description: "Professionelles Wettkampf-Dartboard aus echten Sisal-Fasern. Geprüft und empfohlen von Max Hopp für den ambitionierten Spieler.",
    features: ["Echte Sisal-Fasern", "Selbstheilende Oberfläche", "Wettkampf-Standard", "Inkl. Wandhalterung"],
    inStock: true,
  },
  {
    id: 2,
    slug: "set-quality-darts",
    name: "Set Quality Darts",
    price: 29.95,
    image: img("set-quality-darts"),
    images: [img("set-quality-darts")],
    category: "equipment",
    maxHoppRecommended: false,
    rating: 4.5,
    reviewCount: 142,
    description: "Hochwertiges 3er-Dart-Set mit 90% Tungsten-Barrel. Perfekt für Einsteiger und Fortgeschrittene.",
    features: ["90% Tungsten", "22g Gewicht", "Inkl. Flights & Shafts", "Transport-Case"],
    inStock: true,
  },
  {
    id: 3,
    slug: "polo-shirt",
    name: "Icon Polo Shirt",
    price: 49.95,
    image: img("polo-shirt"),
    images: [img("polo-shirt")],
    category: "mode",
    maxHoppRecommended: true,
    rating: 4.7,
    reviewCount: 89,
    description: "Atmungsaktives Performance-Polo im THE ICON DARTS Design. Getragen von den Profis.",
    features: ["95% Polyester / 5% Elasthan", "Schweißableitend", "Größen S-XXL", "Maschinenwaschbar"],
    inStock: true,
  },
  {
    id: 4,
    slug: "browl-hoodie",
    name: "Browl Hoodie",
    price: 29.95,
    image: img("browl-hoodie"),
    images: [img("browl-hoodie")],
    category: "mode",
    maxHoppRecommended: false,
    rating: 4.6,
    reviewCount: 156,
    description: "Premium Hoodie mit THE ICON DARTS Print. Perfekt für die Sport-Bar und den Trainingsalltag.",
    features: ["80% Baumwolle / 20% Polyester", "Kapuze mit Kordelzug", "Känguru-Tasche", "Loose Fit"],
    inStock: true,
  },
  {
    id: 5,
    slug: "icon-darts-cap",
    name: "Icon Cap",
    price: 24.95,
    image: img("icon-darts-cap"),
    images: [img("icon-darts-cap")],
    category: "merchandise",
    maxHoppRecommended: false,
    rating: 4.4,
    reviewCount: 78,
    description: "Klassisches Snapback Cap mit gesticktem Icon Logo.",
    features: ["100% Baumwolle", "Verstellbar", "Gestickter Patch", "One Size"],
    inStock: true,
  },
  {
    id: 6,
    slug: "performance-darts-pro",
    name: "Performance Darts Pro 24g",
    price: 89.95,
    image: img("performance-darts-pro"),
    images: [img("performance-darts-pro")],
    category: "equipment",
    maxHoppRecommended: true,
    rating: 4.9,
    reviewCount: 312,
    description: "Top-of-the-Line Wettkampf-Darts mit 95% Tungsten. Die Wahl der Profis.",
    features: ["95% Tungsten", "24g Wettkampf-Gewicht", "Carbon-Shafts", "Premium Flights"],
    inStock: true,
  },
  {
    id: 7,
    slug: "training-shirt",
    name: "Training Shirt",
    price: 34.95,
    image: img("training-shirt"),
    images: [img("training-shirt")],
    category: "mode",
    maxHoppRecommended: false,
    rating: 4.5,
    reviewCount: 67,
    description: "Funktionales Training-Shirt für Halle und Outdoor.",
    features: ["Dryfit-Technologie", "UV-Schutz", "Reflektoren", "Slim Fit"],
    inStock: true,
  },
  {
    id: 8,
    slug: "icon-darts-keyring",
    name: "Icon Schlüsselanhänger",
    price: 9.95,
    image: img("icon-darts-keyring"),
    images: [img("icon-darts-keyring")],
    category: "merchandise",
    maxHoppRecommended: false,
    rating: 4.2,
    reviewCount: 45,
    description: "Metall-Schlüsselanhänger mit Icon Logo.",
    features: ["Zinklegierung", "5cm Durchmesser", "Stabile Kette"],
    inStock: true,
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
