import { motion } from 'framer-motion';
import Section, { fadeUp } from '../ui/Section.jsx';

export default function ProjectWorkflow({ project }) {
  return (
    <>
      <Section
        id="problem"
        eyebrow="Problem"
        title="Problem statement"
        description={project.problemStatement}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div variants={fadeUp} className="cyber-card p-6">
            <h3 className="text-xl font-black text-slate-900">Detailed Description</h3>
            <p className="mt-4 leading-7 text-slate-600">{project.description}</p>
          </motion.div>
          <motion.div variants={fadeUp} className="cyber-card p-6">
            <h3 className="text-xl font-black text-slate-900">Features</h3>
            <ul className="mt-4 space-y-3 text-slate-600">
              {project.features.map((feature) => (
                <li key={feature} className="leading-7">
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section
        id="workflow"
        eyebrow="Architecture"
        title="Workflow and architecture"
        description="The project is structured as a practical sequence from input handling to output delivery."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {project.workflow.map((step, index) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="glass-panel flex gap-4 p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded border border-blue-500/25 bg-blue-500/10 font-mono text-sm font-black text-blue-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="leading-7 text-slate-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
