# SOP 04: How to Update Course Fees, Curriculum, or Batch Information

## Purpose
To ensure accurate course details, pricing, and scheduling across all institutional touchpoints.

## Prerequisites
- Updated fee structure and batch dates from management.

## Step-by-Step Instructions
1.  **Update Central Data**:
    - Open `src/data/courseData.ts` (This is the source of truth for calculations and the landing page).
    - Update `price`, `installmentAmount`, and `batchDate`.
2.  **Update Course Pages**:
    - Edit `content/en/courses.json` and `content/bn/courses.json`.
    - Find the specific course (e.g., "Professional Chef Course") and update the details.
3.  **Update Home & Admission**:
    - Check `content/en/home.json` and `content/en/admission.json` for any "Quick Info" boxes or promo banners mentioning fees or dates.
4.  **Curriculum Changes**:
    - If modules are added/removed, update the `"curriculum"` array in `content/en/courses.json`.
5.  **Landing Page Sync**:
    - The landing page uses `src/data/courseData.ts`. Ensure `installmentAmount` and `discount` are updated here to reflect live promos.

## Verification Steps
- ✅ Compare the Home page, Course page, and Admission page — dates and fees must match 100%.
- ✅ Test the installment calculation on the Landing Page.
- ✅ Verify the Bengali translation has the correct numeric format.

## Troubleshooting
- **Fee mismatch**: You missed a JSON file. Search the whole project (Ctrl + Shift + F) for the old price value to find where else it is hardcoded.
- **Batch date expired**: Ensure the date is updated to a future date or changed to "Admission Ongoing".

## Related SOPs
- [SOP 13: Landing Page Updates](./landing-page.md)
- [SOP 01: Content Updates](./content-updates.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
