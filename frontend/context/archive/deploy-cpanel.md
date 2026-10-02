# SOP 07: How to Deploy Updates to cPanel

## Purpose
The definitive guide for moving your local changes to the live production server on cibdhk.com.

## Prerequisites
- Successful local build (`npm run build`).
- Access to cPanel File Manager and Node.js App interface.

## Step-by-Step Instructions

### Option 1: Automated ZIP Deployment (Fastest)
1.  **Generate Bundle**: Run `./cpanel_bundle.ps1` in PowerShell. This creates `deploy_cpanel.zip`.
2.  **Upload**:
    - Log in to cPanel > **File Manager**.
    - Go to `/home/cibdtamx/cib_nextjs_app/`.
    - Upload `deploy_cpanel.zip`.
3.  **Extract**: Right-click the zip > **Extract**. Replace all existing files.
4.  **Static Assets**:
    - Inside the extraction, go to `public/`.
    - Copy all contents to `/home/cibdtamx/public_html/`.
5.  **Restart**:
    - Go to **Setup Node.js App**.
    - Click **Restart** on the `cibdhk.com` application.

### Option 2: Git Pull Deployment (If configured)
1.  **Push**: Push your changes to the `cpanel-robust-deploy` branch.
2.  **Pull**:
    - Go to cPanel > **Git™ Version Control**.
    - Click **Manage** > **Pull or Deploy**.
    - Click **Update from Remote**.

## Verification Steps
- ✅ Visit `https://cibdhk.com` and check the "Last Updated" date or your specific change.
- ✅ Clear your browser cache and test key forms.

## Troubleshooting
- **White Screen after Deployment**: Ensure you uploaded the `.next/` folder and it contains the `standalone/` files if configured.
- **Old content showing**: You likely forgot to restart the Node.js app in cPanel.

## Related SOPs
- [SOP 15: Backup & Restore](./backup-restore.md)
- [SOP 16: Troubleshooting](./troubleshooting.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
