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
      <div className="min-h-screen overflow-hidden text-slate-900">
        <CyberBackground />
        <Navbar />
        <motion.main
          className="min-h-screen px-5 py-32 text-slate-900"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <GlassCard as="section" className="mx-auto max-w-6xl p-8">
            <p className="neon-kicker">Project Detail</p>
            <h1 className="mt-4 text-4xl font-black text-slate-900">Project Not Found</h1>
            <p className="mt-4 max-w-2xl text-slate-600">
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
    <div className="min-h-screen overflow-hidden text-slate-900">
      <CyberBackground />
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <ProjectDetailHero project={project} />
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <GlassCard className="p-4 sm:p-6">
            <div className="grid min-w-0 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div className="min-w-0">
                <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-blue-700/70 sm:tracking-[0.2em]">
                  Category
                </p>
                <p className="mt-2 break-words font-bold text-slate-900">{project.category}</p>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-blue-700/70 sm:tracking-[0.2em]">
                  Stack
                </p>
                <p className="mt-2 break-words font-bold text-slate-900">
                  {project.techStack.slice(0, 3).join(' / ')}
                </p>
              </div>
              <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-blue-700/70 sm:tracking-[0.2em]">
                  Status
                </p>
                <p className="mt-2 font-bold text-slate-900">Case study ready</p>
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
