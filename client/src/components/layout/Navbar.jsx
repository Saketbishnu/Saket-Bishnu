import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../../data/profile.js';
import NeonButton from '../ui/NeonButton.jsx';

const navItems = ['About', 'Skills', 'Projects', 'Achievements', 'Contact'];
const socialLinks = [
  ['GitHub', profile.contact.links.github],
  ['LinkedIn', profile.contact.links.linkedin]
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const isNavItemActive = (item) => {
    const hash = `#${item.toLowerCase()}`;
    return isHome && (location.hash === hash || (!location.hash && item === 'About'));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition duration-300 ${
        isScrolled
          ? 'border-blue-300/20 bg-slate-950/95 shadow-[0_18px_60px_rgba(15,23,42,0.24)]'
          : 'border-blue-300/10 bg-slate-950/90'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded border border-blue-300/30 bg-white/10 font-black text-white transition group-hover:border-blue-200/60 group-hover:bg-blue-500/20">
            SB
          </span>
          <span className="text-sm font-black uppercase tracking-[0.26em] text-white">
            Saket Bishnu
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-blue-300/25 bg-white/10 text-white backdrop-blur-xl md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className={isOpen ? 'hidden' : 'block h-0.5 w-5 bg-current'} />
          </span>
        </button>

        <div className="hidden items-center gap-2 rounded border border-white/10 bg-white/10 p-1.5 backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              className={`group relative rounded px-3 py-2 text-sm font-semibold transition hover:bg-white/10 hover:text-white ${
                isNavItemActive(item)
                  ? 'bg-white/[0.12] text-white'
                  : isHome
                    ? 'text-blue-100'
                    : 'text-blue-100/75'
              }`}
            >
              {item}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-blue-200 to-white transition duration-300 ${
                  isNavItemActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
          <NeonButton
            to="/resume"
            className={`px-4 py-2 text-sm ${location.pathname === '/resume' ? 'shadow-glow' : ''}`}
          >
            Resume
          </NeonButton>
          <div className="flex items-center gap-1 border-l border-white/10 pl-2">
            {socialLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded px-2.5 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-100/75 transition hover:bg-white/10 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          className="border-t border-blue-300/15 bg-slate-950/96 px-5 pb-5 shadow-glass backdrop-blur-2xl md:hidden"
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                className={`rounded border px-4 py-3 text-sm font-semibold transition hover:border-blue-300/30 hover:text-white ${
                  isNavItemActive(item)
                    ? 'border-blue-300/30 bg-white/10 text-white'
                    : 'border-white/10 bg-white/[0.05] text-blue-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <NeonButton
              to="/resume"
              className="px-4 py-3 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </NeonButton>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-white/10 bg-white/[0.05] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-blue-100 transition hover:border-blue-300/30 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
