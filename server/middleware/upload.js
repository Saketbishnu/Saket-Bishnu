import { cloudinary } from '../config/cloudinary.js';

// Handle Cloudinary image deletion
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    console.error('[Upload Middleware] Cloudinary deletion failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Helper to upload images from base64 or URL to Cloudinary
export const uploadImageToCloudinary = async (imageSource, options = {}) => {
  try {
    const defaultOptions = {
      folder: 'portfolio/projects',
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto'
    };

    const uploadOptions = { ...defaultOptions, ...options };
    const result = await cloudinary.uploader.upload(imageSource, uploadOptions);

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('[Upload Middleware] Cloudinary upload failed:', error.message);
    return { success: false, error: error.message };
  }
};
