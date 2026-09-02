export const skillGroups = [
  {
    category: 'Languages',
    skills: [
      {
        name: 'Python',
        level: 'AI / Backend',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'JavaScript',
        level: 'Full Stack',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'SQL',
        level: 'Data Queries',
        glow: 'from-blue-400 to-blue-600'
      }
    ]
  },

  {
    category: 'Frontend',
    skills: [
      {
        name: 'React',
        level: 'Frontend Development',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Redux Toolkit',
        level: 'State Management',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Tailwind CSS',
        level: 'UI Development',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Material UI',
        level: 'Component Library',
        glow: 'from-blue-400 to-blue-600'
      },
      {
        name: 'Framer Motion',
        level: 'Animations',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Axios',
        level: 'API Integration',
        glow: 'from-blue-400 to-blue-600'
      }
    ]
  },

  {
    category: 'Backend & APIs',
    skills: [
      {
        name: 'Node.js',
        level: 'Runtime',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Express.js',
        level: 'REST APIs',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'FastAPI',
        level: 'Python APIs',
        glow: 'from-blue-400 to-blue-600'
      },
      {
        name: 'REST APIs',
        level: 'API Development',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'MongoDB',
        level: 'Database',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Mongoose',
        level: 'Data Modeling',
        glow: 'from-blue-400 to-blue-600'
      }
    ]
  },

  {
    category: 'AI & Machine Learning',
    skills: [
      {
        name: 'Machine Learning',
        level: 'Model Development',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Computer Vision',
        level: 'Vision AI',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'LangGraph',
        level: 'AI Workflows',
        glow: 'from-blue-400 to-blue-600'
      },
      {
        name: 'RAG Pipelines',
        level: 'AI Systems',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Groq API',
        level: 'LLM Integration',
        glow: 'from-blue-400 to-blue-600'
      },
      {
        name: 'Data Science',
        level: 'Data Analysis',
        glow: 'from-blue-500 to-blue-600'
      }
    ]
  },

  {
    category: 'Tools & Cloud',
    skills: [
      {
        name: 'Git',
        level: 'Version Control',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'GitHub',
        level: 'Collaboration',
        glow: 'from-blue-400 to-blue-600'
      },
      {
        name: 'MongoDB Atlas',
        level: 'Cloud Database',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Cloudinary',
        level: 'Media Management',
        glow: 'from-blue-400 to-blue-600'
      },
      {
        name: 'Brevo API',
        level: 'Email API',
        glow: 'from-blue-500 to-blue-600'
      }
    ]
  },

  {
    category: 'Testing & Automation',
    skills: [
      {
        name: 'Selenium',
        level: 'Test Automation',
        glow: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Robot Framework',
        level: 'Automation Testing',
        glow: 'from-blue-400 to-blue-600'
      }
    ]
  }
];

export const skills = skillGroups.flatMap((group) => group.skills);