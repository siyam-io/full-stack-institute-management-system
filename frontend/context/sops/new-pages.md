# SOP 11: How to Add a New Page or Section

## Purpose
To expand the website by adding new high-fidelity pages or functional UI sections while maintaining bilingual support.

## Prerequisites
- Basic understanding of Next.js folder structure.
- Content translated for both English and Bengali.

## Step-by-Step Instructions
1.  **Create the Route**:
    - Navigate to `src/app/[locale]/`.
    - Create a new folder with the page name (e.g., `career`).
    - Create a file inside named `page.tsx`.
2.  **Scaffold Page**: Copy a basic page structure (like `about/page.tsx`) into your new file.
3.  **Define Content**:
    - Create `content/en/pages/new-page.json`.
    - Create `content/bn/pages/new-page.json`.
4.  **Import Data**: Update your `page.tsx` to import and use these JSON files based on the `locale` parameter.
5.  **Update Navigation**:
    - Open `content/en/globals/navigation.json`.
    - Add the new link to the header or footer arrays.
6.  **SEO Metadata**: Add a `generateMetadata` function to your `page.tsx` to handle titles and descriptions.

## Verification Steps
- ✅ Navigate to `http://localhost:3000/en/your-new-page`.
- ✅ Verify the language switcher works for this page.
- ✅ Check that the page is responsive on mobile.

## Troubleshooting
- **404 Not Found**: Ensure you named the folder correctly and put it inside the `[locale]` bracket folder.
- **Data not loading**: Check the import path in `page.tsx` (e.g., `@/content/en/pages/new-page.json`).

## Related SOPs
- [SOP 12: SEO & Schema Markup](./seo-updates.md)
- [SOP 14: Navigation & Footer](./navigation-footer.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
