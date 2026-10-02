# SOP 20: Google Sheets Lead API Integration & Debugging

## ðŸŽ¯ Purpose
This Standard Operating Procedure defines the administration, columns schema, authentication flow, and troubleshooting protocols for the automated Google Sheets lead capture system connected to `/api/lead` on `cibdhk.com`.

---

## ðŸ—ï¸ Technical Architecture
Every form submission runs through this serverless API pipeline to log student data securely:

```
[Form Submission on Client]
           â”‚
           â–¼
[POST Request to /api/lead]
           â”‚
           â–¼
[Check Turnstile & Honeypot]
           â”‚
           â–¼
[Read GOOGLE_SHEETS_PRIVATE_KEY & CLIENT_EMAIL]
           â”‚
           â–¼
[Authenticate OAuth2 Client JWT]
           â”‚
           â–¼
[Fetch Spreadsheet ID & Append Row]
           â”‚
           â–¼
[Return 200 Success JSON]
```

---

## ðŸ› ï¸ Column Schema Mapping
The Lead API routes the student parameters into the following standardized spreadsheet columns:

| Column # | Parameter Name | Description | Example Value |
| :--- | :--- | :--- | :--- |
| **A** | `Timestamp` | Date and time of lead capture | `2026-05-18 03:41:00` |
| **B** | `Name` | Student's full legal name | `Hasan Rizvee` |
| **C** | `Phone` | Verified phone number | `+8801700000000` |
| **D** | `Email` | Student's primary email address | `hello@rizvee.me` |
| **E** | `Campus` | Selected campus choice | `Dhaka Science Lab` |
| **F** | `Course` | Selected course | `Professional Chef Course` |
| **G** | `Language` | Browser viewport language | `en` (or `bn`) |
| **H** | `Source` | Form submit source identifier | `LeadForm` / `ContactForm` / `DemoClass` |

---

## 🔐 Credentials & Environment Setup

To keep Google Sheets integrations functional, the following environment variables must be defined in your `.env.local` file at the root of the server directory:

```env
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_client_email
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQ..."
```

### Steps to Generate New Service Account Credentials:
1.  Go to the **Google Cloud Console**.
2.  Enable the **Google Sheets API** for your project.
3.  Navigate to **IAM & Admin > Service Accounts**.
4.  Click **Create Service Account** and grant it a role (e.g. Viewer/Editor).
5.  Click your service account -> **Keys** -> **Add Key > Create New Key (JSON)**.
6.  Open the downloaded JSON file and extract:
    *   `client_email` -> `GOOGLE_SERVICE_ACCOUNT_EMAIL`
    *   `private_key` -> `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (Keep the `\n` characters intact in env variables).
7.  **CRITICAL**: Open your target Google Sheet and click **Share**. Share it with your service account's `GOOGLE_SERVICE_ACCOUNT_EMAIL` as an **Editor**!

---

## 🚨 Troubleshooting & Debugging

*   **Error 403: Access Denied**: The service account email has not been shared on the Google Sheet. Open the sheet and grant Editor access to the service account email.
*   **Error: PEM_read_bio_PrivateKey failed**: The private key formatting is corrupted. Ensure the key in `.env.local` is surrounded by double quotes and contains literal `\n` character combinations to indicate newlines.
*   **cPanel Environment Loading**: Since Next.js standalone mode does not natively load `.env.local` on start, verify that the custom env loader script was successfully injected into `server.js` by running the build pipeline. Check the logs folder or server output for: `[Env Loader] Loading variables from .env.local`.
*   **API Timeouts (504 Gateway Timeout)**: The Next.js api is failing to reach Google Sheets. Check that the outbound HTTPS port `443` is not blocked by cPanel CSF (ConfigServer Security & Firewall) rules.
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
