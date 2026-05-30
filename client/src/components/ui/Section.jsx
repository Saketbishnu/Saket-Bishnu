import { motion } from 'framer-motion';
import { container, fadeUp, revealViewport } from './motion.js';
import SectionHeader from './SectionHeader.jsx';
export { container, fadeUp } from './motion.js';

export default function Section({ id, eyebrow, title, description, children }) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={container}
    >
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <motion.div variants={fadeUp} className="mt-7 sm:mt-10">
        {children}
      </motion.div>
    </motion.section>
  );
}
