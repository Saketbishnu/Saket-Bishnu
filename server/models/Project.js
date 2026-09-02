import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      unique: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must contain only lowercase letters, numbers, and hyphens'
      ]
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [200, 'Short description cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Technologies array must contain at least one item'
      }
    },
    status: {
      type: String,
      enum: {
        values: ['Completed', 'In Progress'],
        message: 'Status must be either "Completed" or "In Progress"'
      },
      default: 'Completed'
    },
    featured: {
      type: Boolean,
      default: false
    },
    liveUrl: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?.+/,
        'Live URL must be a valid URL'
      ]
    },
    githubUrl: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?.+/,
        'GitHub URL must be a valid URL'
      ]
    },
    images: [
      {
        url: {
          type: String,
          required: [true, 'Image URL is required']
        },
        publicId: {
          type: String,
          required: [true, 'Cloudinary public ID is required']
        }
      }
    ],
    problemStatement: {
      type: String,
      trim: true
    },
    features: {
      type: [String],
      default: []
    },
    challenges: {
      type: [String],
      default: []
    },
    workflow: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate slug from title if not provided
projectSchema.pre('save', async function (next) {
  if (!this.isModified('title')) {
    return next();
  }

  // Generate slug from title if slug is not already set
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
