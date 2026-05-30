import { motion } from 'framer-motion';
import { fadeUp } from './motion.js';

export default function SectionHeader({ eyebrow, title, description, className = '' }) {
  return (
    <motion.div variants={fadeUp} className={`max-w-3xl ${className}`}>
      <p className="neon-kicker">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
