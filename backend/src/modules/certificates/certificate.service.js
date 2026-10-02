import prisma from "../../core/db/prisma.js";
import { serializeStudent, serializeUser } from "../../core/utils/serialize.js";
import AppError from "../../core/errors/AppError.js";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export const generateCertificate = async (studentId) => {
  const rows = await prisma.$queryRaw`
    SELECT s.*,
      json_build_object('id', c.id, 'course_name', c.course_name_en, 'course_code', c.course_code,
                        'duration_value', c.duration_value, 'duration_unit', c.duration_unit,
                        'base_fee', c.base_fee, 'additional_info', c.additional_info,
                        'description', c.description_en, 'is_active', c.is_active,
                        'created_at', c.created_at, 'updated_at', c.updated_at) AS course,
      json_build_object('id', bat.id, 'batch_name', bat.batch_name, 'start_date', bat.start_date,
                        'start_time', bat.start_time, 'end_time', bat.end_time,
                        'schedule_days', bat.schedule_days, 'status', bat.status,
                        'created_at', bat.created_at, 'updated_at', bat.updated_at) AS batch
    FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "courses" c ON c.id = bat.course_id
    WHERE s.id = CAST(${studentId} AS uuid)
    LIMIT 1
  `;
  if (!rows[0]) throw new AppError("Student not found", 404);
  return serializeStudent(rows[0]);
};

export const sendCertificateEmail = async (studentId) => {
  const rows = await prisma.$queryRaw`
    SELECT id FROM "students" WHERE id = CAST(${studentId} AS uuid) LIMIT 1
  `;
  if (!rows[0]) throw new AppError("Student not found", 404);
  return { sent: true };
};

export const generateEmployeeId = async (userId) => {
  const rows = await prisma.$queryRaw`
    SELECT u.*,
      json_build_object('id', r.id, 'name', r.name, 'description', r.description,
                        'permissions', r.permissions, 'is_system_role', r.is_system_role,
                        'created_at', r.created_at, 'updated_at', r.updated_at) AS role,
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code,
                        'address', b.address, 'contact_email', b.contact_email,
                        'contact_phone', b.contact_phone, 'is_active', b.is_active,
                        'created_at', b.created_at, 'updated_at', b.updated_at) AS branch
    FROM "users" u
    JOIN "roles" r ON r.id = u.role_id
    JOIN "branches" b ON b.id = u.branch_id
    WHERE u.id = CAST(${userId} AS uuid)
    LIMIT 1
  `;
  if (!rows[0]) throw new AppError("User not found", 404);
  return serializeUser(rows[0]);
};

