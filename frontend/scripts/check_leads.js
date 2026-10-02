const fs = require('fs');
const path = require('path');

function checkLeads() {
  const logsDir = path.join(process.cwd(), 'logs');
  const backupPath = path.join(logsDir, 'leads.json');
  const alertPath = path.join(logsDir, 'lead_alert.json');

  if (!fs.existsSync(backupPath)) {
    const warning = `[WARNING] No leads file found at ${backupPath}`;
    console.warn(warning);
    fs.writeFileSync(alertPath, JSON.stringify({ alert: true, message: warning, timestamp: new Date().toISOString() }));
    return;
  }

  try {
    const data = fs.readFileSync(backupPath, 'utf8');
    const lines = data.trim().split('\n').filter(line => line.trim() !== '');

    if (lines.length === 0) {
      const warning = `[WARNING] Leads log is empty! No leads have ever been submitted.`;
      console.warn(warning);
      fs.writeFileSync(alertPath, JSON.stringify({ alert: true, message: warning, timestamp: new Date().toISOString() }));
      return;
    }

    const lastLine = lines[lines.length - 1];
    const lastLead = JSON.parse(lastLine);
    
    if (!lastLead.date) {
      const warning = `[WARNING] Last lead entry has no date field.`;
      console.warn(warning);
      fs.writeFileSync(alertPath, JSON.stringify({ alert: true, message: warning, timestamp: new Date().toISOString() }));
      return;
    }

    const lastLeadDate = new Date(lastLead.date);
    const now = new Date();
    const diffHours = (now.getTime() - lastLeadDate.getTime()) / (1000 * 60 * 60);

    if (diffHours >= 24) {
      const warning = `[ALERT] No leads received in the last ${diffHours.toFixed(1)} hours! Last lead date was: ${lastLead.date}`;
      console.warn(warning);
      fs.writeFileSync(alertPath, JSON.stringify({ 
        alert: true, 
        hoursSinceLastLead: diffHours, 
        lastLeadDate: lastLead.date, 
        message: warning, 
        timestamp: new Date().toISOString() 
      }));
    } else {
      console.log(`[OK] Last lead was received ${diffHours.toFixed(1)} hours ago.`);
      // Clean up alert file if it exists
      if (fs.existsSync(alertPath)) {
        fs.unlinkSync(alertPath);
      }
    }
  } catch (error) {
    console.error('[ERROR] Failed to run lead checks:', error);
  }
}

if (require.main === module) {
  checkLeads();
}

module.exports = { checkLeads };
