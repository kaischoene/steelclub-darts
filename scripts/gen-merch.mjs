// Generate new ICON DARTS branded merchandise images via Nano Banana Pro
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.INFSH_API_KEY;
if (!API_KEY) { console.error("Set INFSH_API_KEY env var"); process.exit(1); }
const BASE = "https://api.inference.sh";
const OUT_DIR = join(__dirname, "..", "public", "img", "products");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const products = [
  {
    slug: "icon-dartboard",
    prompt: "Professional tournament-grade dartboard product photograph, premium sisal bristle dartboard mounted on a dark background, surrounded by a glowing purple LED ring light creating dramatic ambient illumination, the brand text 'ICON DARTS' subtly visible on the outer black ring of the dartboard, three black-and-purple darts stuck in the bullseye, atmospheric purple smoke and haze around the edges, deep black studio background with strong purple rim lighting, hyper-realistic premium e-commerce product photography, sharp focus, 4K studio quality",
  },
  {
    slug: "icon-polo-shirt",
    prompt: "Premium men's athletic polo shirt product photograph, jet black polo shirt with bold purple 'ICON DARTS' logo embroidered on the chest and small purple accent piping along the collar and sleeves, hung on an invisible mannequin, displayed against a deep black studio background with subtle purple ambient lighting and faint smoke, dramatic side lighting highlighting the fabric texture and stitching details, hyper-realistic premium e-commerce product photography, 1:1 square composition, 4K",
  },
  {
    slug: "icon-hoodie",
    prompt: "Premium oversized black hoodie product photograph, black streetwear hoodie with a large bold purple 'ICON DARTS' logo printed across the chest and small embroidered logo on the sleeve, hood drawn slightly forward, hung on invisible mannequin, displayed against a deep black studio background with atmospheric purple smoke and glow, dramatic rim lighting from behind, hyper-realistic premium product photography, 1:1 square composition, 4K",
  },
  {
    slug: "icon-cap",
    prompt: "Premium snapback cap product photograph, jet black snapback cap with bold embroidered purple 'ICON DARTS' wordmark logo on the front panel, flat brim, displayed on a dark surface against a deep black studio background with subtle purple ambient glow and haze, dramatic side lighting, hyper-realistic premium e-commerce product photography, 1:1 square composition, 4K",
  },
  {
    slug: "icon-keyring",
    prompt: "Premium metal keyring product photograph, gunmetal grey zinc alloy keyring shaped like the 'ICON DARTS' wordmark with subtle purple enamel inlay accents, attached to a sleek black leather strap and small metal ring, lying on a dark slate surface with dramatic purple rim lighting and atmospheric haze, macro close-up shot, hyper-realistic premium product photography, 1:1 square, 4K",
  },
  {
    slug: "icon-tungsten-set",
    prompt: "Premium tungsten dart set product photograph, three professional 95% tungsten steel-tip darts in jet black finish with knurled grip patterns and metallic purple shafts, displayed in an open premium black velvet presentation case with purple satin lining, against a deep black studio background with atmospheric purple smoke and rim lighting, hyper-realistic luxury product photography, 1:1 square composition, 4K",
  },
];

async function submit(prompt) {
  const r = await fetch(`${BASE}/run`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ app: "google/gemini-3-pro-image-preview", input: { prompt, aspect_ratio: "1:1", resolution: "1K", output_format: "jpeg" } }),
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

async function genOne(item) {
  const out = join(OUT_DIR, `${item.slug}.jpg`);
  if (existsSync(out)) { console.log(`skip ${item.slug}`); return; }
  console.log(`→ ${item.slug}`);
  const id = await submit(item.prompt);
  if (!id) { console.error(`✗ submit fail ${item.slug}`); return; }
  const url = await poll(id);
  if (!url) { console.error(`✗ poll fail ${item.slug}`); return; }
  const res = await fetch(url);
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${item.slug}.jpg`);
}

// Run in parallel batches of 3
for (let i = 0; i < products.length; i += 3) {
  await Promise.all(products.slice(i, i + 3).map(genOne));
}
console.log("done");
