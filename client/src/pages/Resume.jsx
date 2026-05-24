import { motion } from 'framer-motion';
import CyberBackground from '../components/layout/CyberBackground.jsx';
import Footer from '../components/layout/Footer.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import { resume } from '../data/resume.js';

export default function Resume() {
  return (
    <div className="min-h-screen overflow-hidden text-slate-100">
      <CyberBackground />
      <Navbar />
      <motion.main
        className="min-h-screen px-5 py-28 text-slate-100"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <section className="mx-auto max-w-6xl">
          <p className="neon-kicker">Resume</p>
          <h1 className="mt-4 text-4xl font-black text-white">{resume.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            View the latest resume in a new tab or download a copy directly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="neon-button px-5 py-3 text-sm"
              href={resume.url}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
            <a
              className="rounded border border-fuchsia-300/30 bg-white/[0.04] px-5 py-3 text-sm font-black text-fuchsia-100 shadow-neon-pink"
              href={resume.url}
              download={resume.fileName}
            >
              Download Resume
            </a>
          </div>

          <div className="terminal-panel mt-10 p-4">
            <iframe
              title={resume.title}
              src={resume.url}
              className="h-[70vh] w-full rounded border border-cyan-300/15 bg-slate-950/70"
            />
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
