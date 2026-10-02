import { DatabaseSync } from "node:sqlite";

async function main() {
  console.log("Inspecting SQLite dev.db using built-in node:sqlite module...");
  try {
    const db = new DatabaseSync("D:/pg/web_app/cibdhk/backendSQL/prisma/dev.db");
    
    // List tables
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log("Tables in dev.db:", tables.map(t => t.name));

    // Inspect columns of blog_posts
    const blogInfo = db.prepare("PRAGMA table_info(blog_posts)").all();
    console.log("blog_posts columns:", blogInfo.map(c => `${c.name} (${c.type})`));

    // Get one row from blog_posts
    const blogRow = db.prepare("SELECT * FROM blog_posts LIMIT 1").get();
    console.log("blog_posts first row content sample keys:", Object.keys(blogRow || {}));
    if (blogRow) {
      console.log("blog_posts title_en:", blogRow.title_en);
      console.log("blog_posts content_en type:", typeof blogRow.content_en);
      console.log("blog_posts content_en first 200 chars:", String(blogRow.content_en).substring(0, 200));
    }

    // Inspect columns of course_public_pages
    const courseInfo = db.prepare("PRAGMA table_info(course_public_pages)").all();
    console.log("course_public_pages columns:", courseInfo.map(c => `${c.name} (${c.type})`));

    const courseRow = db.prepare("SELECT * FROM course_public_pages LIMIT 1").get();
    console.log("course_public_pages first row keys:", Object.keys(courseRow || {}));
    if (courseRow) {
      console.log("course_public_pages content_en type:", typeof courseRow.content_en);
      console.log("course_public_pages content_en first 200 chars:", String(courseRow.content_en).substring(0, 200));
    }
  } catch (err) {
    console.error("Failed to inspect SQLite database:", err);
  }
}

main();
