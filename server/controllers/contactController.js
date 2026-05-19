import Contact from '../models/Contact.js';

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Contact message saved successfully',
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
