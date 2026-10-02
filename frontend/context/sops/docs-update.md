# SOP 17: How to Update the Documentation

## Purpose
To keep the CIB "Neural Blueprint" and SOP library accurate as the website evolves.

## Prerequisites
- Knowledge of Markdown syntax.

## Step-by-Step Instructions
1.  **Identify the Document**:
    - For new features: Update `INDEX.md` and create a new SOP in `context/sops/`.
    - For history: Update `CHANGELOG.md`.
    - For brand rules: Update `CIB_CORE_MEMORY.md`.
2.  **Edit**: Open the relevant MD file in `context/`.
3.  **Cross-Linking**:
    - Use relative paths: `[Link Name](./filename.md)`.
    - If linking to a subfolder: `[Link Name](./sops/filename.md)`.
4.  **Update Index**: If you added a new SOP, you **MUST** add it to the table in `context/SOP_INDEX.md`.
5.  **Commit**: `git add .` and `git commit -m "docs: update [filename]"`.

## Verification Steps
- ✅ Click all newly added links to ensure they open the correct file.
- ✅ Ensure there are no broken local paths (no `file:///` prefixes).

## Troubleshooting
- **Link doesn't work**: Check the file extension (`.md`). Check if you need `../` to go up a directory level.
- **Formatting looks weird**: Ensure you have an empty line before and after lists or headers.

## Related SOPs
- [SOP 18: Monthly Health Check](./health-check.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
