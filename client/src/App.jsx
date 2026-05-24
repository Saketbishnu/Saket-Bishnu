import CursorSpotlight from './components/layout/CursorSpotlight.jsx';
import ScrollProgress from './components/layout/ScrollProgress.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <>
      <CursorSpotlight />
      <ScrollProgress />
      <AppRoutes />
    </>
  );
}
