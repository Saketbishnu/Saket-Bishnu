import { motion } from 'framer-motion';
import { fadeUp } from './motion.js';

export default function SectionHeader({ eyebrow, title, description, className = '' }) {
  return (
    <motion.div variants={fadeUp} className={`max-w-3xl min-w-0 ${className}`}>
      <p className="neon-kicker">{eyebrow}</p>
      <h2 className="mt-4 break-words text-2xl font-black leading-tight text-slate-950 min-[390px]:text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </motion.div>
  );
}
