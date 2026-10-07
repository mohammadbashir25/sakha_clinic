/**
 * SAKHA blog — the ONLY data file the blog UI reads from.
 *
 * Every post is written in English (en), Dari (fa) and Pashto (ps). The slug,
 * category, dates and cover image are shared by all three languages, so URLs
 * stay stable. A missing translation falls back to English.
 *
 * To connect MongoDB later, replace the bodies of the four async functions at
 * the bottom (keep their signatures). Note: the current Blog model stores one
 * language per document — see the note above `fromBlogDocument`.
 *
 * Images: every cover lives in ONE folder, `public/images/blog/`.
 */

export const BLOG_IMAGE_DIR = "/images/blog";

/** Existing appointment/contact route. Change if yours differs. */
export const APPOINTMENT_HREF = "/appointment";

/** Stable internal category values. Labels come from BlogPage.categories.* */
export const BLOG_CATEGORIES = ["skin", "hair", "aesthetics", "laser", "general"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogLocale = "en" | "fa" | "ps";
type Localized = Record<BlogLocale, string>;
const L = (en: string, fa: string, ps: string): Localized => ({ en, fa, ps });

/** What the UI components receive: already resolved to one language. */
export interface BlogPostView {
  slug: string;
  title: string;
  excerpt: string;
  /** Paragraphs separated by a blank line; a line starting with "## " is a heading. */
  content: string;
  category: BlogCategory;
  author?: string;
  coverImage?: string;
  coverImageAlt?: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  readingMinutes: number;
}

interface RawPost {
  slug: string;
  category: BlogCategory;
  title: Localized;
  excerpt: Localized;
  content: Localized;
  author?: Localized;
  coverImage?: string;
  coverImageAlt?: Localized;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes?: number;
}

const AUTHOR = L("Dr. Ahmad Fahim Sakha", "دکتر احمد فهیم سخا", "ډاکټر احمد فهیم سخا");

const SAMPLE = L(
  "This is sample article text shown while the blog runs on mock data. Once the blog is connected to the database, the full article content written in the admin dashboard appears here.",
  "این متن نمونه است و تا زمانی که وبلاگ به پایگاه داده وصل نشده نمایش داده می‌شود. پس از اتصال، محتوای کامل مقاله که در پنل مدیریت نوشته شده، در اینجا نمایش داده می‌شود.",
  "دا نمونه متن دی چې تر هغه وخته ښودل کېږي چې بلاګ د ډیټابېس سره نه وي نښلول شوی. وروسته له نښلولو، د مقالې بشپړ محتوا چې په مدیریت پنل کې لیکل شوې دلته ښکاري.",
);

/** Body = the excerpt followed by one clearly labelled sample paragraph. */
const body = (excerpt: Localized): Localized => ({
  en: `${excerpt.en}\n\n${SAMPLE.en}`,
  fa: `${excerpt.fa}\n\n${SAMPLE.fa}`,
  ps: `${excerpt.ps}\n\n${SAMPLE.ps}`,
});

function post(p: Omit<RawPost, "content" | "author">): RawPost {
  return { ...p, author: AUTHOR, content: body(p.excerpt) };
}

const RAW_POSTS: RawPost[] = [
  post({
    slug: "first-six-months-after-hair-transplant",
    category: "hair",
    title: L(
      "What to expect in the first six months after a hair transplant",
      "در شش ماه نخست پس از پیوند مو چه انتظاری داشته باشیم",
      "د ویښتو له بیاکرونې وروسته په لومړیو شپږو میاشتو کې څه تمه وکړو",
    ),
    excerpt: L(
      "A month-by-month look at healing, shedding and regrowth, so new patients know what's normal.",
      "نگاهی ماه‌به‌ماه به روند ترمیم، ریزش و رشد دوباره مو، تا بیماران جدید بدانند چه چیزی عادی است.",
      "د رغیدو، ویښتو د توییدو او بیا ودې میاشتنی کتنه، څو نوي ناروغان پوه شي چې څه معمول دي.",
    ),
    coverImage: `${BLOG_IMAGE_DIR}/recovery-timeline.jpg`,
    coverImageAlt: L(
      "Consultation room at the Sakha clinic",
      "اتاق مشاوره در کلینیک سخا",
      "د سخا په کلینیک کې د مشورې خونه",
    ),
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    readingMinutes: 7,
  }),
  post({
    slug: "fue-vs-dhi-techniques",
    category: "hair",
    title: L(
      "FUE and DHI: how the two techniques actually differ",
      "FUE و DHI: تفاوت واقعی این دو روش در چیست",
      "FUE او DHI: د دې دوو طریقو اصلي توپیر څه دی",
    ),
    excerpt: L(
      "A plain-language comparison of graft extraction and implantation methods.",
      "مقایسه‌ای ساده و روشن از روش‌های استخراج و کاشت گرافت.",
      "د ګرافټ د ایستلو او کښینولو د طریقو ساده او روښانه پرتله.",
    ),
    coverImage: `${BLOG_IMAGE_DIR}/fue-dhi.jpg`,
    coverImageAlt: L(
      "Close-up of a hair restoration procedure",
      "نمای نزدیک از یک روند ترمیم مو",
      "د ویښتو د بیارغونې د پروسې نږدې انځور",
    ),
    publishedAt: "2026-09-02",
    readingMinutes: 6,
  }),
  post({
    slug: "preparing-first-dermatology-consultation",
    category: "skin",
    title: L(
      "Preparing for your first dermatology consultation",
      "آماده‌گی برای نخستین مشاوره‌ی پوستی",
      "د پوستکي د لومړۍ مشورې لپاره چمتووالی",
    ),
    excerpt: L(
      "What to bring, what to expect, and the questions worth asking.",
      "چه باید با خود بیاورید، چه انتظاری داشته باشید و کدام پرسش‌ها ارزش پرسیدن دارند.",
      "څه باید له ځانه سره راوړئ، څه تمه ولرئ، او کومې پوښتنې ارزښت لري.",
    ),
    coverImage: `${BLOG_IMAGE_DIR}/consultation.jpg`,
    coverImageAlt: L(
      "Patient speaking with Dr. Sakha during a consultation",
      "گفت‌وگوی یک بیمار با دکتر سخا در جریان مشاوره",
      "د مشورې پر مهال له ډاکټر سخا سره د ناروغ خبرې",
    ),
    publishedAt: "2026-08-19",
    readingMinutes: 4,
  }),
  post({
    slug: "understanding-hair-loss-patterns",
    category: "hair",
    title: L(
      "Understanding hair loss patterns before choosing a treatment",
      "شناخت الگوهای ریزش مو پیش از انتخاب درمان",
      "د درملنې له ټاکلو مخکې د ویښتو د توییدو بڼو پېژندنه",
    ),
    excerpt: L(
      "Why the right treatment depends on the pattern and stage of hair loss.",
      "چرا درمان مناسب به الگو و مرحله‌ی ریزش مو بستگی دارد.",
      "ولې سمه درملنه د ویښتو د توییدو په بڼه او پړاو پورې اړه لري.",
    ),
    coverImage: `${BLOG_IMAGE_DIR}/hair-loss-patterns.jpg`,
    coverImageAlt: L(
      "Diagram of hair growth stages",
      "نمودار مراحل رشد مو",
      "د ویښتو د ودې د پړاوونو انځور",
    ),
    publishedAt: "2026-08-05",
    readingMinutes: 5,
  }),
  post({
    slug: "sun-protection-after-procedure",
    category: "skin",
    title: L(
      "Sun protection after a dermatology procedure",
      "محافظت از آفتاب پس از یک روند پوستی",
      "د پوستکي له پروسې وروسته د لمر څخه ساتنه",
    ),
    excerpt: L(
      "How to protect healing skin without slowing recovery.",
      "چگونه از پوستِ در حال ترمیم محافظت کنیم بی‌آن‌که روند بهبودی کند شود.",
      "څنګه د رغیدونکي پوستکي ساتنه وکړو پرته له دې چې رغیدل ورو شي.",
    ),
    coverImage: `${BLOG_IMAGE_DIR}/sun-protection.jpg`,
    coverImageAlt: L(
      "Sunscreen bottle on a clinic counter",
      "بوتل ضدآفتاب روی میز کلینیک",
      "د کلینیک پر میز د لمر ضد کریم بوتل",
    ),
    publishedAt: "2026-07-29",
    readingMinutes: 3,
  }),
  post({
    slug: "myths-non-surgical-skin-treatments",
    category: "aesthetics",
    title: L(
      "Common myths about non-surgical skin treatments",
      "باورهای نادرست رایج درباره‌ی درمان‌های غیرجراحی پوست",
      "د پوستکي د غیر جراحي درملنو په اړه عام غلط انګېرنې",
    ),
    excerpt: L(
      "Clearing up a few misconceptions we hear often in consultations.",
      "روشن‌سازی چند برداشت نادرستی که در مشاوره‌ها بارها می‌شنویم.",
      "د څو غلطو انګېرنو روښانه کول چې په مشورو کې یې ډېری اورو.",
    ),
    coverImage: `${BLOG_IMAGE_DIR}/skin-myths.jpg`,
    coverImageAlt: L(
      "Dr. Sakha reviewing notes with a patient",
      "دکتر سخا در حال مرور یادداشت‌ها با بیمار",
      "ډاکټر سخا له ناروغ سره یادښتونه کتل",
    ),
    publishedAt: "2026-07-14",
    readingMinutes: 5,
  }),
  post({
    slug: "eyebrow-transplants-explained",
    category: "hair",
    title: L(
      "How eyebrow transplants are planned and performed",
      "پیوند ابرو چگونه برنامه‌ریزی و انجام می‌شود",
      "د ورځو بیاکرونه څنګه پلان او ترسره کېږي",
    ),
    excerpt: L(
      "The design and technique considerations behind natural-looking results.",
      "ملاحظات طراحی و تخنیک پشت نتایج طبیعی.",
      "د طبیعي ښکاره پایلو تر شا د ډیزاین او تخنیک ملاحظات.",
    ),
    coverImage: `${BLOG_IMAGE_DIR}/eyebrow-transplant.jpg`,
    coverImageAlt: L(
      "Close-up of eyebrow restoration planning",
      "نمای نزدیک از طراحی ترمیم ابرو",
      "د ورځو د بیارغونې د پلان نږدې انځور",
    ),
    publishedAt: "2026-07-06",
    readingMinutes: 6,
  }),
  post({
    slug: "recovery-timelines-compared",
    category: "aesthetics",
    title: L(
      "Recovery timelines: hair transplant vs. non-surgical treatments",
      "زمان بهبودی: پیوند مو در برابر درمان‌های غیرجراحی",
      "د رغېدو وخت: د ویښتو بیاکرونه د غیر جراحي درملنو پر وړاندې",
    ),
    excerpt: L(
      "A side-by-side look at downtime and visible results across treatments.",
      "مقایسه‌ی کنار هم زمان استراحت و نتایج قابل مشاهده در درمان‌ها.",
      "د درملنو ترمنځ د استراحت وخت او ښکاره پایلو پرتله.",
    ),
    coverImage: `${BLOG_IMAGE_DIR}/recovery-comparison.jpg`,
    coverImageAlt: L(
      "Two treatment rooms side by side",
      "دو اتاق درمان در کنار هم",
      "دوه د درملنې خونې ګډ",
    ),
    publishedAt: "2026-06-19",
    readingMinutes: 6,
  }),
];

/* ------------------------------ helpers ------------------------------ */

function estimateReadingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function pick(value: Localized | undefined, locale: BlogLocale) {
  return value?.[locale] || value?.en;
}

function resolve(raw: RawPost, locale: BlogLocale): BlogPostView {
  const content = pick(raw.content, locale) ?? "";
  return {
    slug: raw.slug,
    title: pick(raw.title, locale) ?? raw.slug,
    excerpt: pick(raw.excerpt, locale) ?? "",
    content,
    category: raw.category,
    author: pick(raw.author, locale),
    coverImage: raw.coverImage,
    coverImageAlt: pick(raw.coverImageAlt, locale),
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt,
    readingMinutes: raw.readingMinutes ?? estimateReadingMinutes(content),
  };
}

function toLocale(value: string): BlogLocale {
  return value === "fa" || value === "ps" ? value : "en";
}

const CATEGORY_ALIASES: Record<string, BlogCategory> = {
  skin: "skin",
  dermatology: "skin",
  hair: "hair",
  "hair restoration": "hair",
  "hair transplant": "hair",
  aesthetics: "aesthetics",
  beauty: "aesthetics",
  "medical aesthetics": "aesthetics",
  laser: "laser",
};

/** Maps a free-text DB category (schema uses a plain string) to a stable slug. */
export function toCategorySlug(value: string): BlogCategory {
  return CATEGORY_ALIASES[value.trim().toLowerCase()] ?? "general";
}

/**
 * DB mapping. NOTE: the current Blog model has one title/excerpt/content per
 * document, i.e. one language. For three languages you need either one
 * document per language sharing a slug (add a `locale` field), or a
 * `translations` object on each document. This helper maps a single-language
 * document; decide the schema change before connecting.
 */
export interface BlogDocumentLike {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author?: string;
  coverImage?: string;
  coverImageAlt?: string;
  publishedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export function fromBlogDocument(doc: BlogDocumentLike): BlogPostView {
  const iso = (d: Date | string) => new Date(d).toISOString();
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    category: toCategorySlug(doc.category),
    author: doc.author,
    coverImage: doc.coverImage,
    coverImageAlt: doc.coverImageAlt,
    publishedAt: iso(doc.publishedAt ?? doc.createdAt),
    updatedAt: iso(doc.updatedAt),
    readingMinutes: estimateReadingMinutes(doc.content),
  };
}

/* --------- data access: swap these four bodies for MongoDB queries --------- */

const SORTED = [...RAW_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Published posts in the given language, newest first. */
export async function getPublishedPosts(locale: string): Promise<BlogPostView[]> {
  const l = toLocale(locale);
  return SORTED.map((p) => resolve(p, l));
}

export async function getPostBySlug(slug: string, locale: string): Promise<BlogPostView | null> {
  const raw = SORTED.find((p) => p.slug === slug);
  return raw ? resolve(raw, toLocale(locale)) : null;
}

/** Same-category posts first, then the newest others. Never includes the post itself. */
export async function getRelatedPosts(
  post: BlogPostView,
  locale: string,
  limit = 3,
): Promise<BlogPostView[]> {
  const all = await getPublishedPosts(locale);
  const others = all.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

/** previous = the next older article, next = the next newer one. */
export async function getAdjacentPosts(slug: string, locale: string) {
  const all = await getPublishedPosts(locale);
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: null, next: null };
  return { previous: all[i + 1] ?? null, next: all[i - 1] ?? null };
}