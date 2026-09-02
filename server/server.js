import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import initCloudinary from './config/cloudinary.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (_req, res) => {
  res.json({ message: 'Saket Bishnu portfolio API is running' });
});

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, _req, res, _next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error'
  });
});

const startServer = async () => {
  try {
    await connectDB();
    initCloudinary();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
