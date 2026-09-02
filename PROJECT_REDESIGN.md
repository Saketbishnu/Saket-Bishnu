# Project Management System Redesign - Complete Documentation

## Overview

The project section has been successfully redesigned to use a dynamic, database-driven system instead of static files. Projects are now managed through MongoDB and exposed via a clean REST API. Images are stored in Cloudinary, and admin management is available through a dedicated admin panel.

## Architecture Changes

### Backend Structure
```
server/
├── config/
│   ├── db.js                    # MongoDB connection
│   └── cloudinary.js            # Cloudinary configuration
├── models/
│   └── Project.js               # MongoDB Project schema
├── controllers/
│   └── projectController.js      # Project CRUD operations
├── routes/
│   └── projectRoutes.js          # Project API endpoints
├── middleware/
│   └── upload.js                 # Cloudinary image helpers
└── migrate.js                    # Migration script for existing data
```

### Frontend Structure
```
client/src/
├── api/
│   └── projectApi.js             # Project API client
├── pages/
│   ├── AdminProjects.jsx          # Admin management interface
│   └── ProjectDetail.jsx          # Dynamic project detail page
├── components/
│   ├── sections/
│   │   └── Projects.jsx           # Dynamic project list (home)
│   └── projects/
│       ├── ProjectCard.jsx        # Project card component
│       ├── ProjectDetailHero.jsx  # Project hero section
│       ├── ProjectTechStack.jsx   # Tech stack display
│       ├── ProjectWorkflow.jsx    # Problem/features/workflow
│       ├── ProjectScreenshots.jsx # Image gallery
│       └── ProjectImage.jsx       # Image fallback handler
└── routes/
    └── AppRoutes.jsx             # Updated with admin route
```

## Key Features

### 1. **Dynamic Project Loading**
- Projects are fetched from MongoDB API at runtime
- No need to modify frontend code to add/remove projects
- Supports loading states, error handling, and empty states

### 2. **Admin Management Interface**
- **URL**: `/admin/projects`
- **Authentication**: Admin secret stored in `.env`
- **Features**:
  - Create new projects
  - Edit existing projects
  - Delete projects with confirmation
  - Upload/delete project images
  - Manage all project metadata

### 3. **Image Management**
- Images stored in Cloudinary (not in MongoDB)
- Secure backend image uploads via Base64 encoding
- Frontend cannot access Cloudinary secrets
- Images are deleted from Cloudinary when removed from projects

### 4. **REST API Endpoints**

#### Public Endpoints
```
GET /api/projects              # List all projects
GET /api/projects/:slug        # Get single project by slug
```

#### Admin Endpoints (require admin secret)
```
POST /api/projects             # Create new project
PUT /api/projects/:id          # Update project
DELETE /api/projects/:id       # Delete project
POST /api/projects/:id/images  # Upload project image
DELETE /api/projects/:id/images/:publicId  # Delete image
```

## Environment Configuration

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/saket-portfolio
CLIENT_URL=http://localhost:5173

# Brevo Email
BREVO_API_KEY=...
BREVO_SENDER_EMAIL=...
BREVO_SENDER_NAME="..."

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Security
ADMIN_SECRET=your_secure_secret_key
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Database Schema

### Project Model
```javascript
{
  _id: ObjectId,
  title: String (required, unique),
  slug: String (required, unique, auto-generated),
  shortDescription: String (required, max 200 chars),
  description: String (required),
  category: String (required),
  technologies: [String] (required, min 1),
  status: String (enum: "Completed", "In Progress"),
  featured: Boolean (default: false),
  liveUrl: String (optional, URL format),
  githubUrl: String (optional, URL format),
  problemStatement: String (optional),
  features: [String],
  challenges: [String],
  workflow: [String],
  images: [
    {
      url: String,
      publicId: String (Cloudinary ID)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Migration Guide

### Step 1: Install Dependencies
Backend:
```bash
cd server
npm install
```

Client:
```bash
cd client
npm install
```

### Step 2: Configure Environment
1. Copy `.env.example` to `.env` in both server and client directories
2. Fill in all required environment variables:
   - MongoDB URI
   - Cloudinary credentials
   - Admin secret

### Step 3: Migrate Existing Data
```bash
cd server
npm run migrate
```

This script reads the existing projects data and inserts it into MongoDB. It won't run if projects already exist.

### Step 4: Start Development Servers
Backend:
```bash
cd server
npm run dev
```

Client (in another terminal):
```bash
cd client
npm run dev
```

The application should now be running at `http://localhost:5173`

