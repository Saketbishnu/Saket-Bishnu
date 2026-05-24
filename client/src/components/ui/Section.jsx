import { motion } from 'framer-motion';

export const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Section({ id, eyebrow, title, description, children }) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={container}
    >
      <motion.div variants={fadeUp} className="max-w-3xl">
        <p className="neon-kicker">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-8 text-slate-400 sm:text-lg">
            {description}
          </p>
        )}
      </motion.div>
      <motion.div variants={fadeUp} className="mt-10">
        {children}
      </motion.div>
    </motion.section>
  );
}
