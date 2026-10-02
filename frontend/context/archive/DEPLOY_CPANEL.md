# CIB Next.js cPanel Deployment SOP

**Target Domain:** `cibdhk.com`
**Objective:** Deploy the robust, multi-lingual Next.js build with resilient form handling and global footer stability.

---

## Pre-Deployment Checklist (Local)
1.  [x] Run `npm run build` in the project root.
2.  [x] Run `./cpanel_bundle.ps1` to generate `deploy_cpanel.zip`.
3.  [x] Verify `deploy_cpanel.zip` contains `content/`, `public/`, `.next/`, `server.js`, and `package.json`.

---

## Step 1: Stop and Clear the Existing Environment
*Why: We must stop the Node process to unlock files and clear old assets to prevent caching/version mismatches.*

1.  Log in to **cPanel** and go to **Software > Setup Node.js App**.
2.  Find the application for `cibdhk.com` and click the **Stop** button (square icon).
3.  Open **File Manager** and navigate to `/home/cibdtamx/cib_nextjs_app`.
4.  **Delete** all contents inside `cib_nextjs_app` (keep the folder itself).
5.  Navigate to `/home/cibdtamx/public_html`.
6.  **Delete** the `_next` folder and all images/assets from the previous deployment (be careful not to delete any unrelated critical files if sharing the domain).

---

## Step 2: Upload and Extract the New Build
1.  In **File Manager**, enter `/home/cibdtamx/cib_nextjs_app`.
2.  Click **Upload** and select `deploy_cpanel.zip`.
3.  Once uploaded, right-click the zip and choose **Extract**.
4.  **Verification**: You should see the following structure inside `cib_nextjs_app`:
    - `.next/`
    - `content/` (contains `en/` and `bn/`)
    - `public/`
    - `node_modules/`
    - `package.json`
    - `server.js`

---

## Step 3: Synchronize Static Assets
*Why: Next.js needs its static chunks and public images to be accessible via the web server root.*

1.  Inside `cib_nextjs_app/public`, **Select All** files and folders (e.g., `images`, `fonts`, `sitemap.xml`).
2.  Use the **Move** tool to move them to `/home/cibdtamx/public_html/`.
3.  Navigate to `cib_nextjs_app/.next/static`.
4.  **Move** the entire `static` folder to `/home/cibdtamx/public_html/_next/`.
    - *Note: If `_next` doesn't exist in `public_html`, create it first.*
    - *The final path should be `/home/cibdtamx/public_html/_next/static`.*

---

## Step 4: Restart the Application
1.  Return to **Setup Node.js App** in cPanel.
2.  Click **Edit** (pencil icon) on the `cibdhk.com` app.
3.  Ensure the following settings:
    - **Application root**: `cib_nextjs_app`
    - **Startup file**: `server.js`
4.  Click **Run JS Script** and select `build` (optional if already built locally, but good for verification).
5.  Click **Restart** at the top of the page.

---

## Step 5: Final QA Verification Checklist
Visit `https://cibdhk.com` and perform these tests:

- [ ] **Footer Stability**: Scroll to the very bottom. Verify that all 5 columns (Navigation, Quick Links, Institutional, Contact, Newsletter) are fully populated with links and text.
- [ ] **Admission Form**: Fill and submit at `/en/admission`. Ensure a success message appears.
- [ ] **Contact Form**: Fill and submit at `/en/contact`. Ensure a success message appears.
- [ ] **Demo Class Form**: Submit the "Schedule Demo" form on the admission page.
- [ ] **About Page**: Navigate to `/en/about` and scroll to the bottom. Ensure no browser crashes or layout breaks occur.
- [ ] **Language Sync**: Toggle to Bengali (`/bn`) and verify the footer and header content translate correctly.

---

**Troubleshooting:**
- If the footer is empty: Ensure the `content/` folder was extracted into `/home/cibdtamx/cib_nextjs_app/`.
- If images are 404: Ensure the contents of `public/` were moved directly into `public_html/`.

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](./CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](./CIB_PHASES.md) | [Semantic Version Changelog](../CHANGELOG.md) | [Supreme Project Index](../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](./QA_CHECKLIST.md) | [Post-Hotfix Audit Report](./QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](./SOP_INDEX.md) | [SOP 07: cPanel Deployment](./sops/deploy-cpanel.md) | [SOP 08: Environment Variables](./sops/environment-variables.md) | [SOP 16: Technical Troubleshooting](./sops/troubleshooting.md)