## Using the Admin Panel

1. **Access Admin Panel**
   - Navigate to `http://localhost:5173/admin/projects`
   - Enter your admin secret (from `.env`)

2. **Add Project**
   - Click "+ Add Project"
   - Fill in all required fields
   - Technologies can be comma-separated
   - Features, challenges, and workflow steps are newline-separated
   - Upload project images (optional at creation)

3. **Edit Project**
   - Click "Edit" on any project card
   - Modify any fields (except title/slug for safety)
   - Upload additional images

4. **Manage Images**
   - Upload images during project creation or editing
   - Delete images by clicking the ✕ button on image thumbnails
   - Images are automatically deleted from Cloudinary

5. **Delete Project**
   - Click "Delete" on any project card
   - Confirm the deletion
   - All associated images are automatically deleted from Cloudinary

## Frontend Component Compatibility

All project components have been updated to support both:
- **New format**: MongoDB documents with `technologies` array and structured images
- **Old format**: Static data with `techStack` array and mixed image formats

This ensures backward compatibility during the transition.

## API Response Examples

### Get All Projects
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "674a1b2c3d4e5f6g7h8i9j0k",
      "title": "Project Name",
      "slug": "project-name",
      "shortDescription": "...",
      "description": "...",
      "category": "Full Stack",
      "technologies": ["React", "Node.js", "MongoDB"],
      "status": "Completed",
      "featured": true,
      "images": [
        {
          "url": "https://res.cloudinary.com/...",
          "publicId": "portfolio/projects/..."
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your_admin_secret" \
  -d '{
    "title": "New Project",
    "shortDescription": "Short desc",
    "description": "Full description",
    "category": "Full Stack",
    "technologies": ["React", "Node.js"],
    "status": "Completed",
    "featured": false,
    "liveUrl": "https://...",
    "githubUrl": "https://..."
  }'
```

## Security Notes

1. **Admin Secret**: Store securely, never commit to version control
2. **Cloudinary Credentials**: Only used on backend, never exposed to frontend
3. **Image Uploads**: Validated on backend before processing
4. **Database**: All MongoDB operations use validated schemas with type checking
5. **CORS**: Configured for the specified client URL only

## Troubleshooting

### Projects not loading
- Check MongoDB connection in server logs
- Verify `MONGODB_URI` in `.env`
- Ensure server is running on correct port

### Images not uploading
- Verify Cloudinary credentials in `.env`
- Check that Cloudinary API key has upload permissions
- Ensure image file size is under 50MB
- Check server logs for detailed error

### Admin panel not accessible
- Verify admin secret is correct
- Check localStorage for stored secret (or clear it)
- Ensure client is pointing to correct API URL

### Build errors
- Clear `dist/` folder and node_modules, reinstall dependencies
- Check Node.js version (should be 18+)
- Verify all imports use correct relative paths

## Planned Improvements

- [ ] Batch image upload
- [ ] Image optimization and resizing via Cloudinary
- [ ] Project search and filtering
- [ ] Projects pagination/infinite scroll
- [ ] Draft projects feature
- [ ] Project view analytics
- [ ] Email notifications for new projects
- [ ] Scheduled project publishing

## Files Modified

### Backend
- `server.js` - Added Cloudinary init and project routes
- `.env.example` - Added Cloudinary and admin variables

### Frontend
- `ProjectDetail.jsx` - Now fetches from API
- `Projects.jsx` - Now fetches from API with loading states
- `ProjectCard.jsx` - Updated to support both data formats
- `ProjectDetailHero.jsx` - Updated to support both data formats
- `ProjectTechStack.jsx` - Updated to support both data formats
- `ProjectWorkflow.jsx` - Updated to support both data formats
- `ProjectScreenshots.jsx` - Updated to support both data formats
- `AppRoutes.jsx` - Added admin route

### New Files
- `server/config/cloudinary.js`
- `server/models/Project.js`
- `server/controllers/projectController.js`
- `server/routes/projectRoutes.js`
- `server/middleware/upload.js`
- `server/migrate.js`
- `client/src/api/projectApi.js`
- `client/src/pages/AdminProjects.jsx`

## Support & Questions

For issues or questions, check the existing components and services patterns - they follow the same structure as the contact system already in place.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready
