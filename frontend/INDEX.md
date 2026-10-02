# 🗺️ CIB Project Index & Documentation Hub

Welcome to the **Culinary Institute of Bangladesh (CIB)** Project Repository. This is the master navigation hub for all project documentation, strategy blueprints, and operational guides.

---

## 🏗️ Project Architecture
- **[README.md](./README.md)**: The entry point for the repository — architecture, setup, and overview.
- **[CHANGELOG.md](./CHANGELOG.md)**: Chronological project history (43 Phases, current v4.2.2).
- **[CLAUDE.md](./CLAUDE.md)**: AI agent development guide — rules, paths, and deployment workflow.
- **[context/](./context/)**: Core project intelligence and blueprints.

---

## 📘 Core Documentation (Authority Center)
The `/context` directory contains the single source of truth for all brand and technical specifications.

| File | Purpose |
| :--- | :--- |
| **[CIB_CORE_MEMORY.md](./context/CIB_CORE_MEMORY.md)** | Brand identity, technical specs, and non-negotiable rules. |
| **[CIB_CONTRIBUTING.md](./context/CIB_CONTRIBUTING.md)** | Developer contributing guidelines & Obsidian Glass standards. |
| **[CIB_PHASES.md](./context/CIB_PHASES.md)** | Detailed breakdown of the 43 development phases. |
| **[SUMMARY.md](./context/SUMMARY.md)** | Operational summary of SEO/AEO content expansion. |
| **[QA_AUDIT_REPORT.md](./context/QA_AUDIT_REPORT.md)** | Final production quality audit & Turnstile hotfix report. |
| **[QA_CHECKLIST.md](./context/QA_CHECKLIST.md)** | Quality assurance checklist for tracking, forms, and responsive UI. |
| **[SUPERPOWERS.md](./context/SUPERPOWERS.md)** | The "Superpowers" agentic development methodology. |
| **[SKILLS_CATALOG.md](./context/SKILLS_CATALOG.md)** | Index of agentic skills in the ecosystem. |

---

## 📋 Standard Operating Procedures (SOPs)
Complete step-by-step guides for site maintenance and operations.

*   **[MASTER SOP INDEX](./context/SOP_INDEX.md)**: Full list of all available procedures.

### Deployment
*   **[cPanel Deployment SOP (বাংলা)](./context/sops/cpanel-deployment-bangla.md)**: Non-technical step-by-step guide for deploying via cPanel File Manager.
*   **[cPanel Deployment Options](./context/sops/cpanel-deployment-options.md)**: Technical reference for all deployment methods.

### Content & Management
*   **[SOP 01: Content Updates](./context/sops/content-updates.md)**: Text edits across all pages.
*   **[SOP 02: Blog Management](./context/sops/blog-posts.md)**: Managing posts and news.
*   **[SOP 03: Team & Mentors](./context/sops/team-members.md)**: Managing staff profiles.
*   **[SOP 04: Course Updates](./context/sops/course-updates.md)**: Updating fees and batches.
*   **[SOP 14: Navigation & Footer](./context/sops/navigation-footer.md)**: Managing global menus.
*   **[SOP 22: EEAT Page Maintenance](./context/sops/eeat-pages.md)**: Dewan Ismail portfolio, press, success stories, and partners.

### Technical & Infrastructure
*   **[SOP 08: Environment Variables](./context/sops/environment-variables.md)**: Managing API keys and secrets.
*   **[SOP 15: Backup & Restore](./context/sops/backup-restore.md)**: Ensuring data safety.
*   **[SOP 10: Rollback Procedures](./context/sops/rollback.md)**: Reverting broken updates.
*   **[SOP 23: Cloudflare Image Optimization](./context/sops/cloudflare-images.md)**: Polish, Mirage & manual URL-based image resizing setup.

### Security, Forms & Tracking
*   **[SOP 19: Turnstile & Honeypot](./context/sops/turnstile-honeypot.md)**: Rotating site keys & bot protection.
*   **[SOP 20: Google Sheets API](./context/sops/google-sheets-lead.md)**: Lead logging integration & debugging.
*   **[SOP 21: Meta CAPI & Pixel Setup](./context/sops/meta-capi.md)**: Pixel events & Consent Mode V2.

### Testing & Quality
*   **[SOP 09: Local Testing](./context/sops/local-testing.md)**: Verification before deployment.
*   **[SOP 18: Monthly Health Check](./context/sops/health-check.md)**: Recurring integrity audit.
*   **[SOP 16: Troubleshooting](./context/sops/troubleshooting.md)**: Fixing common site errors.

---

## 🛠️ Technical Resources
- **[Package Manifest](./package.json)**: Dependency list and scripts.
- **[Tailwind Config](./tailwind.config.ts)**: Design system tokens.
- **[Next Config](./next.config.mjs)**: Build and asset optimization rules.
- **[GitHub Actions](./github/workflows/cpanel-build.yml)**: CI/CD pipeline config.
- **[AI Crawler File](./public/llms.txt)**: `llms.txt` — structured machine-readable summary for AI crawlers (ChatGPT, Google AI, Meta AI).

---

## 🚀 Quick Navigation
- **Frontend Components**: [src/components/](./src/components/)
- **Bilingual Content**: [content/](./content/)
- **API Routes**: [src/app/api/](./src/app/api/)
- **E-E-A-T Authority Pages**:
  - Dewan Ismail Portfolio: [src/app/[locale]/expert-culinary-mentors/[slug]/page.tsx](./src/app/%5Blocale%5D/expert-culinary-mentors/%5Bslug%5D/page.tsx)
  - Press & Media: [src/app/[locale]/press-media/page.tsx](./src/app/%5Blocale%5D/press-media/page.tsx)
  - Student Success Stories: [src/app/[locale]/success-stories/page.tsx](./src/app/%5Blocale%5D/success-stories/page.tsx)
  - Industry Partners: [src/app/[locale]/industry-partners/page.tsx](./src/app/%5Blocale%5D/industry-partners/page.tsx)

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible](./context/CIB_CORE_MEMORY.md) | [43-Phase Development Ledger](./context/CIB_PHASES.md) | [Changelog](./CHANGELOG.md) | [Project Index](./INDEX.md)
**Deployment:** [cPanel SOP (বাংলা)](./context/sops/cpanel-deployment-bangla.md) | [Deployment Options](./context/sops/cpanel-deployment-options.md) | [QA Checklist](./context/QA_CHECKLIST.md) | [QA Audit Report](./context/QA_AUDIT_REPORT.md)
**SOP Library:** [Master SOP Index](./context/SOP_INDEX.md) | [Environment Variables](./context/sops/environment-variables.md) | [Troubleshooting](./context/sops/troubleshooting.md) | [Google Sheets Lead](./context/sops/google-sheets-lead.md)
