# SOP 19: Turnstile & Honeypot Anti-Spam Management

## ðŸŽ¯ Purpose
This Standard Operating Procedure defines the administration, key rotation, bot monitoring, and technical maintenance of the **Cloudflare Turnstile** challenge widgets and the automated hidden **Honeypot** anti-spam system deployed on `cibdhk.com`.

---

## ðŸ—ï¸ Architectural Blueprint
The defense framework consists of client-side validation, a hidden bot trap, and server-side challenge verification:

```
[User Form Submit]
       â”‚
       â–¼
[Is Honeypot 'website' filled?]
       â”œâ”€â”€ Yes (Spambot detected!) â”€â”€â–º [Silently return 200 OK] â”€â”€â–º (Integrations bypassed, Bot trapped!)
       â”‚
       â””â”€â”€ No (Human check)
             â”‚
             â–¼
[Verify CF Turnstile Token Server-Side]
       â”œâ”€â”€ Valid Token â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º [Append to Google Sheets] â”€â”€â–º Success 200 OK
       â”‚
       â””â”€â”€ Invalid Token â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º [Reject Submission] â”€â”€â”€â”€â”€â–º 400 Bad Request
```

---

## ðŸ› ï¸ Step-by-Step Operations

### 1. Rotating Cloudflare Turnstile Keys
If the Site Key or Secret Key is compromised or needs rotation, follow this guide:

1.  Log in to your **Cloudflare Dashboard**.
2.  Navigate to **Turnstile** in the sidebar.
3.  Click **Add Site** or select the existing `cibdhk.com` entry.
4.  Copy the new **Site Key** (Public) and **Secret Key** (Secret).
5.  Update your environment files:
    *   **Local Development**: Edit `/.env.local`:
        ```env
        NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_new_site_key
        TURNSTILE_SECRET_KEY=your_new_secret_key
        ```
    *   **Production cPanel App**:
        *   Log in to **cPanel** > **Setup Node.js App**.
        *   Find `cibdhk.com` and click **Edit**.
        *   Scroll to **Environment Variables**.
        *   Update `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
        *   Click **Save** and **Restart** the application.

### 2. Monitoring & Tuning the Honeypot Trap
The honeypot field is configured as an invisible field with the name `website`:
```tsx
<input
  type="text"
  name="website"
  value={formData.website}
  onChange={handleChange}
  className="absolute opaque-0 w-0 h-0 -z-50 pointer-events-none"
  tabIndex={-1}
  autoComplete="off"
/>
```
*   **Security Principle**: Automated bots fill every input field they find in the DOM. Human users cannot see or interact with this field.
*   **Decoy Return (Silent Success)**: If `website` contains a value on form submit, the API route [/api/lead](file:///c:/Users/esthiyak/Desktop/cibdhk.com/src/app/api/lead/route.ts) immediately stops, returns a fake `200 Success` code, and logs:
    ```javascript
    console.warn("Honeypot filled by spambot. Silent success returned.");
    ```

### 3. Troubleshooting Challenge Errors
*   **Widget Not Rendering**: Verify that `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set correctly. If missing, the widget will fail to initialize.
*   **Failed Verification Errors (400 Bad Request)**: Check that the system clock on the cPanel hosting server is synchronized. Cloudflare verification will fail if token timestamps are out of sync by more than a few minutes.
*   **Local Staging Bypass**: In local development, if `TURNSTILE_SECRET_KEY` is not defined in `.env.local`, token verification is bypassed automatically, allowing you to test forms without captcha solves.
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
