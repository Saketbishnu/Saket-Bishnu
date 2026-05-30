import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section, { fadeUp } from '../ui/Section.jsx';
import ProjectImage from './ProjectImage.jsx';

export default function ProjectScreenshots({ project }) {
  const screenshots = useMemo(() => {
    const images = project.images?.filter(Boolean) || project.screenshots?.filter(Boolean) || [];
    const fallback = project.image ? [project.image] : [];

    return images.length ? images : fallback;
  }, [project.image, project.images, project.screenshots]);
  const [activeIndex, setActiveIndex] = useState(null);
  const activeImage = activeIndex !== null ? screenshots[activeIndex] : null;

  const closeLightbox = () => setActiveIndex(null);
  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + screenshots.length) % screenshots.length
    );
  };
  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % screenshots.length
    );
  };

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, screenshots.length]);

  return (
    <Section
      id="screenshots"
      eyebrow="Screenshots"
      title="Project visuals"
      description="A responsive gallery wired from each project's image array, ready for multiple interface screenshots."
    >
      {screenshots.length ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {screenshots.map((screenshot, index) => (
            <motion.button
              key={`${screenshot}-${index}`}
              type="button"
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="terminal-panel group w-full min-w-0 p-3 text-left outline-none transition focus-visible:ring-4 focus-visible:ring-blue-500/30 sm:p-4"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${project.title} screenshot ${index + 1}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded border border-blue-500/15 bg-white/90 sm:aspect-video">
                <ProjectImage
                  src={screenshot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:saturate-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/74 via-transparent to-blue-500/10 opacity-75 transition group-hover:opacity-45" />
                <div className="absolute left-3 top-3 rounded border border-blue-500/25 bg-white/90 px-2.5 py-1 font-mono text-[0.68rem] font-black text-blue-700 backdrop-blur-xl sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
                  SHOT {String(index + 1).padStart(2, '0')}
                </div>
                <div className="absolute bottom-3 right-3 rounded border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-slate-700 opacity-0 backdrop-blur-xl transition group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:px-3 sm:text-xs sm:tracking-[0.16em]">
                  Enlarge
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div variants={fadeUp} className="terminal-panel p-6 text-center text-slate-600">
          Project screenshots will be added soon.
        </motion.div>
      )}

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-slate-950/55 px-3 py-5 backdrop-blur-xl sm:px-4 sm:py-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshot preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-full max-w-6xl rounded border border-blue-500/25 bg-white/95 p-2 shadow-[0_0_80px_rgba(37,99,235,0.18)] sm:p-3"
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-col items-start justify-between gap-3 border-b border-blue-500/15 px-2 pb-3 sm:flex-row sm:items-center">
                <p className="max-w-full break-words font-mono text-[0.68rem] font-black uppercase leading-5 tracking-[0.12em] text-blue-700 sm:text-xs sm:tracking-[0.18em]">
                  {project.title} / Screenshot {activeIndex + 1}
                </p>
                <button
                  type="button"
                  className="w-full rounded border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-black text-slate-700 transition hover:border-blue-500/40 hover:text-slate-900 sm:w-auto"
                  onClick={closeLightbox}
                  aria-label="Close screenshot preview"
                >
                  X
                </button>
              </div>

              <div className="relative mt-3 overflow-hidden rounded border border-blue-500/15 bg-white">
                <ProjectImage
                  src={activeImage}
                  alt={`${project.title} enlarged screenshot ${activeIndex + 1}`}
                  className="max-h-[68vh] w-full object-contain sm:max-h-[76vh]"
                />
              </div>

              {screenshots.length > 1 && (
                <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="rounded border border-blue-500/25 bg-blue-500/[0.08] px-3 py-2 text-xs font-black text-blue-700 transition hover:border-blue-500/50 hover:shadow-glow sm:px-4 sm:text-sm"
                    onClick={showPrevious}
                    aria-label="Previous screenshot"
                  >
                    Previous
                  </button>
                  <p className="font-mono text-xs font-bold text-slate-600">
                    {activeIndex + 1} / {screenshots.length}
                  </p>
                  <button
                    type="button"
                    className="rounded border border-blue-500/25 bg-blue-500/[0.08] px-3 py-2 text-xs font-black text-blue-700 transition hover:border-blue-500/50 hover:shadow-glow sm:px-4 sm:text-sm"
                    onClick={showNext}
                    aria-label="Next screenshot"
                  >
                    Next
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
