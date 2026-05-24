import { motion } from 'framer-motion';
import Section, { fadeUp } from '../ui/Section.jsx';
import ProjectImage from './ProjectImage.jsx';

export default function ProjectScreenshots({ project }) {
  const screenshots = project.screenshots?.length ? project.screenshots : [project.image];

  return (
    <Section
      id="screenshots"
      eyebrow="Screenshots"
      title="Project visuals"
      description="Visual placeholders are wired from project data and can be replaced with final screenshots at any time."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {screenshots.map((screenshot, index) => (
          <motion.div key={`${screenshot}-${index}`} variants={fadeUp} className="terminal-panel p-4">
            <div className="aspect-video rounded border border-cyan-300/15 bg-slate-950/70">
              <ProjectImage
                src={screenshot}
                alt={`${project.title} screenshot ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
