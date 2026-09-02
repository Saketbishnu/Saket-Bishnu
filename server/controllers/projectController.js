import Project from '../models/Project.js';
import { deleteImageFromCloudinary, uploadImageToCloudinary } from '../middleware/upload.js';

export const getProjects = async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({ slug });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title, slug, shortDescription, description, category, technologies, status, featured, liveUrl, githubUrl, images, problemStatement, features, challenges, workflow } = req.body;

    // Validate required fields
    if (!title || !shortDescription || !description || !category || !technologies || !Array.isArray(technologies) || technologies.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: title, shortDescription, description, category, and technologies array'
      });
      return;
    }

    // Check if project with same title already exists
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      res.status(400).json({
        success: false,
        message: 'A project with this title already exists'
      });
      return;
    }

    const project = await Project.create({
      title,
      slug,
      shortDescription,
      description,
      category,
      technologies,
      status: status || 'Completed',
      featured: featured || false,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      images: images || [],
      problemStatement: problemStatement || '',
      features: features || [],
      challenges: challenges || [],
      workflow: workflow || []
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(', ');
    }

    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent title/slug modification after creation for safety
    if (updateData.title || updateData.slug) {
      delete updateData.title;
      delete updateData.slug;
    }

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(', ');
    }

    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    // Delete associated Cloudinary images
    if (project.images && project.images.length > 0) {
      const deletePromises = project.images.map((image) =>
        deleteImageFromCloudinary(image.publicId)
      );

      const results = await Promise.all(deletePromises);
      const failedDeletions = results.filter((result) => !result.success);

      if (failedDeletions.length > 0) {
        console.warn(
          `[ProjectController] ${failedDeletions.length} image(s) failed to delete from Cloudinary`
        );
      }
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully along with associated images'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProjectImage = async (req, res, next) => {
  try {
    const { id, publicId } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    // Find and remove image from array
    const imageIndex = project.images.findIndex((img) => img.publicId === publicId);

    if (imageIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Image not found in project'
      });
      return;
    }

    // Delete from Cloudinary
    const deleteResult = await deleteImageFromCloudinary(publicId);

    if (!deleteResult.success) {
      console.warn('[ProjectController] Image deletion from Cloudinary failed:', deleteResult.error);
    }

    // Remove from MongoDB
    project.images.splice(imageIndex, 1);
    await project.save();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProjectImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageData } = req.body;

    if (!imageData) {
      res.status(400).json({
        success: false,
        message: 'Image data is required'
      });
      return;
    }

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    // Upload to Cloudinary
    const uploadResult = await uploadImageToCloudinary(imageData);

    if (!uploadResult.success) {
      res.status(400).json({
        success: false,
        message: 'Image upload failed',
        error: uploadResult.error
      });
      return;
    }

    // Add to project
    project.images.push({
      url: uploadResult.url,
      publicId: uploadResult.publicId
    });

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};
