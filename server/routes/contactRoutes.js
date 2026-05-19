import express from 'express';
import {
  createContactMessage,
  getContactMessages
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/test', (_req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact API Test</title>
        <style>
          body {
            background: #111827;
            color: #f9fafb;
            font-family: Arial, sans-serif;
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
          }

          form {
            width: min(92vw, 460px);
            background: #1f2937;
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          }

          h1 {
            font-size: 24px;
            margin: 0 0 20px;
          }

          label {
            display: block;
            font-size: 14px;
            margin: 14px 0 6px;
          }

          input,
          textarea {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #4b5563;
            border-radius: 8px;
            background: #111827;
            color: #f9fafb;
            font: inherit;
            padding: 10px 12px;
          }

          textarea {
            min-height: 120px;
            resize: vertical;
          }

          button {
            width: 100%;
            border: 0;
            border-radius: 8px;
            background: #38bdf8;
            color: #082f49;
            cursor: pointer;
            font: inherit;
            font-weight: 700;
            margin-top: 18px;
            padding: 12px;
          }

          pre {
            white-space: pre-wrap;
            background: #030712;
            border-radius: 8px;
            margin-top: 16px;
            padding: 12px;
          }
        </style>
      </head>
      <body>
        <form id="contactForm">
          <h1>Contact API Test</h1>

          <label for="name">Name</label>
          <input id="name" name="name" value="Saket Test User" required />

          <label for="email">Email</label>
          <input id="email" name="email" type="email" value="test@example.com" required />

          <label for="subject">Subject</label>
          <input id="subject" name="subject" value="Testing contact route" required />

          <label for="message">Message</label>
          <textarea id="message" name="message" required>This is a test message inserted from the temporary HTML form.</textarea>

          <button type="submit">Send Test Message</button>
          <pre id="result">Submit the form to test POST /api/contact</pre>
        </form>

        <script>
          const form = document.querySelector('#contactForm');
          const result = document.querySelector('#result');

          form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const payload = Object.fromEntries(new FormData(form).entries());
            result.textContent = 'Sending...';

            try {
              const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              });

              const data = await response.json();
              result.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
              result.textContent = error.message;
            }
          });
        </script>
      </body>
    </html>
  `);
});

router.get('/', getContactMessages);
router.post('/', createContactMessage);

export default router;
