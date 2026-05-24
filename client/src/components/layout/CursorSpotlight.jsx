import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const x = useSpring(mouseX, { stiffness: 120, damping: 24, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canHover || prefersReducedMotion) {
      return undefined;
    }

    setEnabled(true);
    const handlePointerMove = (event) => {
      mouseX.set(event.clientX - 220);
      mouseY.set(event.clientY - 220);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[60] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.16),rgba(225,29,72,0.06)_38%,transparent_68%)] blur-xl mix-blend-screen"
      style={{ x, y }}
    />
  );
}
