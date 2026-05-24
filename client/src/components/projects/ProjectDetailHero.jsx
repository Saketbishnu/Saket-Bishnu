import { motion } from 'framer-motion';
import { fadeUp } from '../ui/Section.jsx';
import GlassCard from '../ui/GlassCard.jsx';
import NeonButton from '../ui/NeonButton.jsx';
import ProjectImage from './ProjectImage.jsx';

export default function ProjectDetailHero({ project }) {
  return (
    <motion.section
      className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-14 pt-32 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      <div className="pointer-events-none absolute inset-x-8 top-24 h-64 rounded-full bg-rose-400/10 blur-3xl" />
      <motion.div variants={fadeUp}>
        <p className="neon-kicker">{project.category}</p>
        <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-white via-rose-100 to-rose-100 bg-clip-text text-transparent">
            {project.title}
          </span>
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
          {project.shortDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded border border-red-400/15 bg-red-400/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-rose-100"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <NeonButton
              className="px-5 py-3 text-sm"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </NeonButton>
          ) : (
            <span className="rounded border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-zinc-400">
              GitHub coming soon
            </span>
          )}
          {project.liveUrl ? (
            <a
              className="rounded border border-rose-400/30 bg-white/[0.04] px-5 py-3 text-sm font-black text-rose-100 shadow-neon-ruby transition hover:-translate-y-0.5 hover:border-red-400/50"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          ) : (
            <span className="rounded border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-zinc-400">
              Live demo coming soon
            </span>
          )}
          <NeonButton className="px-5 py-3 text-sm" to="/">
            Back Home
          </NeonButton>
        </div>
      </motion.div>

      <GlassCard as={motion.div} variants={fadeUp} className="p-4 sm:p-5">
        <div className="relative aspect-video overflow-hidden rounded border border-red-400/15 bg-zinc-950/70">
          <ProjectImage
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-red-400/10" />
          <div className="absolute bottom-4 left-4 rounded border border-red-400/20 bg-zinc-950/70 px-3 py-2 font-mono text-xs font-black text-rose-100 backdrop-blur-xl">
            CASE STUDY / {project.category}
          </div>
        </div>
      </GlassCard>
    </motion.section>
  );
}
