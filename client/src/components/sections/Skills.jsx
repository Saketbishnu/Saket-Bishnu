import { motion } from 'framer-motion';
import { skillGroups } from '../../data/skills.js';
import GlassCard from '../ui/GlassCard.jsx';
import Section, { fadeUp } from '../ui/Section.jsx';

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Engineering toolkit for product builds."
      description="A compact stack for building polished interfaces, useful APIs, persistent data flows, and maintainable developer workflows."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {skillGroups.map((group) => (
          <GlassCard
            key={group.category}
            as={motion.div}
            variants={fadeUp}
            interactive
            className="p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-black text-slate-900">{group.category}</h3>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/[0.06] px-3 py-1 font-mono text-xs font-black text-blue-700">
                {String(group.skills.length).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {group.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -4, scale: 1.015 }}
                  className="group relative overflow-hidden rounded border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-400 hover:bg-blue-50/45"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${skill.glow} opacity-80`}
                  />
                  <div className="mb-4 h-1.5 rounded-full bg-slate-200">
                    <div
                      className={`h-full w-2/3 rounded-full bg-gradient-to-r ${skill.glow} transition-all duration-300 group-hover:w-full`}
                    />
                  </div>
                  <h4 className="font-black text-slate-900 transition group-hover:text-blue-700">
                    {skill.name}
                  </h4>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition group-hover:text-slate-700">
                    {skill.level}
                  </p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
