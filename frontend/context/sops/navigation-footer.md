# SOP 14: How to Update the Footer or Navigation

## Purpose
To manage the site's global navigation menus and the hardened footer information.

## Prerequisites
- Updated social links or new page links.

## Step-by-Step Instructions

### Updating Menu Links
1.  **Header Menus**:
    - Edit `content/en/globals/navigation.json`.
    - Edit `content/bn/globals/navigation.json`.
    - Add or update objects in the `"mainMenu"` array.
2.  **Footer Columns**:
    - Edit `content/en/globals/footer.json`.
    - Edit `content/bn/globals/footer.json`.
    - Update the `"links"`, `"courses"`, and `"contact"` sections.

### Updating Hardcoded Fallbacks (Critical)
The CIB site uses a "Footer Fallback" pattern for resilience.
1.  **Footer Component**: Open `src/components/global/Footer.tsx` and check the hardcoded values in the `data` object at the top.
2.  **Layout Fallback**: Open `src/app/[locale]/layout.tsx`. Check the `footerData` variable that provides the fallback if JSON loading fails.
3.  **Sync**: Ensure the JSON files and the hardcoded fallbacks are **identical**.

## Verification Steps
- ✅ Check the header menu on both English and Bengali pages.
- ✅ Scroll to the bottom and verify the footer shows all 4 columns correctly.
- ✅ Test all social media icons.

## Troubleshooting
- **Footer is empty**: This happens if the JSON data is corrupted. The hardcoded fallback should trigger, but if it doesn't, check `src/app/[locale]/layout.tsx`.
- **Menu item doesn't link**: Ensure the `"href"` starts with `/` and includes the locale if necessary.

## Related SOPs
- [SOP 11: New Pages & Sections](./new-pages.md)
- [SOP 01: Content Updates](./content-updates.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
