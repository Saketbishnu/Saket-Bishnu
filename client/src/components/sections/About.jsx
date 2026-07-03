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
      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        {/* Left Column: Professional Introduction */}
        <GlassCard as={motion.div} variants={fadeUp} className="min-w-0 p-5 sm:p-8 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-black text-slate-900 sm:text-2xl mb-4">
        
            </h3>
            <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-8">
  {profile.about.introduction.split('\n\n').map((para, i) => (
    <p
      key={i}
      className="text-justify font-medium"
    >
      {para}
    </p>
  ))}
</div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200/60 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-blue-700/80">Institution</span>
              <span className="font-semibold text-slate-900">SRM IST, Kattankulathur</span>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-blue-700/80">Degree</span>
              <span className="font-semibold text-slate-900">B.Tech CSE</span>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-blue-700/80">Specialization</span>
              <span className="font-semibold text-slate-900">Big Data Analytics</span>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-blue-700/80">Academics</span>
              <span className="font-semibold text-slate-900">8.2 CGPA</span>
            </div>
          </div>
        </GlassCard>

        {/* Right Column: Academic Journey */}
        <div className="flex flex-col gap-4 justify-between h-full">
          {profile.about.academicJourney.map((edu, index) => (
            <GlassCard
              key={`${edu.level}-${index}`}
              as={motion.div}
              variants={fadeUp}
              interactive
              className="p-5 flex flex-col justify-between flex-1"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700/80">
                    {index === 0 ? 'GRADUATE' : index === 1 ? 'Higher Secondary' : 'Secondary'}
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-1 truncate">
                    {edu.level}
                  </h4>
                  <p className="text-sm text-slate-600 mt-0.5 break-words">
                    {edu.field}
                  </p>
                </div>
                <span className="shrink-0 rounded bg-blue-100 px-2.5 py-1 text-xs font-black text-blue-700 shadow-sm">
                  {edu.score}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/50 text-xs text-slate-500 truncate">
                {edu.institution}{edu.location ? `, ${edu.location}` : ''}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Professional Interests */}
      <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
        <h3 className="text-lg font-black text-slate-950 mb-4 tracking-wide uppercase text-xs text-blue-700/80">
          Professional Interests
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {profile.about.interests.map((interest, index) => (
            <motion.div
              key={`${interest}-${index}`}
              whileHover={{ y: -2, scale: 1.02 }}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase leading-5 tracking-[0.1em] text-slate-700 shadow-sm transition hover:border-blue-500/30 hover:text-blue-700"
            >
              {interest}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Career Goal */}
      <GlassCard as={motion.div} variants={fadeUp} className="mt-8 sm:mt-10 p-6 sm:p-8">
        <h3 className="text-lg font-black text-slate-950 mb-4 tracking-wide uppercase text-xs text-blue-700/80">
          Career Goal
        </h3>
        <p className="leading-8 text-slate-700 text-sm sm:text-base">
          {profile.about.careerGoal}
        </p>
      </GlassCard>
    </Section>
  );
}
