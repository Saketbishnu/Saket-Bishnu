import { motion } from 'framer-motion';
import { container, fadeUp, revealViewport } from './motion.js';
import SectionHeader from './SectionHeader.jsx';
export { container, fadeUp } from './motion.js';

export default function Section({ id, eyebrow, title, description, children }) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={container}
    >
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <motion.div variants={fadeUp} className="mt-10">
        {children}
      </motion.div>
    </motion.section>
  );
}
