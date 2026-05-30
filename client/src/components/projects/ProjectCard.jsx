import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp } from '../ui/Section.jsx';
import GlassCard from '../ui/GlassCard.jsx';

export default function ProjectCard({ project, index }) {
  const [imageFailed, setImageFailed] = useState(false);
  const previewImage = project.images?.[0] || project.image;

  return (
    <GlassCard
      as={motion.article}
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.01 }}
      interactive
      className="group relative w-full min-w-0 overflow-hidden p-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80" />
      <Link
        to={`/projects/${project.slug}`}
        className="block min-w-0 p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:p-5"
      >
        <div className="mb-5 aspect-[16/10] overflow-hidden rounded border border-blue-500/15 bg-white/90 sm:aspect-video">
          {!imageFailed && previewImage ? (
            <div className="relative h-full w-full">
              <img
                src={previewImage}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:saturate-150"
                onError={() => setImageFailed(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-blue-500/10 opacity-80 transition group-hover:opacity-55" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 opacity-0 transition group-hover:opacity-100" />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center px-5 text-center text-sm font-bold text-slate-500">
              Project image coming soon
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
          <span className="shrink-0 font-mono text-xs font-black text-blue-700">
            SYS-{String(index + 1).padStart(2, '0')}
          </span>
          <motion.span
            whileHover={{ scale: 1.04 }}
            className="max-w-full rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-bold leading-5 text-blue-700"
          >
            {project.category}
          </motion.span>
        </div>
        <h3 className="mt-6 break-words text-xl font-black leading-tight text-slate-900 transition group-hover:text-blue-700 sm:mt-8 sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:min-h-36">
          {project.shortDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ y: -2 }}
              className="max-w-full break-words rounded border border-blue-500/15 bg-blue-500/[0.06] px-3 py-1 text-xs font-semibold leading-5 text-blue-700 transition group-hover:border-blue-500/35 group-hover:text-blue-700"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-blue-700">
          View case study
          <span className="transition group-hover:translate-x-1">-&gt;</span>
        </div>
      </Link>
    </GlassCard>
  );
}
