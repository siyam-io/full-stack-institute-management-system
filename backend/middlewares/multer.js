import fs from "fs";
import path from "path";
import os from "os";
import multer from "multer";

const isVercel = Boolean(process.env.VERCEL);

// Safe Path Resolution for ES Modules and Serverless
const BASE_UPLOADS_DIR = isVercel
  ? path.join(os.tmpdir(), "uploads")
  : path.join(process.cwd(), "public", "uploads");

const STUDENT_DIR = path.join(BASE_UPLOADS_DIR, "students");
const EMPLOYEE_DIR = path.join(BASE_UPLOADS_DIR, "employees");
const BLOG_DIR = path.join(BASE_UPLOADS_DIR, "blogs");
const COURSE_DIR = path.join(BASE_UPLOADS_DIR, "courses");

// Ensure directories exist safely (never throw on serverless read-only paths)
try {
  [STUDENT_DIR, EMPLOYEE_DIR, BLOG_DIR, COURSE_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
} catch (err) {
  console.warn("⚠️ Could not create upload directories at startup:", err.message);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let targetDir = STUDENT_DIR;
    if (req.originalUrl.includes("/blogs")) {
      targetDir = BLOG_DIR;
    } else if (req.originalUrl.includes("/courses")) {
      targetDir = COURSE_DIR;
    } else if (req.originalUrl.includes("/employees/") || req.originalUrl.includes("/user")) {
      targetDir = EMPLOYEE_DIR;
    }

    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      cb(null, targetDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB limit for profile photos
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);

    if (ext && mime) {
      return cb(null, true);
    }
    cb(new Error("Invalid file type. Only JPG, PNG, and WEBP are allowed."), false);
  },
});

// Helper to securely delete files from disk (Rollback / Deletion)
export const deleteLocalFile = (relativePath) => {
  if (!relativePath) return;

  try {
    // Prevent directory traversal attacks
    if (!relativePath.startsWith("/uploads/")) return;
    
    const absolutePath = isVercel
      ? path.join(BASE_UPLOADS_DIR, relativePath.replace(/^\/uploads\/?/, ""))
      : path.join(process.cwd(), "public", relativePath);
    
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (err) {
    console.error("❌ Failed to delete local file:", err.message);
  }
};