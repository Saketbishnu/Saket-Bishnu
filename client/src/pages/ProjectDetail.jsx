import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import CyberBackground from '../components/layout/CyberBackground.jsx';
import Footer from '../components/layout/Footer.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import ProjectDetailHero from '../components/projects/ProjectDetailHero.jsx';
import ProjectScreenshots from '../components/projects/ProjectScreenshots.jsx';
import ProjectTechStack from '../components/projects/ProjectTechStack.jsx';
import ProjectWorkflow from '../components/projects/ProjectWorkflow.jsx';
import { getProjectBySlug } from '../data/projects.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen overflow-hidden text-slate-100">
        <CyberBackground />
        <Navbar />
        <motion.main
          className="min-h-screen px-5 py-28 text-slate-100"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <section className="mx-auto max-w-6xl">
            <p className="neon-kicker">Project Detail</p>
            <h1 className="mt-4 text-4xl font-black text-white">Project Not Found</h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              The requested project does not exist yet.
            </p>
            <Link className="neon-button mt-6 px-5 py-3 text-sm" to="/">
              Back Home
            </Link>
          </section>
        </motion.main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden text-slate-100">
      <CyberBackground />
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <ProjectDetailHero project={project} />
        <ProjectWorkflow project={project} />
        <ProjectTechStack project={project} />
        <ProjectScreenshots project={project} />
      </motion.main>
      <Footer />
    </div>
  );
}
