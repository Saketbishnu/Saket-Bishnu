import { motion } from 'framer-motion';
import { profile } from '../../data/profile.js';
import GlassCard from '../ui/GlassCard.jsx';
import NeonButton from '../ui/NeonButton.jsx';
import { container, fadeUp } from '../ui/Section.jsx';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[auto] w-full max-w-6xl items-center px-4 pb-12 pt-28 sm:min-h-screen sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 h-44 w-44 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl sm:top-28 sm:h-72 sm:w-72"
        animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="grid w-full min-w-0 items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="relative z-10 min-w-0"
        >
          <motion.p variants={fadeUp} className="neon-kicker max-w-full whitespace-normal leading-5 tracking-[0.16em] sm:w-max sm:tracking-[0.26em]">
            {profile.heroKicker}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-blue-700/80 sm:mt-6 sm:text-sm sm:tracking-[0.36em]"
          >
            {profile.name}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-3 max-w-full break-words text-4xl font-black leading-[1.04] text-slate-950 min-[390px]:text-5xl sm:max-w-4xl sm:text-6xl sm:leading-[0.98] lg:text-7xl lg:leading-[0.95]"
          >
            <span className="bg-gradient-to-r from-slate-950 via-blue-800 to-blue-600 bg-clip-text text-transparent">
              {profile.heroTitle}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-8"
          >
            {profile.heroDescription}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4">
            <NeonButton href="#projects" className="w-full px-5 py-3 text-sm sm:w-auto">
              Explore Projects
            </NeonButton>
            <a
              href="#contact"
              className="w-full rounded border border-blue-200 bg-white px-5 py-3 text-center text-sm font-black text-blue-700 shadow-glass transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 sm:w-auto"
            >
              Open Contact
            </a>
            <a
              href={profile.contact.links.github}
              target="_blank"
              rel="noreferrer"
              className="w-full rounded border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 shadow-glass transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 sm:w-auto"
            >
              GitHub
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 grid max-w-2xl grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-10 sm:grid-cols-3"
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
          className="relative z-10 min-w-0"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
        >
          <GlassCard className="relative overflow-hidden p-4 sm:p-5">
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
