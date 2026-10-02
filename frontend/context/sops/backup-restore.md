# SOP 15: How to Backup and Restore the Website

## Purpose
To protect the institution's digital assets by creating regular snapshots of the site and providing a path for disaster recovery.

## Prerequisites
- cPanel login credentials.

## Step-by-Step Instructions

### Creating a Backup
1.  **Full Site Archive**:
    - Log in to cPanel > **File Manager**.
    - Select the `/home/cibdtamx/cib_nextjs_app/` folder.
    - Click **Compress** > **Zip Archive**.
    - Download the zip to your local machine.
2.  **Git Backup**: Always run `git push origin cpanel-robust-deploy` after changes. GitHub acts as your primary code backup.
3.  **Lead Data**: Periodically export the Google Sheet where leads are stored.

### Restoring from Backup
1.  **Upload**: Upload your backup zip to `/home/cibdtamx/`.
2.  **Clean Up**: Delete the current `cib_nextjs_app` folder (ensure you have a backup first!).
3.  **Extract**: Extract your backup zip into the same location.
4.  **Restart**: Go to **Setup Node.js App** and restart the application.

## Verification Steps
- ✅ Visit the site and log in to ensure core functionality is restored.
- ✅ Check that the most recent blog posts or content changes are present.

## Troubleshooting
- **Zip file too large**: Exclude the `node_modules` folder from the compression if possible; they can be reinstalled with `npm install`.
- **Restoration fails**: If extraction hangs, try extracting in smaller chunks or using the cPanel **Backup Wizard**.

## Related SOPs
- [SOP 10: Rollback Procedures](./rollback.md)
- [SOP 07: cPanel Deployment](./deploy-cpanel.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
