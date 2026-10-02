# SOP 10: How to Roll Back a Deployment

## Purpose
To quickly restore the website to its previous working state in the event of a critical failure on the live site.

## Prerequisites
- Access to the Git repository.
- A previous known-working ZIP bundle or Git commit.

## Step-by-Step Instructions

### Option 1: Git Rollback (Fastest for Code)
1.  **Find Previous Commit**: Run `git log --oneline` and find the hash (e.g., `acb123`) of the last working version.
2.  **Revert**:
    - `git reset --hard acb123`
    - `git push origin cpanel-robust-deploy --force`
3.  **Pull in cPanel**: Go to cPanel > **Git™ Version Control** and Pull the changes.

### Option 2: Manual ZIP Rollback (Safest)
1.  **Locate Backup**: Find the previous `deploy_cpanel.zip` file on your local machine.
2.  **Upload & Replace**: Upload it to `/home/cibdtamx/cib_nextjs_app/` and extract, overwriting current files.
3.  **Restart**: Restart the Node.js App in cPanel.

### Option 3: cPanel Account Backup
1.  **Restore**: If the whole site is corrupted, use the cPanel **JetBackup** or **Backup Wizard** to restore the entire `/home/cibdtamx/` directory from 24 hours ago.

## Verification Steps
- ✅ Check the live site to confirm the error is gone.
- ✅ Check the "Network" tab in browser console to ensure files are loading correctly.

## Troubleshooting
- **Force Push denied**: If `git push --force` fails, ensure you have admin rights on the repository.
- **Node.js won't start**: Check the `stderr.log` in the app directory for the crash reason.

## Related SOPs
- [SOP 15: Backup & Restore](./backup-restore.md)
- [SOP 07: cPanel Deployment](./deploy-cpanel.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
