import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-blue-600 via-blue-400 to-white shadow-[0_0_22px_rgba(59,130,246,0.55)]"
      style={{ scaleX }}
    />
  );
}
