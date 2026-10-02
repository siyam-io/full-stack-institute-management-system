# SOP 01: How to Make Content Updates

## Purpose
To guide the user through editing text and static content on any page of the CIB website using the bilingual JSON data structure.

## Prerequisites
- Access to the local codebase folder.
- Basic text editor (VS Code recommended).
- Git installed (for version control).

## Step-by-Step Instructions
1.  **Identify the Page**: Determine which page you want to edit (e.g., About page).
2.  **Locate the JSON File**:
    - Navigate to `content/en/` for English content.
    - Navigate to `content/bn/` for Bengali content.
    - Example: For the About page, find `content/en/about.json`.
3.  **Open and Edit**: Open the file in your editor. Find the specific field (e.g., `"heroTitle"`) and update the text value inside the quotes.
4.  **Save Changes**: Press `Ctrl + S` to save the file.
5.  **Verify Locally**:
    - Run `npm run dev` in the terminal.
    - Open `http://localhost:3000` in your browser.
    - Navigate to the page and confirm the text has changed.
6.  **Bilingual Parity**: Repeat steps 2-4 for the opposite language file to ensure both English and Bengali versions are updated.
7.  **Commit and Push**:
    - `git add .`
    - `git commit -m "content: update [Page Name] text"`
    - `git push origin cpanel-robust-deploy`

## Verification Steps
- ✅ Text displays correctly on `http://localhost:3000`.
- ✅ No layout breakage or overlapping text.
- ✅ Bengali version correctly reflects the translation.

## Troubleshooting
- **Text doesn't change**: Ensure you saved the file and the terminal shows "Compiling...". Refresh the browser.
- **JSON Syntax Error**: If the site crashes, check if you accidentally deleted a comma `,` or a quote `"` in the JSON file.

## Related SOPs
- [SOP 09: Local Testing](./local-testing.md)
- [SOP 07: cPanel Deployment](./deploy-cpanel.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
