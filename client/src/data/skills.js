export const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript', level: 'Core Logic', glow: 'from-yellow-200 to-cyan-300' },
      { name: 'Python', level: 'AI / Data', glow: 'from-cyan-300 to-sky-400' },
      { name: 'Java', level: 'Programming', glow: 'from-fuchsia-300 to-cyan-300' },
      { name: 'SQL', level: 'Data Queries', glow: 'from-emerald-300 to-lime-300' }
    ]
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 'Interface Systems', glow: 'from-cyan-300 to-sky-400' },
      { name: 'Tailwind CSS', level: 'Visual System', glow: 'from-sky-300 to-fuchsia-300' },
      { name: 'Framer Motion', level: 'Animations', glow: 'from-fuchsia-300 to-pink-300' },
      { name: 'Axios', level: 'API Calls', glow: 'from-cyan-300 to-emerald-300' }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Runtime Layer', glow: 'from-emerald-300 to-lime-300' },
      { name: 'Express.js', level: 'API Design', glow: 'from-fuchsia-300 to-cyan-300' },
      { name: 'MongoDB', level: 'Data Storage', glow: 'from-lime-300 to-emerald-400' },
      { name: 'Mongoose', level: 'Data Models', glow: 'from-cyan-300 to-emerald-300' }
    ]
  },
  {
    category: 'AI / ML',
    skills: [
      { name: 'Machine Learning', level: 'Modeling', glow: 'from-cyan-300 to-sky-400' },
      { name: 'Computer Vision', level: 'Vision AI', glow: 'from-fuchsia-300 to-cyan-300' },
      { name: 'YOLO', level: 'Object Tracking', glow: 'from-emerald-300 to-lime-300' },
      { name: 'Data Science', level: 'Analytics', glow: 'from-yellow-200 to-cyan-300' }
    ]
  },
  {
    category: 'Tools & Technologies',
    skills: [
      { name: 'Git', level: 'Workflow', glow: 'from-fuchsia-300 to-pink-300' },
      { name: 'MongoDB Atlas', level: 'Cloud DB', glow: 'from-lime-300 to-emerald-400' },
      { name: 'Nodemailer', level: 'SMTP', glow: 'from-cyan-300 to-emerald-300' },
      { name: 'REST APIs', level: 'Integration', glow: 'from-cyan-300 to-emerald-300' }
    ]
  }
];

export const skills = skillGroups.flatMap((group) => group.skills);
