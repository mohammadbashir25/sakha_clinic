import type {
  BlogPost,
  ContentStats,
  MediaImage,
  Testimonial,
} from "@/types/admin";

/**
 * Mock content for the admin UI while the frontend is being built.
 * Replace these arrays with real data later — the components only
 * depend on the types in `types/admin.ts`, not on this file.
 */

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "What to expect in the first six months after a hair transplant",
    slug: "first-six-months-after-hair-transplant",
    excerpt:
      "A month-by-month look at healing, shedding and regrowth, so new patients know what's normal.",
    category: "Hair Restoration",
    author: "Dr. Amina Rahimi",
    status: "published",
    date: "2026-09-08",
    createdAt: "2026-09-02",
    updatedAt: "2026-09-08",
    coverImage: "/images/blog/recovery-timeline.jpg",
    coverImageAlt: "Consultation room at the Sakha clinic",
  },
  {
    id: "2",
    title: "FUE and DHI: how the two techniques actually differ",
    slug: "fue-vs-dhi-techniques",
    excerpt:
      "A plain-language comparison of graft extraction and implantation methods.",
    category: "Hair Restoration",
    author: "Dr. Bilal Stanikzai",
    status: "published",
    date: "2026-09-02",
    createdAt: "2026-08-27",
    updatedAt: "2026-09-02",
    coverImage: "/images/blog/fue-dhi.jpg",
    coverImageAlt: "Close-up of a hair restoration procedure",
  },
  {
    id: "3",
    title: "Caring for your skin through a Mazar-e-Sharif summer",
    slug: "summer-skincare-mazar-e-sharif",
    excerpt:
      "Simple adjustments to a skincare routine for the region's hottest months.",
    category: "Dermatology",
    author: "Dr. Farah Noori",
    status: "draft",
    date: "2026-08-28",
    createdAt: "2026-08-25",
    updatedAt: "2026-08-28",
    coverImage: "/images/blog/summer-skincare.jpg",
    coverImageAlt: "Dermatology treatment room",
  },
  {
    id: "4",
    title: "Preparing for your first dermatology consultation",
    slug: "preparing-first-dermatology-consultation",
    excerpt: "What to bring, what to expect, and the questions worth asking.",
    category: "Dermatology",
    author: "Dr. Farah Noori",
    status: "published",
    date: "2026-08-19",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-19",
    coverImage: "/images/blog/consultation.jpg",
    coverImageAlt: "Patient speaking with a Sakha dermatologist",
  },
  {
    id: "5",
    title: "A guide to our non-surgical facial treatments",
    slug: "non-surgical-facial-treatments",
    excerpt:
      "An overview of the clinic's non-invasive options and what each one addresses.",
    category: "Beauty",
    author: "Dr. Amina Rahimi",
    status: "draft",
    date: "2026-08-11",
    createdAt: "2026-08-06",
    updatedAt: "2026-08-11",
    coverImage: "/images/blog/facial-treatments.jpg",
    coverImageAlt: "Treatment tools arranged on a tray",
  },
  {
    id: "6",
    title: "Understanding hair loss patterns before choosing a treatment",
    slug: "understanding-hair-loss-patterns",
    excerpt:
      "Why the right treatment depends on the pattern and stage of hair loss.",
    category: "Hair Restoration",
    author: "Dr. Bilal Stanikzai",
    status: "published",
    date: "2026-08-05",
    createdAt: "2026-07-30",
    updatedAt: "2026-08-05",
    coverImage: "/images/blog/hair-loss-patterns.jpg",
    coverImageAlt: "Diagram of hair growth stages",
  },
  {
    id: "7",
    title: "Sun protection after a dermatology procedure",
    slug: "sun-protection-after-procedure",
    excerpt: "How to protect healing skin without slowing recovery.",
    category: "Dermatology",
    author: "Dr. Farah Noori",
    status: "published",
    date: "2026-07-29",
    createdAt: "2026-07-24",
    updatedAt: "2026-07-29",
    coverImage: "/images/blog/sun-protection.jpg",
    coverImageAlt: "Sunscreen bottle on a clinic counter",
  },
  {
    id: "8",
    title: "What a hairline consultation actually involves",
    slug: "hairline-consultation-explained",
    excerpt:
      "A walkthrough of the assessment used to plan a natural-looking hairline.",
    category: "Hair Restoration",
    author: "Dr. Amina Rahimi",
    status: "draft",
    date: "2026-07-22",
    createdAt: "2026-07-18",
    updatedAt: "2026-07-22",
    coverImage: "/images/blog/hairline-consultation.jpg",
    coverImageAlt: "Marking guide used during a hairline consultation",
  },
  {
    id: "9",
    title: "Common myths about non-surgical skin treatments",
    slug: "myths-non-surgical-skin-treatments",
    excerpt: "Clearing up a few misconceptions we hear often in consultations.",
    category: "Beauty",
    author: "Dr. Farah Noori",
    status: "published",
    date: "2026-07-14",
    createdAt: "2026-07-09",
    updatedAt: "2026-07-14",
    coverImage: "/images/blog/skin-myths.jpg",
    coverImageAlt: "Dermatologist reviewing notes with a patient",
  },
  {
    id: "10",
    title: "How eyebrow transplants are planned and performed",
    slug: "eyebrow-transplants-explained",
    excerpt:
      "The design and technique considerations behind natural-looking results.",
    category: "Hair Restoration",
    author: "Dr. Bilal Stanikzai",
    status: "published",
    date: "2026-07-06",
    createdAt: "2026-07-01",
    updatedAt: "2026-07-06",
    coverImage: "/images/blog/eyebrow-transplant.jpg",
    coverImageAlt: "Close-up of eyebrow restoration planning",
  },
  {
    id: "11",
    title: "Building a simple, effective daily skincare routine",
    slug: "simple-daily-skincare-routine",
    excerpt: "The handful of steps that matter most, in the order they matter.",
    category: "Dermatology",
    author: "Dr. Farah Noori",
    status: "draft",
    date: "2026-06-28",
    createdAt: "2026-06-24",
    updatedAt: "2026-06-28",
    coverImage: "/images/blog/daily-skincare.jpg",
    coverImageAlt: "Skincare routine laid out on a shelf",
  },
  {
    id: "12",
    title: "Recovery timelines: hair transplant vs. non-surgical treatments",
    slug: "recovery-timelines-compared",
    excerpt:
      "A side-by-side look at downtime and visible results across treatments.",
    category: "Beauty",
    author: "Dr. Amina Rahimi",
    status: "published",
    date: "2026-06-19",
    createdAt: "2026-06-14",
    updatedAt: "2026-06-19",
    coverImage: "/images/blog/recovery-comparison.jpg",
    coverImageAlt: "Two treatment rooms side by side",
  },
];

