import CyberBackground from '../components/layout/CyberBackground.jsx';
import Footer from '../components/layout/Footer.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import About from '../components/sections/About.jsx';
import Achievements from '../components/sections/Achievements.jsx';
import Contact from '../components/sections/Contact.jsx';
import Hero from '../components/sections/Hero.jsx';
import Projects from '../components/sections/Projects.jsx';
import Skills from '../components/sections/Skills.jsx';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden text-slate-100">
      <CyberBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
