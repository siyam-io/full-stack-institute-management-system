/**
 * SMS Notification Service
 * Supports Bangladeshi SMS Gateways (Greenweb, BulkSMSBD, etc.)
 * with automatic fallback to mock/development logging when credentials are not set.
 */

const SMS_API_KEY = process.env.SMS_API_KEY || "";
const SMS_SENDER_ID = process.env.SMS_SENDER_ID || "CulinaryAcad";
const SMS_API_URL = process.env.SMS_API_URL || "http://api.greenweb.com.bd/api.php";

/**
 * Clean phone number to Bangladeshi format (8801XXXXXXXXX)
 */
export const sanitizePhoneNumber = (phone) => {
  if (!phone) return "";
  let clean = phone.replace(/[^0-9]/g, "");
  if (clean.startsWith("880")) return clean;
  if (clean.startsWith("0")) return `88${clean}`;
  if (clean.length === 10) return `880${clean}`;
  return clean;
};

/**
 * Send raw SMS message
 */
export const sendSMS = async (phoneNumber, message) => {
  const recipient = sanitizePhoneNumber(phoneNumber);
  if (!recipient || recipient.length < 11) {
    console.warn("⚠️ Invalid recipient phone number for SMS:", phoneNumber);
    return { success: false, reason: "Invalid phone number" };
  }

  // If no SMS API key configured, run in safe mock mode
  if (!SMS_API_KEY) {
    console.log(`[SMS-MOCK] To: ${recipient} | Text: "${message}"`);
    return { success: true, mode: "mock", recipient, message };
  }

  try {
    const params = new URLSearchParams({
      token: SMS_API_KEY,
      to: recipient,
      message: message,
    });

    const response = await fetch(`${SMS_API_URL}?${params.toString()}`, {
      method: "POST",
    });
    const result = await response.text();
    console.log(`[SMS-SENT] To: ${recipient} | Response:`, result);
    return { success: true, mode: "live", recipient, response: result };
  } catch (error) {
    console.error("❌ SMS Gateway Error:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Notification: Student Admission Welcome SMS
 */
export const sendAdmissionSMS = async ({ studentName, studentId, courseName, phone }) => {
  const text = `Welcome to Culinary Academy, ${studentName}! Your admission is confirmed. Student ID: ${studentId}. Course: ${courseName || 'Chef Course'}. Helpline: 01700000000`;
  return sendSMS(phone, text);
};

/**
 * Notification: Payment Receipt SMS
 */
export const sendPaymentReceiptSMS = async ({ studentName, amount, receiptNumber, phone, dueAmount }) => {
  const text = `Dear ${studentName}, payment of BDT ${amount} received successfully. Receipt No: ${receiptNumber}.${dueAmount > 0 ? ` Due: BDT ${dueAmount}.` : ' Total fee paid in full.'} Culinary Academy.`;
  return sendSMS(phone, text);
};

/**
 * Notification: Fee Due Reminder SMS
 */
export const sendFeeDueReminderSMS = async ({ studentName, dueAmount, dueDate, phone }) => {
  const text = `Dear ${studentName}, your tuition fee installment of BDT ${dueAmount} is due ${dueDate ? `on ${dueDate}` : 'soon'}. Please clear payment to avoid late fees. Culinary Academy.`;
  return sendSMS(phone, text);
};

/**
 * Notification: Batch Notice SMS
 */
export const sendNoticeSMS = async ({ studentName, message, phone }) => {
  const text = `Notice from Culinary Academy: ${message}`;
  return sendSMS(phone, text);
};

export default {
  sendSMS,
  sendAdmissionSMS,
  sendPaymentReceiptSMS,
  sendFeeDueReminderSMS,
  sendNoticeSMS,
};
