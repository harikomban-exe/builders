import { useState } from 'react';

export default function Logo({ className = "", textClassName = "", isHero = false }) {
  const [imageError, setImageError] = useState(false);

  // We will try to load a logo image from the public folder.
  // If the user hasn't uploaded one yet (or it fails), we fallback to the text.
  
  if (imageError) {
    return (
      <span className={`font-display font-bold tracking-wider ${textClassName}`}>
        ASTHRA
      </span>
    );
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="ASTHRA Logo" 
        className={`w-auto object-contain ${isHero ? 'h-16 md:h-24' : 'h-8'} transition-all`}
        onError={() => setImageError(true)}
      />
      {/* Try an SVG fallback as well if PNG fails? For simplicity, we'll assume PNG or fallback to text. */}
    </div>
  );
}
