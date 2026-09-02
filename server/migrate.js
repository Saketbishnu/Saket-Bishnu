import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import connectDB from './config/db.js';

dotenv.config();

// Existing projects data
const projectsData = [
  {
    slug: 'liversegnet-surgical-vision-ai',
    title: 'LiverSegNet - Surgical Vision AI',
    category: 'Computer Vision / Medical AI',
    shortDescription: 'AI-based liver segmentation project for surgical vision and medical imaging workflows.',
    description: 'LiverSegNet focuses on segmenting liver regions from medical or surgical vision data to support more precise clinical analysis and surgical decision workflows.',
    problemStatement: 'Surgical and medical image workflows need reliable region understanding so clinicians and researchers can focus on relevant anatomy faster.',
    features: [
      'Liver region segmentation workflow',
      'Medical AI focused preprocessing pipeline',
      'Model output visualization',
      'Case-study ready architecture for surgical vision'
    ],
    workflow: [
      'Collect and preprocess medical image inputs',
      'Prepare segmentation masks and training data',
      'Train and evaluate the segmentation model',
      'Visualize predicted liver regions for analysis'
    ],
    technologies: ['Python', 'Deep Learning', 'Computer Vision', 'Medical Imaging'],
    challenges: [
      'Handling visual complexity in medical imagery',
      'Maintaining segmentation quality across varied image conditions',
      'Presenting model output in an interpretable format'
    ],
    status: 'Completed',
    featured: true,
    githubUrl: 'https://github.com/akashrajput005/liversegnet',
    liveUrl: 'https://liversegnet-nq3ncgte2bappazv7kbu7e.streamlit.app/',
    images: []
  },
  {
    slug: 'football-tracking-using-yolo',
    title: 'Football Tracking using YOLO',
    category: 'Computer Vision / Sports Analytics',
    shortDescription: 'YOLO-powered football tracking system for detecting and tracking players or objects in match footage.',
    description: 'A sports analytics computer vision project that applies YOLO object detection to football footage for real-time or recorded object tracking.',
    problemStatement: 'Football footage contains fast motion, overlapping players, and changing camera angles, making manual tracking slow and inconsistent.',
    features: [
      'Object detection on football video frames',
      'Player or ball tracking workflow',
      'Frame-by-frame inference pipeline',
      'Sports analytics visualization potential'
    ],
    workflow: [
      'Load football match footage',
      'Run YOLO detection across frames',
      'Track detected entities over time',
      'Export or visualize tracking results'
    ],
    technologies: ['Python', 'YOLO', 'OpenCV', 'Computer Vision'],
    challenges: [
      'Tracking fast movement across frames',
      'Managing overlapping players and occlusion',
      'Improving detection consistency in match footage'
    ],
    status: 'Completed',
    featured: false,
    githubUrl: '',
    liveUrl: '',
    images: []
  },
  {
    slug: 'good-life-clinic',
    title: 'Good Life Clinic',
    category: 'Full Stack / Healthcare',
    shortDescription: 'Healthcare clinic web platform concept for appointments, services, and patient-facing information.',
    description: 'Good Life Clinic is a healthcare-focused web application designed to present clinic services and support digital appointment or inquiry workflows.',
    problemStatement: 'Clinics need clear digital experiences that help patients understand services and reach the clinic without friction.',
    features: [
      'Clinic service presentation',
      'Responsive patient-facing UI',
      'Contact or inquiry workflow',
      'Healthcare-oriented content structure'
    ],
    workflow: [
      'Define clinic service sections',
      'Build responsive frontend screens',
      'Connect forms or inquiry flows',
      'Prepare deployment-ready UI'
    ],
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js'],
    challenges: [
      'Designing a trustworthy healthcare interface',
      'Keeping the user journey simple',
      'Making content accessible and readable'
    ],
    status: 'Completed',
    featured: false,
    githubUrl: '',
    liveUrl: '',
    images: []
  }
];

const migrateProjects = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if projects already exist
    const existingCount = await Project.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing projects. Skipping migration.`);
      console.log('To re-migrate, delete existing projects from MongoDB first.');
      process.exit(0);
    }

    // Insert projects
    const inserted = await Project.insertMany(projectsData);
    console.log(`✓ Successfully migrated ${inserted.length} projects to MongoDB`);
    inserted.forEach((project) => {
      console.log(`  - ${project.title} (${project.slug})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
};

migrateProjects();
