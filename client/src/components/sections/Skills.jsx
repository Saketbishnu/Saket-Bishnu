import { motion } from 'framer-motion';
import { skills } from '../../data/skills.js';
import Section, { fadeUp } from '../ui/Section.jsx';

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Cybernetic toolkit for MERN builds."
      description="A compact stack for building polished interfaces, useful APIs, persistent data flows, and maintainable developer workflows."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded border border-white/10 bg-white/[0.045] p-5 shadow-glass backdrop-blur-xl transition hover:border-cyan-300/50"
          >
            <div
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${skill.glow} opacity-80`}
            />
            <div className="mb-5 h-1.5 rounded-full bg-slate-900">
              <div
                className={`h-full w-2/3 rounded-full bg-gradient-to-r ${skill.glow} shadow-[0_0_18px_rgba(34,211,238,0.45)] transition-all duration-300 group-hover:w-full`}
              />
            </div>
            <h3 className="font-black text-white transition group-hover:text-cyan-100">
              {skill.name}
            </h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 transition group-hover:text-slate-300">
              {skill.level}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
