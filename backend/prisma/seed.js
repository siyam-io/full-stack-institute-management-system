import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PERMISSIONS_LIST = [
  "all_access",
  "view_admin_dashboard",
  "view_branch_dashboard",
  "view_students",
  "add_student",
  "student_payments",
  "student_profile",
  "student_comment",
  "student_edit",
  "student_active_control",
  "student_qrcode",
  "student_certificate",
  "student_delete",
  "view_employees",
  "add_employee",
  "employee_role_control",
  "employee_idcard",
  "employee_qrcode",
  "employee_active_status",
  "employee_edit",
  "employee_delete",
  "view_courses",
  "course_active",
  "course_edit",
  "course_delete",
  "course_publish",
  "view_syllabus",
  "syllabus_edit",
  "syllabus_delete",
  "view_inventory",
  "inventory_requisition_action",
  "inventory_add_stock",
  "view_branches",
  "branch_active_status",
  "branch_edit",
  "branch_delete",
  "view_all_batches",
  "add_batch",
  "batch_edit",
  "batch_delete",
  "view_batch_workspace",
  "view_batch_calendar",
  "send_requisition",
  "take_attendance",
  "curriculum_matrix",
  "view_attendance_book",
  "view_my_profile",
  "update_my_profile",
  "view_settings",
  "manage_roles",
  "manage_settings",
  "blog_view",
  "blog_create",
  "blog_edit",
  "blog_delete",
  "blog_publish",
  "cms_view",
  "cms_edit",
  "testimonial_view",
  "testimonial_edit",
  "team_view",
  "team_edit",
];

const firstNames = ["Rahman", "Siddique", "Islam", "Hasan", "Ahmed", "Chowdhury", "Alam", "Khan", "Ali", "Jahan", "Yasmin", "Akter", "Khatun", "Begum", "Sultana"];
const lastNames = ["Siyam", "Nabil", "Arif", "Tasnim", "Fahim", "Nadia", "Sadia", "Zahid", "Tamim", "Farhan", "Rifat", "Adnan", "Anika", "Mitu", "Imran"];

