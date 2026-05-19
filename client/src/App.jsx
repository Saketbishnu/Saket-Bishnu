import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactMessage } from './api/contactApi.js';

const navItems = ['About', 'Skills', 'Projects', 'Achievements', 'Contact'];

const skills = [
  { name: 'React', level: 'Frontend' },
  { name: 'Node.js', level: 'Backend' },
  { name: 'Express.js', level: 'API' },
  { name: 'MongoDB', level: 'Database' },
  { name: 'JavaScript', level: 'Core' },
  { name: 'Tailwind CSS', level: 'UI' },
  { name: 'REST APIs', level: 'Integration' },
  { name: 'Git', level: 'Workflow' }
];

const projects = [
  {
    title: 'MERN Portfolio Platform',
    description:
      'A full-stack portfolio with animated React sections, Express routes, MongoDB contact storage, and a polished dark interface.',
    tags: ['React', 'Express', 'MongoDB'],
    metric: 'Full stack'
  },
  {
    title: 'Developer Dashboard',
    description:
      'A focused dashboard concept for managing projects, skills, and messages with responsive layouts and clean data surfaces.',
    tags: ['React', 'Tailwind', 'API'],
    metric: 'Responsive'
  },
  {
    title: 'Contact Message API',
    description:
      'A backend workflow for validating and storing portfolio contact messages using Mongoose models and REST endpoints.',
    tags: ['Node.js', 'Mongoose', 'REST'],
    metric: 'MongoDB'
  }
];

const achievements = [
  'Built a full-stack MERN architecture with clear client and server separation',
  'Designed a polished responsive portfolio interface for desktop and mobile',
  'Integrated MongoDB-backed contact message storage through an Express API',
  'Created reusable animated UI sections with Framer Motion and Tailwind CSS'
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' }
  }
};

