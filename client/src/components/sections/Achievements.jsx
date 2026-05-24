import { motion } from 'framer-motion';
import { profile } from '../../data/profile.js';
import Section, { fadeUp } from '../ui/Section.jsx';

export default function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Build signals from the stack."
      description="A concise trace of the implementation strength behind this MERN portfolio."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {profile.achievements.map((achievement, index) => (
          <motion.div
            key={achievement}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            className="glass-panel flex gap-4 p-5 transition hover:border-red-400/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded border border-red-400/25 bg-red-400/10 font-mono text-sm font-black text-rose-100 shadow-neon-red">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="leading-7 text-zinc-300">{achievement}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
