import validator from 'validator';
import Contact from '../models/Contact.js';
import { sendEmail } from '../services/emailService.js';

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const getContactMessages = async (_req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const normalizedEmail = String(email || '').trim();

    if (!validator.isEmail(normalizedEmail)) {
      res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
      return;
    }

    const contact = await Contact.create({
      name,
      email: normalizedEmail,
      subject,
      message,
      emailSent: false
    });

    const textContent = [
      'New contact form submission',
      '',
      `Name: ${name}`,
      `Email: ${normalizedEmail}`,
      `Subject: ${subject}`,
      '',
      'Message:',
      message
    ].join('\n');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      </div>
    `;

    const emailResult = await sendEmail({
      to: process.env.BREVO_SENDER_EMAIL,
      subject: `Portfolio contact: ${subject}`,
      text: textContent,
      html: htmlContent,
      replyTo: {
        email: normalizedEmail,
        name: name
      }
    });

    if (emailResult.success) {
      contact.emailSent = true;
      await contact.save();

      res.status(201).json({
        success: true,
        emailSent: true,
        message: 'Contact message saved and email sent successfully',
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          createdAt: contact.createdAt
        }
      });
    } else {
      console.error('[ContactController] Email dispatch failed:', emailResult.error);

      res.status(201).json({
        success: true,
        emailSent: false,
        message: 'Contact message saved successfully, but email notification failed',
        error: emailResult.error,
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          createdAt: contact.createdAt
        }
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(', ');
    }

    next(error);
  }
};
