import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp } from '../ui/Section.jsx';

export default function ProjectCard({ project, index }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -10, rotateX: 2 }}
      className="project-card group"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="block focus:outline-none focus:ring-4 focus:ring-cyan-300/20"
      >
        <div className="mb-5 aspect-video overflow-hidden rounded border border-cyan-300/15 bg-slate-950/70">
          {!imageFailed && project.image ? (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:saturate-125"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-5 text-center text-sm font-bold text-slate-500">
              Project image coming soon
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs font-black text-cyan-200">
            SYS-{String(index + 1).padStart(2, '0')}
          </span>
          <span className="rounded-full border border-fuchsia-300/25 bg-fuchsia-300/10 px-3 py-1 text-xs font-bold text-fuchsia-100">
            {project.category}
          </span>
        </div>
        <h3 className="mt-8 text-2xl font-black text-white transition group-hover:text-cyan-100">
          {project.title}
        </h3>
        <p className="mt-4 min-h-36 text-sm leading-7 text-slate-400">
          {project.shortDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1 text-xs font-semibold text-cyan-100 transition group-hover:border-fuchsia-300/35 group-hover:text-fuchsia-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
