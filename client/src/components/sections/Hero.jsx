import { motion } from 'framer-motion';
import { profile } from '../../data/profile.js';
import { container, fadeUp } from '../ui/Section.jsx';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 pb-14 pt-28 sm:px-6 lg:px-8"
    >
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
          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl"
          >
            {profile.heroTitle}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            {profile.heroDescription}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="neon-button px-5 py-3 text-sm">
              Explore Projects
            </a>
            <a
              href="#contact"
              className="rounded border border-fuchsia-300/30 bg-white/[0.04] px-5 py-3 text-sm font-black text-fuchsia-100 shadow-neon-pink backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:text-cyan-100"
            >
              Open Contact
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 grid max-w-2xl grid-cols-3 gap-3"
          >
            {profile.stats.map(([value, label]) => (
              <motion.div
                key={label}
                whileHover={{ y: -5 }}
                className="glass-panel p-4 text-center"
              >
                <p className="text-xl font-black text-white sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
        >
          <div className="terminal-panel overflow-hidden p-5">
            <div className="flex items-center justify-between border-b border-cyan-300/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
                <span className="h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(253,224,71,0.7)]" />
                <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.7)]" />
              </div>
              <span className="font-mono text-xs font-semibold text-cyan-200/80">
                {profile.terminal.filename}
              </span>
            </div>
            <pre className="overflow-x-auto py-6 font-mono text-sm leading-7 text-slate-300">
              <code>{profile.terminal.code}</code>
            </pre>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.terminal.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-3 text-sm font-bold text-cyan-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
