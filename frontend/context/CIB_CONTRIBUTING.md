# Developer Contributing Guidelines (CIB Platform)

Welcome, Engineer! The Culinary Institute of Bangladesh (CIB) web platform is a high-performance, bilingual Next.js application built to global standard specifications. To maintain its architectural integrity, please read and adhere to these contributing guidelines before making changes.

---

## 🎨 1. Coding & Design System Standards

CIB runs on the proprietary **Obsidian Glass** design system. ad-hoc utility classes are strictly prohibited. Always pull from the standardized design system:

*   **HTML Semantics**: Every viewport must maintain an absolute SEO-friendly layout. A page can only have exactly one `<h1>` header, followed by proper descending hierarchical headers (`<h2>`, `<h3>`).
*   **Tailwind Layering**: Predefined layers are defined in `src/styles/globals.css`. Always use matching variables:
    *   *Glass card*: `.glass-card`
    *   *Obsidian gradient bg*: `.bg-obsidian-dark`
    *   *Luxury gold gradients*: `.text-gold-gradient` or `.bg-gold-gradient`
*   **Accessibility (a11y)**: All interactive elements (buttons, inputs) must contain a unique `id`, clear accessible text labels, and proper contrast ratios. Focus rings must be visible.

---

## 🌐 2. Bilingual dynamic routing (i18n)

We use `next-intl` to map bilingual locales (`/en` and `/bn`) dynamically across 28+ viewports:

*   **Parity Rule**: Every English key in `/content/en/*.json` must have a corresponding, fully translated Bengali key in `/content/bn/*.json`. No placeholder keys or untranslated content is allowed.
*   **Linking Rule**: Never use standard next `<Link>` imports directly. Always import `Link` from `@/navigation` (or the customized localization router wrapper) to guarantee language prefixes remain appended during client-side navigation transitions.

---

## 🛡️ 3. Security & Anti-Spam Guidelines

When adding new forms or lead capture pages:
*   **Required Captcha**: You MUST import the `<Turnstile>` widget and enforce client-side token verification before form submission.
*   **Honeypot Rule**: Always include the invisible `website` field:
    ```tsx
    <input type="text" name="website" className="absolute opaque-0 w-0 h-0 -z-50 pointer-events-none" tabIndex={-1} autoComplete="off" />
    ```
*   **Server Check**: Every endpoint logging lead metrics must run the bot check and verify Turnstile tokens server-side in [/api/lead](file:///c:/Users/esthiyak/Desktop/cibdhk.com/src/app/api/lead/route.ts).

---

## 🚀 4. Branching & Deployment Strategy

*   **Repository Branching**: The `main` branch represents production-verified, stable code. Always branch off into `feature/` or `hotfix/` for development, run local staging sanity tests, and merge only after the build pipeline compiles successfully.
*   **Production Bundling**: Before deploying, always execute the custom bundler:
    ```bash
    npm run build
    powershell -ExecutionPolicy Bypass -File ./cpanel_bundle.ps1
    ```
    This ensures that asset routes are fully unoptimized (`unoptimized: true`) to support cPanel Passenger requirements without breaking image loading.

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](./CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](./CIB_PHASES.md) | [Semantic Version Changelog](../CHANGELOG.md) | [Supreme Project Index](../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](./sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](./QA_CHECKLIST.md) | [Post-Hotfix Audit Report](./QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](./SOP_INDEX.md) | [SOP 07: cPanel Deployment (Bangla)](./sops/cpanel-deployment-bangla.md) | [SOP 08: Environment Variables](./sops/environment-variables.md) | [SOP 16: Technical Troubleshooting](./sops/troubleshooting.md)
