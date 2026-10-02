# SOP: Git Version Control & Deployment in cPanel

This Standard Operating Procedure (SOP) details the workflow for using the **cPanel Git Version Control** interface to manage, synchronize, and deploy code from a remote repository (e.g., GitHub) to the CIB production server.

---

## 1. Prerequisites
- **SSH Access**: Ensure SSH access is enabled for your cPanel account.
- **Remote Repository**: A private or public repository on GitHub/GitLab.
- **cPanel Tool**: Access to the "Git™ Version Control" icon in the "Files" section of cPanel.

---

## 2. SSH Key Configuration (For Private Repos)
If your repository is private, cPanel needs an SSH key to "talk" to GitHub.

1.  **Generate Key in cPanel**:
    - Go to **SSH Access** > **Manage SSH Keys**.
    - Click **Generate a New Key**.
    - Name it `id_rsa_cpanel`, choose a strong passphrase (or leave blank if allowed), and click **Generate**.
2.  **Authorize the Key**:
    - Back in **Manage SSH Keys**, find your new key and click **Manage**.
    - Click **Authorize**.
3.  **Add to GitHub**:
    - Click **View/Download** for the **Public Key**.
    - Copy the key text.
    - Go to your GitHub Repository > **Settings** > **Deploy keys**.
    - Click **Add deploy key**, paste the key, and name it "cPanel Production". Ensure "Allow write access" is **NOT** checked for security.

---

## 3. Initializing the Repository in cPanel
1.  **Navigate**: Go to **Git™ Version Control** in cPanel.
2.  **Create**: Click the **Create** button.
3.  **Configure**:
    - **Clone URL**: Use the SSH URL (e.g., `git@github.com:user/repo.git`).
    - **Repository Path**: Enter the path where the code should reside (e.g., `/home/cibdtamx/cib_nextjs_app`).
    - **Repository Name**: A friendly name (e.g., `CIB_Main`).
4.  **Create**: Click **Create**. cPanel will now clone the repository.

---

## 4. Automated Deployment with `.cpanel.yml`
cPanel can automatically move files to their final destination (like `public_html`) whenever you pull changes. This requires a `.cpanel.yml` file in the root of your repository.

### Example `.cpanel.yml` for CIB:
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/cibdtamx/public_html/
    - /bin/cp -R public/* $DEPLOYPATH
    - /bin/cp server.js /home/cibdtamx/cib_nextjs_app/
    - /bin/cp package.json /home/cibdtamx/cib_nextjs_app/
```
*Note: For Next.js projects, deployment usually involves moving `.next/static` to `public_html` and restarting the Node.js app.*

---

## 5. Deployment Strategies: Source vs. Build Artifacts
Depending on your server's resources, choose one of these two strategies:

### Strategy A: Deploying Build Artifacts (Recommended for CIB)
Since Next.js builds are resource-intensive, it is best to build locally and push the artifacts.
1.  **Workflow**: Run `npm run build` locally.
2.  **Git**: Commit the `.next`, `public`, and `content` folders to a specific `deploy` branch.
3.  **cPanel**: Pull the `deploy` branch.
4.  **Pros**: No high CPU usage on cPanel; faster deployment.

### Strategy B: Deploying Source Code
1.  **Workflow**: Push source code to `main`.
2.  **cPanel**: Pull `main`.
3.  **SSH**: Run `npm install` and `npm run build` via terminal in cPanel.
4.  **Cons**: May hit cPanel memory/CPU limits and crash the server during build.

---

## 6. Routine Maintenance Workflow

### Pulling Updates (Manual)
1.  Go to **Git™ Version Control**.
2.  Click **Manage** next to your repository.
3.  Go to the **Pull or Deploy** tab.
4.  Click **Update from Remote**.
5.  Check for errors in the console output.

### Deploying Changes
If `.cpanel.yml` is present:
1.  In the **Pull or Deploy** tab, click **Deploy HEAD Revision**.
2.  This executes the tasks defined in your `.cpanel.yml`.

---

## 6. Handling Branches (Staging vs Production)
cPanel allows you to track different branches for different directories.
- **Production**: Track the `main` or `master` branch.
- **Staging**: Track the `stage` branch and point the repository path to a subdomain folder (e.g., `/home/cibdtamx/stage.cibdhk.com`).

To switch branches:
1.  Go to **Manage** > **Repository Settings**.
2.  Update the **Active Branch** and save.

---

## 7. Troubleshooting
- **"Authentication Failed"**: Ensure the SSH key is authorized in cPanel AND added as a Deploy Key in GitHub.
- **"Path not empty"**: cPanel will not clone into a directory that already contains files. Move existing files out before cloning.
- **"Deployment Failed"**: Check the syntax of your `.cpanel.yml`. Ensure all paths are absolute or correctly relative to the repository root.

---
*Created: May 18, 2026*

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](./CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](./CIB_PHASES.md) | [Semantic Version Changelog](../CHANGELOG.md) | [Supreme Project Index](../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](./QA_CHECKLIST.md) | [Post-Hotfix Audit Report](./QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](./SOP_INDEX.md) | [SOP 07: cPanel Deployment](./sops/deploy-cpanel.md) | [SOP 08: Environment Variables](./sops/environment-variables.md) | [SOP 16: Technical Troubleshooting](./sops/troubleshooting.md)

