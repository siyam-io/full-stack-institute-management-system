import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const logsDir = path.join(process.cwd(), 'logs');
    const backupPath = path.join(logsDir, 'leads.json');
    const alertPath = path.join(logsDir, 'lead_alert.json');

    if (!fs.existsSync(backupPath)) {
      const message = 'No leads log file found';
      fs.writeFileSync(alertPath, JSON.stringify({ alert: true, message, timestamp: new Date().toISOString() }));
      return NextResponse.json({ status: 'warning', message }, { status: 200 });
    }

    const data = fs.readFileSync(backupPath, 'utf8');
    const lines = data.trim().split('\n').filter(line => line.trim() !== '');

    if (lines.length === 0) {
      const message = 'Leads log is empty';
      fs.writeFileSync(alertPath, JSON.stringify({ alert: true, message, timestamp: new Date().toISOString() }));
      return NextResponse.json({ status: 'warning', message }, { status: 200 });
    }

    const lastLine = lines[lines.length - 1];
    const lastLead = JSON.parse(lastLine);
    
    if (!lastLead.date) {
      const message = 'Last lead entry has no date field';
      fs.writeFileSync(alertPath, JSON.stringify({ alert: true, message, timestamp: new Date().toISOString() }));
      return NextResponse.json({ status: 'warning', message }, { status: 200 });
    }

    const lastLeadDate = new Date(lastLead.date);
    const now = new Date();
    const diffHours = (now.getTime() - lastLeadDate.getTime()) / (1000 * 60 * 60);

    if (diffHours >= 24) {
      const message = `No leads received in the last ${diffHours.toFixed(1)} hours!`;
      fs.writeFileSync(alertPath, JSON.stringify({ 
        alert: true, 
        hoursSinceLastLead: diffHours, 
        lastLeadDate: lastLead.date, 
        message, 
        timestamp: new Date().toISOString() 
      }));
      return NextResponse.json({ status: 'alert', message, hoursSinceLastLead: diffHours }, { status: 200 });
    }

    // Clean up alert file if it exists
    if (fs.existsSync(alertPath)) {
      fs.unlinkSync(alertPath);
    }

    return NextResponse.json({ status: 'ok', hoursSinceLastLead: diffHours }, { status: 200 });
  } catch (err: any) {
    console.error('[CHECK_LEADS_API_ERROR]', err.message || err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
