// Regenerate merch products WITH the actual logo as image reference
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = "1nfsh-6rarhav7k7x92k0xtd5c3090ky";
const BASE = "https://api.inference.sh";
const PRODUCTS_DIR = join(__dirname, "..", "public", "img", "products");
if (!existsSync(PRODUCTS_DIR)) mkdirSync(PRODUCTS_DIR, { recursive: true });

// Logo hosted on GitHub raw (publicly accessible)
const LOGO_URL = "https://raw.githubusercontent.com/kaischoene/icon-darts/main/public/img/icon-darts-logo.png";

const jobs = [
  {
    slug: "icon-hoodie",
    prompt: "Take the provided 'THE ICON DARTS' logo (white outlined typography with THE on top, ICON in large letters in the middle, and DARTS below with horizontal lines on the sides) and place it large and prominent on the chest of a premium oversized jet black streetwear hoodie. The logo should appear as a printed graphic in white on the black hoodie fabric. The hoodie is displayed on an invisible mannequin against a deep black studio background with atmospheric purple ambient lighting, purple smoke and haze, dramatic rim lighting from behind. Hyper-realistic e-commerce product photography, 1:1 square composition, 4K detail.",
  },
  {
    slug: "icon-tshirt",
    prompt: "Take the provided 'THE ICON DARTS' logo (white outlined typography with THE on top, ICON in large letters, DARTS below with horizontal lines on the sides) and place it large and centered on the chest of a premium jet black heavy cotton t-shirt as a printed graphic in white. The shirt is hung on invisible mannequin against deep black studio background with subtle purple ambient lighting and atmospheric haze, side lighting highlighting fabric texture. Hyper-realistic e-commerce product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-polo-shirt",
    prompt: "Take the provided 'THE ICON DARTS' logo and place it small (about 5cm wide) on the LEFT chest area of a premium black athletic polo shirt as an embroidered or printed patch in white. The polo has thin purple piping along the collar and sleeves. Displayed on an invisible mannequin against deep black studio background with subtle purple ambient lighting. Hyper-realistic e-commerce product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-jacket",
    prompt: "Take the provided 'THE ICON DARTS' logo and place it on the LEFT chest of a premium black satin bomber jacket as a clean white embroidered patch. The jacket has thin purple racing stripes running down both sleeves. Displayed on invisible mannequin against deep black studio background with atmospheric purple glow and smoke, dramatic rim lighting. Hyper-realistic premium product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-cap",
    prompt: "Take the provided 'THE ICON DARTS' logo and place it as a large embroidered patch on the FRONT panel of a classic black flat-brim snapback cap. The logo should appear in white embroidery filling most of the front panel. Cap shown standing upright at slight angle on a dark surface against a deep black studio background with subtle purple ambient glow and haze, dramatic side lighting. Hyper-realistic e-commerce product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-beanie",
    prompt: "Take the provided 'THE ICON DARTS' logo and apply it as a small woven label on the front cuff of a black knit beanie hat. Beanie displayed on a black mannequin head against deep black studio background with subtle purple ambient lighting, dramatic side lighting showing knit texture. Hyper-realistic product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-mug",
    prompt: "Take the provided 'THE ICON DARTS' logo and print it large on the side of a premium matte black ceramic 350ml coffee mug, the logo facing the camera in white. Mug displayed against deep black studio background with subtle purple rim lighting and atmospheric haze, dramatic side lighting. Hyper-realistic e-commerce product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-bottle",
    prompt: "Take the provided 'THE ICON DARTS' logo and laser-etch it on the side of a premium matte black double-wall stainless steel 750ml sports water bottle, the engraving facing the camera in subtle silver-white tone. Bottle has a dark purple silicone grip ring. Displayed standalone against deep black studio background with dramatic purple rim lighting and atmospheric haze. Hyper-realistic e-commerce product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-towel",
    prompt: "Take the provided 'THE ICON DARTS' logo and embroider it in white on the corner of a neatly folded jet black microfiber sports towel. Displayed against deep black studio background with subtle purple ambient lighting and atmospheric haze. Hyper-realistic e-commerce product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-poster",
    prompt: "Take the provided 'THE ICON DARTS' logo and use it as the centerpiece of a premium A1 art poster design, the logo large and dominant in white against a deep black gradient background with subtle purple glow rays emanating from behind, geometric line accents in purple. The poster shown rolled and partially unrolled flat against a dark slate surface with dramatic purple rim lighting. Hyper-realistic e-commerce product photography, 1:1 square, 4K.",
  },
  {
    slug: "icon-flights-pack",
    prompt: "Take the provided 'THE ICON DARTS' logo and apply it small but visible (about 1cm wide) on the surface of dart flights. Show a set of 9 standard-shape dart flights in matte black, each with the ICON DARTS logo printed clearly in white, fanned out in a neat overlapping arrangement on a deep black surface with dramatic purple rim lighting and atmospheric smoke. Hyper-realistic e-commerce product photography, 1:1 square, 4K.",
  },
];

async function submit(prompt) {
  const r = await fetch(`${BASE}/run`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      app: "google/gemini-3-pro-image-preview",
      input: {
        prompt,
        images: [LOGO_URL],
        aspect_ratio: "1:1",
        resolution: "1K",
        output_format: "jpeg",
      },
    }),
  });
  const j = await r.json();
  if (!j.success) console.error("submit error:", JSON.stringify(j).slice(0, 200));
  return j.data?.id;
}
async function poll(id) {
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 4000));
    const r = await fetch(`${BASE}/tasks/${id}`, { headers: { Authorization: `Bearer ${API_KEY}` } });
    const j = await r.json();
    if (j.data?.status === 10) return j.data.output?.images?.[0];
    if (j.data?.status >= 11) { console.error(`fail status ${j.data?.status}`); return null; }
  }
  return null;
}
async function genOne(job) {
  const out = join(PRODUCTS_DIR, `${job.slug}.jpg`);
  console.log(`→ ${job.slug}`);
  const id = await submit(job.prompt);
  if (!id) { console.error(`✗ submit fail ${job.slug}`); return; }
  const url = await poll(id);
  if (!url) { console.error(`✗ poll fail ${job.slug}`); return; }
  const res = await fetch(url);
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${job.slug}.jpg`);
}

for (let i = 0; i < jobs.length; i += 3) {
  await Promise.all(jobs.slice(i, i + 3).map(genOne));
}
console.log("done");
