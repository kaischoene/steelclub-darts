// Generate fix-ups and additional images via Nano Banana Pro
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.INFSH_API_KEY;
if (!API_KEY) { console.error("Set INFSH_API_KEY env var"); process.exit(1); }
const BASE = "https://api.inference.sh";

const PRODUCTS_DIR = join(__dirname, "..", "public", "img", "products");
const STREAMS_DIR = join(__dirname, "..", "public", "img", "streams");
const MISC_DIR = join(__dirname, "..", "public", "img", "misc");
for (const d of [PRODUCTS_DIR, STREAMS_DIR, MISC_DIR]) {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

const jobs = [
  // === STREAM REGEN (removes Steel Club branding) ===
  {
    dir: STREAMS_DIR,
    slug: "icon-darts-championship-halbfinale",
    aspect: "16:9",
    force: true,
    prompt: "Cinematic match scene of two professional German dart players on a modern tournament stage at the ICON DARTS Championship semifinal, players wearing black and dark-purple jerseys with bold purple ICON DARTS wordmark logo on the chest, throwing darts simultaneously, large LED video wall backdrop behind them displaying the text 'ICON DARTS CHAMPIONSHIP - SEMIFINAL' in stark white and purple typography on dark background, dramatic stage lighting with purple and electric blue lasers, broadcast camera in foreground with LIVE indicator, packed dark crowd, hyper-realistic premium sports broadcast aesthetic, 16:9 cinematic shot, 4K",
  },
  {
    dir: STREAMS_DIR,
    slug: "german-darts-open-finale",
    aspect: "16:9",
    force: true,
    prompt: "Cinematic match scene of two professional dart players competing on a tournament stage at the German Darts Open Final, both players in mid-throw stance, large LED stadium screen behind them showing match scoreboard with player names and scores, dramatic stage lighting with violet purple and electric blue lasers cutting through smoke, professional broadcast camera framing, dark crowd silhouettes, premium TV sports broadcast aesthetic, no logos with the words Steel Club, modern dark tournament setting, 16:9 cinematic shot, hyper-realistic 4K",
  },
  // === MEDIA ROOM BANNER BACKGROUND ===
  {
    dir: MISC_DIR,
    slug: "media-room-bg",
    aspect: "16:9",
    force: true,
    prompt: "Cinematic wide-angle photograph of an ultra-modern professional darts streaming studio interior, five wettkampf-grade dartboards mounted in a row on a sleek black wall, each surrounded by a glowing purple LED ring light, professional broadcast cameras on tripods in the foreground, large LED video wall in background displaying subtle ICON DARTS branding, polished concrete floor reflecting the purple ambient lighting, atmospheric haze and stage lighting in deep purple and electric blue tones, no people visible, premium broadcast facility aesthetic, 16:9 cinematic wide shot, hyper-realistic 4K, ultra-detailed",
  },
  // === NEW SHOP PRODUCTS ===
  // Equipment (need 3 more to reach 6)
  {
    dir: PRODUCTS_DIR,
    slug: "icon-flights-pack",
    aspect: "1:1",
    prompt: "Premium dart flights product photograph, set of 9 standard-shape dart flights in matte black with bold purple ICON DARTS logo and geometric pattern, fanned out in a neat overlapping arrangement on a deep black surface with dramatic purple rim lighting and atmospheric smoke, hyper-realistic e-commerce product photography, 1:1 square composition, 4K",
  },
  {
    dir: PRODUCTS_DIR,
    slug: "icon-dart-case",
    aspect: "1:1",
    prompt: "Premium dart carrying case product photograph, sleek black hard-shell darts case shaped like a slim cigar case with metallic ICON DARTS logo engraved on the lid, partially open showing the velvet purple interior with custom-cut foam holders for darts, flights and shafts, displayed against deep black studio background with atmospheric purple glow and rim lighting, luxury product photography, 1:1 square, 4K",
  },
  {
    dir: PRODUCTS_DIR,
    slug: "icon-led-ring",
    aspect: "1:1",
    prompt: "Premium LED light ring for dartboard, circular product photograph showing a thin black LED ring with bright vibrant purple illumination glowing from the inner edge, designed to mount around a dartboard for tournament lighting, displayed standalone against a deep black studio background with the purple light glowing dramatically, hyper-realistic product photography, 1:1 square composition, 4K",
  },
  // Mode (need 4 more to reach 6)
  {
    dir: PRODUCTS_DIR,
    slug: "icon-tshirt",
    aspect: "1:1",
    prompt: "Premium black streetwear t-shirt product photograph, jet black heavy cotton t-shirt with large bold purple ICON DARTS wordmark logo printed across the chest, hung on invisible mannequin against deep black studio background with subtle purple ambient lighting and atmospheric haze, side lighting highlighting the fabric texture, hyper-realistic e-commerce product photography, 1:1 square, 4K",
  },
  {
    dir: PRODUCTS_DIR,
    slug: "icon-beanie",
    aspect: "1:1",
    prompt: "Premium knit beanie hat product photograph, black knit beanie with embroidered purple ICON DARTS wordmark patch on the cuff, displayed on a black mannequin head against a deep black studio background with subtle purple ambient lighting, dramatic side lighting showing the knit texture, hyper-realistic product photography, 1:1 square, 4K",
  },
  {
    dir: PRODUCTS_DIR,
    slug: "icon-jacket",
    aspect: "1:1",
    prompt: "Premium athletic bomber jacket product photograph, black satin bomber jacket with bold ICON DARTS logo embroidered in purple on the chest and purple racing stripes down the sleeves, hung on invisible mannequin against deep black studio background with atmospheric purple glow and smoke, dramatic rim lighting, hyper-realistic premium product photography, 1:1 square composition, 4K",
  },
  {
    dir: PRODUCTS_DIR,
    slug: "icon-shorts",
    aspect: "1:1",
    prompt: "Premium athletic training shorts product photograph, black performance dart shorts with vibrant purple ICON DARTS side stripes and small embroidered logo on the leg, displayed laid flat against a deep black studio background with subtle purple ambient lighting, hyper-realistic e-commerce product photography, 1:1 square, 4K",
  },
  // Merchandise (need 4 more to reach 6)
  {
    dir: PRODUCTS_DIR,
    slug: "icon-mug",
    aspect: "1:1",
    prompt: "Premium ceramic coffee mug product photograph, jet black matte ceramic 350ml mug with bold purple ICON DARTS wordmark logo printed on the side, displayed against a deep black studio background with subtle purple rim lighting and atmospheric haze, dramatic side lighting, hyper-realistic e-commerce product photography, 1:1 square, 4K",
  },
  {
    dir: PRODUCTS_DIR,
    slug: "icon-poster",
    aspect: "1:1",
    prompt: "Premium art print poster product photograph, rolled and partially unrolled high-end art poster featuring a stylized dartboard with purple ICON DARTS branding and motivational typography on dark background, displayed flat against a deep black studio surface with dramatic purple rim lighting, hyper-realistic e-commerce product photography, 1:1 square, 4K",
  },
  {
    dir: PRODUCTS_DIR,
    slug: "icon-bottle",
    aspect: "1:1",
    prompt: "Premium stainless steel water bottle product photograph, matte black double-wall insulated 750ml sports bottle with vibrant purple ICON DARTS wordmark logo etched on the side and dark purple silicone grip ring, displayed standalone against deep black studio background with dramatic purple rim lighting and atmospheric haze, hyper-realistic e-commerce product photography, 1:1 square, 4K",
  },
  {
    dir: PRODUCTS_DIR,
    slug: "icon-towel",
    aspect: "1:1",
    prompt: "Premium black microfiber sports towel product photograph, neatly folded jet black microfiber towel with embroidered purple ICON DARTS wordmark on the corner, displayed against deep black studio background with subtle purple ambient lighting and atmospheric haze, hyper-realistic e-commerce product photography, 1:1 square, 4K",
  },
];

async function submit(prompt, aspect) {
  const r = await fetch(`${BASE}/run`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ app: "google/gemini-3-pro-image-preview", input: { prompt, aspect_ratio: aspect, resolution: "1K", output_format: "jpeg" } }),
  });
  const j = await r.json();
  return j.data?.id;
}
async function poll(id) {
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 4000));
    const r = await fetch(`${BASE}/tasks/${id}`, { headers: { Authorization: `Bearer ${API_KEY}` } });
    const j = await r.json();
    if (j.data?.status === 10) return j.data.output?.images?.[0];
    if (j.data?.status >= 11) return null;
  }
  return null;
}
async function genOne(job) {
  const out = join(job.dir, `${job.slug}.jpg`);
  if (existsSync(out) && !job.force) { console.log(`skip ${job.slug}`); return; }
  console.log(`→ ${job.slug}`);
  const id = await submit(job.prompt, job.aspect);
  if (!id) { console.error(`✗ submit fail ${job.slug}`); return; }
  const url = await poll(id);
  if (!url) { console.error(`✗ poll fail ${job.slug}`); return; }
  const res = await fetch(url);
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${job.slug}.jpg`);
}

// Run in parallel batches of 4
for (let i = 0; i < jobs.length; i += 4) {
  await Promise.all(jobs.slice(i, i + 4).map(genOne));
}
console.log("done");
