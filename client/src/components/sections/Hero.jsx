import { motion } from 'framer-motion';
import { profile } from '../../data/profile.js';
import GlassCard from '../ui/GlassCard.jsx';
import NeonButton from '../ui/NeonButton.jsx';
import { container, fadeUp } from '../ui/Section.jsx';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 pb-16 pt-32 sm:px-6 lg:px-8"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
        animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="relative z-10"
        >
          <motion.p variants={fadeUp} className="neon-kicker w-max">
            {profile.heroKicker}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-sm font-black uppercase tracking-[0.36em] text-blue-700/80"
          >
            {profile.name}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-3 max-w-4xl text-5xl font-black leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-slate-950 via-blue-800 to-blue-600 bg-clip-text text-transparent">
              {profile.heroTitle}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-700"
          >
            {profile.heroDescription}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <NeonButton href="#projects" className="px-5 py-3 text-sm">
              Explore Projects
            </NeonButton>
            <a
              href="#contact"
              className="rounded border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-glass transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50"
            >
              Open Contact
            </a>
            <a
              href={profile.contact.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-glass transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
            >
              GitHub
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 grid max-w-2xl grid-cols-3 gap-3"
          >
            {profile.stats.map(([value, label]) => (
              <GlassCard
                key={label}
                as={motion.div}
                whileHover={{ y: -5 }}
                className="p-4 text-center"
              >
                <p className="text-xl font-black text-slate-950 sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700/70">
                  {label}
                </p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
        >
          <GlassCard className="relative overflow-hidden p-5">
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
            <div className="flex items-center justify-between border-b border-blue-500/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-600" />
                <span className="h-3 w-3 rounded-full bg-blue-300" />
                <span className="h-3 w-3 rounded-full bg-slate-300" />
              </div>
              <span className="font-mono text-xs font-semibold text-blue-700/80">
                {profile.terminal.filename}
              </span>
            </div>
            <pre className="overflow-x-auto py-6 font-mono text-sm leading-7 text-slate-700">
              <code>{profile.terminal.code}</code>
            </pre>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.terminal.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded border border-blue-500/15 bg-blue-500/[0.06] px-4 py-3 text-sm font-bold text-blue-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
