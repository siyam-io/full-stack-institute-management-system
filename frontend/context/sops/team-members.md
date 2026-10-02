# SOP 03: How to Add, Remove, or Update a Team Member

## Purpose
To manage the profiles of CIB staff and mentors across the About and Mentors pages.

## Prerequisites
- Headshot image of the member (WebP format, square 1:1 ratio preferred).
- Professional bio and credentials.

## Step-by-Step Instructions
1.  **Locate Data Files**:
    - For general team: `content/en/about.json` (inside the `"ourTeam"` array).
    - For mentors: `content/en/mentors.json`.
2.  **Add/Update Entry**:
    - Copy an existing entry block (everything between `{ ... }`).
    - Paste it at the end of the array (ensure there is a comma before it).
    - Update `"name"`, `"role"`, `"image"`, and `"bio"`.
3.  **Upload Image**:
    - Place the photo in `public/images/team/`.
    - Reference it in the JSON as `/images/team/name.webp`.
4.  **Bengali Sync**: Update the corresponding `ourTeam` or mentor data in `content/bn/about.json` and `content/bn/mentors.json`.
5.  **Remove Member**: Delete their specific block from the JSON array and delete their photo from `public/images/team/`.

## Verification Steps
- ✅ Check `http://localhost:3000/en/about` section "Our Professional Team".
- ✅ Check `http://localhost:3000/en/mentors`.
- ✅ Verify images are not stretched and names are spelled correctly.

## Troubleshooting
- **Member not appearing**: Check for a missing comma between entries in the JSON array.
- **Image blurry**: Ensure the original image resolution is at least 400x400px.

## Related SOPs
- [SOP 05: Image & Asset Management](./images-assets.md)
- [SOP 01: Content Updates](./content-updates.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
