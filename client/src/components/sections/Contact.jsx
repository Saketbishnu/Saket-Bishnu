import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactMessage } from '../../api/contactApi.js';
import { profile } from '../../data/profile.js';
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
    'mt-2 w-full rounded border border-cyan-300/15 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10';

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={profile.contact.title}
      description={profile.contact.description}
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div variants={fadeUp} className="cyber-card p-6">
          <h3 className="text-xl font-black text-white">Signal Details</h3>
          <p className="mt-4 leading-7 text-slate-400">
            Messages travel from the React interface into the Express API, then
            into MongoDB and Gmail SMTP.
          </p>
          <div className="mt-7 space-y-3 text-sm">
            {profile.contact.details.map(([label, value]) => (
              <div
                key={label}
                className="rounded border border-cyan-300/15 bg-cyan-300/[0.05] p-4"
              >
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-200/70">
                  {label}
                </p>
                <p className="mt-1 break-words font-semibold text-slate-200">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          className="terminal-panel p-5 sm:p-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-200">Name</span>
              <input
                className={inputClass}
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-200">Email</span>
              <input
                className={`${inputClass} ${
                  fieldErrors.email
                    ? 'border-red-400 focus:border-red-300 focus:ring-red-300/10'
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
                <p id="email-error" className="mt-2 text-sm text-red-300">
                  {fieldErrors.email}
                </p>
              )}
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-slate-200">Subject</span>
            <input
              className={inputClass}
              name="subject"
              placeholder="Project, collaboration, or question"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-slate-200">Message</span>
            <textarea
              className={`${inputClass} min-h-40 resize-y`}
              name="message"
              placeholder="Tell me what you want to build..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button
            className="neon-button mt-6 w-full px-5 py-3"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {status.message && (
            <p
              className={`mt-4 rounded border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'
                  : 'border-red-400/25 bg-red-500/10 text-red-200'
              }`}
            >
              {status.message}
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}
