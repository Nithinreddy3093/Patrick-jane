import React, { useState, useEffect, useRef } from 'react';

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

const DEFAULT_CDN_FALLBACK = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80";

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
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Check if image is already cached or complete on mount/src change
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      } else {
        handleError();
      }
    }
  }, [currentSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else if (currentSrc !== DEFAULT_CDN_FALLBACK) {
      setCurrentSrc(DEFAULT_CDN_FALLBACK);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={containerClassName}>
      {/* Fallback Ambient Gradient Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-[#0d0a08] via-[#16120e] to-[#090807] transition-opacity duration-700 ${
          isLoaded && !hasError ? 'opacity-30' : 'opacity-70'
        }`}
      />

      {/* Main Image with Opacity Fade-in */}
      {!hasError && (
        <img
          ref={imgRef}
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

