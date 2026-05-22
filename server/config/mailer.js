import nodemailer from 'nodemailer';

const requiredEmailEnv = ['EMAIL_USER', 'EMAIL_PASS'];

const getMissingEmailEnv = () => {
  return requiredEmailEnv.filter((key) => !process.env[key]);
};

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const missingEnv = getMissingEmailEnv();

  if (missingEnv.length > 0) {
    const error = new Error(
      `Email service is not configured. Missing: ${missingEnv.join(', ')}`
    );
    error.statusCode = 500;
    throw error;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Saket Bishnu Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    text: [
      'New contact form submission',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      'Message:',
      message
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      </div>
    `
  });
};
