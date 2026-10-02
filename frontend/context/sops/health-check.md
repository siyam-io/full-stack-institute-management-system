# SOP 18: Full Content Audit and Health Check

## Purpose
A comprehensive monthly checklist to ensure the long-term integrity, performance, and accuracy of the CIB digital ecosystem.

## Prerequisites
- 30 minutes of dedicated testing time.
- Access to cPanel and Google Search Console.

## Monthly Checklist

### 1. Technical Integrity
- [ ] Run `npm run build` locally to check for hidden errors.
- [ ] Submit a test lead on **all 4 forms** (Admission, Contact, Demo, Landing).
- [ ] Check `stderr.log` in cPanel for persistent errors.

### 2. Content Accuracy
- [ ] Verify course fees and batch dates match current management ads.
- [ ] Check "Our Team" for any staff departures or new hires.
- [ ] Read the last 3 blog posts to ensure images and links are working.

### 3. SEO & Tracking
- [ ] Check Google Search Console for "Indexation" errors.
- [ ] Verify the Sitemap (`/sitemap.xml`) loads correctly.
- [ ] Check Meta Pixel Helper (browser extension) to ensure events are firing.

### 4. Performance
- [ ] Run a Google PageSpeed Insights test for the Home and Landing pages.
- [ ] Check cPanel "Resource Usage" to ensure the site isn't hitting memory limits.

### 5. Safety
- [ ] Perform a full site backup (See [SOP 15](./backup-restore.md)).
- [ ] Ensure all Git changes are pushed to `origin`.

## Verification Steps
- ✅ All checkboxes are marked.
- ✅ Site remains in "Production Hardened" state.

## Troubleshooting
- **Low PageSpeed score**: Optimize any newly added large images (See [SOP 05](./images-assets.md)).
- **Form failure**: Re-verify environment variables (See [SOP 08](./environment-variables.md)).

## Related SOPs
- [SOP 15: Backup & Restore](./backup-restore.md)
- [SOP 09: Local Testing](./local-testing.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
