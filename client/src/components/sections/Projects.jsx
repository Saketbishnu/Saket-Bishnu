import { projects } from '../../data/projects.js';
import ProjectCard from '../projects/ProjectCard.jsx';
import Section from '../ui/Section.jsx';

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Premium cards for full-stack proof."
      description="Each project card frames the build like a system module: visual layer, integration layer, and backend workflow."
    >
      <div className="relative min-w-0">
        <div className="pointer-events-none absolute inset-x-8 top-10 h-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
