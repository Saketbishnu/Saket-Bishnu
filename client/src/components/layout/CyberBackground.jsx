import { motion } from 'framer-motion';

export default function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(34,211,238,0.18),transparent_34rem),linear-gradient(135deg,#020617_0%,#040816_42%,#090312_100%)]" />
      <div className="cyber-grid absolute inset-0 opacity-45" />
      <motion.div
        className="absolute inset-x-[-20%] top-1/4 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
        animate={{ y: [0, 420, 0], opacity: [0.2, 0.65, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(115deg,transparent_0%,rgba(217,70,239,0.08)_36%,rgba(34,211,238,0.08)_52%,transparent_72%)]"
        animate={{ x: ['-18%', '18%', '-18%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="scanlines absolute inset-0" />
    </div>
  );
}
