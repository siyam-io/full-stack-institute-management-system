import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, message, stack, timestamp } = body;

    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const errorsFilePath = path.join(logsDir, 'errors.json');
    const errorLog = {
      timestamp: timestamp || new Date().toISOString(),
      url: url || '',
      message: message || '',
      stack: stack || '',
      ip: req.headers.get('x-forwarded-for') || 'anonymous',
      userAgent: req.headers.get('user-agent') || ''
    };

    fs.appendFileSync(errorsFilePath, JSON.stringify(errorLog) + '\n');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('[LOG_ERROR_API]', err.message || err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
