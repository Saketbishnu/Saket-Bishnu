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
            className="glass-panel flex gap-4 p-5 transition hover:border-cyan-300/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded border border-cyan-300/25 bg-cyan-300/10 font-mono text-sm font-black text-cyan-100 shadow-neon-cyan">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="leading-7 text-slate-300">{achievement}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
