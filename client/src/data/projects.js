import cropYieldImage from '../assets/projects/crop-yield.svg';
import footballYoloImage from '../assets/projects/football-yolo.svg';
import fraudDetectionImage from '../assets/projects/fraud-detection.svg';
import genaiVideoImage from '../assets/projects/genai-video.svg';
import goodLifeClinicImage from '../assets/projects/good-life-clinic.svg';
import liversegnetImage from '../assets/projects/liversegnet.png';
import medswiftImage from '../assets/projects/medswift.svg';
import vendorMonitoringImage from '../assets/projects/vendor-monitoring.svg';

export const projects = [
  {
    slug: 'liversegnet-surgical-vision-ai',
    title: 'LiverSegNet - Surgical Vision AI',
    category: 'Computer Vision / Medical AI',
    shortDescription:
      'AI-based liver segmentation project for surgical vision and medical imaging workflows.',
    description:
      'LiverSegNet focuses on segmenting liver regions from medical or surgical vision data to support more precise clinical analysis and surgical decision workflows.',
    problemStatement:
      'Surgical and medical image workflows need reliable region understanding so clinicians and researchers can focus on relevant anatomy faster.',
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
    techStack: ['Python', 'Deep Learning', 'Computer Vision', 'Medical Imaging'],
    challenges: [
      'Handling visual complexity in medical imagery',
      'Maintaining segmentation quality across varied image conditions',
      'Presenting model output in an interpretable format'
    ],
    images: [liversegnetImage, liversegnetImage, liversegnetImage],
    githubUrl: '',
    liveUrl: ''
  },
  {
    slug: 'football-tracking-using-yolo',
    title: 'Football Tracking using YOLO',
    category: 'Computer Vision / Sports Analytics',
    shortDescription:
      'YOLO-powered football tracking system for detecting and tracking players or objects in match footage.',
    description:
      'A sports analytics computer vision project that applies YOLO object detection to football footage for real-time or recorded object tracking.',
    problemStatement:
      'Football footage contains fast motion, overlapping players, and changing camera angles, making manual tracking slow and inconsistent.',
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
    techStack: ['Python', 'YOLO', 'OpenCV', 'Computer Vision'],
    challenges: [
      'Tracking fast movement across frames',
      'Managing overlapping players and occlusion',
      'Improving detection consistency in match footage'
    ],
    images: [footballYoloImage, footballYoloImage, footballYoloImage],
    githubUrl: '',
    liveUrl: ''
  },
  {
    slug: 'good-life-clinic',
    title: 'Good Life Clinic',
    category: 'Full Stack / Healthcare',
    shortDescription:
      'Healthcare clinic web platform concept for appointments, services, and patient-facing information.',
    description:
      'Good Life Clinic is a healthcare-focused web application designed to present clinic services and support digital appointment or inquiry workflows.',
    problemStatement:
      'Clinics need clear digital experiences that help patients understand services and reach the clinic without friction.',
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
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express.js'],
    challenges: [
      'Designing a trustworthy healthcare interface',
      'Keeping the user journey simple',
      'Structuring services and contact information clearly'
    ],
    images: [goodLifeClinicImage, goodLifeClinicImage, goodLifeClinicImage],
    githubUrl: 'https://github.com/Saketbishnu/Good-Life-Clinic.git',
    liveUrl: ''
  },
  {
    slug: 'medswift',
    title: 'MedSwift',
    category: 'Healthcare / Full Stack',
    shortDescription:
      'Medical service platform concept focused on fast healthcare access and streamlined digital workflows.',
    description:
      'MedSwift is a healthcare technology project centered on making medical service discovery or request workflows faster and easier for users.',
    problemStatement:
      'Users often need quicker ways to discover, request, and understand healthcare services through a simple digital interface.',
    features: [
      'Medical service workflow',
      'Responsive full-stack structure',
      'User-friendly healthcare interface',
      'Scalable feature architecture'
    ],
    workflow: [
      'Map healthcare service user flow',
      'Build frontend service screens',
      'Design backend API extension points',
      'Prepare deployable full-stack structure'
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    challenges: [
      'Simplifying healthcare interactions',
      'Structuring scalable feature modules',
      'Balancing usability with professional presentation'
    ],
    images: [medswiftImage, medswiftImage, medswiftImage],
    githubUrl: '',
    liveUrl: ''
  },
  {
    slug: 'crop-yield-prediction',
    title: 'Crop Yield Prediction',
    category: 'Machine Learning / Agriculture',
    shortDescription:
      'ML model for predicting crop yield using data-driven agricultural features.',
    description:
      'A machine learning project that estimates crop yield from agricultural data, supporting better planning and data-backed farming decisions.',
    problemStatement:
      'Agricultural planning benefits from predictive insights, but yield estimation depends on many changing environmental and crop factors.',
    features: [
      'Agricultural data preprocessing',
      'Predictive ML model workflow',
      'Feature-based yield estimation',
      'Evaluation and result interpretation'
    ],
    workflow: [
      'Collect crop and environmental data',
      'Clean and prepare model features',
      'Train regression or prediction models',
      'Evaluate prediction accuracy'
    ],
    techStack: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn'],
    challenges: [
      'Managing noisy agricultural data',
      'Selecting meaningful predictive features',
      'Improving model reliability across conditions'
    ],
    images: [cropYieldImage, cropYieldImage, cropYieldImage],
    githubUrl: '',
    liveUrl: ''
  },
  {
    slug: 'credit-card-fraud-detection',
    title: 'Credit Card Fraud Detection',
    category: 'Machine Learning / FinTech',
    shortDescription:
      'Fraud detection model for identifying suspicious credit card transactions.',
    description:
      'A machine learning classification project designed to detect potentially fraudulent card transactions from transaction patterns and behavioral features.',
    problemStatement:
      'Fraudulent transactions are rare but costly, requiring models that can identify suspicious activity despite imbalanced data.',
    features: [
      'Transaction data preprocessing',
      'Fraud classification workflow',
      'Model evaluation with class imbalance awareness',
      'Risk-oriented prediction output'
    ],
    workflow: [
      'Load and inspect transaction data',
      'Handle class imbalance and feature scaling',
      'Train classification models',
      'Evaluate fraud detection performance'
    ],
    techStack: ['Python', 'Machine Learning', 'Scikit-learn', 'Data Science'],
    challenges: [
      'Handling imbalanced fraud datasets',
      'Reducing false positives and false negatives',
      'Evaluating model performance beyond basic accuracy'
    ],
    images: [fraudDetectionImage, fraudDetectionImage, fraudDetectionImage],
    githubUrl: '',
    liveUrl: ''
  },
  {
    slug: 'genai-video-knowledge-retrieval-system',
    title: 'GenAI Video Knowledge Retrieval System',
    category: 'Generative AI / Retrieval',
    shortDescription:
      'AI retrieval system for extracting and querying knowledge from video content.',
    description:
      'A GenAI project focused on transforming video content into searchable knowledge, enabling users to retrieve relevant insights from video-based information.',
    problemStatement:
      'Video contains valuable knowledge, but users need a faster way to query and retrieve relevant information without manually reviewing full recordings.',
    features: [
      'Video knowledge extraction workflow',
      'Retrieval-oriented architecture',
      'AI-assisted query experience',
      'Content summarization potential'
    ],
    workflow: [
      'Ingest video content',
      'Extract transcripts or structured knowledge',
      'Index the processed knowledge',
      'Retrieve relevant answers for user queries'
    ],
    techStack: ['Generative AI', 'Python', 'Retrieval Systems', 'NLP'],
    challenges: [
      'Converting video into searchable information',
      'Improving retrieval relevance',
      'Designing a usable AI query workflow'
    ],
    images: [genaiVideoImage, genaiVideoImage, genaiVideoImage],
    githubUrl: '',
    liveUrl: ''
  },
  {
    slug: 'vendor-performance-monitoring-system',
    title: 'Vendor Performance Monitoring System',
    category: 'Analytics / Full Stack',
    shortDescription:
      'Monitoring system for evaluating vendor performance through metrics and operational insights.',
    description:
      'A performance monitoring system designed to track vendors, surface key metrics, and support better operational decisions through analytics.',
    problemStatement:
      'Teams need structured visibility into vendor performance so operational decisions can be based on metrics instead of scattered reports.',
    features: [
      'Vendor metric tracking',
      'Performance monitoring dashboard concept',
      'Data-backed operational insights',
      'Scalable analytics structure'
    ],
    workflow: [
      'Collect vendor performance inputs',
      'Normalize and organize vendor metrics',
      'Calculate performance indicators',
      'Display insights through dashboard views'
    ],
    techStack: ['React', 'Node.js', 'Data Analytics', 'MongoDB'],
    challenges: [
      'Structuring useful vendor KPIs',
      'Making performance data easy to scan',
      'Designing scalable monitoring workflows'
    ],
    images: [vendorMonitoringImage, vendorMonitoringImage, vendorMonitoringImage],
    githubUrl: '',
    liveUrl: ''
  }
];

export const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};
