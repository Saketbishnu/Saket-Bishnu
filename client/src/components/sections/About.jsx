import { motion } from 'framer-motion';
import { profile } from '../../data/profile.js';
import Section, { fadeUp } from '../ui/Section.jsx';

export default function About() {
  return (
    <Section
      id="about"
      eyebrow={profile.about.eyebrow}
      title={profile.about.title}
      description={profile.about.description}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {profile.about.cards.map((card) => (
          <motion.div
            key={card.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="cyber-card p-6"
          >
            <h3 className="text-lg font-black text-white">{card.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
