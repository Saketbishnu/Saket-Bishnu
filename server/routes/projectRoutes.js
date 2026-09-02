import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  deleteProjectImage,
  uploadProjectImage
} from '../controllers/projectController.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin routes - In a production app, these would have authentication middleware
// For now, we use a simple admin secret check via middleware
const adminAuth = (req, res, next) => {
  const adminSecret = req.headers['x-admin-secret'];

  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or missing admin credentials'
    });
  }

  next();
};

router.post('/', adminAuth, createProject);
router.put('/:id', adminAuth, updateProject);
router.delete('/:id', adminAuth, deleteProject);
router.post('/:id/images', adminAuth, uploadProjectImage);
router.delete('/:id/images/:publicId', adminAuth, deleteProjectImage);

export default router;
