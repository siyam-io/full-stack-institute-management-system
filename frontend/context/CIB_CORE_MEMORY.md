# 🧠 CIB Core Memory & Consistency Guide

> [!IMPORTANT]
> **Production Audited & Verified**  
> This file is the single source of truth for the Culinary Institute of Bangladesh (CIB) repository. It must be utilized as active context for all future edits, maintenance, or content updates.

---

## 🏛️ 1. Brand Identity & Authority
- 🏢 **Vocational Powerhouse:** CIB is a high-yield vocational training powerhouse, not a casual cooking school.
- 🎖️ **Accreditation:** CIB is an **NSDA (National Skill Development Authority, Prime Minister's Office)** approved and accredited Skill Training Provider (STP).
- 👥 **The CIB Team:** Currently composed of **10 specialized members**, including elite mentors like Dewan Ismail, Rafeya Chowdhury, and Salman Iqbal (Marketing/SEO).
- 📜 **BTEB Allowance:** While we strictly prohibit mentioning foreign/UK bodies (like City & Guilds), local **BTEB (Bangladesh Technical Education Board)** credentials are formally permitted in mentor profiles.
- 🚫 **No UK Fallbacks:** Never mention "UK qualification" or foreign institutes. The only primary institutional certification body is the NSDA.
- 🎯 **Goal-Oriented:** We train future high-earning global professionals with a focus on Norway and Gulf migration ROI.

---

## 📍 2. Campus Locations & Facilities
CIB operates a multi-campus architecture to serve the culinary community in Dhaka:

1.  🏢 **Kalabagan Headquarters (Primary Admission & Advanced Labs):**
    - **Address:** 1st Floor, House 53, Road 2 (Beside Bashundhara Gali), Kalabagan, Dhaka-1205.
    - **Transit:** 2-min walk from Science Lab or Kalabagan Bus Stand.

---

## 🎨 3. Design System & Aesthetics (Obsidian Edition)

### 🎨 Core Color Tokens
*   ⚫ **Obsidian Black:** `#000A1A` (Primary background, heavy hero overlays, footer, dark section panels)
*   🔴 **CIB Power Red:** `#EC1B23` (CTAs, primary brand highlights, critical text elements, badges)
*   🟡 **Prestige Gold:** `#FFD700` (Accent lines, certificates, five-star reviews, decorative highlights)
*   ⚪ **Titanium White:** `#FFFFFF` (High-contrast typography over dark cards)
*   🧊 **Ice Flow Gray:** `#F8FAFC` (High-contrast light sections)

### 🧩 Global Footer Architecture (Obsidian Glass)
The site utilizes a standardized 5-column footer with a **Hardcoded Fallback Mechanism** in `layout.tsx` to ensure 100% uptime:
1.  **Brand & Accreditations:** Institutional logos and mission.
2.  **Quick Navigation:** Links to core pages (Home, About, Courses).
3.  **Global Trust:** Verification links and mentors.
4.  **Campus Locations:** Details for Kalabagan and South Banasree.
5.  **Direct Contact:** Phone, WhatsApp, and social links via inline SVGs.

### 🔤 Typography Mappings
- 🇬🇧 **English Locale:** `Inter` (weights: 400, 700, 900) — locally preloaded.
- 🇧🇩 **Bengali Locale:** `Anek Bangla` (weights: 400, 500, 600, 700) — locally preloaded.

---

## 🎓 4. Course & Certification Specifications (Non-Negotiable)

### 🌟 Flagship Course: Professional Chef Course (Basic to Advance)
- ⏱️ **Duration:** 3 Months | 3 Days per Week | 100% On-Site Practical classes.
- 📖 **Scope:** 120+ authentic recipes from 16+ countries (master menus standard in 5-star kitchens).
- 🎁 **Free Bonus:** Advanced Pastry and Bakery Course + Certificate included.
- 🎒 **Admission Gifts:** International Culinary Sheet, Full Chef Uniform Set, Professional Cutting Board & Chef's Knife.

### 💰 Course Pricing & Payment Structure
- 💵 **Total Tuition:** `44,000`/- BDT (No hidden charges).
- 🎟️ **Admission Booking:** `16,000`/- BDT.
- 💳 **Installments:** Remaining `28,000`/- BDT split into two equal installments of `14,000` BDT each.

### 📜 Accredited Certifications
All graduates receive exactly three certificates:
1.  **NSDA Food & Beverage Production Certificate (Level-2 & 3)**.
2.  **ISO-HACCP, Hygiene & GMP Certificate**.
3.  **CIB Institutional Graduate Certificate**.

---

## 🚀 5. Node.js Production Hosting (cPanel Platform)
- ⚙️ **Startup Script:** Powered by `/server.js` (custom Express server to handle ports).
- 📦 **Deployment Build:** Generated via `cpanel_bundle.ps1` into `deploy_cpanel.zip`.
- 📂 **Inclusion Rule:** The `content/` folder **must** be included in the deployment bundle as of Phase 31.
- ⚡ **Optimization:** Next.js `unoptimized: true` for images is enforced for cPanel compatibility.

---

## 🗺️ 6. Directory & Route Map (Context-Centered)
```text
cibdhk.com/
├── context/               # Consolidated project documentation (Authority Center)
├── content/               # High-fidelity bilingual JSON contents (32+ pages)
│   ├── en/                # English content JSONs
│   └── bn/                # Bengali content JSONs 
├── public/                # Static assets & Standing Landing Pages
│   └── professional-chef-course-basic-to-advance/  # Integrated LP
├── src/
│   ├── app/[locale]/      # Localized routes (about, admission, blog, courses, etc.)
│   │   ├── expert-culinary-mentors/         # Mentors page
│   │   │   └── [slug]/                      # [NEW] E-E-A-T Dynamic Route 
│   │   ├── press-media/                     # [NEW] E-E-A-T Press & Media Page
│   │   ├── success-stories/                 # [NEW] E-E-A-T Student Success Stories Page
│   │   └── industry-partners/               # [NEW] E-E-A-T Industry Partners Page
│   ├── components/        # Obsidian Glass component system
│   ├── lib/               # SEO generators, tracking, validation
│   └── styles/            # Tailwind base configurations
├── server.js              # cPanel Node.js custom startup script
├── cpanel_bundle.ps1      # cPanel ZIP bundle generator
├── INDEX.md               # Master Navigation Hub
└── CHANGELOG.md           # 36-Phase Project History
```

### 💎 Key E-E-A-T Route Mapping
- **Dewan Ismail Portfolio**: `/en/expert-culinary-mentors/dewan-ismail` | `/bn/expert-culinary-mentors/dewan-ismail`
- **Press & Media Hub**: `/en/press-media` | `/bn/press-media`
- **Student Success Stories**: `/en/success-stories` | `/bn/success-stories`
- **Industry & Corporate Partners**: `/en/industry-partners` | `/bn/industry-partners`

---

## 🤖 7. Agentic Development Environment & Workflows

> [!WARNING]
> *To be strictly followed by all AI coding agents.*

### 🛠️ Tooling & Infrastructure
- 🔧 **Agentic Skills:** 60+ modular specialized skills in `.agent/skills/`.
- 📚 **Authority Files (located in `/context`):**
  - **[README.md](../README.md)**: Master portal entry.
  - **[CIB_CORE_MEMORY.md](../context/CIB_CORE_MEMORY.md)**: Single source of truth.
  - **[CIB_PHASES.md](../context/CIB_PHASES.md)**: Project ledger (36 Phases).
  - **[SKILLS_CATALOG.md](../context/SKILLS_CATALOG.md)**: Technical index.
  - **[QA_AUDIT_REPORT.md](../context/QA_AUDIT_REPORT.md)**: Production audit log.

### 🔄 Core Development Loop (Unified Loop)
1.  🔍 **Research:** Use `find-docs` for documentation parity.
2.  💡 **Socratic Planning:** Use `brainstorming` + `writing-plans` before coding.
3.  🧪 **Strict TDD:** Apply Red-Green-Refactor testing cycles.
4.  ✅ **Verification:** Run `verification-before-completion` as the final quality gate.
5.  🛡️ **Hardening:** Enforce **Silent Success** and **Fallback** patterns for all production logic.

---

> [!NOTE]
> *Last Updated: May 20, 2026 (Phase 36)*