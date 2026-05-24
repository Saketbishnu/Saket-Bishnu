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
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
