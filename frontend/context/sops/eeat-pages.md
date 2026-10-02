# SOP 22: EEAT Page Maintenance & Authority Verification

## Purpose
To manage, update, and maintain the four specialized E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) pages designed to establish institutional prestige with search engines (Google) and AI-driven engines (ChatGPT, Perplexity, Gemini, etc.).

These pages comprise:
1. **Dewan Ismail Dynamic Portfolio**: Detailed credentials and thought leadership.
2. **Press & Media Hub**: National media coverages, video highlights, and publications.
3. **Student Success Stories**: Real alumni placements at 5-star establishments and cruise lines.
4. **Industry Partners**: Corporate alliances and institutional collaborations.

---

## 💎 E-E-A-T Routing & Data Files

| Public Route | English Data File | Bengali Data File |
| :--- | :--- | :--- |
| `/expert-culinary-mentors/dewan-ismail` | `content/en/mentors/dewan-ismail.json` | `content/bn/mentors/dewan-ismail.json` |
| `/press-media` | `content/en/press-media.json` | `content/bn/press-media.json` |
| `/success-stories` | `content/en/success-stories.json` | `content/bn/success-stories.json` |
| `/industry-partners` | `content/en/industry-partners.json` | `content/bn/industry-partners.json` |

---

## Step-by-Step Instructions

### 1. Updating Dewan Ismail's Portfolio
To update resume records, media interviews, or qualifications:
1. Open `content/en/mentors/dewan-ismail.json` (and the corresponding Bengali file for localized parity).
2. To add a new **Media Appearance** under the `"mediaAppearances"` array:
   ```json
   {
     "title": "Interview Title",
     "source": "ATN Bangla / Somoy TV / Newspaper",
     "date": "Year / Date",
     "url": "https://youtube.com/watch?v=..."
   }
   ```
3. To add an **Academic/Professional Credential** under `"credentials"`:
   ```json
   "Accredited Level 4 Professional Certificate - BTEB"
   ```
4. Save the file and verify structural completeness (no dangling commas).

### 2. Registering New Press Coverage
To register national media coverage:
1. Open `content/en/press-media.json` (and `content/bn/press-media.json`).
2. Add a new block into the `"pressList"` array:
   ```json
   {
     "id": "somoy-tv-interview-2026",
     "title": "Culinary Prospects in Bangladesh - Somoy TV",
     "source": "Somoy TV",
     "date": "May 2026",
     "summary": "Full interview discussing vocational training growth.",
     "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
     "featured": true
   }
   ```
   > [!NOTE]
   > Use standard YouTube embed format `https://www.youtube.com/embed/VIDEO_ID` to prevent frame-ancestors block errors.

### 3. Adding a Student Success Story
To showcase new alumni placements:
1. Open `content/en/success-stories.json` (and `content/bn/success-stories.json`).
2. Add a new story into the `"successStories"` array:
   ```json
   {
     "id": 4,
     "studentName": "Fahim Ahmed",
     "course": "Professional Chef Course (Batch 12)",
     "placement": "Executive Commis at InterContinental Dhaka",
     "story": "How Fahim transformed his career and secured employment immediately upon graduation.",
     "image": "/images/success/fahim.webp",
     "salaryHighlight": "45,000 BDT/month starting"
   }
   ```
3. Store the student profile photo in `public/images/success/` as a square 400x400px WebP image.

### 4. Adding a Corporate Partner
To add a premium affiliate, hotel partner, or vocational alliance:
1. Open `content/en/industry-partners.json` (and `content/bn/industry-partners.json`).
2. Add a new partner block:
   ```json
   {
     "id": "westin-dhaka",
     "name": "The Westin Dhaka",
     "type": "Placement Partner",
     "description": "5-star luxury hotel, offering fast-track placements for CIB graduates.",
     "logoType": "westin"
   }
   ```
3. If a physical SVG logo is available, configure `logoType` and render the SVG code inside the SVG switch statement in `src/app/[locale]/industry-partners/page.tsx` to preserve premium Obsidian Glass vector aesthetics.

---

## 🏛️ JSON-LD Schema Structuring
Each E-E-A-T page is fully automated with rich structured data to secure maximum indexing trust.
*   **Dewan Ismail Portfolio**: Dynamic `Person` + `BreadcrumbList` schemas representing Dewan Ismail's professional identity, media publications, affiliations, and job titles.
*   **Press Page**: Dynamic `NewsArticle` array structured to tell search engines that CIB has verified, reputable press mentions.
*   **Success Stories**: Formats student stories into readable `Article` schemas denoting case studies of CIB's educational impact.
*   **Industry Partners**: Employs `Organization` schemas with `sponsor` and `memberOf` definitions to establish formal corporate relationships.

---

## Verification & Testing
Always verify that edits preserve complete structural integrity:
1.  **TypeScript & Build Verification**:
    ```powershell
    npm run build
    ```
    Ensure no build warnings or compile failures occur.
2.  **Schema Quality Check**:
    - Deploy to a staging environment or paste page source code into [Google Rich Results Test](https://search.google.com/test/rich-results).
    - Ensure all dynamic JSON-LD schemas validate 100% without warnings.
3.  **Bilingual Compliance**:
    - Always ensure both English (`/en/...`) and Bengali (`/bn/...`) routes display correct translated labels. Never leave fields unlocalized.

---

## Troubleshooting
- **Dynamic Routing Error (404 on Dewan Ismail page)**:
  - Verify that `src/app/[locale]/expert-culinary-mentors/[slug]/page.tsx` checks for the slug `'dewan-ismail'` correctly.
  - Check that the file `content/en/mentors/dewan-ismail.json` is perfectly formed.
- **YouTube Embed Blocked**:
  - Ensure the YouTube link uses the `/embed/` path structure. Do not use standard watch URLs (`/watch?v=...`) or short URLs (`youtu.be/...`) inside iframe blocks.

---

## Related SOPs
- [SOP 01: Content Updates](./content-updates.md)
- [SOP 03: Team & Mentors](./team-members.md)
- [SOP 05: Image & Asset Management](./images-assets.md)
- [SOP 12: SEO & Schema Markup](./seo-updates.md)

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [35-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
