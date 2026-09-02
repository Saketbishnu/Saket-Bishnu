import Project from '../models/Project.js';
import { deleteImageFromCloudinary, uploadFilesToCloudinary } from '../middleware/upload.js';

const parseArrayField = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => `${item}`.trim()).filter(Boolean);
  }

  if (typeof value !== 'string') {
    return [];
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(trimmedValue);
    if (Array.isArray(parsedValue)) {
      return parsedValue.map((item) => `${item}`.trim()).filter(Boolean);
    }
  } catch {
    return trimmedValue
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const parseBooleanField = (value) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return value === 'true';
  }

  return false;
};

const buildProjectPayload = (body) => ({
  title: body.title?.trim(),
  slug: body.slug?.trim() || undefined,
  shortDescription: body.shortDescription?.trim(),
  description: body.description?.trim(),
  category: body.category?.trim(),
  technologies: parseArrayField(body.technologies),
  status: body.status?.trim() || 'Completed',
  featured: parseBooleanField(body.featured),
  liveUrl: body.liveUrl?.trim() || '',
  githubUrl: body.githubUrl?.trim() || '',
  problemStatement: body.problemStatement?.trim() || '',
  features: parseArrayField(body.features),
  challenges: parseArrayField(body.challenges),
  workflow: parseArrayField(body.workflow)
});

const hasOwnField = (body, field) => Object.prototype.hasOwnProperty.call(body, field);

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
    const projectData = buildProjectPayload(req.body);
    const { title, slug, shortDescription, description, category, technologies } = projectData;

    // Validate required fields
    if (!title || !shortDescription || !description || !category || technologies.length === 0) {
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

    let uploadedImages = [];

    if (req.files?.length) {
      const uploadResult = await uploadFilesToCloudinary(req.files);

      if (!uploadResult.success) {
        res.status(400).json({
          success: false,
          message: 'Image upload failed',
          error: uploadResult.error
        });
        return;
      }

      uploadedImages = uploadResult.images;
    }

    const project = await Project.create({
      ...projectData,
      images: uploadedImages
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

    if (error.code === 11000) {
      error.statusCode = 409;
      error.message = 'Project title or slug already exists';
    }

    next(error);
  }
};

export const updateProject = async (req, res, next) => {
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

    const updateData = buildProjectPayload(req.body);

    if (hasOwnField(req.body, 'title')) {
      project.title = updateData.title;
    }
    if (hasOwnField(req.body, 'slug') && updateData.slug) {
      project.slug = updateData.slug;
    }
    if (hasOwnField(req.body, 'shortDescription')) {
      project.shortDescription = updateData.shortDescription;
    }
    if (hasOwnField(req.body, 'description')) {
      project.description = updateData.description;
    }
    if (hasOwnField(req.body, 'category')) {
      project.category = updateData.category;
    }
    if (hasOwnField(req.body, 'technologies')) {
      project.technologies = updateData.technologies;
    }
    if (hasOwnField(req.body, 'status')) {
      project.status = updateData.status;
    }
    if (hasOwnField(req.body, 'featured')) {
      project.featured = parseBooleanField(req.body.featured);
    }
    if (hasOwnField(req.body, 'liveUrl')) {
      project.liveUrl = updateData.liveUrl;
    }
    if (hasOwnField(req.body, 'githubUrl')) {
      project.githubUrl = updateData.githubUrl;
    }
    if (hasOwnField(req.body, 'problemStatement')) {
      project.problemStatement = updateData.problemStatement;
    }
    if (hasOwnField(req.body, 'features')) {
      project.features = updateData.features;
    }
    if (hasOwnField(req.body, 'challenges')) {
      project.challenges = updateData.challenges;
    }
    if (hasOwnField(req.body, 'workflow')) {
      project.workflow = updateData.workflow;
    }

    if (req.files?.length) {
      const uploadResult = await uploadFilesToCloudinary(req.files);

      if (!uploadResult.success) {
        res.status(400).json({
          success: false,
          message: 'Image upload failed',
          error: uploadResult.error
        });
        return;
      }

      project.images = [...(project.images || []), ...uploadResult.images];
    }

    await project.save();

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

    if (error.code === 11000) {
      error.statusCode = 409;
      error.message = 'Project title or slug already exists';
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
      const deletePromises = project.images
        .filter((image) => image.publicId)
        .map((image) => deleteImageFromCloudinary(image.publicId));

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
    const { id } = req.params;
    const publicId = req.params.publicId || req.query.publicId;

    if (!publicId) {
      res.status(400).json({
        success: false,
        message: 'Image publicId is required'
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

    if (!req.files?.length) {
      res.status(400).json({
        success: false,
        message: 'At least one image file is required'
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
    const uploadResult = await uploadFilesToCloudinary(req.files);

    if (!uploadResult.success) {
      res.status(400).json({
        success: false,
        message: 'Image upload failed',
        error: uploadResult.error
      });
      return;
    }

    // Add to project
    project.images.push(...uploadResult.images);

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: project
    });
  } catch (error) {
    if (error.code === 11000) {
      error.statusCode = 409;
      error.message = 'Project title or slug already exists';
    }

    next(error);
  }
};
