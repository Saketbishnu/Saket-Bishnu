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
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        {profile.achievements.map((achievement, index) => (
          <motion.div
            key={achievement}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            className="glass-panel flex min-w-0 gap-3 p-4 transition hover:border-blue-500/40 sm:gap-4 sm:p-5"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded border border-blue-500/25 bg-blue-500/10 font-mono text-sm font-black text-blue-700 shadow-glow">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="min-w-0 break-words text-sm leading-7 text-slate-700 sm:text-base">{achievement}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
