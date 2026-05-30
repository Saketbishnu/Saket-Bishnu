
export default function Footer() {
  const links = [
    ['GitHub', 'https://github.com/Saketbishnu'],
    ['LinkedIn', 'https://www.linkedin.com/in/saket-bishnu-00769a269/'],
    ['Email', 'mailto:saketbsn@gmail.com']
  ];

  return (
    <footer className="relative border-t border-blue-900 bg-slate-950 px-5 py-8 text-sm text-blue-100/70">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p>(c) {new Date().getFullYear()} Saket Bishnu. Built with MERN.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="rounded border border-white/10 bg-white/[0.06] px-3 py-1.5 font-bold text-blue-100 transition hover:border-blue-300/40 hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
