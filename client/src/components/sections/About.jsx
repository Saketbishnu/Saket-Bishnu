import { motion } from 'framer-motion';
import { profile } from '../../data/profile.js';
import GlassCard from '../ui/GlassCard.jsx';
import Section, { fadeUp } from '../ui/Section.jsx';

export default function About() {
  return (
    <Section
      id="about"
      eyebrow={profile.about.eyebrow}
      title={profile.about.title}
      description={profile.about.description}
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard as={motion.div} variants={fadeUp} className="p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700/80">
            {profile.name}
          </p>
          <h3 className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl">
            {profile.roles.join(' / ')}
          </h3>
          <p className="mt-5 leading-8 text-slate-700">{profile.currentFocus}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded border border-blue-500/15 bg-blue-500/[0.05] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700/70">
                Education
              </p>
              <p className="mt-2 font-semibold text-slate-900">
                {profile.education.degree}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {profile.education.institute}
              </p>
            </div>
            <div className="rounded border border-blue-400/15 bg-blue-400/[0.05] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700/70">
                CGPA
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">
                {profile.education.cgpa}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {profile.education.specialization}
              </p>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-5">
          {profile.about.cards.map((card) => (
            <GlassCard
              key={card.title}
              as={motion.div}
              variants={fadeUp}
              interactive
              className="p-6"
            >
              <h3 className="text-lg font-black text-slate-900">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{card.text}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2">
        {profile.interests.map((interest) => (
          <span
            key={interest}
            className="rounded border border-blue-500/20 bg-blue-500/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-blue-700"
          >
            {interest}
          </span>
        ))}
      </motion.div>
    </Section>
  );
}
