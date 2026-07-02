import dotenv from 'dotenv';
dotenv.config();

/**
 * Validates the required environment variables for the Brevo email service.
 * Throws an error if any of the environment variables are missing or invalid.
 */
const validateConfig = () => {
  const missing = [];
  if (!process.env.BREVO_API_KEY) missing.push('BREVO_API_KEY');
  if (!process.env.BREVO_SENDER_EMAIL) missing.push('BREVO_SENDER_EMAIL');
  if (!process.env.BREVO_SENDER_NAME) missing.push('BREVO_SENDER_NAME');

  if (missing.length > 0) {
    throw new Error(`Invalid Brevo configuration. Missing environment variable(s): ${missing.join(', ')}`);
  }
};

/**
 * Reusable transactional email service using Brevo REST API and native fetch().
 *
 * @param {Object} params
 * @param {string|string[]} params.to Recipient email(s)
 * @param {string} params.subject Email subject
 * @param {string} params.text Plain text content
 * @param {string} params.html HTML content
 * @param {Object} [params.replyTo] Optional reply-to options
 * @param {string} params.replyTo.email Reply-to email address
 * @param {string} [params.replyTo.name] Reply-to display name
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendEmail({ to, subject, text, html, replyTo }) {
  try {
    validateConfig();
  } catch (configError) {
    console.error('[EmailService] Config validation failed:', configError.message);
    return { success: false, error: configError.message };
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;

  // Normalize 'to' recipient parameter for Brevo API format: [{ email: "..." }]
  let recipients = [];
  if (Array.isArray(to)) {
    recipients = to.map(email => ({ email }));
  } else if (typeof to === 'string') {
    recipients = [{ email: to.trim() }];
  } else {
    console.error('[EmailService] Invalid "to" parameter:', to);
    return { success: false, error: 'Invalid "to" parameter format' };
  }

  const payload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: recipients,
    subject,
    textContent: text,
    htmlContent: html
  };

  if (replyTo && replyTo.email) {
    payload.replyTo = {
      email: replyTo.email.trim(),
      name: replyTo.name ? replyTo.name.trim() : replyTo.email.trim()
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s request timeout

  try {
    console.log(`[EmailService] Sending transactional email to ${JSON.stringify(recipients.map(r => r.email))}...`);
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = responseData.message || responseData.code || `HTTP ${response.status}`;
      console.error(`[EmailService] Brevo API rejected request with status ${response.status}:`, errorMessage);
      return {
        success: false,
        error: `Brevo API Error (${response.status}): ${errorMessage}`
      };
    }

    console.log('[EmailService] Email sent successfully. messageId:', responseData.messageId);
    return { success: true, messageId: responseData.messageId };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.error('[EmailService] HTTPS request timed out after 10000ms');
      return { success: false, error: 'Request timed out' };
    }
    console.error('[EmailService] Send email operation failed:', error.message);
    return { success: false, error: error.message };
  }
}
