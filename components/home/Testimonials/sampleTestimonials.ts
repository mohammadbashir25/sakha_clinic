/**
 * DEVELOPMENT-ONLY SAMPLE DATA — NOT REAL PATIENT TESTIMONIALS.
 *
 * These are invented placeholders so the Testimonials layout can be designed
 * and tested in English, Dari (fa) and Pashto (ps) before the MongoDB model
 * and admin-managed content exist. The names are fictional. They make no
 * result claims, give no ratings, and contain no personal or medical detail.
 *
 * They are NEVER shown in production builds (see `getTestimonials.ts`), and
 * this file should be deleted once real testimonials come from the database.
 * Presenting invented reviews to real visitors would be misleading.
 */

import type { Locale } from "@/i18n/config";

type Localized = Record<Locale, string>;

interface SampleTestimonial {
  id: string;
  name: Localized;
  content: Localized;
  treatment?: Localized;
}

export const sampleTestimonials: SampleTestimonial[] = [
  {
    id: "sample-1",
    name: { en: "Ahmad", fa: "احمد", ps: "احمد" },
    treatment: {
      en: "Hair transplantation",
      fa: "پیوند مو",
      ps: "د ویښتانو پیوند",
    },
    content: {
      en: "The consultation was unhurried and clear. Everything was explained before any decision was made, and I never felt pushed toward a treatment.",
      fa: "مشاوره بدون عجله و روشن بود. پیش از هر تصمیمی همه چیز توضیح داده شد و هیچ‌وقت احساس نکردم که به سوی یک درمان خاص تحت فشار هستم.",
      ps: "مشوره پرته له بیړې او روښانه وه. د هر پریکړې دمخه ټول شیان تشریح شول او ما هیڅکله دا احساس ونه کړ چې یوې ځانګړې درملنې ته زورول کېږم.",
    },
  },
  {
    id: "sample-2",
    name: { en: "Maryam", fa: "مریم", ps: "مریم" },
    treatment: {
      en: "Skin care",
      fa: "مراقبت از پوست",
      ps: "د پوستکي پاملرنه",
    },
    content: {
      en: "I appreciated that the focus was on what suited my skin rather than doing more. The explanation was honest and the follow-up felt attentive.",
      fa: "برایم ارزشمند بود که تمرکز بر چیزی بود که به پوست من مناسب است، نه انجام دادن کارهای بیشتر. توضیحات صادقانه بود و پیگیری با دقت انجام شد.",
      ps: "ما ته دا ښه ښکاره شوه چې تمرکز په هغه څه و چې زما پوستکي ته ښه دي، نه په ډېر کار کولو. توضیحات صادقانه وو او تعقیب په پاملرنې سره وشو.",
    },
  },
  {
    id: "sample-3",
    name: { en: "Zarmina", fa: "زرمینه", ps: "زرمینه" },
    treatment: {
      en: "Medical aesthetics",
      fa: "زیبایی طبی",
      ps: "طبي ښکلا",
    },
    content: {
      en: "I wanted something subtle, and that was respected throughout. The result still looks like me, which was exactly what I hoped for.",
      fa: "من چیزی ظریف و طبیعی می‌خواستم و این خواسته در تمام مراحل در نظر گرفته شد. نتیجه هنوز مثل خودم به نظر می‌رسد، همان چیزی که امید داشتم.",
      ps: "ما یو نرم او طبیعي څه غوښتل او دا غوښتنه په ټولو پړاوونو کې په پام کې ونیول شوه. پایله لا هم زما په څیر ښکاري، دقیقاً هغه څه چې ما هیله درلوده.",
    },
  },
];
