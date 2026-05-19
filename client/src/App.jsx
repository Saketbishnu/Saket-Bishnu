import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactMessage } from './api/contactApi.js';

const navItems = ['About', 'Skills', 'Projects', 'Achievements', 'Contact'];

const skills = [
  'React',
  'Node.js',
  'Express.js',
  'MongoDB',
  'JavaScript',
  'Tailwind CSS',
  'REST APIs',
  'Git'
];

const projects = [
  {
    title: 'MERN Portfolio Platform',
    description:
      'A responsive portfolio backed by Express and MongoDB, with a contact API and polished animated UI.',
    tags: ['React', 'Express', 'MongoDB']
  },
  {
    title: 'Developer Dashboard',
    description:
      'A clean dashboard concept for tracking projects, skills, and contact leads with fast filtering.',
    tags: ['React', 'Tailwind', 'API']
  },
  {
    title: 'API Contact System',
    description:
      'A reusable contact message pipeline with validation, Mongoose schemas, and REST endpoints.',
    tags: ['Node.js', 'Mongoose', 'REST']
  }
];

const achievements = [
  'Built a full-stack MERN portfolio architecture',
  'Designed responsive UI sections for desktop and mobile',
  'Integrated MongoDB-backed contact message storage',
  'Created reusable React components with smooth animations'
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function Section({ id, eyebrow, title, children }) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      variants={fadeUp}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </motion.section>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-lg font-bold text-white">
          Saket Bishnu
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/15 text-white md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className={isOpen ? 'hidden' : 'block h-0.5 w-5 bg-current'} />
          </span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan"
            >
              {item}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="rounded border border-cyan/60 px-4 py-2 text-sm font-semibold text-cyan transition hover:bg-cyan hover:text-ink"
          >
            Resume
          </a>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-ink px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="w-max rounded border border-cyan/60 px-4 py-2 text-sm font-semibold text-cyan"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-mint">
            MERN Stack Developer
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Saket Bishnu
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I build modern web experiences with React, Node.js, Express, and
            MongoDB, focused on clean interfaces, reliable APIs, and smooth user
            journeys.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded bg-cyan px-5 py-3 text-sm font-bold text-ink transition hover:bg-sky-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-mint hover:text-mint"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          className="rounded border border-white/10 bg-white/[0.04] p-6 shadow-glow"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
        >
          <div className="rounded bg-panel p-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <pre className="mt-6 overflow-hidden text-sm leading-7 text-slate-300">
              <code>{`const developer = {
  name: 'Saket Bishnu',
  stack: ['React', 'Node', 'MongoDB'],
  focus: 'Full-stack web apps',
  status: 'Building'
};`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="Clean builds, useful details.">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded border border-white/10 bg-white/[0.04] p-6">
          <p className="text-lg leading-8 text-slate-300">
            I enjoy turning ideas into complete products, from API design and
            database models to responsive React interfaces. My work leans toward
            practical systems that feel fast, readable, and easy to maintain.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['Frontend', 'React UI, Tailwind layouts, animation polish'],
            ['Backend', 'Express APIs, Mongoose models, validation'],
            ['Delivery', 'Responsive design, clean structure, iteration']
          ].map(([title, text]) => (
            <div key={title} className="rounded border border-white/10 bg-panel p-5">
              <h3 className="font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I use to ship.">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="rounded border border-white/10 bg-white/[0.04] p-5 text-center font-semibold text-slate-100"
            variants={fadeUp}
            transition={{ duration: 0.35, delay: index * 0.04 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected project work.">
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded border border-white/10 bg-panel p-6 transition hover:-translate-y-1 hover:border-cyan/50"
          >
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-4 min-h-28 text-sm leading-6 text-slate-400">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
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
      title="Milestones and highlights."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <div
            key={achievement}
            className="flex gap-4 rounded border border-white/10 bg-white/[0.04] p-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-mint/15 text-sm font-black text-mint">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="leading-7 text-slate-300">{achievement}</p>
          </div>
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

  return (
    <Section id="contact" eyebrow="Contact" title="Let us build something.">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded border border-white/10 bg-panel p-6">
          <h3 className="text-xl font-bold text-white">Contact details</h3>
          <p className="mt-4 leading-7 text-slate-400">
            Send a message through the form and it will be stored in MongoDB via
            the Express API.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <p>Email: saket@example.com</p>
            <p>API: http://localhost:5000/api/contact</p>
            <p>Location: India</p>
          </div>
        </div>

        <form
          className="rounded border border-white/10 bg-white/[0.04] p-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-200">Name</span>
              <input
                className="mt-2 w-full rounded border border-white/10 bg-ink px-4 py-3 text-white outline-none transition focus:border-cyan"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-200">Email</span>
              <input
                className="mt-2 w-full rounded border border-white/10 bg-ink px-4 py-3 text-white outline-none transition focus:border-cyan"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-200">Subject</span>
            <input
              className="mt-2 w-full rounded border border-white/10 bg-ink px-4 py-3 text-white outline-none transition focus:border-cyan"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-200">Message</span>
            <textarea
              className="mt-2 min-h-36 w-full resize-y rounded border border-white/10 bg-ink px-4 py-3 text-white outline-none transition focus:border-cyan"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button
            className="mt-6 w-full rounded bg-cyan px-5 py-3 font-bold text-ink transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {status.message && (
            <p
              className={`mt-4 rounded px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'bg-mint/10 text-mint'
                  : 'bg-red-500/10 text-red-300'
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        (c) {new Date().getFullYear()} Saket Bishnu. Built with MERN.
      </footer>
    </div>
  );
}
