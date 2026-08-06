import React, { useState } from 'react';

export interface BackgroundImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  gradientOverlayClassName?: string;
  gradientOverlayStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export function BackgroundImage({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-full object-cover object-center pointer-events-none',
  containerClassName = 'absolute inset-0 pointer-events-none overflow-hidden',
  gradientOverlayClassName,
  gradientOverlayStyle,
  children
}: BackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={containerClassName}>
      {/* Fallback Dark Gradient Background (rendered behind or if image fails) */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-[#0d0a08] via-[#16120e] to-[#090807] transition-opacity duration-700 ${
          isLoaded && !hasError ? 'opacity-40' : 'opacity-100'
        }`}
      />

      {/* Main Image with Opacity Fade-in */}
      {!hasError && (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-700 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}

      {/* Optional Custom Gradient Overlay */}
      {(gradientOverlayClassName || gradientOverlayStyle) && (
        <div 
          className={gradientOverlayClassName || "absolute inset-0 pointer-events-none"}
          style={gradientOverlayStyle}
        />
      )}

      {/* Additional Overlays or Grain/Vignette Children */}
      {children}
    </div>
  );
}
