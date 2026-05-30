export const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript', level: 'Core Logic', glow: 'from-white to-blue-500' },
      { name: 'Python', level: 'AI / Data', glow: 'from-blue-500 to-blue-600' },
      { name: 'Java', level: 'Programming', glow: 'from-blue-500 to-blue-500' },
      { name: 'SQL', level: 'Data Queries', glow: 'from-blue-400 to-zinc-200' }
    ]
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 'Interface Systems', glow: 'from-blue-500 to-blue-600' },
      { name: 'Tailwind CSS', level: 'Visual System', glow: 'from-blue-500 to-blue-500' },
      { name: 'Framer Motion', level: 'Animations', glow: 'from-blue-500 to-zinc-200' },
      { name: 'Axios', level: 'API Calls', glow: 'from-blue-500 to-blue-400' }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Runtime Layer', glow: 'from-blue-400 to-zinc-200' },
      { name: 'Express.js', level: 'API Design', glow: 'from-blue-500 to-blue-500' },
      { name: 'MongoDB', level: 'Data Storage', glow: 'from-zinc-200 to-blue-600' },
      { name: 'Mongoose', level: 'Data Models', glow: 'from-blue-500 to-blue-400' }
    ]
  },
  {
    category: 'AI / ML',
    skills: [
      { name: 'Machine Learning', level: 'Modeling', glow: 'from-blue-500 to-blue-600' },
      { name: 'Computer Vision', level: 'Vision AI', glow: 'from-blue-500 to-blue-500' },
      { name: 'YOLO', level: 'Object Tracking', glow: 'from-blue-400 to-zinc-200' },
      { name: 'Data Science', level: 'Analytics', glow: 'from-white to-blue-500' }
    ]
  },
  {
    category: 'Tools & Technologies',
    skills: [
      { name: 'Git', level: 'Workflow', glow: 'from-blue-500 to-zinc-200' },
      { name: 'MongoDB Atlas', level: 'Cloud DB', glow: 'from-zinc-200 to-blue-600' },
      { name: 'Nodemailer', level: 'SMTP', glow: 'from-blue-500 to-blue-400' },
      { name: 'REST APIs', level: 'Integration', glow: 'from-blue-500 to-blue-400' }
    ]
  }
];

export const skills = skillGroups.flatMap((group) => group.skills);
