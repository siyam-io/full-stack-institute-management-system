import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Branches, Courses, and Batches...");

  // 1. Seed Branch (Dhanmondi)
  const branch = await prisma.branch.upsert({
    where: { branch_code: "DHA" },
    update: {},
    create: {
      branch_name: "Dhanmondi Campus",
      branch_code: "DHA",
      address: "House-160, Lake Circus, Kalabagan, Dhanmondi, Dhaka",
      contact_email: "info@cibdhk.com",
      contact_phone: "+8801338958997",
      is_active: true,
    },
  });
  console.log(`Branch seeded: ${branch.branch_name} (${branch.id})`);

  // 2. Seed Course (Professional Chef Course)
  const course = await prisma.course.upsert({
    where: { course_code: "PCC-01" },
    update: {},
    create: {
      course_code: "PCC-01",
      slug: "professional-chef-course",
      course_name_en: "Professional Chef Course (Basic to Advance)",
      course_name_bn: "প্রফেশনাল শেফ কোর্স (বেসিক টু অ্যাডভান্স)",
      duration_value: 3,
      duration_unit: "months",
      base_fee: 44000,
      description_en: "Learn 120+ recipes from 16+ countries with hands-on training.",
      is_active: true,
    },
  });
  console.log(`Course seeded: ${course.course_name_en} (${course.id})`);

  // 3. Seed Batch (Batch 11 - Active, Batch 12 - Upcoming)
  const existingBatch11 = await prisma.batch.findFirst({
    where: { branch_id: branch.id, batch_name: "Batch 11" },
  });

  if (!existingBatch11) {
    const batch11 = await prisma.batch.create({
      data: {
        batch_name: "Batch 11",
        start_date: new Date(),
        start_time: "09:00",
        end_time: "13:00",
        schedule_days: ["Sunday", "Tuesday", "Thursday"],
        status: "Active",
        course_id: course.id,
        branch_id: branch.id,
      },
    });
    console.log(`Batch seeded: ${batch11.batch_name} (${batch11.id})`);
  } else {
    console.log("Batch 11 already exists.");
  }

  const existingBatch12 = await prisma.batch.findFirst({
    where: { branch_id: branch.id, batch_name: "Batch 12" },
  });

  if (!existingBatch12) {
    const batch12 = await prisma.batch.create({
      data: {
        batch_name: "Batch 12",
        start_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // In 30 days
        start_time: "14:00",
        end_time: "18:00",
        schedule_days: ["Monday", "Wednesday", "Saturday"],
        status: "Upcoming",
        course_id: course.id,
        branch_id: branch.id,
      },
    });
    console.log(`Batch seeded: ${batch12.batch_name} (${batch12.id})`);
  } else {
    console.log("Batch 12 already exists.");
  }

  console.log("Branches, Courses, and Batches seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding branch/batch data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
