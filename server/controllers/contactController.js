import Contact from '../models/Contact.js';
import { sendContactEmail } from '../config/mailer.js';

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

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    try {
      await sendContactEmail({ name, email, subject, message });
    } catch (emailError) {
      console.error('Contact email failed:', emailError.message);

      res.status(201).json({
        success: true,
        emailSent: false,
        message:
          'Contact message saved successfully, but email notification failed',
        error: emailError.message,
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          createdAt: contact.createdAt
        }
      });
      return;
    }

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
