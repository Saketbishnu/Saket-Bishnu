export default function Footer() {
  return (
    <footer className="border-t border-cyan-300/15 bg-slate-950/60 px-5 py-8 text-center text-sm text-slate-500 backdrop-blur-xl">
      (c) {new Date().getFullYear()} Saket Bishnu. Built with MERN.
    </footer>
  );
}
