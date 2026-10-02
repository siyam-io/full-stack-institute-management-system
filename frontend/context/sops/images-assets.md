# SOP 05: How to Update Images or Assets

## Purpose
To manage visual assets, ensuring high performance, correct optimization, and aesthetic consistency.

## Prerequisites
- Original image file.
- Access to an image optimizer (e.g., Squoosh.app) to convert to WebP.

## Step-by-Step Instructions
1.  **Prepare the Image**:
    - Convert your image to **WebP** format.
    - Resize it appropriately (e.g., Hero images: 1920px width, Thumbnails: 600px width).
    - Keep file sizes under 200KB if possible.
2.  **Upload to Repository**:
    - Save the file into `public/images/` or a relevant subfolder (e.g., `public/images/gallery/`).
3.  **Update Reference**:
    - Open the JSON file or component file where the image is used.
    - Update the path string (e.g., `"image": "/images/gallery/new-kitchen.webp"`).
4.  **Use Next/Image**:
    - If editing code, always use the `<Image />` component from `next/image` with proper `alt` text for SEO.
5.  **Remove Old Asset**: If the old image is no longer used, delete it from the `public/` folder to save space.

## Verification Steps
- ✅ Hard-refresh your browser (`Ctrl + F5`) to clear the cache.
- ✅ Check that the image loads instantly and isn't blurry.
- ✅ Inspect the image to confirm it is serving as a WebP.

## Troubleshooting
- **Image not appearing (404)**: Double-check the file extension. WebP is different from JPG.
- **Layout shift**: Ensure you provided `width` and `height` props to the Image component if you edited code.

## Related SOPs
- [SOP 02: Blog Management](./blog-posts.md)
- [SOP 12: SEO & Schema Markup](./seo-updates.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
