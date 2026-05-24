import { profile } from '../../data/profile.js';

export default function Footer() {
  const links = [
    ['GitHub', profile.contact.links.github],
    ['LinkedIn', profile.contact.links.linkedin],
    ['Email', profile.contact.links.email]
  ];

  return (
    <footer className="relative border-t border-red-400/15 bg-zinc-950/70 px-5 py-8 text-sm text-zinc-500 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p>(c) {new Date().getFullYear()} Saket Bishnu. Built with MERN.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="rounded border border-white/10 bg-white/[0.04] px-3 py-1.5 font-bold text-zinc-300 transition hover:border-red-400/30 hover:text-rose-100 hover:shadow-neon-red"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
