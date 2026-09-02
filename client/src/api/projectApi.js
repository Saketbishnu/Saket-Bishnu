import axios from 'axios';

const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const projectApi = axios.create({
  baseURL: apiBaseUrl
});

// Add admin secret to requests if available
projectApi.interceptors.request.use((config) => {
  const adminSecret = localStorage.getItem('adminSecret');
  if (adminSecret) {
    config.headers['x-admin-secret'] = adminSecret;
  }
  return config;
});

export const getProjects = () => {
  return projectApi.get('/projects');
};

export const getProjectBySlug = (slug) => {
  return projectApi.get(`/projects/${slug}`);
};

export const createProject = (payload) => {
  return projectApi.post('/projects', payload);
};

export const updateProject = (id, payload) => {
  return projectApi.put(`/projects/${id}`, payload);
};

export const deleteProject = (id) => {
  return projectApi.delete(`/projects/${id}`);
};

export const uploadProjectImage = (id, imageData) => {
  return projectApi.post(`/projects/${id}/images`, imageData);
};

export const deleteProjectImage = (id, publicId) => {
  return projectApi.delete(`/projects/${id}/images`, {
    params: { publicId }
  });
};
