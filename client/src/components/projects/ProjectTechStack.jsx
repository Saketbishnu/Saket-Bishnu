import { motion } from 'framer-motion';
import Section, { fadeUp } from '../ui/Section.jsx';

export default function ProjectTechStack({ project }) {
  return (
    <Section
      id="tech-stack"
      eyebrow="Tech Stack"
      title="Tools and challenges solved"
      description="A focused view of the technologies used and the engineering challenges addressed."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <motion.div variants={fadeUp} className="cyber-card p-6">
          <h3 className="text-xl font-black text-white">Tech Stack</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <span
                key={item}
                className="rounded border border-red-400/15 bg-red-400/[0.06] px-3 py-1 text-xs font-semibold text-rose-100"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="cyber-card p-6">
          <h3 className="text-xl font-black text-white">Challenges Solved</h3>
          <ul className="mt-4 space-y-3 text-zinc-400">
            {project.challenges.map((challenge) => (
              <li key={challenge} className="leading-7">
                {challenge}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
