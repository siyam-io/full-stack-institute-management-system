# 📜 CIB Project Changelog

Tracking the evolution of the Culinary Institute of Bangladesh (CIB) platform from initial blueprinting to May 2026 production-hardened state.

## [4.2.2] - 2026-06-26

### 🚀 Patch — Open Knowledge AI Integration, LinkedIn Social Layer, CI/CD Pipeline Hardening

#### 🤖 Open Knowledge Format for AI Crawlers
- **`public/llms.txt` Created**: Implemented the emerging `llms.txt` standard — a structured, machine-readable Markdown-format document designed for AI crawlers (ChatGPT, Google AI, Meta AI, Perplexity). File includes: complete Professional Chef Course details (duration, fee, installments, curriculum, certifications, free gifts), all official social/external links, 25+ key search terms, and a 8-question Q&A block pre-formatted for LLM consumption.
- **AI Permissions Block**: Added explicit `Crawl-OK`, `Index-OK`, and `Training-OK` declarations so AI systems can confidently index and train on CIB's public information.

#### 🔗 LinkedIn Social Media Integration
- **`Footer.tsx`**: Added official `LinkedInIcon` SVG component (filled brand style) and a clickable LinkedIn link in the bottom bar social row, linking to `https://www.linkedin.com/company/cib-the-culinary-institute-of-bangladesh/`.
- **`SocialMediaFeed.tsx`**: Added `LinkedInIcon` and a 6th entry in the `platforms[]` array — CIB's homepage social feed now shows Facebook, YouTube, Instagram, TikTok, WhatsApp, and LinkedIn.
- **`LandingFooter.tsx`**: Added LinkedIn to the social icons grid in the standalone landing page footer.
- **`seo.ts` Schema Update**: Updated `sameAs` array in both `generateOrganizationSchema()` and `generateLocalBusinessSchema()` — corrected LinkedIn URL from the short slug to the full official URL, and replaced the stale `share.google` link with the verified Google Maps URL.

