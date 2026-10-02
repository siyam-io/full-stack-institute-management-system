# CIB Next.js cPanel Deployment SOP

**Target Domain:** `cibdhk.com` (Main Domain)  
**Objective:** Backup existing WordPress, deploy the new Next.js standalone build securely inside `/home/cibdtamx`, and route traffic properly.

---

## Step 1: Securely Backup the Existing WordPress Site
*Why: We must clear `public_html` for the new app's static assets to load correctly, but we need to keep the old WordPress site as a backup.*

1. Log in to **cPanel** and open **File Manager**.
2. Make sure you are in the home directory (`/home/cibdtamx`).
3. Click **+ Folder** from the top menu and create a new folder named `old_wordpress_backup`.
4. Double-click the **`public_html`** folder to open it.
5. Click **Select All** (to select all WordPress files and folders).
6. Right-click on the selected files and choose **Move**.
7. Set the destination path to `/home/cibdtamx/old_wordpress_backup` and click **Move File(s)**.
   > **Result:** Your `public_html` is now empty, ready for the new app.

## Step 2: Upload and Extract the Next.js App
*Why: Node.js application core files must live OUTSIDE `public_html` for security reasons.*

1. In **File Manager**, click the **Home** button (or click `/home/cibdtamx` on the left sidebar) to return to the main directory.
2. Click **+ Folder** and create a new folder named `cib_nextjs_app`.
3. Double-click to open the `cib_nextjs_app` folder.
4. Click **Upload** from the top menu, select your newly generated `deploy_cpanel.zip` file from your computer, and upload it.
5. Once uploaded, return to the File Manager, right-click `deploy_cpanel.zip`, and choose **Extract** (extract it directly into `/home/cibdtamx/cib_nextjs_app`).

## Step 3: Move Static Assets to `public_html`
*Why: Next.js static assets (images, CSS, JS chunks) need to be directly inside `public_html` so the browser can load them quickly.*

1. Inside the `cib_nextjs_app` folder, open the **`public`** folder.
2. Click **Select All**, right-click, and choose **Move**.
3. Change the file path to exactly `/home/cibdtamx/public_html` and click **Move File(s)**.
4. Go back to the `cib_nextjs_app` folder and open the **`.next`** folder.
5. Right-click the **`static`** folder inside it and choose **Move**.
6. Change the file path to exactly `/home/cibdtamx/public_html/_next/static` and click **Move File(s)**.
   > *Note: This will automatically create the `_next` folder inside `public_html`.*

## Step 4: Configure the Node.js Application in cPanel
*Why: We need to tell cPanel's server to run our `server.js` file and route `cibdhk.com` traffic to it.*

1. Go back to the main **cPanel Dashboard** (close File Manager or use the other browser tab).
2. Scroll down to the **Software** section and click on **Setup Node.js App**.
3. Click the **Create Application** button.
4. Fill out the configuration form exactly as follows:
   - **Node.js Version:** Select `20.x` (or `18.x`).
   - **Application mode:** Select `Production`.
   - **Application root:** Type `cib_nextjs_app` (The folder created in Step 2).
   - **Application URL:** Select `cibdhk.com` from the dropdown.
   - **Application startup file:** Type `server.js`.
5. Click the **Create** button at the top right.

## Step 5: Start the App and Verify
1. After clicking Create, the app status should show as **"Started"** or **"Running"**.
2. Open a new browser tab and visit `https://cibdhk.com`.
3. The new CIB Next.js website should now load correctly.

### Troubleshooting (If Images/Styles are missing)
If the site loads but looks broken (no CSS/Images), it means **Step 3** wasn't completed correctly. Double-check your File Manager:
- Your images should be located at: `/home/cibdtamx/public_html/images/`
- Your CSS/JS chunks should be located at: `/home/cibdtamx/public_html/_next/static/`

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](./CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](./CIB_PHASES.md) | [Semantic Version Changelog](../CHANGELOG.md) | [Supreme Project Index](../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](./QA_CHECKLIST.md) | [Post-Hotfix Audit Report](./QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](./SOP_INDEX.md) | [SOP 07: cPanel Deployment](./sops/deploy-cpanel.md) | [SOP 08: Environment Variables](./sops/environment-variables.md) | [SOP 16: Technical Troubleshooting](./sops/troubleshooting.md)

