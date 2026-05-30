import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactMessage } from '../../api/contactApi.js';
import { profile } from '../../data/profile.js';
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
      title={profile.contact.title}
      description={profile.contact.description}
    >
      <div className="grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <GlassCard as={motion.div} variants={fadeUp} interactive className="min-w-0 p-4 sm:p-6">
          <h3 className="text-xl font-black text-slate-950">Contact Details</h3>
          <p className="mt-4 leading-7 text-slate-600">
            Messages travel from the React interface into the Express API, then
            into MongoDB and Gmail SMTP.
          </p>
          <div className="mt-6 space-y-3 text-sm sm:mt-7">
            {profile.contact.details.map(([label, value]) => (
              <div
                key={label}
                className="rounded border border-blue-500/15 bg-blue-500/[0.05] p-4"
              >
                <p className="break-words font-mono text-xs font-bold uppercase tracking-[0.14em] text-blue-700/70 sm:tracking-[0.2em]">
                  {label}
                </p>
                <p className="mt-1 break-words font-semibold text-slate-700">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard
          as={motion.form}
          variants={fadeUp}
          className="min-w-0 p-4 sm:p-6"
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
            {isSubmitting ? 'Sending signal...' : 'Send Message'}
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
      </div>
    </Section>
  );
}
