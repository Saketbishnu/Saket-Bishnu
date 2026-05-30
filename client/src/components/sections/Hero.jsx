import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { profile } from '../../data/profile.js';
import GlassCard from '../ui/GlassCard.jsx';
import NeonButton from '../ui/NeonButton.jsx';
import { container, fadeUp } from '../ui/Section.jsx';

/* ─── 3D Profile Card ──────────────────────────────────────────── */
function ProfileCard3D() {
  const cardRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  /* raw mouse position within the card (0 → width/height) */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  /* map 0-1 → rotation range (subtle ±12°) */
  const rotateX = useTransform(mouseY, [0, 1], [12, -12]);
  const rotateY = useTransform(mouseX, [0, 1], [-12, 12]);

  /* spring for smoothness */
  const springConfig = { stiffness: 150, damping: 20, mass: 0.8 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  /* glare position */
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <div style={{ perspective: 900 }} className="flex items-center justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[340px] sm:max-w-[370px] cursor-default"
      >
        {/* Card body */}
        <div
          className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-gradient-to-br from-white via-blue-50/40 to-slate-50"
          style={{
            boxShadow: isHovering
              ? '0 32px 80px rgba(15, 23, 42, 0.14), 0 12px 32px rgba(37, 99, 235, 0.10), inset 0 1px 0 rgba(255,255,255,0.9)'
              : '0 20px 55px rgba(15, 23, 42, 0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* Subtle glare overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
              ),
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Decorative accent line at top */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" />

          {/* Image container */}
          <div className="p-5 pb-4 sm:p-6 sm:pb-5">
            <div
              className="relative overflow-hidden rounded-xl"
              style={{ transform: 'translateZ(30px)' }}
            >
              <img
                src="/saket_profile.jpg"
                alt="Saket Bishnu — Software Engineer"
                className="block h-auto w-full rounded-xl object-cover"
                loading="eager"
                draggable="false"
              />
              {/* Subtle gradient overlay at bottom of image */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent rounded-b-xl" />
            </div>
          </div>

          {/* Name + role footer */}
          <div
            className="border-t border-blue-100/70 px-5 py-4 sm:px-6 sm:py-5"
            style={{ transform: 'translateZ(20px)' }}
          >
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {profile.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-blue-600/80 tracking-wide">
              Software Engineer · AI-ML Engineer
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['', ''].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-200/60 bg-blue-50/70 px-2.5 py-0.5 text-xs font-bold text-blue-700/80"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── 3D Hero Title ────────────────────────────────────────────── */
function Hero3DTitle() {
  const titleRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useTransform(my, [0, 1], [5, -5]);
  const rotateY = useTransform(mx, [0, 1], [-5, 5]);

  const springCfg = { stiffness: 100, damping: 20, mass: 0.5 };
  const sRx = useSpring(rotateX, springCfg);
  const sRy = useSpring(rotateY, springCfg);

  function onMove(e) {
    const r = titleRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const depth = [
    '0 1px 0 #162d4a',
    '0 2px 0 #142844',
    '0 3px 0 #11233e',
    '0 4px 0 #0f1e38',
    '0 6px 12px rgba(11, 31, 58, 0.4)',
    '0 12px 28px rgba(11, 31, 58, 0.2)',
    '0 24px 55px rgba(37, 99, 235, 0.07)',
  ].join(', ');

  const tc =
    'text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:text-[7rem]';

  return (
    <motion.div variants={fadeUp} className="mt-4 max-w-full">
      <div style={{ perspective: 800 }}>
        <motion.div
          ref={titleRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            rotateX: sRx,
            rotateY: sRy,
            transformStyle: 'preserve-3d',
          }}
          className="relative cursor-default select-none"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            {/* Depth / shadow layer (decorative) */}
            <div
              aria-hidden="true"
              className={tc}
              style={{ color: '#0b1f3a', textShadow: depth }}
            >
              <span className="block">SAKET</span>
              <span className="block">BISHNU</span>
            </div>

            {/* Gradient color layer (accessible heading) */}
            <h1
              className={`absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-800 to-blue-600 bg-clip-text text-transparent ${tc}`}
            >
              <span className="block">SAKET</span>
              <span className="block">BISHNU</span>
            </h1>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Hero Section ─────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[auto] w-full max-w-6xl items-center px-4 pb-12 pt-28 sm:min-h-screen sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 h-44 w-44 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl sm:top-28 sm:h-72 sm:w-72"
        animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* ── Left column: text content ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="relative z-10 min-w-0"
        >
          <motion.p
            variants={fadeUp}
            className="neon-kicker max-w-full whitespace-normal leading-5 tracking-[0.16em] sm:w-max sm:tracking-[0.26em]"
          >
            {profile.heroKicker}
          </motion.p>

          <Hero3DTitle />

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-8"
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4"
          >
            <NeonButton href="#projects" className="w-full px-5 py-3 text-sm sm:w-auto">
              Explore Projects
            </NeonButton>
            <a
              href="#contact"
              className="w-full rounded border border-blue-200 bg-white px-5 py-3 text-center text-sm font-black text-blue-700 shadow-glass transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 sm:w-auto"
            >
              Open Contact
            </a>
            <a
              href="https://github.com/Saketbishnu"
              target="_blank"
              rel="noreferrer"
              className="w-full rounded border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 shadow-glass transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 sm:w-auto"
            >
              GitHub
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 grid max-w-2xl grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-10 sm:grid-cols-3"
          >
            {profile.stats.map(([value, label]) => (
              <GlassCard
                key={label}
                as={motion.div}
                whileHover={{ y: -5 }}
                className="p-4 text-center"
              >
                <p className="text-xl font-black text-slate-950 sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700/70">
                  {label}
                </p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right column: 3D profile card ── */}
        <motion.div
          className="relative z-10 min-w-0"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
        >
          <ProfileCard3D />
        </motion.div>
      </div>
    </section>
  );
}
