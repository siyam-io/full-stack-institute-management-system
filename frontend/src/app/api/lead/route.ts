import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { z } from 'zod';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Simple in-memory rate limit
const rateLimitMap = new Map<string, { count: number, lastRequest: number }>();

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.preprocess(
    (val) => (val === null || val === undefined || typeof val !== 'string' || val.trim() === '') ? undefined : val.trim(),
    z.string().email().optional()
  ),
  course: z.preprocess(
    (val) => (val === null || val === undefined || typeof val !== 'string' || val.trim() === '') ? undefined : val.trim(),
    z.string().optional()
  ),
  type: z.preprocess(
    (val) => (val === null || val === undefined || typeof val !== 'string' || val.trim() === '') ? undefined : val.trim(),
    z.string().optional()
  ),
  message: z.preprocess(
    (val) => (val === null || val === undefined || typeof val !== 'string' || val.trim() === '') ? undefined : val.trim(),
    z.string().optional()
  ),
  turnstileToken: z.preprocess(
    (val) => (val === null || val === undefined || typeof val !== 'string' || val.trim() === '') ? undefined : val.trim(),
    z.string().optional()
  ),
  honey_val: z.preprocess(
    (val) => (val === null || val === undefined || typeof val !== 'string' || val.trim() === '') ? undefined : val.trim(),
    z.string().optional()
  )
});

/**
 * SHA-256 Hashing for PII (Meta CAPI requirements)
 */
function hashPII(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const userAgent = req.headers.get('user-agent') || '';
    const referer = req.headers.get('referer') || '';
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);

    if (rateLimit && now - rateLimit.lastRequest < 60000 && rateLimit.count >= 5) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    rateLimitMap.set(ip, {
      count: (rateLimit?.count || 0) + 1,
      lastRequest: now
    });

    const body = await req.json();
    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      console.warn('[LEAD_VALIDATION_ERROR]', validation.error.format());
      return NextResponse.json({ error: 'Invalid data', details: validation.error.format() }, { status: 400 });
    }

    const { name, phone, email, course, type, message, turnstileToken, honey_val } = validation.data;

    // Log form receipt without PII
    console.info(`[LEAD] Form received — type: ${type || 'Lead'}, course: ${course || 'N/A'}`);
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) console.debug('Form data (dev only):', { name, phone, email, course, type });

    try {
      const logsDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
      const backupPath = path.join(logsDir, 'leads.json');
      const backupData = { date: new Date().toISOString(), ...validation.data };
      fs.appendFileSync(backupPath, JSON.stringify(backupData) + '\n');
    } catch (e) {
      console.error("[JSON_BACKUP_ERROR]", e);
    }

    // 1. Honeypot check: If the hidden input is filled, it's a bot. Silently drop but return 200.
    if (honey_val && honey_val.trim() !== '') {
      console.warn('[HONEYPOT] Spam submission trapped and silently dropped.');
      return NextResponse.json({ message: 'Success' }, { status: 200 });
    }

    // 2. Cloudflare Turnstile verification (skip in dev — sitekey is domain-locked to cibdhk.com)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!isDev && turnstileSecret && turnstileToken) {
      const turnstileResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      });
      const turnstileData = await turnstileResult.json();
      if (!turnstileData.success) {
        console.warn('[TURNSTILE] Verification failed');
        return NextResponse.json({ error: 'Security verification failed' }, { status: 400 });
      }
    } else if (!turnstileSecret) {
      console.warn('[LEAD_API] TURNSTILE_SECRET_KEY is missing. Skipping verification.');
    }

    // Google Sheets Integration (Non-blocking)
    try {
      if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
        let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
          privateKey = privateKey.slice(1, -1);
        }
        const auth = new JWT({
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: privateKey.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        await sheet.addRow({
          Date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
          Type: type || 'Lead',
          Name: name,
          Phone: phone,
          Email: email,
          Course: course || 'N/A',
          Message: message || '',
          Source: 'CIB Main Website'
        });
      }
    } catch (sheetErr: any) {
      console.error('[GOOGLE_SHEETS_ERROR]', (sheetErr as any)?.message || sheetErr);
    }

    // Server-Side Tracking (Non-blocking)
    try {
      const cookieStore = cookies();
      const fbp = cookieStore.get('_fbp')?.value;
      const fbc = cookieStore.get('_fbc')?.value;

      const trackingPayload = {
        event_name: 'Lead',
        event_id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        user_data: {
          email_sha256: email ? hashPII(email) : undefined,
          phone_sha256: hashPII(phone),
          fbp,
          fbc,
          client_ip_address: ip,
          client_user_agent: userAgent,
        },
        custom_data: {
          content_name: course || 'General Inquiry',
          content_category: type || 'Lead',
          value: 44000,
          currency: 'BDT',
        },
        event_source_url: referer,
      };

      const url = new URL(req.url);
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${url.protocol}//${url.host}`;
      fetch(`${baseUrl}/api/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackingPayload),
      }).catch(err => console.error('[LEAD_TRACKING_ERROR]', err));
    } catch (trackErr) {
      console.error('[LEAD_TRACKING_ERROR]', trackErr);
    }

    // Success — no PII in logs

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (err) {
    console.error('[LEAD_ERROR]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
