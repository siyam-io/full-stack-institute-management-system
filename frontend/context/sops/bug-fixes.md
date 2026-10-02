# SOP 06: How to Fix a Bug or Make Code Changes

## Purpose
To provide a safe, structured workflow for resolving technical issues or implementing small layout changes.

## Prerequisites
- Local development environment set up (`npm install`).
- Basic knowledge of React and Tailwind CSS.

## Step-by-Step Instructions
1.  **Reproduce the Bug**: Open the site locally (`npm run dev`) and find the exact page/action that causes the error.
2.  **Locate the File**:
    - Use VS Code search (Ctrl + Shift + F) to find the text or class name related to the bug.
    - Components are in `src/components/`.
    - Page logic is in `src/app/[locale]/`.
3.  **Apply the Fix**: Modify the code. Use "Defensive Coding" (e.g., check if data exists before mapping it).
4.  **Test Locally**: Verify the fix in the browser. Check if other things broke.
5.  **Build Check**: Run `npm run build`. This is **MANDATORY**. If the build fails, the site will not deploy.
6.  **Commit**:
    - `git add .`
    - `git commit -m "fix: [describe what was fixed]"`
7.  **Push**: `git push origin cpanel-robust-deploy`.

## Verification Steps
- ✅ `npm run build` completes with zero errors.
- ✅ The bug is no longer reproducible locally.
- ✅ UI remains responsive on mobile and desktop.

## Troubleshooting
- **Build Errors**: Read the terminal output carefully. It usually tells you the exact file and line number where the error is.
- **Unexpected Side Effects**: If fixing one thing breaks another, use `git checkout -- [filename]` to revert your change and try a different approach.

## Related SOPs
- [SOP 09: Local Testing](./local-testing.md)
- [SOP 10: Rollback Procedures](./rollback.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
