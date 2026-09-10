import { useState } from 'react';
import logoImg from '../assets/logo.jpg';

export default function Logo({ className = "", textClassName = "", isHero = false }) {
  const [imageError, setImageError] = useState(false);

  // We will try to load a logo image.
  // If it fails, we fallback to the text.
  
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
        src={logoImg} 
        alt="ASTHRA Logo" 
        className={`w-auto object-contain ${isHero ? 'h-16 md:h-24' : 'h-8'} transition-all`}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
