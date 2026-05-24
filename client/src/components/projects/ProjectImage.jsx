import { useState } from 'react';

export default function ProjectImage({ src, alt, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed) {
    return (
      <div className={`flex items-center justify-center bg-slate-950/70 px-5 text-center text-sm font-bold text-slate-500 ${className}`}>
        Project image coming soon
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageFailed(true)}
    />
  );
}