export const generateEmployeeIdPDF = async (userId) => {
  const rows = await prisma.$queryRaw`
    SELECT u.*,
      json_build_object('id', b.id, 'branch_name', b.branch_name) AS branch
    FROM "users" u
    LEFT JOIN "branches" b ON b.id = u.branch_id
    WHERE u.id = CAST(${userId} AS uuid)
    LIMIT 1
  `;
  const emp = rows[0];
  if (!emp) throw new AppError("Employee not found", 404);

  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: [240, 380],
        margin: 0
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      // --- Background & Theme (Charcoal Premium Dark Design) ---
      doc.rect(0, 0, 240, 380).fill("#0f172a");

      // Top header band (Deep Indigo)
      doc.rect(0, 0, 240, 80).fill("#1e1b4b");
      
      // Top divider bar (Gold accent)
      doc.rect(0, 80, 240, 4).fill("#d97706");

      // --- Header text ---
      doc.fillColor("#ffffff")
         .fontSize(9)
         .font("Helvetica-Bold")
         .text("CULINARY INSTITUTE", 0, 20, { align: "center", width: 240 })
         .fillColor("#d97706")
         .fontSize(7)
         .text("OF BANGLADESH", 0, 32, { align: "center", width: 240 });

      // --- Profile Image (Circular with Gold Border) ---
      const imgX = 80;
      const imgY = 100;
      const imgSize = 80;
      
      const drawAvatarFallback = () => {
        doc.circle(120, 140, 42).lineWidth(2).stroke("#d97706");
        doc.circle(120, 140, 40).fill("#1e293b");
        doc.circle(120, 132, 12).fill("#94a3b8");
        doc.path("M 104 156 A 16 16 0 0 1 136 156 Z").fill("#94a3b8");
      };

      if (emp.photo_url || emp.photoUrl) {
        try {
          const photo = emp.photo_url || emp.photoUrl;
          let imageBuffer;
          if (photo.startsWith("http")) {
            const imgRes = await fetch(photo);
            const arrayBuffer = await imgRes.arrayBuffer();
            imageBuffer = Buffer.from(arrayBuffer);
          } else {
            const filePath = path.join(process.cwd(), "public", photo);
            if (fs.existsSync(filePath)) {
              imageBuffer = fs.readFileSync(filePath);
            }
          }

          if (imageBuffer) {
            doc.circle(120, 140, 42).lineWidth(2).stroke("#d97706");
            
            doc.save();
            doc.circle(120, 140, 40).clip();
            doc.image(imageBuffer, imgX, imgY, { width: imgSize, height: imgSize });
            doc.restore();
          } else {
            drawAvatarFallback();
          }
        } catch (e) {
          console.error("Error embedding employee image in PDF:", e);
          drawAvatarFallback();
        }
      } else {
        drawAvatarFallback();
      }

      // --- Employee Name & Details ---
      const name = (emp.full_name || emp.fullName || "Employee Name").toUpperCase();
      doc.fillColor("#ffffff")
         .fontSize(12)
         .font("Helvetica-Bold")
         .text(name, 10, 195, { align: "center", width: 220 });

      const designation = emp.designation || "Staff Member";
      doc.fillColor("#94a3b8")
         .fontSize(8)
         .font("Helvetica")
         .text(designation, 10, 212, { align: "center", width: 220 });

      const dept = (emp.department || "Operations").toUpperCase();
      doc.fillColor("#38bdf8")
         .fontSize(7)
         .font("Helvetica-Bold")
         .text(dept, 10, 224, { align: "center", width: 220 });

      const empId = `ID: ${emp.employee_id || "EMP-N/A"}`;
      doc.fillColor("#ffffff")
         .fontSize(8)
         .font("Courier-Bold")
         .text(empId, 10, 240, { align: "center", width: 220 });

      // --- QR Code ---
      try {
        const qrData = JSON.stringify({
          name: emp.full_name || emp.fullName,
          id: emp.employee_id,
          role: emp.designation,
          verifyUrl: `https://cibdhk.com/verify/emp/${emp.employee_id}`
        });
        
        const qrBuffer = await QRCode.toBuffer(qrData, {
          margin: 0,
          color: {
            dark: "#ffffff",
            light: "#0f172a"
          },
          width: 70
        });

        doc.image(qrBuffer, 85, 265, { width: 70, height: 70 });
      } catch (err) {
        console.error("Error generating QR code for PDF ID Card:", err);
      }

      // --- Footer Bar ---
      doc.rect(0, 360, 240, 20).fill("#d97706");
      doc.fillColor("#ffffff")
         .fontSize(7)
         .font("Helvetica-Bold")
         .text("CIB ACCREDITED MEMBER", 0, 366, { align: "center", width: 240 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

export const generateCertificatePDF = async (studentId, awardedOn) => {
  const rows = await prisma.$queryRaw`
    SELECT s.*,
      json_build_object('id', c.id, 'course_name', c.course_name_en, 'course_code', c.course_code) AS course,
      json_build_object('id', bat.id, 'batch_name', bat.batch_name) AS batch
    FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "courses" c ON c.id = bat.course_id
    WHERE s.id = CAST(${studentId} AS uuid)
    LIMIT 1
  `;
  const std = rows[0];
  if (!std) throw new AppError("Student not found", 404);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: { top: 0, bottom: 0, left: 0, right: 0 }
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      const W = 841.89;
      const H = 595.28;

      // 1. Background
      doc.rect(0, 0, W, H).fill("#fafaf9");

      // 2. Borders
      doc.rect(20, 20, W - 40, H - 40).lineWidth(4).stroke("#1e1b4b");
      doc.rect(28, 28, W - 56, H - 56).lineWidth(1.5).stroke("#d97706");

      // 3. Corners
      const corners = [
        [28, 28],
        [W - 28, 28],
        [28, H - 28],
        [W - 28, H - 28]
      ];
      for (const [x, y] of corners) {
        doc.circle(x, y, 6).fill("#d97706");
      }

      // 4. Header
      doc.fillColor("#1e1b4b")
         .fontSize(22)
         .font("Helvetica-Bold")
         .text("CULINARY INSTITUTE OF BANGLADESH", 0, 70, { align: "center", width: W });

      doc.fillColor("#b45309")
         .fontSize(9)
         .font("Helvetica-Bold")
         .text("NATIONAL SKILLS DEVELOPMENT AUTHORITY (NSDA) ACCREDITED ACADEMY", 0, 95, { align: "center", width: W });

      doc.moveTo(150, 115).lineTo(W - 150, 115).lineWidth(2).stroke("#991b1b");

      // 5. Title
      doc.fillColor("#111827")
         .fontSize(26)
         .font("Times-Bold")
         .text("CERTIFICATE OF COMPETENCY", 0, 140, { align: "center", width: W });

      doc.fillColor("#4b5563")
         .fontSize(12)
         .font("Times-Italic")
         .text("This is proudly presented to", 0, 185, { align: "center", width: W });

      // 6. Student Name
      const studentName = (std.student_name || "Graduate Name").toUpperCase();
      doc.fillColor("#991b1b")
         .fontSize(26)
         .font("Helvetica-Bold")
         .text(studentName, 40, 215, { align: "center", width: W - 80 });

      doc.moveTo(250, 246).lineTo(W - 250, 246).lineWidth(1).stroke("#d1d5db");

      // 7. Details
      const courseName = std.course?.course_name || "Basic Professional Cookery";
      const regNo = std.registration_number || std.student_id || "REG-N/A";
      
      doc.fillColor("#4b5563")
         .fontSize(11)
         .font("Helvetica")
         .text("for successfully fulfilling the prescribed graduation requirements and demonstrating", 0, 265, { align: "center", width: W })
         .text(`excellent proficiency in the comprehensive training program for`, 0, 282, { align: "center", width: W });

      doc.fillColor("#111827")
         .fontSize(16)
         .font("Helvetica-Bold")
         .text(courseName, 0, 310, { align: "center", width: W });

      doc.fillColor("#6b7280")
         .fontSize(9)
         .font("Courier")
         .text(`Registration No: ${regNo}  •  Batch: ${std.batch?.batch_name || "N/A"}`, 0, 335, { align: "center", width: W });

      // 8. Award Date
      const dateText = awardedOn
        ? new Date(awardedOn).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : std.completion_date
          ? new Date(std.completion_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
          : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      doc.fillColor("#4b5563")
         .fontSize(10)
         .font("Helvetica-Oblique")
         .text(`Given on this day: ${dateText}`, 0, 365, { align: "center", width: W });

      // 9. Signatures
      const sigY = 460;
      doc.moveTo(150, sigY).lineTo(300, sigY).lineWidth(1).stroke("#94a3b8");
      doc.fillColor("#111827")
         .fontSize(10)
         .font("Times-BoldItalic")
         .text("Chef Dewan Ismail", 150, sigY - 20, { align: "center", width: 150 })
         .fillColor("#6b7280")
         .fontSize(9)
         .font("Helvetica-Bold")
         .text("ACADEMIC DEAN", 150, sigY + 5, { align: "center", width: 150 });

      doc.moveTo(W - 300, sigY).lineTo(W - 150, sigY).lineWidth(1).stroke("#94a3b8");
      doc.fillColor("#111827")
         .fontSize(10)
         .font("Times-BoldItalic")
         .text("Executive Director", W - 300, sigY - 20, { align: "center", width: 150 })
         .fillColor("#6b7280")
         .fontSize(9)
         .font("Helvetica-Bold")
         .text("MANAGING DIRECTOR", W - 300, sigY + 5, { align: "center", width: 150 });

      // 10. Seal
      const sealX = W / 2;
      const sealY = H - 100;
      doc.circle(sealX, sealY, 25).fill("#d97706");
      doc.circle(sealX, sealY, 22).lineWidth(1.5).stroke("#ffffff");
      doc.fillColor("#ffffff")
         .fontSize(12)
         .font("Helvetica-Bold")
         .text("★", sealX - 6, sealY - 6);

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
};

export const generateReceiptPDF = async (payment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A5",
        layout: "portrait",
        margins: { top: 30, bottom: 30, left: 30, right: 30 }
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      const W = 420;

      // Extract details safely supporting both snake_case and camelCase
      const receiptNumber = payment.receiptNumber || payment.receipt_number || "N/A";
      const rawDate = payment.createdAt || payment.created_at;
      const formattedDate = rawDate ? new Date(rawDate).toLocaleString("en-GB") : "Invalid Date";
      const paymentMethod = payment.paymentMethod || payment.payment_method || "N/A";
      const transactionId = payment.transactionId || payment.transaction_id || "N/A";
      const amount = payment.amount ? Number(payment.amount) : 0;
      
      const student = payment.student || {};
      const studentName = student.studentName || student.student_name || "N/A";
      const studentIdVal = student.studentId || student.student_id || "N/A";
      
      const branch = payment.branch || {};
      const branchName = branch.branchName || branch.branch_name || "N/A";
      
      const collector = payment.collectedByInfo || payment.collected_by_info || (typeof payment.collectedBy === "object" ? payment.collectedBy : null) || (typeof payment.collected_by === "object" ? payment.collected_by : null) || {};
      const collectorName = collector.fullName || collector.full_name || "System Admin";

      const feeRecord = payment.feeRecord || payment.fee_record;

      doc.rect(10, 10, 420 - 20, 595 - 20).lineWidth(1).stroke("#e2e8f0");
      doc.rect(12, 12, 420 - 24, 595 - 24).lineWidth(1.5).stroke("#1e1b4b");

      // Brand Top Banner
      doc.rect(14, 14, 420 - 28, 6).fill("#d97706");

      doc.fillColor("#1e1b4b")
         .fontSize(16)
         .font("Helvetica-Bold")
         .text("CULINARY INSTITUTE OF BANGLADESH", 30, 40, { align: "center", width: 360 });

      doc.fillColor("#d97706")
         .fontSize(8)
         .font("Helvetica-Bold")
         .text("OFFICIAL PAYMENT RECEIPT", 30, 60, { align: "center", width: 360 });

      doc.moveTo(40, 80).lineTo(380, 80).lineWidth(1).stroke("#e2e8f0");

      doc.fillColor("#4b5563")
         .fontSize(9)
         .font("Helvetica")
         .text(`Receipt No: ${receiptNumber}`, 40, 98)
         .text(`Date: ${formattedDate}`, 40, 114)
         .text(`Status: COMPLETED / VERIFIED`, 40, 130);

      // --- Scannable Verification QR Code ---
      try {
        const qrPayload = JSON.stringify({
          receipt: receiptNumber,
          student: studentName,
          id: studentIdVal,
          amount: `BDT ${amount.toLocaleString()}`,
          date: formattedDate,
          verify: `https://cibdhk.com/verify/receipt/${receiptNumber}`,
        });
        const qrBuffer = await QRCode.toBuffer(qrPayload, {
          margin: 1,
          width: 70,
          color: { dark: "#1e1b4b", light: "#ffffff" },
        });
        doc.image(qrBuffer, 305, 90, { width: 65, height: 65 });
        doc.fillColor("#94a3b8")
           .fontSize(6)
           .font("Helvetica-Bold")
           .text("SCAN TO VERIFY", 305, 158, { width: 65, align: "center" });
      } catch (err) {
        console.warn("QR code generation error for receipt:", err.message);
      }

      doc.moveTo(40, 175).lineTo(380, 175).lineWidth(1).stroke("#e2e8f0");

      doc.fillColor("#1e1b4b")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text("BILL TO / STUDENT INFO", 40, 190);

      doc.fillColor("#1f2937")
         .font("Helvetica")
         .fontSize(9)
         .text(`Student Name: ${studentName}`, 40, 208)
         .text(`Student ID: ${studentIdVal}`, 40, 223)
         .text(`Branch/Campus: ${branchName}`, 40, 238);

      doc.moveTo(40, 258).lineTo(380, 258).lineWidth(1).stroke("#e2e8f0");

      doc.fillColor("#1e1b4b")
         .font("Helvetica-Bold")
         .fontSize(10)
         .text("PAYMENT DETAILS", 40, 272);

      doc.fillColor("#1f2937")
         .font("Helvetica")
         .fontSize(9)
         .text(`Amount Paid: Tk. ${amount.toLocaleString()}`, 40, 292)
         .text(`Payment Method: ${paymentMethod}`, 40, 307)
         .text(`Transaction ID: ${transactionId}`, 40, 322)
         .text(`Collected By: ${collectorName}`, 40, 337);

      doc.moveTo(40, 355).lineTo(380, 355).lineWidth(1).stroke("#e2e8f0");

      if (feeRecord) {
        doc.fillColor("#1e1b4b")
           .font("Helvetica-Bold")
           .fontSize(10)
           .text("LEDGER ACCOUNT SUMMARY", 40, 372);

        const netPayable = Number(feeRecord.netPayable || feeRecord.net_payable || 0);
        const paidAmount = Number(feeRecord.paidAmount || feeRecord.paid_amount || 0);
        const dueAmount = Math.max(0, netPayable - paidAmount);

        doc.fillColor("#1f2937")
           .font("Helvetica")
           .fontSize(9)
           .text(`Net Course Fee Payable: Tk. ${netPayable.toLocaleString()}`, 40, 392)
           .text(`Total Amount Received: Tk. ${paidAmount.toLocaleString()}`, 40, 407)
           .fillColor(dueAmount > 0 ? "#b91c1c" : "#15803d")
           .font("Helvetica-Bold")
           .text(`Remaining Balance Due: Tk. ${dueAmount.toLocaleString()}`, 40, 422);
      }

      doc.moveTo(40, 460).lineTo(380, 460).lineWidth(1).stroke("#e2e8f0");
      doc.fillColor("#9ca3af")
         .fontSize(7)
         .font("Helvetica-Oblique")
         .text("This is an electronically generated official receipt. No signature is required.", 30, 480, { align: "center", width: 360 });

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
};
