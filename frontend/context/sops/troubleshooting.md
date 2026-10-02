# SOP 16: Troubleshooting Common Issues

## Purpose
A quick-reference guide for resolving the most frequent technical problems reported by users or administrators.

## Prerequisites
- Access to browser developer tools (`F12`).
- Access to cPanel `stderr.log`.

## Common Issues & Fixes

### 1. White Screen / Site Won't Load
- **Cause**: Node.js app crashed or build failed.
- **Fix**: Check cPanel **Setup Node.js App** status. Check the `stderr.log` in your app directory. Re-run `npm run build` locally to see if any code errors exist.

### 2. Forms Not Submitting
- **Cause**: Incorrect environment variables or Turnstile failure.
- **Fix**: Verify `TURNSTILE_SECRET_KEY` in cPanel. Ensure the site is accessed via `https` (Turnstile fails on `http`). Check the Google Sheet permissions for the Service Account email.

### 3. Footer Links or Contact Info Missing
- **Cause**: `footer.json` data is corrupted or missing on the server.
- **Fix**: Re-upload `content/[locale]/globals/footer.json`. If the issue persists, check `src/components/global/Footer.tsx` for hardcoded fallback errors.

### 4. Images Broken (404)
- **Cause**: Case sensitivity or missing files in `public/`.
- **Fix**: Windows is case-insensitive, but cPanel (Linux) is **SENSITIVE**. `Image.webp` is NOT the same as `image.webp`. Ensure all filenames are lowercase.

### 5. Bengali Translations Not Showing
- **Cause**: Missing locale parameter in the URL.
- **Fix**: Ensure the URL starts with `/bn/`. Check if `middleware.ts` is correctly handling locale detection.

## Verification Steps
- ✅ Check the browser console (`F12` > Console) for red error messages.
- ✅ Check the "Network" tab for 404 or 500 status codes.

## Related SOPs
- [SOP 10: Rollback Procedures](./rollback.md)
- [SOP 08: Environment Variables](./environment-variables.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
