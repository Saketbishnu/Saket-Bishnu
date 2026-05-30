import { motion } from 'framer-motion';
import { fadeUp } from '../ui/Section.jsx';
import GlassCard from '../ui/GlassCard.jsx';
import NeonButton from '../ui/NeonButton.jsx';
import ProjectImage from './ProjectImage.jsx';

export default function ProjectDetailHero({ project }) {
  const heroImage = project.images?.[0] || project.image;

  return (
    <motion.section
      className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      <div className="pointer-events-none absolute inset-x-8 top-24 h-64 rounded-full bg-blue-500/10 blur-3xl" />
      <motion.div variants={fadeUp} className="min-w-0">
        <p className="neon-kicker max-w-full whitespace-normal text-left leading-5 tracking-[0.18em] sm:tracking-[0.26em]">
          {project.category}
        </p>
        <h1 className="mt-5 break-words text-3xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-slate-950 via-blue-800 to-blue-600 bg-clip-text text-transparent">
            {project.title}
          </span>
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
          {project.shortDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="max-w-full break-words rounded border border-blue-500/15 bg-blue-500/[0.06] px-3 py-1 text-xs font-bold uppercase leading-5 tracking-[0.1em] text-blue-700 sm:tracking-[0.12em]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
          {project.githubUrl ? (
            <NeonButton
              className="w-full px-5 py-3 text-sm sm:w-auto"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </NeonButton>
          ) : (
            <span className="w-full rounded border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 shadow-sm sm:w-auto">
              GitHub coming soon
            </span>
          )}
          {project.liveUrl ? (
            <a
              className="w-full rounded border border-blue-200 bg-white px-5 py-3 text-center text-sm font-black text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 sm:w-auto"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          ) : (
            <span className="w-full rounded border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-600 shadow-sm sm:w-auto">
              Live demo coming soon
            </span>
          )}
          <NeonButton className="w-full px-5 py-3 text-sm sm:w-auto" to="/">
            Back Home
          </NeonButton>
        </div>
      </motion.div>

      <GlassCard as={motion.div} variants={fadeUp} className="min-w-0 p-3 sm:p-5">
        <div className="relative aspect-[16/10] overflow-hidden rounded border border-blue-500/15 bg-white/90 sm:aspect-video">
          <ProjectImage
            src={heroImage}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-blue-500/10" />
          <div className="absolute inset-x-3 bottom-3 rounded border border-blue-500/20 bg-white/90 px-3 py-2 font-mono text-[0.68rem] font-black leading-5 text-blue-700 backdrop-blur-xl sm:inset-x-auto sm:bottom-4 sm:left-4 sm:text-xs">
            CASE STUDY / {project.category}
          </div>
        </div>
      </GlassCard>
    </motion.section>
  );
}