function Section({ id, eyebrow, title, description, children }) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={container}
    >
      <motion.div variants={fadeUp} className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.34em] text-sky-300">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-8 text-slate-400 sm:text-lg">
            {description}
          </p>
        )}
      </motion.div>
      <motion.div variants={fadeUp} className="mt-10">
        {children}
      </motion.div>
    </motion.section>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-white/10 font-black text-sky-200 ring-1 ring-white/15 transition group-hover:ring-sky-300/60">
            SB
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-white">
            Saket Bishnu
          </span>
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 bg-white/5 text-white shadow-glass md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className={isOpen ? 'hidden' : 'block h-0.5 w-5 bg-current'} />
          </span>
        </button>

        <div className="hidden items-center gap-2 rounded border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="rounded bg-sky-300 px-4 py-2 text-sm font-black text-ink transition hover:bg-emerald-300"
          >
            Resume
          </a>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          className="border-t border-white/10 bg-ink/95 px-5 pb-5 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="rounded bg-sky-300 px-4 py-3 text-sm font-black text-ink"
            >
              Resume
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 pb-14 pt-28 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-5 top-28 h-64 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="relative z-10"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-sky-200 shadow-glass"
          >
            MERN Stack Developer
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl"
          >
            Building polished web apps with clean code.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            I am Saket Bishnu, a developer focused on React interfaces,
            Express APIs, MongoDB data flows, and portfolio-ready digital
            products that feel sharp across every screen.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded bg-sky-300 px-5 py-3 text-sm font-black text-ink shadow-[0_18px_45px_rgba(56,189,248,0.26)] transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-300/60"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 grid max-w-2xl grid-cols-3 gap-3"
          >
            {[
              ['08+', 'Core skills'],
              ['03', 'Featured builds'],
              ['MERN', 'Primary stack']
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded border border-white/10 bg-white/[0.05] p-4 text-center shadow-glass backdrop-blur-xl"
              >
                <p className="text-xl font-black text-white sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
        >
          <div className="glass-panel overflow-hidden p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </div>
              <span className="text-xs font-semibold text-slate-400">
                portfolio.jsx
              </span>
            </div>
            <pre className="overflow-x-auto py-6 text-sm leading-7 text-slate-300">
              <code>{`const saket = {
  role: 'Full-stack Developer',
  frontend: ['React', 'Tailwind CSS'],
  backend: ['Node.js', 'Express'],
  database: 'MongoDB Atlas',
  motion: 'Framer Motion'
};`}</code>
            </pre>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Responsive UI', 'REST API', 'MongoDB Storage', 'Smooth UX'].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-slate-200"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A practical developer profile with product taste."
      description="I like building complete web experiences: crisp interfaces, direct APIs, well-shaped data models, and simple flows that are easy to maintain."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ['Frontend craft', 'Responsive React interfaces with motion, spacing, and hierarchy that feel professional.'],
          ['Backend clarity', 'Express routes, Mongoose schemas, and API responses designed for predictable integration.'],
          ['Full-stack flow', 'End-to-end features that connect UI, network calls, validation, and database writes.']
        ].map(([title, text]) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="glass-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-300/40"
          >
            <h3 className="text-lg font-black text-white">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A compact toolkit for modern MERN apps."
      description="The stack is chosen for fast iteration, clean user interfaces, and reliable data-backed features."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group rounded border border-white/10 bg-white/[0.045] p-5 shadow-glass backdrop-blur-xl transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
          >
            <div className="mb-5 h-1.5 rounded-full bg-slate-800">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-sky-300 to-emerald-300 transition-all duration-300 group-hover:w-full" />
            </div>
            <h3 className="font-black text-white">{skill.name}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {skill.level}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Project cards with strong technical context."
      description="Each card highlights a different part of the portfolio system: interface, backend, and database-backed communication."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded border border-white/10 bg-white/[0.045] p-6 shadow-glass backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-300 via-emerald-300 to-violet-300 opacity-70" />
            <div className="flex items-start justify-between gap-4">
              <span className="rounded bg-white/10 px-3 py-1 text-xs font-bold text-sky-200 ring-1 ring-white/10">
                0{index + 1}
              </span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                {project.metric}
              </span>
            </div>
            <h3 className="mt-8 text-2xl font-black text-white">{project.title}</h3>
            <p className="mt-4 min-h-36 text-sm leading-7 text-slate-400">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300 transition group-hover:border-sky-300/40 group-hover:text-sky-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Signals of full-stack execution."
      description="A concise snapshot of the implementation strengths behind this portfolio build."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement}
            variants={fadeUp}
            className="glass-panel flex gap-4 p-5 transition hover:border-sky-300/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded bg-sky-300/10 text-sm font-black text-sky-200 ring-1 ring-sky-300/20">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="leading-7 text-slate-300">{achievement}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'mt-2 w-full rounded border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300 focus:ring-4 focus:ring-sky-300/10';

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Send a message straight into the backend."
      description="The form uses Axios to call the Express API at http://localhost:5000/api/contact and stores submissions in MongoDB."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div variants={fadeUp} className="glass-panel p-6">
          <h3 className="text-xl font-black text-white">Contact details</h3>
          <p className="mt-4 leading-7 text-slate-400">
            Use this section to test the full MERN flow from React form to
            Express controller to MongoDB collection.
          </p>
          <div className="mt-7 space-y-3 text-sm">
            {[
              ['Email', 'saket@example.com'],
              ['API', 'localhost:5000/api/contact'],
              ['Location', 'India']
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
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
          className="glass-panel p-5 sm:p-6"
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
                className={inputClass}
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
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
            className="mt-6 w-full rounded bg-gradient-to-r from-sky-300 to-emerald-300 px-5 py-3 font-black text-ink shadow-[0_20px_50px_rgba(56,189,248,0.2)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {status.message && (
            <p
              className={`mt-4 rounded border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200'
                  : 'border-red-400/20 bg-red-500/10 text-red-200'
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

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <footer className="border-t border-white/10 bg-ink/60 px-5 py-8 text-center text-sm text-slate-500 backdrop-blur-xl">
        (c) {new Date().getFullYear()} Saket Bishnu. Built with MERN.
      </footer>
    </div>
  );
}
