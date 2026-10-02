import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const loadJson = (filePath) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }
  return null;
};

async function main() {
  console.log("Starting DB Seed from static Next.js JSON files...");

  // Paths
  const enHome = loadJson("../web1/content/en/home.json");
  const bnHome = loadJson("../web1/content/bn/home.json");
  const enAbout = loadJson("../web1/content/en/about.json");
  const bnAbout = loadJson("../web1/content/bn/about.json");
  const enFaq = loadJson("../web1/content/en/faq.json");
  const bnFaq = loadJson("../web1/content/bn/faq.json");

  // 1. Seed Home Hero Section
  if (enHome && bnHome) {
    console.log("Seeding home_hero section...");
    const slidesEn = enHome.hero?.slides || [];
    const slidesBn = bnHome.hero?.slides || [];

    const maxSlides = Math.max(slidesEn.length, slidesBn.length);
    const combinedSlides = [];
    for (let i = 0; i < maxSlides; i++) {
      combinedSlides.push({
        image: slidesEn[i]?.image || slidesBn[i]?.image || "",
        primaryButtonHref: slidesEn[i]?.ctaLink || slidesBn[i]?.ctaLink || "/courses",
        titleEn: slidesEn[i]?.headline || "",
        subtitleEn: slidesEn[i]?.subheadline || "",
        primaryButtonTextEn: slidesEn[i]?.ctaText || "",
        titleBn: slidesBn[i]?.headline || "",
        subtitleBn: slidesBn[i]?.subheadline || "",
        primaryButtonTextBn: slidesBn[i]?.ctaText || "",
      });
    }

    const dataEn = {
      eyebrow: "CULINARY EDUCATION",
      title: "Your Dream Chef Career Starts in Dhaka",
      subtitle: "Bangladesh's #1 Professional Chef Course in Dhanmondi, Dhaka.",
      primaryButtonText: "View Courses",
      primaryButtonHref: "/courses",
      secondaryButtonText: "Learn More",
      secondaryButtonHref: "/about",
      heroImageUrl: "/images/principal-dewan-ismail-preparing-fish-for-turkish-cuisine-2-1920w.webp",
      slides: combinedSlides.map((s) => ({
        image: s.image,
        primaryButtonHref: s.primaryButtonHref,
        title: s.titleEn,
        subtitle: s.subtitleEn,
        primaryButtonText: s.primaryButtonTextEn,
      })),
    };

    const dataBn = {
      eyebrow: "রন্ধনশিল্প প্রশিক্ষণ",
      title: "আপনার শেফ ক্যারিয়ার শুরু করুন",
      subtitle: "বাংলাদেশে প্রফেশনাল শেফ কোর্স কোথায় করা যায়?",
      primaryButtonText: "কোর্সসমূহ দেখুন",
      primaryButtonHref: "/courses",
      secondaryButtonText: "আরও জানুন",
      secondaryButtonHref: "/about",
      heroImageUrl: "/images/principal-dewan-ismail-preparing-fish-for-turkish-cuisine-2-1920w.webp",
      slides: combinedSlides.map((s) => ({
        image: s.image,
        primaryButtonHref: s.primaryButtonHref,
        title: s.titleBn,
        subtitle: s.subtitleBn,
        primaryButtonText: s.primaryButtonTextBn,
      })),
    };

    await prisma.cmsSection.upsert({
      where: { sectionKey: "home_hero" },
      update: {
        dataEn: dataEn,
        dataBn: dataBn,
        status: "published",
      },
      create: {
        sectionKey: "home_hero",
        pageKey: "home",
        title: "Home Hero Slider Banner",
        dataEn: dataEn,
        dataBn: dataBn,
        status: "published",
      },
    });
    console.log("Home Hero Seeded successfully.");
  }

  // 2. Seed Professional Chef Course Showcase Section
  if (enHome && bnHome) {
    console.log("Seeding professional_chef_course...");
    const scEn = enHome.courseShowcase || {};
    const scBn = bnHome.courseShowcase || {};

    const dataEn = {
      title: scEn.heading || "Your Global Career Starts Here",
      subtitle: scEn.courseName || "Professional Chef Course (Basic to Advance)",
      feeText: scEn.price || "৳44,000",
      ctaText: scEn.cta || "Start Your Professional Journey",
      ctaHref: scEn.ctaLink || "/courses",
      imageUrl: scEn.image || "/images/student_practice_session_1-1920w.webp",
      highlights: scEn.features || [],
    };

    const dataBn = {
      title: scBn.heading || "আপনার গ্লোবাল ক্যারিয়ার শুরু হোক এখান থেকেই",
      subtitle: scBn.courseName || "প্রফেশনাল শেফ কোর্স (বেসিক টু অ্যাডভান্স)",
      feeText: scBn.price || "৳৪৪,০০০",
      ctaText: scBn.cta || "আপনার প্রফেশনাল যাত্রা শুরু করুন",
      ctaHref: scBn.ctaLink || "/courses",
      imageUrl: scBn.image || "/images/student_practice_session_1-1920w.webp",
      highlights: scBn.features || [],
    };

    await prisma.cmsSection.upsert({
      where: { sectionKey: "professional_chef_course" },
      update: {
        dataEn: dataEn,
        dataBn: dataBn,
        status: "published",
      },
      create: {
        sectionKey: "professional_chef_course",
        pageKey: "home",
        title: "Professional Chef Course Section",
        dataEn: dataEn,
        dataBn: dataBn,
        status: "published",
      },
    });
    console.log("Professional Chef Course Showcase seeded successfully.");
  }

  // 3. Seed Testimonials List
  if (enHome && bnHome) {
    console.log("Seeding testimonials...");
    const listEn = enHome.socialProof?.testimonials || [];
    const listBn = bnHome.socialProof?.testimonials || [];

    // Clear existing
    await prisma.testimonial.deleteMany({});

    for (let i = 0; i < Math.max(listEn.length, listBn.length); i++) {
      const enItem = listEn[i];
      const bnItem = listBn[i];
      if (!enItem && !bnItem) continue;

      await prisma.testimonial.create({
        data: {
          studentNameEn: enItem?.name || bnItem?.name || "Student",
          studentNameBn: bnItem?.name || enItem?.name || "শিক্ষার্থী",
          designationEn: enItem?.batch || bnItem?.batch || "Batch Student",
          designationBn: bnItem?.batch || enItem?.batch || "ব্যাচ শিক্ষার্থী",
          messageEn: enItem?.quote || bnItem?.quote || "",
          messageBn: bnItem?.quote || enItem?.quote || "",
          imageUrl: enItem?.photo || bnItem?.photo || "",
          rating: 5,
          sortOrder: i,
          isActive: true,
        },
      });
    }
    console.log(`Seeded ${Math.max(listEn.length, listBn.length)} testimonials successfully.`);
  }

  // 4. Seed Strategic Team Members List
  if (enAbout && bnAbout) {
    console.log("Seeding strategic team members...");
    const membersEn = enAbout.ourTeam?.members || [];
    const membersBn = bnAbout.ourTeam?.members || [];

    // Clear existing
    await prisma.strategicTeamMember.deleteMany({});

    for (let i = 0; i < Math.max(membersEn.length, membersBn.length); i++) {
      const enItem = membersEn[i];
      const bnItem = membersBn[i];
      if (!enItem && !bnItem) continue;

      // Extract credentials as bio
      const bioEn = (enItem?.credentials || []).join("\n• ");
      const bioBn = (bnItem?.credentials || []).join("\n• ");

      await prisma.strategicTeamMember.create({
        data: {
          nameEn: enItem?.name || bnItem?.name || "Member",
          nameBn: bnItem?.name || enItem?.name || "সদস্য",
          designationEn: enItem?.role || bnItem?.role || "Staff",
          designationBn: bnItem?.role || enItem?.role || "কর্মকর্তা",
          bioEn: bioEn ? `• ${bioEn}` : "",
          bioBn: bioBn ? `• ${bioBn}` : "",
          imageUrl: enItem?.photo || bnItem?.photo || "",
          facebook: "",
          linkedin: "",
          sortOrder: i,
          isActive: true,
        },
      });
    }
    console.log(`Seeded ${Math.max(membersEn.length, membersBn.length)} team members successfully.`);
  }

  // 5. Seed FAQ Marketing Page
  if (enFaq && bnFaq) {
    console.log("Seeding FAQ marketing page...");
    await prisma.marketingPage.upsert({
      where: { slug: "faq" },
      update: {
        title_en: "FAQ",
        title_bn: "জিজ্ঞাসিত প্রশ্নাবলী",
        content_en: enFaq,
        content_bn: bnFaq,
        seo_title_en: enFaq.hero?.heading || "FAQ",
        seo_title_bn: bnFaq.hero?.heading || "জিজ্ঞাসিত প্রশ্নাবলী",
        seo_description_en: enFaq.hero?.subheading || "",
        seo_description_bn: bnFaq.hero?.subheading || "",
      },
      create: {
        slug: "faq",
        title_en: "FAQ",
        title_bn: "জিজ্ঞাসিত প্রশ্নাবলী",
        content_en: enFaq,
        content_bn: bnFaq,
        seo_title_en: enFaq.hero?.heading || "FAQ",
        seo_title_bn: bnFaq.hero?.heading || "জিজ্ঞাসিত প্রশ্নাবলী",
        seo_description_en: enFaq.hero?.subheading || "",
        seo_description_bn: bnFaq.hero?.subheading || "",
      },
    });
    console.log("FAQ marketing page seeded successfully.");
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during DB Seed execution:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
