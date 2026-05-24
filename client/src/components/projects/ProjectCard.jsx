import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp } from '../ui/Section.jsx';
import GlassCard from '../ui/GlassCard.jsx';

export default function ProjectCard({ project, index }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <GlassCard
      as={motion.article}
      variants={fadeUp}
      whileHover={{ y: -10, scale: 1.015, rotateX: 2 }}
      interactive
      className="group relative overflow-hidden p-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-80" />
      <Link
        to={`/projects/${project.slug}`}
        className="block p-5 focus:outline-none focus:ring-4 focus:ring-red-400/20"
      >
        <div className="mb-5 aspect-video overflow-hidden rounded border border-red-400/15 bg-zinc-950/70">
          {!imageFailed && project.image ? (
            <div className="relative h-full w-full">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:saturate-150"
                onError={() => setImageFailed(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-red-400/10 opacity-80 transition group-hover:opacity-55" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-red-400/0 via-red-400/70 to-rose-400/0 opacity-0 transition group-hover:opacity-100" />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center px-5 text-center text-sm font-bold text-zinc-500">
              Project image coming soon
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs font-black text-rose-200">
            SYS-{String(index + 1).padStart(2, '0')}
          </span>
          <motion.span
            whileHover={{ scale: 1.04 }}
            className="rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-1 text-xs font-bold text-rose-100"
          >
            {project.category}
          </motion.span>
        </div>
        <h3 className="mt-8 text-2xl font-black text-white transition group-hover:text-rose-100">
          {project.title}
        </h3>
        <p className="mt-4 min-h-36 text-sm leading-7 text-zinc-400">
          {project.shortDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ y: -2 }}
              className="rounded border border-red-400/15 bg-red-400/[0.06] px-3 py-1 text-xs font-semibold text-rose-100 transition group-hover:border-rose-400/35 group-hover:text-rose-100"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-rose-100">
          View case study
          <span className="transition group-hover:translate-x-1">-&gt;</span>
        </div>
      </Link>
    </GlassCard>
  );
}