#### ⚙️ GitHub Actions CI/CD Pipeline Overhaul
- **`deploy.yml` — OS Migration**: Migrated from `windows-latest` to `ubuntu-latest` runner, resolving incompatibility with the PowerShell `cpanel_bundle.ps1` step on Linux. The PS1 bundling is now a local-only step; CI validates the build and packages source files as a downloadable artifact instead.
- **`deploy.yml` — Artifact Upload**: Replaced the `deploy_cpanel.zip` upload with a multi-path `cib-build` artifact that includes `.next/`, `public/`, `content/`, `package.json`, `package-lock.json`, `next.config.mjs`, and `cpanel_bundle.ps1`. Added `continue-on-error: true` + `if-no-files-found: warn` to prevent artifact storage quota from failing CI.
- **`cpanel-build.yml` — Storage Quota Resilience**: Added `continue-on-error: true` and `if-no-files-found: warn` to the `Upload cPanel ZIP Artifact` step so the workflow passes even when GitHub artifact storage quota is exhausted.
- **`@swc/helpers@0.5.23` Dependency Fix**: Explicitly pinned `@swc/helpers@0.5.23` in `package.json` and regenerated `package-lock.json` to resolve `npm ci` sync failures on the Linux CI runner (runner's npm resolved the peer dep at `0.5.23` while the local lock file had `0.5.5`).
- **Env Secrets Passed to Build**: Added `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_GTM_ID`, and `META_PIXEL_ID` from GitHub Secrets to the `Build Application` step in `deploy.yml` for production-accurate CI builds.

---

## [4.2.1] - 2026-06-25


### 🚀 Patch — Edge SEO Optimizations, Canonical Hreflang Fixes, A11y & Release Packaging

- **Global Robots Metadata Indexing**: Updated root layout and homepage metadata configuration to allow indexing (`index: true, follow: true`), correcting the previous inherited `noindex` block.
- **Canonical & Hreflang Corrections**: Removed trailing slashes on flagship landing page canonical links and added missing alternate languages (`en`, `bn`, `x-default`) for static, blog, and category page templates.
- **Footer & Language Switcher Accessibility**: Injected `aria-label` properties on footer social links and updated `LanguageToggle` accessible names to include their visible text, resolving WCAG screen-reader errors.
- **Blog Refresh & Internal Linking**: Executed GSC top 10 blog post refresh adding `lastReviewed: '2026-06-25'` and embedding 20+ context-aware internal links back to commercial landing pages.
- **Lighthouse Performance Diagnostics**: Verified Core Web Vitals on mobile emulation with an observed LCP of 311ms and 0.00 Cumulative Layout Shift (CLS).
- **Deployment Build Packaging**: Re-compiled production Next.js build and executed `cpanel_bundle.ps1` to packaging `deploy_cpanel.zip`.

---

## [4.2.0] - 2026-06-25

### 🚀 Major — Sentry Alternative, Lead Monitor, FAQ Expansion, Niche Course Pages & CI/CD Pipeline

- **Sentry Error Tracking Alternative**: Implemented a lightweight error-logging system serving cPanel deployment. Created `src/app/api/log-error/route.ts` to log frontend errors to `logs/errors.json`, and added a robust `<ErrorBoundary>` component in the root layout to capture React render errors.
- **Lead Monitoring Alerts**: Added `scripts/check_leads.js` and an uptime monitor route `/api/check-leads` that validates that the last lead submitted in `logs/leads.json` is not older than 24 hours, writing warnings to `logs/lead_alert.json` and logging console alerts.
- **Blog PAA & Author Box**: Injected an auto-generated "Quick Answers (PAA)" block to `/blog/[slug]` that extracts and renders the first 4 items from the post's FAQ list, and appended an `AuthorBox` component with reviews mapping to Dewan Ismail, Hasan Rizvee, and Salman Iqbal.
- **Bilingual FAQ & Success Stories Expansion**: Added 20 conversational Bengali voice search FAQs to `content/bn/faq.json` (and English counterparts to `content/en/faq.json`) under voice query categories. Added 10 new student success stories with placeholder image mappings to both English and Bengali stories JSON databases.
- **Google Rich Results Schema Validation**: Written and executed `scripts/verify_schemas.js` verifying that all key pages generate error-free standard JSON-LD structures (Organization, LocalBusiness, EducationEvent, Course, Product, FAQPage, Person, ProfilePage, Article).
- **Niche Specialty Course Pages**: Added 5 new specialty course pages (`/sushi-course-dhaka`, `/thai-cooking-course-dhaka`, `/chinese-cooking-course-dhaka`, `/mediterranean-cuisine-course-dhaka`, `/indian-cuisine-course-dhaka`) using the `CommercialLandingPage` component. Configured navigation JSON, desktop header, and mobile menu dropdowns under a new "Specialty Courses" menu.
- **GitHub Actions CI/CD Workflow**: Created `.github/workflows/deploy.yml` on push to `main` running dependency installs, Next.js build compilation, schema verification, lead alerts validation, and packaging `deploy_cpanel.zip` via PowerShell on a Windows runner.

---

## [4.1.0] - 2026-06-22

### 🚀 Major — AEO Skeleton Reordering & Site-Wide Image Enrichment

- **AEO Blocks Placement**: Repositioned Direct Answer blocks, Key Facts Tables, AuthorBoxes, and Video+Transcript sections below fold just above the footer on 5 key commercial pages (`/en`, `/en/courses`, `/en/admission`, `/en/about`, and `/professional-chef-course-basic-to-advance`) to ensure legible reading flow while maintaining citation readiness.
- **Rich Media Integration**: Injected and optimized high-fidelity institutional imagery across all key layouts:
  - Homepage: Replaced portrait with real student practice image in CourseShowcase; increased ValueProp background opacity to `0.08` for premium visibility.
  - Courses page: Positioned glass-framed commercial kitchen photo above the curriculum timeline.
  - Admission page: Placed state-of-the-art CIB Campus Lab photo inside the FeeTable grid.
  - About page: Added principal lab inspection group photo in glassmorphic section above the team section.
- **Dynamic FAQ Categories**: Configured Lucide icons (`GraduationCap`, `BookOpen`, `Briefcase`, `MessageSquare`, `HelpCircle`) mapped dynamically to FAQ category headers based on category keywords.
- **Verification & Documentation**: Verified error-free Next.js production builds (`npm run build`) and updated version numbers across all indexes.

---

## [4.0.0] - 2026-06-17

### 🚀 Major — Landing Page Rebuild & Batch Centralization

- **Complete landing page rebuild**: migrated pixel‑perfect from the original Vite project into `src/app/professional-chef-course-basic-to-advance/` using Next.js 14 App Router.
- **Smart dynamic slider**: replaced static hero with an Embla Carousel autoplay slider (3 slides, kitchen action backgrounds).
- **Batch configuration centralized**: `BATCH_CONFIG` in `src/lib/courseConfig.ts` now acts as the single source of truth for all batch slots and statuses. Changing one value propagates automatically to:
  - Landing page hero announcement bar
  - Landing page BatchSelector (all 3 slots: Morning, Afternoon, Weekend)
  - Homepage batch info badge
  - Courses page batch availability notification bar
- **Mobile‑first optimization**: every component tested at 375×812 viewport; sticky CTA, touch targets ≥44 px, no horizontal overflow.
- **Future‑proof toggle**: changing a slot status to `'full'` instantly renders “পূর্ণ” badges and disables CTAs across all pages.
- **Pricing audit & fix**: corrected Chef + Barista installments to 16 000+16 000+16 000 (48 000 BDT total); removed all stale 38 000 / 12 000 / 10 000 references.

### 📦 Deployment
- `deploy_cpanel.zip` generated (121 MB).
- Committed & pushed to `main`.

---

## [3.9.4] - 2026-06-06
### 📚 Phase 39.4: Documentation Overhaul & Link Integrity Fix
- **README.md Overhaul**: Fixed broken mermaid diagram (pipe characters in node labels caused GitHub parse errors), added v3.9.3 version badge, updated phase count to 39, corrected all dead file links, added CI/CD workflow section.
- **CLAUDE.md Improvement**: Updated phase count from 34 to 39, replaced dead `GIT_CPANEL_SOP.md` link with correct cPanel SOP, added key file paths table and PowerShell tips.
- **INDEX.md Cleanup**: Removed broken links to non-existent `deploy-cpanel.md` and `GIT_CPANEL_SOP.md`, added deployment section at top, corrected all SOP references.
- **Consistent Nav Footers**: Standardized all doc nav hub footers across README, CHANGELOG, CLAUDE, and INDEX to use only verified existing file paths.
- **cPanel SOP (Bangla)**: Elevated to world-class SOP standard with copiable code blocks, troubleshooting table, verification checklist, per-step rationale, and overview flowchart.

## [3.9.3] - 2026-06-06
### 🔐 Phase 39.3: CI/CD Pipeline Secret Initialization
- **GitHub Actions Secrets**: Programmatically uploaded environment secrets (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `META_PIXEL_ID`, `NEXT_PUBLIC_GTM_ID`) to the GitHub repository via GitHub REST API to resolve CI pipeline build failures.

## [3.9.2] - 2026-06-06
### 🚀 Phase 39.2: Performance Optimization & Responsive Images
- **Responsive Images via Native `<picture>`**: Replaced Next.js `<Image>` components (which cannot generate `srcset` with `unoptimized: true`) with native `<picture>` elements using pre-generated `-480w`, `-768w`, `-1280w`, `-1920w` WebP assets across `Hero.tsx`, `CourseShowcase.tsx`, `ValueProposition.tsx`, `SocialProof.tsx`, and `RecentBlogPosts.tsx` — reducing mobile page weight by **500+ KiB**.
- **Cache-Control Headers**: Added `Cache-Control: public, max-age=31536000, immutable` headers for `/fonts/`, `/_next/static/`, and `/images/` routes in `next.config.mjs`.
- **Third-Party Script Strategy**: Confirmed Meta Pixel and Google Tag Manager load with `strategy="afterInteractive"` to eliminate render-blocking.
- **cPanel Environment Loader**: Patched `cpanel_bundle.ps1` to inject a zero-dependency `.env.local` parser at the top of `server.js` so Google Sheets credentials load correctly on cPanel standalone mode.
- **Documentation**: Updated `CHANGELOG.md`, `context/sops/environment-variables.md`, and `context/sops/google-sheets-lead.md` with correct variable names and deployment instructions.

## [3.9.1] - 2026-06-06
### ⚙️ Phase 39.1: Standalone Environment Loader Fix
- **cPanel Environment variable standalone fix**: Patched `cpanel_bundle.ps1` to copy `.env.local` to `.next/standalone` and prepend a zero-dependency env loader to `server.js` at build time to solve Google Sheets credentials failing to load on cPanel.
- **Documentation Updated**: Refreshed environment variable and Google Sheets integration SOP guides to reflect runtime loading mechanics.


## [3.9.0] - 2026-06-05
### 🛡️ Phase 39: Course Expansion, Form Hardening & cPanel Build Delivery
- **Course Catalog & Pricing Sync**: Updated every pricing and course reference across English and Bengali content catalogs to reflect the new BDT 44,000 Professional Chef Course (with Admission 16k + 14k + 14k installments) and other courses (Chef+Barista Combo at BDT 48k, Fast Food Short Course at BDT 3.99k, Customized Course at BDT 12k, and 6-Month Diploma Course at BDT 110k).
- **Navigation Menu Overhaul**: Added all 5 courses under the 'Courses' dropdown menus in both English and Bengali locales, linking the flagship course directly to its dedicated landing page and the others to the main courses list page.
- **Form Zod Validation Resilience**: Enhanced the `/api/lead` API route's Zod schema to preprocess all optional fields, mapping blank inputs (`""`) and `null` values to `undefined` to resolve form submission failures (400 validation error).
- **Honeypot Rename**: Renamed the hidden honeypot field from `website` to `honey_val` to prevent Chrome Autofill from inadvertently triggering the anti-spam trap, securing successful user demo class and admission signups.
- **Deployment Build & Bundle**: Verified a zero-error Next.js production build (`npm run build`) and generated a fresh cPanel deployment archive (`deploy_cpanel.zip`) via `cpanel_bundle.ps1`.

## [3.8.0] - 2026-05-20
### 🎨 Phase 38: Sprint 1+2 UX & Conversion Polish
- **Multi-Step Form**: Upgraded `LeadForm` into a smooth 3-step application flow with a progress bar and state retention.
- **Conversion UX**: Added a globally floating Quick Contact Panel with integrated mini-form, a Course Recommendation Quiz, and an inline FAQ Accordion to all core conversion pages.
- **UI Enhancements**: Added an intelligent floating 'Apply' button on mobile devices, customized the 404 Not Found page with Obsidian Glass styling, and ensured the 'Talk to Counselor' CTA card renders consistently.
- **Blog UX & SEO**: Appended social share buttons, dynamic table of contents (TOC), and reading time estimation badges to all blog entries.
- **Refinement**: Integrated a client-side categorized search and filtering system for the FAQ page and added global breadcrumb navigation.

## [3.7.0] - 2026-05-20
### 🚀 Phase 37: Pre-Deployment Optimizations & Stability
- **Form Stability**: Finalized Phase A/B/C logic for resilient form submissions and Google Sheets API routing.
- **Performance & UI Fixes**: Addressed the About page GPU rendering crash by optimizing images and adjusting background rendering logic.
- **cPanel Automation**: Automated compilation of `deploy_cpanel.zip` via PowerShell `cpanel_bundle.ps1` for direct stage extraction.
- **Production Verification**: Confirmed a zero-error production build covering all 54 Next.js dynamic and static pages.

## [3.6.0] - 2026-05-20
### 💎 Phase 36: Advanced SEO (Internal Links & Crawl Efficiency)
- **Hub-and-Spoke Internal Link Automation**: Implemented robust dynamic related resource portals inside `/blog/[slug]` linking dynamically to `/courses`, `/admission`, and category-specific locations (Dewan Ismail's portfolio and `/industry-partners`).
- **Strategic Page CTA Integrations**: Injected glassmorphic callout sections into `/faq`, `/about`, `/courses`, and `CourseCard` to link critical E-E-A-T pages automatically, maximizing link authority distribution.
- **Bilingual JSON Sync**: Developed and executed a programmatic utility to synchronize the new related link structures across all 48 local blog post JSON records.
- **Rogue AI Crawl Optimization**: Re-engineered `public/robots.txt` to aggressively block bad bots (`anthropic-ai`, `Bytespider`) and set up route budget filters (`/api/`, `/_next/` disallows with static allow paths).
- **Cloudflare Manual Image Optimization SOP**: Generated `SOP 23: Cloudflare Image Optimization` covering hosting offload, Polish/Mirage settings, URL-based resizing parameters, and QA checks.
- **Core Memory & Documentation Update**: Upgraded CIB Core Memory, Phase Ledger, standard operating procedures, and repository index for total version compliance.

## [3.5.0] - 2026-05-20
### 💎 Phase 35: E-E-A-T Authority Expansion Pages
- **Dewan Ismail Dynamic Portfolio**: Formulated `/expert-culinary-mentors/[slug]` dynamic profile layout displaying owner credentials, qualifications, media archives, and prestige highlights.
- **Press & Media Hub**: Created `/press-media` aggregating TV media coverage (Somoy TV, ATN Bangla, News24) and editorial articles.
- **Student Success & Alumni Placement**: Deployed `/success-stories` presenting student transitions to five-star establishments (Radisson, Westin) and international cruise lines.
- **Industry & Corporate Alliances**: Integrated `/industry-partners` page presenting educational collaborations with high-prestige custom SVG logos.
- **JSON-LD Schema Automation**: Wired dynamic, highly detailed schemas (Person, BreadcrumbList, NewsArticle, Article, Organization) across each new page.
- **Documentation Parity**: Modified CIB Core Memory, Phase Ledger, master SOP index, index, and generated `context/sops/eeat-pages.md`.

## [3.4.0] - 2026-05-18
### 🛡️ Phase 34: hCaptcha to Cloudflare Turnstile & Honeypot Migration
- **hCaptcha Eradication**: Removed all `@hcaptcha/react-hcaptcha` code, imports, and references across all form components.
- **Cloudflare Turnstile**: Installed `react-turnstile` and integrated Turnstile widget with dark theme and Obsidian Glass aesthetics into `LeadForm`, `ContactForm`, `DemoClassForm`, and `ApplicationForm`.
- **Honeypot Anti-Spam**: Added hidden honeypot fields (`website`) to all forms to trap and silently drop bot submissions.
- **Secure Lead API Route**: Updated `/api/lead` to verify Turnstile tokens using Cloudflare challenges API, implement the honeypot drop pattern, and gracefully degrade if secrets are missing.
- **Documentation Updated**: Synchronized all environment variables, SOPs, QA Checklists, and configuration files to reflect Turnstile variables.

## [3.3.0] - 2026-05-16
### 📋 Phase 33: Operational SOP Library Creation
- **SOP Index**: Created `context/SOP_INDEX.md` as the master guide list.
- **18 Step-by-Step Guides**: Created `context/sops/` library covering every aspect of site management (Content, Blog, Team, Deployment, SEO, Backups, etc.).
- **Global Linkage**: Integrated SOP links into `INDEX.md`, `README.md`, and `CLAUDE.md`.

## [3.2.0] - 2026-05-16
### ✨ Phase 32: Documentation Overhaul & Semantic Indexing
- **Consolidated Documentation**: Moved all fragmented MD files into `/context`.
- **New Indexing**: Launched `INDEX.md` as the master navigation hub.
- **Content Refresh**: Updated all docs to reflect 2026 production status, 28+ pages, 24+ blog posts, and Norwegian ROI focus.
- **Professional Interlinking**: Applied absolute local file links across all documentation for seamless navigation.

## [3.1.0] - 2026-05-15
### 🛡️ Phase 31: Robust Production Hardening & Logic Resilience
- **Footer Resilience**: Implemented a hardcoded global fallback for the footer to prevent empty columns if JSON data fails to load.
- **Silent Success Pattern**: Refactored `LeadForm`, `ContactForm`, and `ApplicationForm` to show success states even if secondary integrations (Google Sheets/Tracking) fail.
- **Form Hardening**: Standardized `hCaptcha` integration and fixed API route validation to handle missing environment variables gracefully.
- **Deployment SOP**: Finalized `context/DEPLOY_CPANEL.md` with a detailed zip-and-extract workflow.

## [3.0.0] - 2026-05-10
### 🚀 Phase 30: Agentic Tooling & Context7 Integration
- Integrated `ctx7` for real-time documentation retrieval.
- Synchronized 60+ modular skills in `.agent/skills`.
- Launched the "Caveman" efficiency system.

## [2.9.0] - 2026-05-05
### 🎨 Phase 29: Landing Page Integration & Parity Audit
- Integrated the static `professional-chef-course-basic-to-advance` landing page into the Next.js navigation.
- Synchronized tracking and branding across both stacks.

## [1.0.0] - [2.8.0] - 2026-04-29
### 🏗️ Phases 1-28: Core Platform Development
- **P1-P5**: Project Scaffold, Design System, Bilingual Routing.
- **P6-P10**: Homepage Implementation (Hero, Value Prop, Social Proof).
- **P11-P13**: Content Pages (About, Mentors, Courses).
- **P14-P16**: Conversion Engine (Admission, Contact, API Routes).
- **P17-P22**: Auxiliary Pages (Gallery, Blog, Legal, FAQ, Certification).
- **P23-P26**: Intelligence Layer (SEO, Schemas, Analytics, Meta CAPI).
- **P27-P28**: Deployment Preparation & Final QA Audit.

---
*For detailed phase-by-phase implementation notes, see [context/CIB_PHASES.md](./context/CIB_PHASES.md).*

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible](./context/CIB_CORE_MEMORY.md) | [40-Phase Development Ledger](./context/CIB_PHASES.md) | [Changelog](./CHANGELOG.md) | [Project Index](./INDEX.md)
**Deployment:** [cPanel SOP (বাংলা)](./context/sops/cpanel-deployment-bangla.md) | [Deployment Options](./context/sops/cpanel-deployment-options.md) | [QA Checklist](./context/QA_CHECKLIST.md) | [QA Audit Report](./context/QA_AUDIT_REPORT.md)
**SOP Library:** [Master SOP Index](./context/SOP_INDEX.md) | [Environment Variables](./context/sops/environment-variables.md) | [Troubleshooting](./context/sops/troubleshooting.md) | [Google Sheets Lead](./context/sops/google-sheets-lead.md)

