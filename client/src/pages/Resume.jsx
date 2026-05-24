import { motion } from 'framer-motion';
import CyberBackground from '../components/layout/CyberBackground.jsx';
import Footer from '../components/layout/Footer.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import NeonButton from '../components/ui/NeonButton.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { resume } from '../data/resume.js';

export default function Resume() {
  return (
    <div className="min-h-screen overflow-hidden text-zinc-100">
      <CyberBackground />
      <Navbar />
      <motion.main
        className="min-h-screen px-5 py-28 text-zinc-100"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <section className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Resume"
            title={resume.title}
            description="View the latest resume in a new tab or download a copy directly."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <NeonButton
              className="px-5 py-3 text-sm"
              href={resume.url}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </NeonButton>
            <a
              className="rounded border border-rose-400/30 bg-white/[0.04] px-5 py-3 text-sm font-black text-rose-100 shadow-neon-ruby transition hover:-translate-y-0.5 hover:border-red-400/40"
              href={resume.url}
              download={resume.fileName}
            >
              Download Resume
            </a>
          </div>

          <GlassCard className="mt-10 p-4">
            <iframe
              title={resume.title}
              src={resume.url}
              className="h-[70vh] w-full rounded border border-red-400/15 bg-zinc-950/70"
            />
          </GlassCard>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
