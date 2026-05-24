import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import CyberBackground from '../components/layout/CyberBackground.jsx';
import Footer from '../components/layout/Footer.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import ProjectDetailHero from '../components/projects/ProjectDetailHero.jsx';
import ProjectScreenshots from '../components/projects/ProjectScreenshots.jsx';
import ProjectTechStack from '../components/projects/ProjectTechStack.jsx';
import ProjectWorkflow from '../components/projects/ProjectWorkflow.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import { getProjectBySlug } from '../data/projects.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen overflow-hidden text-zinc-100">
        <CyberBackground />
        <Navbar />
        <motion.main
          className="min-h-screen px-5 py-32 text-zinc-100"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <GlassCard as="section" className="mx-auto max-w-6xl p-8">
            <p className="neon-kicker">Project Detail</p>
            <h1 className="mt-4 text-4xl font-black text-white">Project Not Found</h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              The requested project does not exist yet.
            </p>
            <Link className="neon-button mt-6 px-5 py-3 text-sm" to="/">
              Back Home
            </Link>
          </GlassCard>
        </motion.main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden text-zinc-100">
      <CyberBackground />
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <ProjectDetailHero project={project} />
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <GlassCard className="p-5 sm:p-6">
            <div className="grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rose-200/70">
                  Category
                </p>
                <p className="mt-2 font-bold text-white">{project.category}</p>
              </div>
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rose-200/70">
                  Stack
                </p>
                <p className="mt-2 font-bold text-white">
                  {project.techStack.slice(0, 3).join(' / ')}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rose-200/70">
                  Status
                </p>
                <p className="mt-2 font-bold text-white">Case study ready</p>
              </div>
            </div>
          </GlassCard>
        </div>
        <ProjectWorkflow project={project} />
        <ProjectTechStack project={project} />
        <ProjectScreenshots project={project} />
      </motion.main>
      <Footer />
    </div>
  );
}
