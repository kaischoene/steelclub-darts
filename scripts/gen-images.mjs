// Image generation script for Steel Club Darts app
// Uses inference.sh + Gemini 3 Pro Image Preview (Nano Banana Pro)
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = "1nfsh-6rarhav7k7x92k0xtd5c3090ky";
const BASE = "https://api.inference.sh";
const OUT_DIR = join(__dirname, "..", "public", "img");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const IMAGE_QUEUE = process.argv.slice(2); // pass category names, e.g. node gen-images.mjs players events

// ────────────── PROMPTS ──────────────

const players = [
  { slug: "michael-van-gerwen", prompt: "Hyper-realistic studio portrait of a confident bald male dart player in his mid-30s with intense blue eyes, wearing a lime green and yellow professional dart shirt, holding three steel-tipped darts, dramatic spotlight from above, soft shadows, premium sports photography, neutral dark grey backdrop with subtle bokeh, ultra sharp focus, 4K, professional headshot" },
  { slug: "gerwyn-price", prompt: "Hyper-realistic studio portrait of a muscular short-haired male dart player in his 30s with a confident smile, wearing a red and white Welsh-themed dart jersey, holding darts, dramatic rim lighting, dark backdrop with red glow, premium sports photography, sharp focus, 4K, professional headshot" },
  { slug: "peter-wright", prompt: "Hyper-realistic studio portrait of an eccentric middle-aged male dart player with colorful spiked hair (rainbow streaks), confident expression, wearing a flashy patterned dart shirt, holding darts, dramatic stage lighting, dark backdrop with purple haze, premium sports photography, sharp focus, 4K" },
  { slug: "jonny-clayton", prompt: "Hyper-realistic studio portrait of a focused bearded male dart player in his early 40s, wearing a black and red Welsh dart jersey, intense concentrated look, holding three darts, dramatic side lighting, dark moody backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "joe-cullen", prompt: "Hyper-realistic studio portrait of a tall male dart player in his 30s with short brown hair and stubble, wearing an English-themed dart shirt with red and white accents, confident look, holding darts, professional studio lighting, dark backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "max-hopp", prompt: "Hyper-realistic studio portrait of a young German male dart player around 30 with short blonde hair, friendly confident smile, wearing a black and yellow German-themed dart shirt with eagle motif, holding darts, professional warm studio lighting, dark backdrop with orange accent, premium sports photography, sharp focus, 4K" },
  { slug: "gabriel-clemens", prompt: "Hyper-realistic studio portrait of a tall serious German male dart player in his late 30s with a closely-cropped beard and short hair, wearing a black and white dart shirt, focused intense expression, holding darts, dramatic lighting, dark backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "maximilian-mueller", prompt: "Hyper-realistic studio portrait of a young ambitious German male dart player in his late 20s with stylish dark brown hair, wearing a modern orange and black Steel Club Darts shirt, confident smile, holding three steel darts, dramatic studio lighting, dark backdrop with orange glow, premium sports photography, sharp focus, 4K" },
  { slug: "phil-taylor", prompt: "Hyper-realistic studio portrait of an iconic veteran male dart player in his 60s, bald with experience lines, wearing a classic black dart shirt with crown emblems, legendary commanding presence, holding three darts, dramatic spotlight, dark moody backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "gary-anderson", prompt: "Hyper-realistic studio portrait of a Scottish male dart player in his late 50s with a long greying beard and tartan-pattern dart shirt, intense piercing eyes, holding darts, dramatic side lighting, dark moody backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "rob-cross", prompt: "Hyper-realistic studio portrait of an English male dart player in his late 30s with short brown hair and clean-shaven face, wearing a red and white dart shirt, focused look, holding darts, professional studio lighting, dark backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "lisa-koenig", prompt: "Hyper-realistic studio portrait of a young confident German female dart player in her late 20s with long dark blonde hair tied back, wearing a modern black and orange Steel Club Darts polo shirt, determined expression, holding three steel darts, professional studio lighting, dark backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "sarah-weber", prompt: "Hyper-realistic studio portrait of a focused German female dart player in her early 30s with short brown bob haircut, wearing a sleek black sports polo with orange Steel Club Darts accents, confident look, holding darts, dramatic lighting, dark moody backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "david-bauer", prompt: "Hyper-realistic studio portrait of a German male dart player in his mid-30s with short dark hair and well-groomed beard, wearing a casual black hoodie with orange Steel Club Darts logo, friendly hobbyist look, holding three darts, soft studio lighting, dark backdrop, premium sports photography, sharp focus, 4K" },
  { slug: "tom-schneider", prompt: "Hyper-realistic studio portrait of a friendly German hobby dart player in his late 20s with curly brown hair and casual style, wearing a black Steel Club Darts t-shirt, approachable smile, holding three darts, warm studio lighting, dark backdrop, premium sports photography, sharp focus, 4K" },
];

const events = [
  { slug: "malle-pally-2026", aspect: "16:9", prompt: "Dramatic photograph of a massive dart party crowd at the legendary Bierkönig venue on Mallorca, hundreds of cheering fans with raised arms, neon stage lights in orange and white, Steel Club Darts banners, a dartboard on a giant stage, party atmosphere, golden hour, 4K, hyper-realistic event photography" },
  { slug: "steel-club-open-2026", aspect: "16:9", prompt: "Professional dart tournament arena shot in Berlin, modern Steel Arena venue with orange spotlights, two dart oches with players in mid-throw, large crowd cheering, branded Steel Club Darts logos around the venue, dramatic stage lighting, 4K, hyper-realistic sports event photography" },
  { slug: "lokales-darts-turnier-berlin", aspect: "16:9", prompt: "Cozy local dart club tournament scene in Berlin, multiple dartboards on a wooden wall, hobbyist players concentrating on their throws, warm pub lighting, friendly community atmosphere, vintage industrial Berlin venue, 4K, hyper-realistic" },
  { slug: "dart-liga-start-hamburg", aspect: "16:9", prompt: "Hamburg dart league opening night, players in matching team jerseys throwing darts in a modern dart hall, league banner overhead, action shot with dart in mid-flight, warm orange and red lighting, 4K, hyper-realistic sports photography" },
  { slug: "malle-pally-qualifier-koeln", aspect: "16:9", prompt: "Köln Malle Pally qualifier event, packed RheinDart Arena with cheering crowd, dart player on stage mid-throw, orange spotlights, championship trophy visible, Steel Club Darts branding, energetic atmosphere, 4K, hyper-realistic event photography" },
  { slug: "muenchner-meisterschaft", aspect: "16:9", prompt: "Bavarian dart championship in Munich, traditional Bayern Dart Center venue, professional dartboards lined up, players in lederhosen-inspired modern dart jerseys, blue and white decorations, sophisticated lighting, 4K, hyper-realistic sports event photography" },
  { slug: "frankfurt-open", aspect: "16:9", prompt: "Frankfurt Open dart tournament at the Mainpoint Dart venue, modern glass-and-steel architecture, player throwing dart in foreground with audience focus, orange Steel Club Darts banners, professional stage lighting, 4K, hyper-realistic event photography" },
  { slug: "stuttgart-cup", aspect: "16:9", prompt: "Stuttgart Cup dart event in a Schwaben Dart Halle, multiple match boards active simultaneously, fans gathered around each board, traditional Swabian regional atmosphere with modern dart equipment, warm lighting, 4K, hyper-realistic" },
  { slug: "leipzig-classic", aspect: "16:9", prompt: "Leipzig Classic dart event in the Sachsen Arena, large indoor venue with bleacher seating, dart match in progress on raised stage, dramatic theatrical lighting in orange and white, German East-region pride banners, 4K, hyper-realistic sports event" },
  { slug: "duesseldorf-darts-day", aspect: "16:9", prompt: "Düsseldorf darts day in the Altstadt Dart Club, festive atmosphere with hobbyist players competing, beer steins on tables, Rhein riverside venue with brick interior, friendly community vibe, warm pub lighting, 4K, hyper-realistic" },
  { slug: "bremen-grand-prix", aspect: "16:9", prompt: "Bremen Grand Prix dart tournament at Hansestadt Dart Arena, professional tournament setup with multiple match areas, big crowd cheering, dart in mid-flight motion blur, championship vibe with orange Steel Club branding, 4K, hyper-realistic event photography" },
  { slug: "dortmund-derby", aspect: "16:9", prompt: "Dortmund Derby dart event in Ruhrpott Dart Hall, industrial-style venue with steel beams, intense match between two players in close-up, working-class Ruhr region atmosphere, dramatic orange and yellow lighting, 4K, hyper-realistic" },
  { slug: "nuernberg-cup", aspect: "16:9", prompt: "Nürnberg Cup dart tournament at Franken Dart Arena, traditional Franconian venue with modern dart equipment, player aiming dart precisely, crowd of supporters with regional banners, dramatic stage lighting, 4K, hyper-realistic sports event" },
  { slug: "dresden-open", aspect: "16:9", prompt: "Dresden Open dart tournament at Elbflorenz Dart Center, elegant venue with baroque-inspired interior meeting modern dart aesthetics, beginners-friendly atmosphere, gentle warm lighting, 4K, hyper-realistic event photography" },
  { slug: "essen-pokal", aspect: "16:9", prompt: "Essen Pokal premium dart tournament at Ruhrpott Dart Club, ultra-modern venue with LED screens, top professional players on stage, packed standing crowd, dramatic strobe-style lighting in orange and black, championship trophy in foreground, 4K, hyper-realistic" },
];

const products = [
  { slug: "professional-dartboard", aspect: "1:1", prompt: "Professional studio product photograph of a tournament-grade sisal dartboard with red, green, black and cream segments, mounted vertically against a pure white seamless background, soft even lighting from both sides, slight shadow below for depth, hyper-realistic e-commerce photography, sharp focus on the bristle texture, 4K, premium product shot" },
  { slug: "set-quality-darts", aspect: "1:1", prompt: "Professional studio product photograph of a set of three premium tungsten steel-tip darts arranged in a fan pattern, black and orange flights, knurled metal barrels, on a pure white seamless background, soft even lighting, hyper-realistic e-commerce photography, sharp focus on metallic textures and flight details, 4K" },
  { slug: "polo-shirt", aspect: "1:1", prompt: "Professional studio product photograph of a black athletic polo shirt with orange Steel Club Darts logo embroidery on chest, hanging on an invisible mannequin against a pure white seamless background, premium fabric texture visible, soft studio lighting, hyper-realistic e-commerce photography, 4K product shot" },
  { slug: "browl-hoodie", aspect: "1:1", prompt: "Professional studio product photograph of a premium grey-and-orange hoodie with Steel Club Darts dartboard logo printed large on the chest, hanging flat against a pure white seamless background, casual streetwear style, soft studio lighting showing the fabric texture, hyper-realistic e-commerce photography, 4K" },
  { slug: "steel-club-cap", aspect: "1:1", prompt: "Professional studio product photograph of a black snapback cap with orange Steel Club Darts dartboard logo embroidered on the front, classic flat-brim style, against a pure white seamless background, soft studio lighting from multiple angles, hyper-realistic e-commerce photography, sharp focus, 4K product shot" },
  { slug: "performance-darts-pro", aspect: "1:1", prompt: "Professional studio product photograph of three premium 95% tungsten steel-tip darts in a stunning chrome-and-black finish with carbon flights, displayed in an open premium velvet case, against a pure white seamless background, dramatic spotlight, hyper-realistic e-commerce photography, 4K luxury product shot" },
  { slug: "training-shirt", aspect: "1:1", prompt: "Professional studio product photograph of a black athletic training shirt with orange Steel Club Darts side stripes and small logo, hanging on an invisible mannequin against a pure white seamless background, technical fabric details visible, soft studio lighting, hyper-realistic e-commerce photography, 4K" },
  { slug: "steel-club-keyring", aspect: "1:1", prompt: "Professional studio product photograph of a premium metal keyring shaped like the Steel Club Darts dartboard logo, orange and black colors, polished zinc alloy, against a pure white seamless background, dramatic close-up lighting showing engraved details, hyper-realistic e-commerce photography, macro 4K" },
];

const news = [
  { slug: "van-gerwen-gewinnt-grand-slam", aspect: "16:9", prompt: "Dramatic action photograph of a victorious bald dart player in green-yellow jersey raising both arms in celebration, confetti falling from above, large championship trophy in background, professional sports photography, intense stage lighting, 4K, hyper-realistic" },
  { slug: "max-hopp-startet-trainingscamp", aspect: "16:9", prompt: "Modern professional dart training facility interior with 5 wettkampf-grade boards lined up on a black wall with orange LED ring lights, automated camera scoring system mounted overhead, polished concrete floor, branded Steel Club Darts banners, empty hall ready for training, 4K, hyper-realistic architectural sports photography" },
  { slug: "malle-pally-2026-vorschau", aspect: "16:9", prompt: "Aerial view of a massive dart party crowd inside the iconic Bierkönig venue on Mallorca, hundreds of people raising arms, Steel Club Darts and Malle Pally banners overhead, orange and yellow stage lights, central dart stage with player throwing, party atmosphere, 4K hyper-realistic" },
  { slug: "neue-darts-kollektion", aspect: "16:9", prompt: "Flat lay product photograph of a complete Steel Club Darts performance collection on a dark wooden surface: dartboard, three tungsten darts in case, black polo shirt folded, hoodie folded, cap, all with orange branding, dramatic overhead lighting, 4K, hyper-realistic product photography" },
  { slug: "interview-maximilian-mueller", aspect: "16:9", prompt: "Photograph of young German male dart player in his late 20s sitting in a modern interview setting, ambient orange and black studio backdrop, talking confidently with hands gesturing, professional camera-ready lighting, sport documentary style, 4K, hyper-realistic" },
  { slug: "ki-scorer-update", aspect: "16:9", prompt: "Close-up of a smartphone mounted on a tripod pointing at a dartboard with three darts in scoring positions, augmented reality overlay showing automatic scoring numbers and hit detection circles in orange, modern tech aesthetic, soft natural lighting from a side window, 4K, hyper-realistic" },
];

const streams = [
  { slug: "german-darts-open-finale", aspect: "16:9", prompt: "Cinematic shot of two professional dart players competing on a tournament stage with dartboard between them, one in green jersey throwing a dart, other player in dark jersey watching intensely, dramatic orange spotlights, big TV-style score display visible, premium sports broadcast aesthetic, 4K, hyper-realistic" },
  { slug: "steel-club-championship-halbfinale", aspect: "16:9", prompt: "Steel Club Championship semifinal match scene, two German dart players in orange and black Steel Club jerseys throwing darts simultaneously on a modern tournament stage, branded LED backdrop with Steel Club Darts logo, dramatic stage lighting, broadcast camera angle, 4K, hyper-realistic" },
  { slug: "highlights-world-championship-2025", aspect: "16:9", prompt: "Compilation thumbnail showing dramatic close-up of three darts perfectly grouped in the triple-20 bullseye area of a dartboard, with motion-blurred dart flying toward target, dramatic orange and gold lighting, championship aesthetic, 4K, hyper-realistic action sports photography" },
  { slug: "creator-content-best-tricks", aspect: "16:9", prompt: "Creative dart trick shot scene, dart sticking in apple pierced through bullseye, fun YouTube creator aesthetic with playful lighting, white and orange color scheme, modern lifestyle dart content, 4K, hyper-realistic" },
  { slug: "match-highlights-malle-pally", aspect: "16:9", prompt: "Highlights montage thumbnail from Malle Pally tournament at Bierkönig Mallorca, crowd cheering with raised drinks, player celebrating winning shot, party atmosphere with confetti, orange and yellow festival lighting, 4K, hyper-realistic event photography" },
  { slug: "max-hopp-training-session", aspect: "16:9", prompt: "Behind-the-scenes training session photograph of a young German blonde dart player in casual training gear practicing at a modern training facility with multiple dartboards, focused concentration mid-throw, professional documentary style, 4K, hyper-realistic" },
  { slug: "ndl-finale-2026", aspect: "16:9", prompt: "NDL amateur dart league finale match, two amateur players on a community-style stage with simple but professional setup, modest crowd of dedicated fans, regional German tournament atmosphere, warm orange lighting, 4K, hyper-realistic" },
  { slug: "premier-league-match-day-5", aspect: "16:9", prompt: "Premier League dart match day broadcast scene with TV cameras visible, players walking out for entrance with stage smoke effects, fans waving flags, premium broadcast production quality, dramatic stage lighting with lasers, 4K, hyper-realistic sports broadcast" },
];

// ────────────── HELPERS ──────────────

async function submitTask(prompt, aspect = "1:1") {
  const res = await fetch(`${BASE}/run`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app: "google/gemini-3-pro-image-preview",
      input: { prompt, aspect_ratio: aspect, resolution: "1K", output_format: "jpeg" },
    }),
  });
  const j = await res.json();
  return j.data?.id;
}

