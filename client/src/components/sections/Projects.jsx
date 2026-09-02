import { useEffect, useState } from 'react';
import { getProjects } from '../../api/projectApi.js';
import ProjectCard from '../projects/ProjectCard.jsx';
import Section from '../ui/Section.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProjects();
        setProjects(response.data.data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title=""
      description=""
    >
      <div className="relative min-w-0">
        <div className="pointer-events-none absolute inset-x-4 top-6 -z-10 h-32 rounded-full bg-blue-500/10 blur-3xl sm:inset-x-8 sm:top-10 sm:h-48" />

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded border border-blue-200 bg-blue-50 p-6 text-center text-blue-700">
            No projects found yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
