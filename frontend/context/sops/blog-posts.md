# SOP 02: How to Add or Remove a Blog Post

## Purpose
To manage the institution's high-authority blog content, including creating, translating, and deleting posts.

## Prerequisites
- Featured image (WebP format, approx. 1200x630px).
- Blog content text.

## Step-by-Step Instructions

### Adding a New Post
1.  **Create JSON File**:
    - Navigate to `content/en/blog/`.
    - Copy an existing file (e.g., `chef-career.json`) and rename it using a slug format (e.g., `new-course-2026.json`).
2.  **Edit Content**:
    - Update the `"id"`, `"title"`, `"slug"`, `"category"`, `"author"`, `"date"`, and `"image"`.
    - Fill the `"content"` field with your blog text (supports HTML tags like `<p>`, `<b>`, `<ul>`).
3.  **Bengali Translation**:
    - Repeat the process in `content/bn/blog/` with the same filename.
4.  **Add Image**:
    - Place the featured image in `public/images/blog/`.
    - Ensure the path in the JSON file matches: `/images/blog/your-image.webp`.
5.  **Generate AI Image (Optional)**:
    - Use the `generate_image` tool if available to create high-quality culinary visuals.

### Removing a Post
1.  **Delete Files**: Delete the corresponding JSON files from BOTH `content/en/blog/` and `content/bn/blog/`.
2.  **Cleanup**: Delete the associated image from `public/images/blog/` if it is not used elsewhere.

## Verification Steps
- ✅ Navigate to `http://localhost:3000/en/blog` and check if the post appears in the list.
- ✅ Click the post to ensure the full page loads without errors.
- ✅ Verify the image displays correctly.

## Troubleshooting
- **Post not showing**: Ensure the filename ends in `.json` and the `id` is unique.
- **Image broken**: Check that the image path starts with `/` and the file extension (e.g., `.jpg` vs `.webp`) matches exactly.

## Related SOPs
- [SOP 05: Image & Asset Management](./images-assets.md)
- [SOP 12: SEO & Schema Markup](./seo-updates.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
