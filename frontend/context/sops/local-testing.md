# SOP 09: How to Test Changes Before Deployment

## Purpose
To minimize production downtime and errors by verifying all changes in a local environment first.

## Prerequisites
- Local machine with `npm` and `node` installed.

## Step-by-Step Instructions
1.  **Launch Dev Server**: Run `npm run dev` and open `http://localhost:3000`.
2.  **Bilingual Check**:
    - Toggle between English and Bengali using the language switcher.
    - Check if menus, buttons, and footer update correctly.
3.  **Form Testing**:
    - Go to `/en/admission` and `/en/contact`.
    - Fill in dummy data and submit.
    - Verify the "Success" state appears (even if API fails locally, the UI must handle it).
4.  **Responsive Audit**:
    - Open Chrome DevTools (`F12`).
    - Toggle the device toolbar and check the site on "iPhone SE" and "iPad Air" sizes.
5.  **Console Check**:
    - Check the "Console" tab for red error messages.
    - Ignore "Warning" messages unless they are numerous.
6.  **Production Build Test**:
    - Run `npm run build`. This catches "type" errors and missing files that `npm run dev` might ignore.

## Verification Steps
- ✅ All internal links work (no 404s).
- ✅ Images load correctly on mobile.
- ✅ `npm run build` shows "Success".

## Troubleshooting
- **Build fails locally**: Fix the errors shown in the terminal before trying to deploy.
- **Port 3000 busy**: If the terminal says the port is in use, run `npx kill-port 3000` or restart your computer.

## Related SOPs
- [SOP 18: Monthly Health Check](./health-check.md)
- [SOP 06: Bug Fixes](./bug-fixes.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
