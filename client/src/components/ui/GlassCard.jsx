import { motion } from 'framer-motion';

export default function GlassCard({
  as: Element = motion.div,
  children,
  className = '',
  interactive = false,
  ...props
}) {
  const interactiveClass = interactive
    ? 'transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-glow'
    : '';

  return (
    <Element className={`glass-panel ${interactiveClass} ${className}`} {...props}>
      {children}
    </Element>
  );
}
