import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactMessage } from '../../api/contactApi.js';
import GlassCard from '../ui/GlassCard.jsx';
import NeonButton from '../ui/NeonButton.jsx';
import Section, { fadeUp } from '../ui/Section.jsx';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [fieldErrors, setFieldErrors] = useState({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, validity } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (name === 'email' && fieldErrors.email && validity.valid) {
      setFieldErrors((current) => ({ ...current, email: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });
    setFieldErrors({ email: '' });

    try {
      await sendContactMessage(formData);
      setStatus({
        type: 'success',
        message: 'Message sent successfully. Thank you for reaching out.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Could not send message. Please check the backend server.'
      });

      if (
        error.response?.status === 400 &&
        error.response?.data?.message === 'Please enter a valid email address'
      ) {
        setFieldErrors({
          email: error.response.data.message
        });
        setStatus({ type: 'idle', message: '' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'mt-2 w-full rounded border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Connect"
      description="Have a project, collaboration, or opportunity in mind? Send me a message."
    >
      <GlassCard
        as={motion.form}
        variants={fadeUp}
        className="mx-auto min-w-0 max-w-2xl p-4 sm:p-6"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <motion.label whileFocus={{ y: -2 }} className="block">
            <span className="text-sm font-bold text-slate-700">Name</span>
            <input
              className={inputClass}
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.label>
          <motion.label whileFocus={{ y: -2 }} className="block">
            <span className="text-sm font-bold text-slate-700">Email</span>
            <input
              className={`${inputClass} ${
                fieldErrors.email
                  ? 'border-blue-500 focus:border-blue-400 focus:ring-blue-400/10'
                  : ''
              }`}
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              aria-invalid={fieldErrors.email ? 'true' : 'false'}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-2 text-sm text-blue-400">
                {fieldErrors.email}
              </p>
            )}
          </motion.label>
        </div>

        <motion.label whileFocus={{ y: -2 }} className="mt-5 block">
          <span className="text-sm font-bold text-slate-700">Subject</span>
          <input
            className={inputClass}
            name="subject"
            placeholder="Project, collaboration, or question"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </motion.label>

        <motion.label whileFocus={{ y: -2 }} className="mt-5 block">
          <span className="text-sm font-bold text-slate-700">Message</span>
          <textarea
            className={`${inputClass} min-h-40 resize-y`}
            name="message"
            placeholder="Tell me what you want to build..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </motion.label>

        <NeonButton
          className="mt-6 w-full px-5 py-3"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </NeonButton>

        {status.message && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded border px-4 py-3 text-sm ${
              status.type === 'success'
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {status.message}
          </motion.p>
        )}
      </GlassCard>
    </Section>
  );
}
