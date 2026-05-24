import { motion } from 'framer-motion';

const sweepTransition = {
  duration: 12,
  repeat: Infinity,
  ease: 'easeInOut'
};

export default function CyberBackground({ intensity = 'normal' }) {
  const opacity = intensity === 'subtle' ? 'opacity-30' : 'opacity-45';

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(239,68,68,0.18),transparent_34rem),linear-gradient(135deg,#080303_0%,#12070a_46%,#090304_100%)]" />
      <div className={`cyber-grid absolute inset-0 ${opacity}`} />
      <motion.div
        className="absolute inset-x-[-20%] top-1/4 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent"
        animate={{ y: [0, 420, 0], opacity: [0.2, 0.65, 0.2] }}
        transition={sweepTransition}
      />
      <motion.div
        className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(115deg,transparent_0%,rgba(225,29,72,0.08)_36%,rgba(239,68,68,0.08)_52%,transparent_72%)]"
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