async function pollTask(id) {
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 4000));
    const res = await fetch(`${BASE}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const j = await res.json();
    if (j.data?.status === 10) return j.data.output?.images?.[0];
    if (j.data?.status === 11 || j.data?.status === 12) {
      console.error(`Task ${id} failed`, j.data);
      return null;
    }
  }
  console.error(`Task ${id} timed out`);
  return null;
}

async function downloadTo(url, filepath) {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(filepath, buf);
}

async function generateOne(item, subfolder, aspect = "1:1") {
  const subdir = join(OUT_DIR, subfolder);
  if (!existsSync(subdir)) mkdirSync(subdir, { recursive: true });
  const outPath = join(subdir, `${item.slug}.jpg`);
  if (existsSync(outPath)) {
    console.log(`✓ skip (exists): ${subfolder}/${item.slug}.jpg`);
    return;
  }
  try {
    console.log(`→ submit: ${subfolder}/${item.slug}`);
    const taskId = await submitTask(item.prompt, item.aspect || aspect);
    if (!taskId) {
      console.error(`✗ submit failed: ${item.slug}`);
      return;
    }
    const imageUrl = await pollTask(taskId);
    if (!imageUrl) {
      console.error(`✗ poll failed: ${item.slug}`);
      return;
    }
    await downloadTo(imageUrl, outPath);
    console.log(`✓ done: ${subfolder}/${item.slug}.jpg`);
  } catch (e) {
    console.error(`✗ error: ${item.slug}`, e.message);
  }
}

async function generateBatch(items, subfolder, defaultAspect, batchSize = 4) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(`\n── Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(items.length / batchSize)} (${subfolder}) ──`);
    await Promise.all(batch.map((item) => generateOne(item, subfolder, defaultAspect)));
  }
}

// ────────────── MAIN ──────────────

const categories = {
  players: () => generateBatch(players, "players", "1:1", 4),
  events: () => generateBatch(events, "events", "16:9", 4),
  products: () => generateBatch(products, "products", "1:1", 4),
  news: () => generateBatch(news, "news", "16:9", 4),
  streams: () => generateBatch(streams, "streams", "16:9", 4),
};

const toRun = IMAGE_QUEUE.length > 0 ? IMAGE_QUEUE : Object.keys(categories);

for (const cat of toRun) {
  if (!categories[cat]) {
    console.error(`Unknown category: ${cat}`);
    continue;
  }
  console.log(`\n═══════════ ${cat.toUpperCase()} ═══════════`);
  await categories[cat]();
}

console.log("\n✓ All done.");