export const mockImages: MediaImage[] = [
  {
    id: "1",
    title: "Reception, ground floor",
    category: "Clinic",
    url: "/images/media/reception.jpg",
    filename: "reception.jpg",
    description: "Sakha clinic reception area",
    alt: "Sakha clinic reception area",
    uploadedAt: "2026-09-10",

  },
  {
    id: "2",
    title: "Consultation room",
    category: "Clinic",
    url: "/images/media/consultation-room.jpg",
    filename: "consultation-room.jpg",
    description: "Private consultation room",
    alt: "Private consultation room",
    uploadedAt: "2026-09-09",
  },
  {
    id: "3",
    title: "Dr. Rahimi portrait",
    category: "Team",
    url: "/images/media/dr-rahimi.jpg",
    filename: "dr-rahimi.jpg",
    description: "Portrait of Dr. Rahimi",
    alt: "Portrait of Dr. Rahimi",
    uploadedAt: "2026-09-05",
  },
  {
    id: "4",
    title: "Procedure suite",
    category: "Clinic",
    url: "/images/media/procedure-suite.jpg",
    filename: "procedure-suite.jpg",
    description: "Hair transplant procedure suite",
    alt: "Hair transplant procedure suite",
    uploadedAt: "2026-09-04",
  },
  {
    id: "5",
    title: "Skincare products",
    category: "Treatments",
    url: "/images/media/skincare-shelf.jpg",
    filename: "skincare-shelf.jpg",
    description: "Shelf of skincare products",
    alt: "Shelf of skincare products",
    uploadedAt: "2026-08-30",
  },
  {
    id: "6",
    title: "Waiting lounge",
    category: "Clinic",
    url: "/images/media/waiting-lounge.jpg",
    filename: "waiting-lounge.jpg",
    description: "Waiting lounge with seating",
    alt: "Waiting lounge with seating",
    uploadedAt: "2026-08-27",
  },
];
export const imageCategories = Array.from(
  new Set(mockImages.map((image) => image.category)),
).sort();

/** Used by the testimonials page — kept here so all mock content lives together. */
export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmad N.",
    treatment: "Hair Transplant",
    quote:
      "The team explained every stage before we started. Six months on, the result looks completely natural.",
    rating: 5,
    published: true,
    date: "2026-09-01",
  },
  {
    id: "2",
    name: "Zahra M.",
    treatment: "Dermatology",
    quote:
      "Calm, clean and unhurried. I never felt rushed through an appointment.",
    rating: 5,
    published: true,
    date: "2026-08-22",
  },
  {
    id: "3",
    name: "Farid H.",
    treatment: "Beauty",
    quote:
      "Good advice, no upselling. They told me honestly what I did and didn't need.",
    rating: 4,
    published: false,
    date: "2026-08-14",
  },
];

/** Derived from the mock arrays so the numbers always match what's on screen. */
export const mockStats: ContentStats = {
  totalBlogs: mockBlogPosts.length,
  published: mockBlogPosts.filter((post) => post.status === "published").length,
  drafts: mockBlogPosts.filter((post) => post.status === "draft").length,
  images: mockImages.length,
};

export const recentBlogPosts = [...mockBlogPosts]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 5);

export const recentImages = [...mockImages]
  .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
  .slice(0, 6);

/** Categories actually used by the mock posts — the blogs filter reads this, nothing hardcoded. */
export const blogCategories = Array.from(
  new Set(mockBlogPosts.map((post) => post.category)),
).sort();
