import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp } from '../ui/Section.jsx';
import ProjectImage from './ProjectImage.jsx';

export default function ProjectDetailHero({ project }) {
  return (
    <motion.section
      className="mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-28 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      <motion.div variants={fadeUp}>
        <p className="neon-kicker">{project.category}</p>
        <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          {project.shortDescription}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a
              className="neon-button px-5 py-3 text-sm"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          ) : (
            <span className="rounded border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-slate-400">
              GitHub coming soon
            </span>
          )}
          {project.liveUrl ? (
            <a
              className="rounded border border-fuchsia-300/30 bg-white/[0.04] px-5 py-3 text-sm font-black text-fuchsia-100 shadow-neon-pink"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          ) : (
            <span className="rounded border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-slate-400">
              Live demo coming soon
            </span>
          )}
          <Link className="rounded border border-cyan-300/20 px-5 py-3 text-sm font-bold text-cyan-100" to="/">
            Back Home
          </Link>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="terminal-panel p-5">
        <div className="aspect-video rounded border border-cyan-300/15 bg-slate-950/70">
          <ProjectImage
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
