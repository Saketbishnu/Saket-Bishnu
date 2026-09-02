import multer from 'multer';
import { cloudinary } from '../config/cloudinary.js';

const storage = multer.memoryStorage();

const fileFilter = (_req, file, callback) => {
  if (file.mimetype?.startsWith('image/')) {
    callback(null, true);
    return;
  }

  callback(new Error('Only image files are allowed'));
};

export const projectImageUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10
  },
  fileFilter
});

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

const uploadBufferToCloudinary = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });

    uploadStream.end(buffer);
  });

export const uploadFilesToCloudinary = async (files = [], options = {}) => {
  const defaultOptions = {
    folder: 'portfolio/projects',
    resource_type: 'image',
    quality: 'auto',
    fetch_format: 'auto'
  };

  const uploadOptions = { ...defaultOptions, ...options };

  try {
    const uploads = await Promise.all(
      files.map(async (file) => {
        const result = await uploadBufferToCloudinary(file.buffer, {
          ...uploadOptions,
          public_id: file.originalname
            ? `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`
            : undefined
        });

        return {
          url: result.secure_url,
          publicId: result.public_id
        };
      })
    );

    return {
      success: true,
      images: uploads
    };
  } catch (error) {
    console.error('[Upload Middleware] Cloudinary upload failed:', error.message);
    return { success: false, error: error.message };
  }
};
