# CLAUDE.md — CIB AI Agent Development Guide

## Environment
- **OS**: Windows (PowerShell preferred)
- **Shell**: PowerShell (use `;` not `&&` as command separator)
- **Node.js**: v20
- **Framework**: Next.js 14.2.35 (App Router)
- **Primary Deploy**: cPanel (Standalone build via GitHub Actions CI/CD)

## Deployment Workflow
**Automated (Recommended):** Push to `main` → GitHub Actions builds → download `deploy_cpanel` artifact → follow [cPanel SOP](./context/sops/cpanel-deployment-bangla.md).

**Manual:**
1. `npm run build`
2. `powershell -ExecutionPolicy Bypass -File ./cpanel_bundle.ps1`
3. Upload and extract `deploy_cpanel.zip` to the cPanel Node.js app directory.
4. Ensure `content/` is present in the root of the app.
5. Restart via cPanel → Setup Node.js App.

## Project Intelligence
- **Master Index**: [INDEX.md](./INDEX.md)
- **Core Memory**: [context/CIB_CORE_MEMORY.md](./context/CIB_CORE_MEMORY.md)
- **SOP Library**: [context/SOP_INDEX.md](./context/SOP_INDEX.md)
- **cPanel Deployment SOP**: [context/sops/cpanel-deployment-bangla.md](./context/sops/cpanel-deployment-bangla.md)
- **QA Checklist**: [context/QA_CHECKLIST.md](./context/QA_CHECKLIST.md)

## Development Rules
- Use `ctx7` (Context7) before implementing new APIs or library patterns.
- Enforce **"Silent Success"** and **"Footer Fallback"** patterns for production hardening.
- Maintain bilingual parity in `content/en` and `content/bn` for all content changes.
- Every major change must be logged in [CHANGELOG.md](./CHANGELOG.md).
- Use PowerShell semicolons (`;`) not `&&` to chain shell commands on Windows.
- Honeypot field name is `honey_val` (not `website`) — do not rename.

## Key File Paths
| What | Path |
|------|------|
| Lead API | `src/app/api/lead/route.ts` |
| Track API | `src/app/api/track/route.ts` |
| Bilingual content | `content/en/` and `content/bn/` |
| Design system | `tailwind.config.ts` |
| CI/CD pipeline | `.github/workflows/cpanel-build.yml` |
| cPanel packager | `cpanel_bundle.ps1` |

---
© 2026 Culinary Institute of Bangladesh

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible](./context/CIB_CORE_MEMORY.md) | [39-Phase Development Ledger](./context/CIB_PHASES.md) | [Changelog](./CHANGELOG.md) | [Project Index](./INDEX.md)
**Deployment:** [cPanel SOP (বাংলা)](./context/sops/cpanel-deployment-bangla.md) | [Deployment Options](./context/sops/cpanel-deployment-options.md) | [QA Checklist](./context/QA_CHECKLIST.md) | [QA Audit Report](./context/QA_AUDIT_REPORT.md)
**SOP Library:** [Master SOP Index](./context/SOP_INDEX.md) | [Environment Variables](./context/sops/environment-variables.md) | [Troubleshooting](./context/sops/troubleshooting.md) | [Google Sheets Lead](./context/sops/google-sheets-lead.md)