function getRandomName() {
  const f = firstNames[Math.floor(Math.random() * firstNames.length)];
  const l = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${f} ${l}`;
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log("🌱 Starting deep seed process for SQL database...");

  // Clean old data in safe sequence
  console.log("Cleaning existing database tables...");
  await prisma.cmsSection.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.discountLog.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.invoiceItem.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.classContent.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.batch.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.branch.deleteMany({});
  await prisma.course.deleteMany({});

  // 1. Branches
  console.log("Creating branches...");
  const branches = [
    await prisma.branch.create({
      data: {
        branch_name: "Dhaka Campus",
        branch_code: "DHK",
        address: "123 Gulshan Avenue, Dhaka 1212",
        contact_email: "dhaka@cibdhk.com",
        contact_phone: "+8801700000001",
      },
    }),
    await prisma.branch.create({
      data: {
        branch_name: "Chittagong Campus",
        branch_code: "CTG",
        address: "45 Agrabad C/A, Chittagong 4100",
        contact_email: "ctg@cibdhk.com",
        contact_phone: "+8801700000002",
      },
    }),
    await prisma.branch.create({
      data: {
        branch_name: "Sylhet Campus",
        branch_code: "SYL",
        address: "78 Zindabazar, Sylhet 3100",
        contact_email: "sylhet@cibdhk.com",
        contact_phone: "+8801700000003",
      },
    }),
  ];

  // 2. Roles
  console.log("Creating roles...");
  const superadminRole = await prisma.role.create({
    data: {
      name: "superadmin",
      description: "Full system access with all permissions",
      permissions: PERMISSIONS_LIST,
      is_system_role: true,
    },
  });

  const instructorRole = await prisma.role.create({
    data: {
      name: "instructor",
      description: "Teaching staff",
      permissions: ["view_branch_dashboard", "view_students", "student_profile", "student_comment", "view_all_batches", "view_batch_workspace", "take_attendance"],
    },
  });

  const accountantRole = await prisma.role.create({
    data: {
      name: "accountant",
      description: "Finance management",
      permissions: ["view_branch_dashboard", "view_students", "student_payments", "student_profile"],
    },
  });

  // 3. Users
  console.log("Creating users...");
  const passwordHash = await bcrypt.hash("123456", 10);
  
  // Target user from request
  const ssiyamUser = await prisma.user.create({
    data: {
      username: "ssiyam563",
      email: "ssiyam563@gmail.com",
      password: passwordHash,
      full_name: "Siyam Chowdhury",
      employee_id: "EMP-001",
      designation: "Super Admin",
      department: "Administration",
      status: "Active",
      role_id: superadminRole.id,
      branch_id: branches[0].id,
    },
  });

  const instructors = [
    await prisma.user.create({
      data: {
        username: "instructor1",
        email: "instructor1@cibdhk.com",
        password: passwordHash,
        full_name: "Chef Arif Hasan",
        employee_id: "EMP-002",
        designation: "Senior Culinary Instructor",
        department: "Culinary Arts",
        status: "Active",
        role_id: instructorRole.id,
        branch_id: branches[0].id,
      },
    }),
    await prisma.user.create({
      data: {
        username: "instructor2",
        email: "instructor2@cibdhk.com",
        password: passwordHash,
        full_name: "Chef Tasnim Rahman",
        employee_id: "EMP-003",
        designation: "Pastry Chef Instructor",
        department: "Pastry & Bakery",
        status: "Active",
        role_id: instructorRole.id,
        branch_id: branches[1].id,
      },
    }),
  ];

  const accountant = await prisma.user.create({
    data: {
      username: "accountant1",
      email: "accountant@cibdhk.com",
      password: passwordHash,
      full_name: "Zahid Ahmed",
      employee_id: "EMP-004",
      designation: "Branch Accountant",
      department: "Finance",
      status: "Active",
      role_id: accountantRole.id,
      branch_id: branches[0].id,
    },
  });

  // 4. Courses
  console.log("Creating courses...");
  const courses = [
    await prisma.course.create({
      data: {
        course_name_en: "Basic Professional Cookery",
        course_code: "BPC-101",
        slug: "basic-professional-cookery",
        duration_value: 6,
        duration_unit: "months",
        base_fee: 25000,
        additional_info: ["Knife Skills", "Sauces", "Hygiene"],
      },
    }),
    await prisma.course.create({
      data: {
        course_name_en: "Advanced Pastry & Bakery",
        course_code: "APB-201",
        slug: "advanced-pastry-bakery",
        duration_value: 4,
        duration_unit: "months",
        base_fee: 32000,
        additional_info: ["Cakes", "Chocolates", "Plated Desserts"],
      },
    }),
    await prisma.course.create({
      data: {
        course_name_en: "International Cuisine Culinary",
        course_code: "ICC-301",
        slug: "international-cuisine-culinary",
        duration_value: 12,
        duration_unit: "months",
        base_fee: 65000,
        additional_info: ["French Cuisine", "Asian Fusion", "Italian"],
      },
    }),
  ];

  // 5. Historic Data Seeding

  // 6. Batches, Students, Fees, Payments, Classes, Requisitions & Expenses over last 3 years
  console.log("Generating 3 years of historic data (2023 - 2026)...");

  // We will create batches for 2023, 2024, 2025, and early 2026.
  const years = [2023, 2024, 2025, 2026];
  let studentCounter = 1000;

  for (const year of years) {
    // Generate batches in each year
    const numBatches = year === 2026 ? 3 : 5; // less for current year
    for (let b = 1; b <= numBatches; b++) {
      const branch = getRandomElement(branches);
      const course = getRandomElement(courses);
      const instructor = getRandomElement(instructors);
      
      const batchName = `${course.course_name_en} (Batch ${b}, ${year})`;
      
      // Determine status & dates
      let status = "Completed";
      let startDate = new Date(`${year}-02-10`);
      if (b % 2 === 0) startDate = new Date(`${year}-07-15`);
      
      // For 2026, let's have some active/upcoming ones
      if (year === 2026) {
        if (b === 1) {
          status = "Active";
          startDate = new Date("2026-03-01");
        } else if (b === 2) {
          status = "Upcoming";
          startDate = new Date("2026-08-01");
        } else {
          status = "Active";
          startDate = new Date("2026-01-15");
        }
      }

      const batch = await prisma.batch.create({
        data: {
          batch_name: batchName,
          start_date: startDate,
          schedule_days: ["Sunday", "Tuesday", "Thursday"],
          start_time: "09:00 AM",
          end_time: "01:00 PM",
          status,
          course_id: course.id,
          branch_id: branch.id,
        },
      });

      // Explicitly assign batch instructor
      await prisma.batchInstructor.create({
        data: {
          batch_id: batch.id,
          instructor_id: instructor.id,
        },
      });

      // Create students in this batch (6 to 12 students per batch)
      const numStudents = Math.floor(Math.random() * 7) + 6;
      for (let s = 1; s <= numStudents; s++) {
        studentCounter++;
        const studentName = getRandomName();
        const stdId = `ST-${year}-${studentCounter}`;
        const issueDate = startDate;
        
        let studentStatus = status === "Completed" ? "completed" : "active";
        let completionDate = null;
        if (studentStatus === "completed") {
          completionDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 30 * course.duration_value);
        }

        const student = await prisma.student.create({
          data: {
            student_name: studentName,
            fathers_name: `Father of ${studentName}`,
            student_id: stdId,
            registration_number: `REG-${year}-${studentCounter}`,
            competency: studentStatus === "completed" ? "competent" : "not_assessed",
            status: studentStatus,
            is_active: true,
            admission_date: issueDate,
            completion_date: completionDate,
            gender: Math.random() > 0.5 ? "male" : "female",
            contact_number: `+88017${Math.floor(10000000 + Math.random() * 90000000)}`,
            email: `${studentName.toLowerCase().replace(/\s/g, "")}@example.com`,
            address: "Mirpur, Dhaka",
            batch_id: batch.id,
          },
        });

        // Create Invoice, InvoiceItems and Payments for student
        const totalAmount = course.base_fee;
        const discount = Math.random() > 0.7 ? 2000 : 0;
        const netPayable = totalAmount - discount;
        
        let paidAmount = 0;
        let invoiceStatus = "UNPAID";
        if (status === "Completed") {
          paidAmount = netPayable;
          invoiceStatus = "PAID";
        } else if (status === "Active") {
          paidAmount = Math.random() > 0.4 ? Math.floor(netPayable / 2) : 0;
          invoiceStatus = paidAmount === netPayable ? "PAID" : paidAmount > 0 ? "PARTIALLY_PAID" : "UNPAID";
        }

        const invoice = await prisma.invoice.create({
          data: {
            invoice_no: `INV-${year}-${studentCounter}`,
            total_amount: totalAmount,
            discount: discount,
            net_payable: netPayable,
            paid_amount: paidAmount,
            status: invoiceStatus,
            student_id: student.id,
            items: {
              create: [
                {
                  description: `Course Admission & Tuition Fee - ${course.course_name_en || course.course_name_bn}`,
                  amount: totalAmount,
                }
              ]
            }
          },
        });

        // Add payment transactions
        if (paidAmount > 0) {
          const numPayments = paidAmount === netPayable ? (Math.random() > 0.5 ? 2 : 1) : 1;
          const partAmt = Math.floor(paidAmount / numPayments);
          
          for (let p = 0; p < numPayments; p++) {
            const payDate = getRandomDate(startDate, new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 30 * 2));
            await prisma.payment.create({
              data: {
                amount: partAmt,
                payment_method: getRandomElement(["CASH", "BKASH", "NAGAD", "BANK_TRANSFER"]),
                transaction_id: `TXN${payDate.getTime()}`,
                receipt_number: `REC-${payDate.getFullYear()}-${studentCounter}-${p}`,
                remarks: "Part payment for course enrollment",
                created_at: payDate,
                invoice_id: invoice.id,
                collected_by: ssiyamUser.id,
              },
            });
          }
        }
      }

      // Create some Classes (ClassContent) for the batch
      const numClasses = status === "Completed" ? 10 : status === "Active" ? 4 : 0;
      for (let cNum = 1; cNum <= numClasses; cNum++) {
        const classDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 7 * cNum);
        const classContent = await prisma.classContent.create({
          data: {
            class_number: cNum,
            topic: `Lesson Topic ${cNum}: Culinary Practical Skills`,
            content_details: [`Practical subtopic A`, `Safety exercise B`],
            date_scheduled: classDate,
            is_completed: status === "Completed" || (status === "Active" && classDate < new Date()),
            created_at: classDate,
            batch_id: batch.id,
            instructor_id: instructor.id,
          },
        });

      }
    }
  }

  // 7. CMS Sections
  console.log("Seeding CMS sections for landing pages...");
  await prisma.cmsSection.create({
    data: {
      sectionKey: "home_hero",
      pageKey: "home",
      title: "Home Page Hero Banner",
      isActive: true,
      dataEn: {
        eyebrow: "NSDA Accredited Institute",
        title: "Your Dream Chef Career Starts in Dhaka",
        subtitle: "Bangladesh's #1 Professional Chef Course in Dhanmondi. Learn 120+ recipes, master global cuisines, and secure placement in top hotels.",
        heroImageUrl: "/images/principal-dewan-ismail-preparing-fish-for-turkish-cuisine-2-1920w.webp",
        primaryButtonText: "Explore Courses",
        primaryButtonHref: "/courses",
        secondaryButtonText: "Book a Campus Tour",
        secondaryButtonHref: "/contact",
        stats: [
          { label: "Students Placed", value: "500+" },
          { label: "Hiring Partners", value: "10+" },
          { label: "Success Rate", value: "95%" }
        ],
        slides: [
          {
            image: "/images/principal-dewan-ismail-preparing-fish-for-turkish-cuisine-2-1920w.webp",
            title: "Your Dream Chef Career Starts in Dhaka",
            subtitle: "Bangladesh's #1 Professional Chef Course in Dhanmondi.",
            primaryButtonText: "Explore Courses",
            primaryButtonHref: "/courses"
          }
        ]
      },
      dataBn: {
        eyebrow: "এনএসডিএ অনুমোদিত ইনস্টিটিউট",
        title: "ঢাকায় আপনার স্বপ্নের শেফ ক্যারিয়ার শুরু হোক",
        subtitle: "ধানমন্ডিতে বাংলাদেশের ১ নম্বর প্রফেশনাল শেফ কোর্স। ১২০+ রেসিপি শিখুন, গলোবাল কুইজিন আয়ত্ত করুন এবং ইন্টার্নশিপ নিশ্চিত করুন।",
        heroImageUrl: "/images/principal-dewan-ismail-preparing-fish-for-turkish-cuisine-2-1920w.webp",
        primaryButtonText: "কোর্সসমূহ দেখুন",
        primaryButtonHref: "/courses",
        secondaryButtonText: "ক্যাম্পাস ট্যুর বুক করুন",
        secondaryButtonHref: "/contact",
        stats: [
          { label: "ছাত্রছাত্রী প্লেসমেন্ট", value: "৫০০+" },
          { label: "হায়ারিং পার্টনার", value: "১০+" },
          { label: "সফলতার হার", value: "৯৫%" }
        ],
        slides: [
          {
            image: "/images/principal-dewan-ismail-preparing-fish-for-turkish-cuisine-2-1920w.webp",
            title: "ঢাকায় আপনার স্বপ্নের শেফ ক্যারিয়ার শুরু হোক",
            subtitle: "ধানমন্ডিতে বাংলাদেশের ১ নম্বর প্রফেশনাল শেফ কোর্স।",
            primaryButtonText: "কোর্সসমূহ দেখুন",
            primaryButtonHref: "/courses"
          }
        ]
      },
      seoTitleEn: "CIB Chef Course Dhaka | NSDA Accredited Culinary Institute",
      seoTitleBn: "সিআইবি শেফ কোর্স ঢাকা | প্রফেশনাল কুকিং ট্রেনিং",
      seoDescriptionEn: "Enroll in the leading culinary arts institute in Dhaka.",
      seoDescriptionBn: "ঢাকায় প্রফেশনাল কুকিং ও শেফ কোর্সে ভর্তি হয়ে আপনার আন্তর্জাতিক ক্যারিয়ার গড়ুন।",
      status: "published"
    }
  });

  await prisma.cmsSection.create({
    data: {
      sectionKey: "professional_chef_course",
      pageKey: "home",
      title: "Professional Chef Course Showcase",
      isActive: true,
      dataEn: {
        title: "Professional Chef Course (Basic to Advance)",
        subtitle: "Become a Professional Chef in 6 Months",
        overview: "Become a professional chef with hands-on training on 120+ recipes across 16+ cuisines.",
        imageUrl: "/images/practical_class_1-1920w.webp",
        durationText: "6 Months",
        feeText: "৳44,000",
        ctaText: "Apply Now",
        ctaHref: "/admission",
        highlights: ["100% Practical Labs", "NSDA Level 2 & 3", "5-Star Hotel Placements"],
        curriculum: ["Knife Skills & Safety", "Sauces & Appetizers", "Global Cuisines", "Pastry & Baking (Bonus)"]
      },
      dataBn: {
        title: "প্রফেশনাল শেফ কোর্স (বেসিক টু অ্যাডভান্স)",
        subtitle: "৬ মাসে প্রফেশনাল শেফ হয়ে উঠুন",
        overview: "১৬টিরও বেশি দেশের ১২০+ রেসিপি হাতে-কলমে প্র্যাকটিস করে পেশাদার শেফ হিসেবে ক্যারিয়ার গড়ুন।",
        imageUrl: "/images/practical_class_1-1920w.webp",
        durationText: "৬ মাস",
        feeText: "৳৪৪,০০০",
        ctaText: "এখনই আবেদন করুন",
        ctaHref: "/admission",
        highlights: ["১০০% প্র্যাকটিক্যাল ল্যাব", "এনএসডিএ লেভেল ২ ও ৩", "৫-স্টার হোটেল প্লেসমেন্ট"],
        curriculum: ["নাইফ স্কিল ও সেফটি", "সস ও অ্যাপেটাইজার ল্যাব", "গ্লোবাল কুইজিন প্র্যাকটিস", "পেস্ট্রি ও বেকারি (বোনাস)"]
      },
      seoTitleEn: "Professional Chef Course in Dhaka | CIB",
      seoTitleBn: "প্রফেশনাল শেফ কোর্স ঢাকা | সিআইবি",
      seoDescriptionEn: "Professional culinary arts training.",
      seoDescriptionBn: "হাতে-কলমে জাপানিজ, ইতালিয়ান কুইজিন প্র্যাকটিস করুন।",
      status: "published"
    }
  });

  // 8. Testimonials
  console.log("Seeding testimonials...");
  await prisma.testimonial.create({
    data: {
      studentNameEn: "Rehana Akhter",
      studentNameBn: "রেহানা আক্তার",
      designationEn: "Pastry Chef, Westin Dhaka",
      designationBn: "পেস্ট্রি শেফ, ওয়েস্টিন ঢাকা",
      messageEn: "CIB changed my career! The hands-on training and mentorship helped me secure a premium hotel placement.",
      messageBn: "সিআইবি আমার ক্যারিয়ার বদলে দিয়েছে! এখানকার হ্যান্ডস-অন প্র্যাকটিস আমাকে হোটেল প্লেসমেন্ট পেতে দারুণ সাহায্য করেছে।",
      imageUrl: "",
      rating: 5,
      sortOrder: 1,
      isActive: true
    }
  });

  // 9. Strategic Team Members
  console.log("Seeding strategic team members...");
  await prisma.strategicTeamMember.create({
    data: {
      user_id: instructors[0].id,
      nameEn: "Chef Arif Hasan",
      nameBn: "শেফ আরিফ হাসান",
      designationEn: "Senior Culinary Instructor",
      designationBn: "সিনিয়র কালিনারি প্রশিক্ষক",
      bioEn: "Over 12 years of experience in luxury 5-star hotel kitchens.",
      bioBn: "লাক্সারি ৫-স্টার হোটেলের কিচেনে ১২ বছরেরও বেশি কাজের অভিজ্ঞতা রয়েছে।",
      imageUrl: "",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      sortOrder: 1,
      isActive: true
    }
  });

  await prisma.strategicTeamMember.create({
    data: {
      user_id: instructors[1].id,
      nameEn: "Chef Tasnim Rahman",
      nameBn: "শেফ তাসনিম রহমান",
      designationEn: "Pastry Chef Instructor",
      designationBn: "পেস্ট্রি শেফ প্রশিক্ষক",
      bioEn: "Specializes in French patisserie and modern baking styles.",
      bioBn: "ফ্রেঞ্চ পেস্ট্রি এবং আধুনিক বেকিং স্টাইলে দক্ষ প্রশিক্ষক।",
      imageUrl: "",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      sortOrder: 2,
      isActive: true
    }
  });

  console.log("🌱 Database successfully seeded with 3 years of detailed historical data!");
  console.log("------------------------------------------------------------------");
  console.log("Login user details:");
  console.log("Superadmin Email: ssiyam563@gmail.com");
  console.log("Password:         123456");
  console.log("------------------------------------------------------------------");
}

main()
  .catch((e) => {
    console.error("Error seeding SQL database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
