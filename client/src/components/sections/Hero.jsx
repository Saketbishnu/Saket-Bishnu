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
        className="pointer-events-none absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-red-400/10 blur-3xl"
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
            className="mt-6 text-sm font-black uppercase tracking-[0.36em] text-rose-200/80"
          >
            {profile.name}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-3 max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-white via-rose-100 to-rose-200 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(239,68,68,0.18)]">
              {profile.heroTitle}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300"
          >
            {profile.heroDescription}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <NeonButton href="#projects" className="px-5 py-3 text-sm">
              Explore Projects
            </NeonButton>
            <a
              href="#contact"
              className="rounded border border-rose-400/30 bg-white/[0.04] px-5 py-3 text-sm font-black text-rose-100 shadow-neon-ruby backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-red-400/60 hover:text-rose-100"
            >
              Open Contact
            </a>
            <a
              href={profile.contact.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-black text-zinc-200 transition hover:-translate-y-0.5 hover:border-red-400/40 hover:text-white hover:shadow-neon-red"
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
                <p className="text-xl font-black text-white sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-200/70">
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
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-rose-400/10 blur-2xl" />
            <div className="flex items-center justify-between border-b border-red-400/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
                <span className="h-3 w-3 rounded-full bg-rose-300 shadow-[0_0_18px_rgba(253,164,175,0.68)]" />
                <span className="h-3 w-3 rounded-full bg-zinc-200 shadow-[0_0_18px_rgba(244,244,245,0.55)]" />
              </div>
              <span className="font-mono text-xs font-semibold text-rose-200/80">
                {profile.terminal.filename}
              </span>
            </div>
            <pre className="overflow-x-auto py-6 font-mono text-sm leading-7 text-zinc-300">
              <code>{profile.terminal.code}</code>
            </pre>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.terminal.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded border border-red-400/15 bg-red-400/[0.06] px-4 py-3 text-sm font-bold text-rose-100"
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
