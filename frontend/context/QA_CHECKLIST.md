# 🏁 CIB Production QA & Launch Checklist

This checklist must be executed after every major update or deployment to ensure 100% platform integrity.

---

## 🔑 Environment Setup (cPanel)
- [ ] `TURNSTILE_SECRET_KEY` (Server-side verification)
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Client-side widget)
- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` (Google Sheets integration)
- [ ] `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (Google Sheets integration)
- [ ] `GOOGLE_SHEET_ID` (Lead storage)
- [ ] `NEXT_PUBLIC_SITE_URL` (Canonical links)

---

## 🛠️ Post-Deployment Sanity Checks
- [ ] **Homepage Load**: Navigate to `https://cibdhk.com/`. Verify Hero and Stats appear.
- [ ] **Footer Verification**: Scroll to bottom. Ensure all 5 columns are populated (fallback check).
- [ ] **Bilingual Toggle**: Switch between EN and BN. Verify `/bn` prefix appears and content updates.
- [ ] **Landing Page**: Navigate to `/professional-chef-course-basic-to-advance/`. Ensure form loads.

---

## 📝 Form & Integration Testing
- [ ] **Admission Lead**: Submit test data on `/en/admission`. Verify "Success" message appears.
- [ ] **Contact Lead**: Submit test data on `/en/contact`. Verify "Success" message appears.
- [ ] **Turnstile**: Verify the Cloudflare Turnstile widget appears on all forms before submission.
- [ ] **Silent Success**: Simulate a network failure (offline mode) and verify the form still shows a professional notification.

---

## 📈 SEO & Tracking Audit
- [ ] **GTM Tag Assistant**: Open `tagassistant.google.com`. Verify `GTM-T5WVVZ4J` fires on all pages.
- [ ] **Schema Validation**: Use [Rich Results Test](https://search.google.com/test/rich-results) for Homepage and Courses.
- [ ] **Mobile Responsive**: Test Hamburger menu on mobile resolution. Ensure no horizontal overflow.

---

## 📦 Maintenance & Documentation
- [ ] **Changelog**: Update `CHANGELOG.md` with the latest version/deployment info.
- [ ] **Context Sync**: Ensure `/context/SUMMARY.md` reflects the latest content counts.

---
*Certified for May 2026 Production Standards.*

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](./CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](./CIB_PHASES.md) | [Semantic Version Changelog](../CHANGELOG.md) | [Supreme Project Index](../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](./sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](./QA_CHECKLIST.md) | [Post-Hotfix Audit Report](./QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](./SOP_INDEX.md) | [SOP 07: cPanel Deployment (Bangla)](./sops/cpanel-deployment-bangla.md) | [SOP 08: Environment Variables](./sops/environment-variables.md) | [SOP 16: Technical Troubleshooting](./sops/troubleshooting.md)

