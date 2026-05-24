import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import ProjectDetail from '../pages/ProjectDetail.jsx';
import Resume from '../pages/Resume.jsx';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}
