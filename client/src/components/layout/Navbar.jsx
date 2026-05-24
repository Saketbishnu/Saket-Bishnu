import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const navItems = ['About', 'Skills', 'Projects', 'Achievements', 'Contact'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-300/15 bg-slate-950/62 shadow-[0_18px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded border border-cyan-300/30 bg-cyan-300/10 font-black text-cyan-100 shadow-neon-cyan transition group-hover:border-fuchsia-300/50 group-hover:text-fuchsia-100">
            SB
          </span>
          <span className="text-sm font-black uppercase tracking-[0.26em] text-white">
            Saket Bishnu
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-cyan-300/25 bg-white/[0.04] text-cyan-100 shadow-neon-cyan md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className={isOpen ? 'hidden' : 'block h-0.5 w-5 bg-current'} />
          </span>
        </button>

        <div className="hidden items-center gap-2 rounded border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="rounded px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-cyan-300/10 hover:text-cyan-100 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
            >
              {item}
            </a>
          ))}
          <Link to="/resume" className="neon-button px-4 py-2 text-sm">
            Resume
          </Link>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          className="border-t border-cyan-300/15 bg-slate-950/95 px-5 pb-5 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <Link
              to="/resume"
              className="neon-button px-4 py-3 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
