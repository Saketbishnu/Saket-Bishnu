export const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript', level: 'Core Logic', glow: 'from-white to-red-400' },
      { name: 'Python', level: 'AI / Data', glow: 'from-red-400 to-red-500' },
      { name: 'Java', level: 'Programming', glow: 'from-rose-400 to-red-400' },
      { name: 'SQL', level: 'Data Queries', glow: 'from-red-300 to-zinc-200' }
    ]
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 'Interface Systems', glow: 'from-red-400 to-red-500' },
      { name: 'Tailwind CSS', level: 'Visual System', glow: 'from-red-400 to-rose-400' },
      { name: 'Framer Motion', level: 'Animations', glow: 'from-rose-400 to-zinc-200' },
      { name: 'Axios', level: 'API Calls', glow: 'from-red-400 to-red-300' }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Runtime Layer', glow: 'from-red-300 to-zinc-200' },
      { name: 'Express.js', level: 'API Design', glow: 'from-rose-400 to-red-400' },
      { name: 'MongoDB', level: 'Data Storage', glow: 'from-zinc-200 to-rose-500' },
      { name: 'Mongoose', level: 'Data Models', glow: 'from-red-400 to-red-300' }
    ]
  },
  {
    category: 'AI / ML',
    skills: [
      { name: 'Machine Learning', level: 'Modeling', glow: 'from-red-400 to-red-500' },
      { name: 'Computer Vision', level: 'Vision AI', glow: 'from-rose-400 to-red-400' },
      { name: 'YOLO', level: 'Object Tracking', glow: 'from-red-300 to-zinc-200' },
      { name: 'Data Science', level: 'Analytics', glow: 'from-white to-red-400' }
    ]
  },
  {
    category: 'Tools & Technologies',
    skills: [
      { name: 'Git', level: 'Workflow', glow: 'from-rose-400 to-zinc-200' },
      { name: 'MongoDB Atlas', level: 'Cloud DB', glow: 'from-zinc-200 to-rose-500' },
      { name: 'Nodemailer', level: 'SMTP', glow: 'from-red-400 to-red-300' },
      { name: 'REST APIs', level: 'Integration', glow: 'from-red-400 to-red-300' }
    ]
  }
];

export const skills = skillGroups.flatMap((group) => group.skills);
