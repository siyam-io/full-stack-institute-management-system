# SOP 21: Meta Conversions API (CAPI) & Pixel Setup

## ðŸŽ¯ Purpose
This Standard Operating Procedure defines the architecture, parameters, event deduplication matching, and diagnostics for **Meta Pixel** (browser-side) and **Meta Conversions API (CAPI)** (server-side) tracking systems running on `cibdhk.com`.

---

## ðŸ—ï¸ Technical Pipeline
To capture lead conversions reliably, even in the presence of browser ad-blockers, CIB uses a hybrid tracking pipeline:

```
                  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ [Client Browser] â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                  â”‚                                              â”‚
                  â–¼                                              â–¼
          [Meta Web Pixel]                              [Submit Button click]
         (Track Lead Event)                                      â”‚
        eventID: 'lead_123456'                                   â–¼
                  â”‚                                       [POST /api/lead]
                  â”‚                                              â”‚
                  â”‚                                              â–¼
                  â”‚                                     [POST /api/track CAPI]
                  â”‚                                     (Server Fetch to Meta)
                  â”‚                                    eventID: 'lead_123456'
                  â”‚                                              â”‚
                  â–¼                                              â–¼
                  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º [META AD CLOUD] â—„â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                (Deduplicated using eventID)
```

---

## ðŸ§© Event Deduplication Strategy
If Meta receives the browser event *and* the server event for the same lead, it will over-report conversions by 100%. To prevent this, we enforce absolute **Deduplication**:

1.  **Generate UUID on Client**: When the lead form renders, a unique `eventID` (e.g., `lead_1779084223`) is generated.
2.  **Fire Web Pixel**: The client-side form fires the browser Pixel lead event, sending the `eventID` parameter:
    ```javascript
    fbq('track', 'Lead', { content_name: 'Chef Course' }, { eventID: 'lead_1779084223' });
    ```
3.  **Fire Server API**: When `/api/lead` successfully processes the sheet write, it sends a POST request internally to [/api/track](file:///c:/Users/esthiyak/Desktop/cibdhk.com/src/app/api/track/route.ts) with the matching `eventID` and hashed matching data (email, phone).
4.  **Meta Deduplicates**: Meta's edge servers match both events using the `eventID`. The browser pixel is kept for instant matching, and CAPI is kept as back-up if browser pixels are blocked.

---

## ðŸ” Credentials & Environment Setup

To keep Meta CAPI tracking active on production, the following variables must be saved in the cPanel environment dashboard:

```env
META_PIXEL_ID=1173752531156477
META_ACCESS_TOKEN=EAAPx... (Your Meta System User Access Token)
```

---

## ðŸ›¡ï¸ Consent Mode V2 Compliance
CIB utilizes Google Consent Mode V2 to comply with global user privacy requirements:
*   **Default State**: When a user lands on the page, analytical cookies and ad-storage tracking are set to `denied` by default.
*   **Consent Banner**: The custom Obsidian Glass consent popup prompts the user to "Accept" or "Decline".
*   **Granting Consent**: If accepted, the tracking module triggers:
    ```javascript
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    });
    ```
    This updates Google GTM (`GTM-T5WVVZ4J`) and GA4 (`G-FKWZ13CQXN`) dynamically in real-time.

---

## ðŸš¨ Troubleshooting & Debugging CAPI

*   **Pixel Helper "Missing Event ID" Warning**: Verify that `eventID` is being passed as the fourth argument in your client-side `fbq` tracker hook.
*   **Over-reporting Conversions**: Check that the `eventID` sent from CAPI matches the browser `eventID` exactly. Any mismatch will prevent Meta from deduplicating the event.
*   **CAPI Server Error 400**: Meta CAPI requires phone numbers to be in E.164 international format (with country code like `+880`) and email addresses to be lowercase, stripped of whitespaces, and SHA-256 hashed before transmission.
---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](../CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](../CIB_PHASES.md) | [Semantic Version Changelog](../../CHANGELOG.md) | [Supreme Project Index](../../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](../sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](../QA_CHECKLIST.md) | [Post-Hotfix Audit Report](../QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](../SOP_INDEX.md) | [SOP 07: cPanel Deployment](./deploy-cpanel.md) | [SOP 08: Environment Variables](./environment-variables.md) | [SOP 16: Technical Troubleshooting](./troubleshooting.md)
