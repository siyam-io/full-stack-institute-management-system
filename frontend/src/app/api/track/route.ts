import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

/**
 * CIB Unified Tracking API (Server-Side)
 * Forwards events to Meta CAPI, TikTok, and Pinterest.
 */

const trackSchema = z.object({
  event_name: z.enum(['Lead', 'CompleteRegistration', 'Purchase', 'Schedule', 'Contact', 'ViewContent']),
  event_id: z.string(),
  user_data: z.object({
    email_sha256: z.string().optional(),
    phone_sha256: z.string().optional(),
    fbp: z.string().optional(),
    fbc: z.string().optional(),
    client_ip_address: z.string().optional(),
    client_user_agent: z.string().optional(),
    external_id: z.string().optional(),
  }),
  custom_data: z.record(z.string(), z.any()).optional(),
  event_source_url: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = trackSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid tracking data', details: validation.error }, { status: 400 });
    }

    const { event_name, event_id, user_data, custom_data, event_source_url } = validation.data;
    const client_ip = req.headers.get('x-forwarded-for') || '0.0.0.0';
    const user_agent = req.headers.get('user-agent') || '';

    const timestamp = Math.floor(Date.now() / 1000);

    let final_custom_data = custom_data || {};
    if (event_name === 'Purchase') {
      final_custom_data = {
        value: 44000,
        currency: 'BDT',
        content_ids: ['CHEF-001'],
        content_name: 'Professional Chef Course',
        ...final_custom_data
      };
    }

    // 1. Meta Conversions API (CAPI)
    if (process.env.META_PIXEL_ID && process.env.META_ACCESS_TOKEN) {
      const metaPayload = {
        data: [{
          event_name,
          event_time: timestamp,
          event_id,
          event_source_url: event_source_url || req.headers.get('referer'),
          action_source: 'website',
          user_data: {
            em: user_data.email_sha256 ? [user_data.email_sha256] : undefined,
            ph: user_data.phone_sha256 ? [user_data.phone_sha256] : undefined,
            fbp: user_data.fbp,
            fbc: user_data.fbc,
            client_ip_address: user_data.client_ip_address || client_ip,
            client_user_agent: user_data.client_user_agent || user_agent,
          },
          custom_data: final_custom_data,
        }]
      };

      fetch(`https://graph.facebook.com/v21.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_ACCESS_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaPayload),
      }).catch(err => console.error('[META_CAPI_ERROR]', err));
    }

    // 2. TikTok Events API
    if (process.env.TIKTOK_PIXEL_ID && process.env.TIKTOK_ACCESS_TOKEN) {
      const tiktokPayload = {
        pixel_code: process.env.TIKTOK_PIXEL_ID,
        event: event_name,
        event_id,
        timestamp: new Date().toISOString(),
        context: {
          ad: {
            callback: body.ttclid,
          },
          user: {
            email: user_data.email_sha256,
            phone_number: user_data.phone_sha256,
          },
          page: {
            url: event_source_url || req.headers.get('referer'),
          },
        },
      };

      fetch(`https://business-api.tiktok.com/open_api/v1.3/event/track/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Access-Token': process.env.TIKTOK_ACCESS_TOKEN
        },
        body: JSON.stringify(tiktokPayload),
      }).catch(err => console.error('[TIKTOK_API_ERROR]', err));
    }

    // 3. Pinterest Conversions API
    if (process.env.PINTEREST_AD_ACCOUNT_ID && process.env.PINTEREST_ACCESS_TOKEN) {
      const pinterestPayload = {
        data: [{
          event_name,
          event_time: timestamp,
          event_id,
          user_data: {
            em: user_data.email_sha256 ? [user_data.email_sha256] : undefined,
            client_ip_address: client_ip,
            client_user_agent: user_agent,
          },
          custom_data,
        }]
      };

      fetch(`https://api.pinterest.com/v5/ad_accounts/${process.env.PINTEREST_AD_ACCOUNT_ID}/events`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}`
        },
        body: JSON.stringify(pinterestPayload),
      }).catch(err => console.error('[PINTEREST_API_ERROR]', err));
    }

    return NextResponse.json({ message: 'Tracking event forwarded' }, { status: 200 });
  } catch (err) {
    console.error('[TRACKING_API_ERROR]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
