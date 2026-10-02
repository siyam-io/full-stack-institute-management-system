# SOP 08: How to Manage Environment Variables

## Purpose
To securely manage API keys, secrets, and configuration values that differ between local and production environments.

## Prerequisites
- Access to the `.env.local` file.
- Admin access to cPanel "Setup Node.js App".

## Step-by-Step Instructions

### Local Management
1.  **Open File**: Open `.env.local` in the project root.
2.  **Edit**: Add or update keys using the format `KEY_NAME=VALUE`.
3.  **Restart**: You must restart the `npm run dev` server for changes to take effect.

### Production Management (cPanel)
The application uses an automated environment loader injected into `server.js` during the `cpanel_bundle.ps1` process. It loads `.env.local` directly from the application root folder at startup.

1.  **Create/Edit File**: Create or upload a `.env.local` file in your cPanel Node.js application directory (e.g., `/home/clbdtamx/cib_nextjs_app/.env.local`).
2.  **Add Keys**: Write keys using standard `KEY_NAME=VALUE` format. For multiline variables like `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, keep double quotes and use `\n` to represent newlines.
3.  **Restart**: Go to cPanel > **Setup Node.js App**, edit your application, and click **Restart** to apply the changes.

*(Note: Setting environment variables in the cPanel GUI is still supported, but placing them in `.env.local` is recommended to avoid formatting corruption with Google API keys).*

## Critical Variables List
- `NEXT_PUBLIC_SITE_URL`: `https://cibdhk.com`
- `TURNSTILE_SECRET_KEY`: Server-side key for Cloudflare Turnstile.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Client-side key for Cloudflare Turnstile.
- `GOOGLE_SHEET_ID`: Target Google Sheet ID for lead captures.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Client email for Google Service Account.
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`: Private key (RSA) for Google Service Account (with `\n` newlines).
- `INDEXNOW_KEY`: Bing IndexNow API key used to verify site ownership and authorize URL submissions.

## Verification Steps
- ✅ For forms: Submit a test lead and check if it reaches the Google Sheet.
- ✅ For site URL: Check if canonical links in the `<head>` point to the correct URL.

## Troubleshooting
- **Variables not loading**: In cPanel, ensure you clicked "Save" *inside* the Node.js App interface, not just the general page save.
- **Undefined errors**: Ensure client-side variables start with `NEXT_PUBLIC_`.

## Related SOPs
- [SOP 16: Troubleshooting](./troubleshooting.md)
- [SOP 07: cPanel Deployment](./deploy-cpanel.md)
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
