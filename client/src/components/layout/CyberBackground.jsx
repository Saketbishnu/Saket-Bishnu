import { motion } from 'framer-motion';

const sweepTransition = {
  duration: 12,
  repeat: Infinity,
  ease: 'easeInOut'
};

export default function CyberBackground({ intensity = 'normal' }) {
  const opacity = intensity === 'subtle' ? 'opacity-15' : 'opacity-25';

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(37,99,235,0.14),transparent_34rem),linear-gradient(135deg,#f8fafc_0%,#ffffff_46%,#eff6ff_100%)]" />
      <div className={`cyber-grid absolute inset-0 ${opacity}`} />
      <motion.div
        className="absolute inset-x-[-20%] top-1/4 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
        animate={{ y: [0, 420, 0], opacity: [0.08, 0.22, 0.08] }}
        transition={sweepTransition}
      />
      <motion.div
        className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(115deg,transparent_0%,rgba(37,99,235,0.05)_36%,rgba(147,197,253,0.07)_52%,transparent_72%)]"
        animate={{ x: ['-18%', '18%', '-18%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="cyber-noise absolute inset-0"
        animate={{ opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="scanlines absolute inset-0" />
    </div>
  );
}
