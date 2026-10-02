# SOP 13: How to Update the Landing Page

## Purpose
To manage the high-conversion standalone landing page for the "Professional Chef Course".

## Prerequisites
- Updated promotional offers (discounts, batch dates).

## Step-by-Step Instructions
1.  **Understand Structure**:
    - The landing page is a specialized route at `src/app/professional-chef-course-basic-to-advance/`.
    - Components are in `src/components/landing/`.
2.  **Update Core Data**: Open `src/data/courseData.ts`. This file controls the price, discount, and batch dates for the landing page.
3.  **Edit UI Sections**:
    - To change the video: Edit `src/components/landing/Hero.tsx`.
    - To change testimonials: Edit `src/components/landing/Testimonials.tsx`.
4.  **Update Application Form**:
    - Logic is in `src/components/landing/ApplicationForm.tsx`.
    - Ensure it connects to the same `/api/lead` endpoint.
5.  **Bilingual Support**: Unlike the main site, the landing page is currently English-primary but can be duplicated for a Bengali route if needed.

## Verification Steps
- ✅ Visit `http://localhost:3000/professional-chef-course-basic-to-advance/`.
- ✅ Test the "Book Now" scroll behavior.
- ✅ Submit a test lead through the landing page form and verify receipt.

## Troubleshooting
- **Layout broken**: The landing page uses a different CSS container than the main site. Ensure you use `max-w-7xl mx-auto` for new sections.
- **Form not working**: Check that the Cloudflare Turnstile site key is correctly injected in `ApplicationForm.tsx`.

## Related SOPs
- [SOP 04: Course Updates](./course-updates.md)
- [SOP 08: Environment Variables](./environment-variables.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
