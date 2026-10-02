import { NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  urls: z.array(z.string().url()).min(1)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { urls } = validation.data;
    const indexNowKey = process.env.INDEXNOW_KEY;

    if (!indexNowKey) {
      console.error('[INDEXNOW_API_ERROR] INDEXNOW_KEY environment variable is not configured.');
      return NextResponse.json(
        { error: 'IndexNow integration is not configured on the server.' },
        { status: 501 }
      );
    }

    // Determine the host dynamically or from environment variable
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://culinaryacademy.com';
    let host = 'culinaryacademy.com';
    try {
      const urlObj = new URL(siteUrl);
      host = urlObj.hostname;
    } catch (e) {
      console.warn('[INDEXNOW_HOST_WARNING] Failed to parse NEXT_PUBLIC_SITE_URL, falling back to default host.', e);
    }

    // Prepare IndexNow request payload
    const indexNowPayload = {
      host: host,
      key: indexNowKey,
      keyLocation: `${siteUrl}/${indexNowKey}.txt`,
      urlList: urls
    };

    console.info(`[INDEXNOW_SUBMIT] Submitting ${urls.length} URLs for host: ${host}`);

    // Submit to Bing IndexNow endpoint
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(indexNowPayload)
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error(`[INDEXNOW_API_FAILURE] Bing returned status ${response.status}: ${responseText}`);
      return NextResponse.json(
        { error: 'IndexNow submission failed', details: responseText, status: response.status },
        { status: 502 }
      );
    }

    console.info(`[INDEXNOW_SUCCESS] Successfully submitted URLs to Bing IndexNow.`);
    return NextResponse.json(
      { message: 'URLs successfully submitted to IndexNow API.', urls },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('[INDEXNOW_CRITICAL_ERROR]', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
