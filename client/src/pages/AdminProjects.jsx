import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  createProject,
  deleteProject,
  deleteProjectImage,
  getProjects,
  updateProject,
  uploadProjectImage
} from '../api/projectApi.js';
import CyberBackground from '../components/layout/CyberBackground.jsx';
import Footer from '../components/layout/Footer.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminSecret, setAdminSecret] = useState(localStorage.getItem('adminSecret') || '');
  const [authenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('adminSecret')));
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    category: '',
    technologies: '',
    status: 'Completed',
    featured: false,
    liveUrl: '',
    githubUrl: '',
    problemStatement: '',
    features: '',
    challenges: '',
    workflow: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminSecret) {
      localStorage.setItem('adminSecret', adminSecret);
      setAuthenticated(true);
      setError(null);
      fetchProjects();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSecret');
    setAuthenticated(false);
    setAdminSecret('');
    setProjects([]);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProjects();
      setProjects(response.data.data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchProjects();
    }
  }, [authenticated]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      category: '',
      technologies: '',
      status: 'Completed',
      featured: false,
      liveUrl: '',
      githubUrl: '',
      problemStatement: '',
      features: '',
      challenges: '',
      workflow: ''
    });
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setSelectedImages([]);
    setImagePreviews([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditProject = (project) => {
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setFormData({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      description: project.description,
      category: project.category,
      technologies: (project.technologies || []).join(', '),
      status: project.status,
      featured: project.featured,
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      problemStatement: project.problemStatement || '',
      features: (project.features || []).join('\n'),
      challenges: (project.challenges || []).join('\n'),
      workflow: (project.workflow || []).join('\n')
    });
    setSelectedImages([]);
    setImagePreviews([]);
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const projectData = new FormData();
    projectData.append('title', formData.title);
    if (formData.slug.trim()) {
      projectData.append('slug', formData.slug.trim());
    }
    projectData.append('shortDescription', formData.shortDescription);
    projectData.append('description', formData.description);
    projectData.append('category', formData.category);
    projectData.append(
      'technologies',
      JSON.stringify(formData.technologies.split(',').map((t) => t.trim()).filter(Boolean))
    );
    projectData.append('status', formData.status);
    projectData.append('featured', String(formData.featured));
    projectData.append('liveUrl', formData.liveUrl);
    projectData.append('githubUrl', formData.githubUrl);
    projectData.append('problemStatement', formData.problemStatement);
    projectData.append(
      'features',
      JSON.stringify(formData.features.split('\n').map((f) => f.trim()).filter(Boolean))
    );
    projectData.append(
      'challenges',
      JSON.stringify(formData.challenges.split('\n').map((c) => c.trim()).filter(Boolean))
    );
    projectData.append(
      'workflow',
      JSON.stringify(formData.workflow.split('\n').map((w) => w.trim()).filter(Boolean))
    );
    selectedImages.forEach((file) => {
      projectData.append('images', file);
    });

    try {
      if (editingId) {
        await updateProject(editingId, projectData);
        alert('Project updated successfully');
      } else {
        await createProject(projectData);
        alert('Project created successfully');
      }
      resetForm();
      fetchProjects();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await deleteProject(id);
        alert('Project deleted successfully');
        fetchProjects();
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleDeleteImage = async (projectId, publicId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteProjectImage(projectId, publicId);
        alert('Image deleted successfully');
        fetchProjects();
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleUploadImage = async (projectId, e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      const imageData = new FormData();
      files.forEach((file) => imageData.append('images', file));
      await uploadProjectImage(projectId, imageData);
      alert('Image uploaded successfully');
      e.target.value = '';
      fetchProjects();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files || []);
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setSelectedImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen overflow-hidden text-slate-900">
        <CyberBackground />
        <Navbar />
        <motion.main
          className="min-h-screen px-5 py-32 text-slate-900"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="mx-auto max-w-2xl">
            <GlassCard className="p-8">
              <h1 className="text-3xl font-black text-slate-900">Admin Login</h1>
              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700">Admin Secret</label>
                  <input
                    type="password"
                    value={adminSecret}
                    onChange={(e) => setAdminSecret(e.target.value)}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter admin secret"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded bg-blue-700 px-4 py-2 font-bold text-white transition hover:bg-blue-800"
                >
                  Login
                </button>
              </form>
            </GlassCard>
          </div>
        </motion.main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden text-slate-900">
      <CyberBackground />
      <Navbar />
      <motion.main
        className="mx-auto max-w-6xl px-5 py-32"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-slate-900">Admin Projects</h1>
          <button
            onClick={handleLogout}
            className="rounded bg-red-700 px-4 py-2 font-bold text-white transition hover:bg-red-800"
          >
            Logout
          </button>
        </div>

        {error && <div className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        <div className="mt-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="rounded bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              + Add Project
            </button>
          ) : (
            <GlassCard className="p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">
                  {editingId ? 'Edit Project' : 'Create Project'}
                </h2>
                <button
                  onClick={resetForm}
                  className="rounded bg-slate-300 px-4 py-2 font-bold text-slate-900 transition hover:bg-slate-400"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmitForm} className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-slate-700">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700">Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="auto-generated if empty"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700">Short Description *</label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    rows="4"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-slate-700">Category *</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option>Completed</option>
                      <option>In Progress</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700">Technologies (comma-separated) *</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-slate-700">Live URL</label>
                    <input
                      type="text"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700">GitHub URL</label>
                    <input
                      type="text"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span className="font-bold text-slate-700">Featured Project</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700">
                    Project Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelection}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  />
                  {imagePreviews.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {imagePreviews.map((preview, index) => (
                        <img
                          key={`${preview}-${index}`}
                          src={preview}
                          alt={`Selected project preview ${index + 1}`}
                          className="h-20 w-20 rounded object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {editingId && (
                  <div>
                    <p className="block text-sm font-bold text-slate-700">Existing Images</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {(projects.find((project) => project._id === editingId)?.images || []).map((image) => (
                        <div key={image.publicId || image.url} className="relative">
                          <img
                            src={image.url || image}
                            alt="Existing project"
                            className="h-20 w-20 rounded object-cover"
                          />
                          {image.publicId && (
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(editingId, image.publicId)}
                              className="absolute -right-2 -top-2 rounded-full bg-red-600 px-1.5 py-0.5 text-xs text-white"
                            >
                              X
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700">Problem Statement</label>
                  <textarea
                    value={formData.problemStatement}
                    onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700">Features (one per line)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700">Challenges (one per line)</label>
                  <textarea
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700">Workflow (one step per line)</label>
                  <textarea
                    value={formData.workflow}
                    onChange={(e) => setFormData({ ...formData, workflow: e.target.value })}
                    className="mt-2 w-full rounded border border-blue-500/15 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    rows="3"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
                >
                  {editingId ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </GlassCard>
          )}
        </div>

        {!showForm && (
          <div className="mt-8 space-y-4">
            {loading ? (
              <p className="text-slate-600">Loading projects...</p>
            ) : projects.length === 0 ? (
              <p className="text-slate-600">No projects yet.</p>
            ) : (
              projects.map((project) => (
                <GlassCard key={project._id} className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900">{project.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{project.shortDescription}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <span key={tech} className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.images && project.images.length > 0 && (
                        <div className="mt-4">
                          <p className="mb-2 text-sm font-bold text-slate-700">Images:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.images.map((image) => (
                              <div key={image.publicId || image.url || image} className="relative">
                                <img
                                  src={image.url || image}
                                  alt="Project"
                                  className="h-16 w-16 rounded object-cover"
                                />
                                {image.publicId && (
                                  <button
                                    onClick={() => handleDeleteImage(project._id, image.publicId)}
                                    className="absolute -right-2 -top-2 rounded-full bg-red-600 text-white"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <label className="block text-sm font-bold text-slate-700">
                          Add Image:
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleUploadImage(project._id, e)}
                            className="mt-2"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="rounded bg-blue-700 px-4 py-2 font-bold text-white transition hover:bg-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="rounded bg-red-700 px-4 py-2 font-bold text-white transition hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        )}
      </motion.main>
      <Footer />
    </div>
  );
}
