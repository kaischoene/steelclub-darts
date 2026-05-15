import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.INFSH_API_KEY;
if (!API_KEY) { console.error("Set INFSH_API_KEY env var"); process.exit(1); }
const BASE = "https://api.inference.sh";
const OUT = join(__dirname, "..", "public", "img", "products");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
const LOGO_URL = "https://raw.githubusercontent.com/kaischoene/icon-darts/main/public/img/icon-darts-logo.png";

const jobs = [
  {
    slug: "icon-hoodie",
    useLogo: true,
    prompt: "Apply the provided THE ICON DARTS logo (white outlined text reading THE on top, ICON in big block letters in the middle, DARTS below with horizontal lines on the sides) cleanly and accurately centered on the chest of a premium oversized jet black streetwear hoodie. The logo must remain crisp, undistorted, in pure white, and the SAME aspect ratio as the reference logo. Hoodie shown flat-laid or on invisible mannequin facing forward against a deep solid black studio background with subtle purple ambient lighting and very light purple haze around the edges. No frame, no border around the image, full-bleed composition. Hyper-realistic e-commerce product photography, 1:1 square composition, 4K detail, the logo text MUST be readable and identical to the reference.",
  },
  {
    slug: "icon-led-ring",
    useLogo: false,
    prompt: "Premium LED light ring for dartboard product photograph. A thin circular black aluminum LED ring (about 50cm diameter) glowing brightly with vibrant purple LEDs from its inner edge. The ring is photographed straight-on at a slight downward angle on a deep solid black studio background, the purple LED light dramatically illuminating the surrounding black surface. No frame, no border, no matte, no rectangular crop marks around the image — the image is a clean full-bleed product shot. Hyper-realistic e-commerce product photography, 1:1 square composition, 4K detail.",
  },
];

async function submit(prompt, useLogo) {
  const input = {
    prompt,
    aspect_ratio: "1:1",
    resolution: "1K",
    output_format: "jpeg",
  };
  if (useLogo) input.images = [LOGO_URL];
  const r = await fetch(`${BASE}/run`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ app: "google/gemini-3-pro-image-preview", input }),
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
await Promise.all(jobs.map(async (job) => {
  console.log(`→ ${job.slug}`);
  const id = await submit(job.prompt, job.useLogo);
  if (!id) { console.error(`✗ submit ${job.slug}`); return; }
  const url = await poll(id);
  if (!url) { console.error(`✗ poll ${job.slug}`); return; }
  const res = await fetch(url);
  writeFileSync(join(OUT, `${job.slug}.jpg`), Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${job.slug}`);
}));
console.log("done");
