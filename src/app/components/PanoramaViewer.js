'use client';
import { useGameStore } from '@/lib/store';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function PanoramaViewer({ onStaticImageReady }) {
  const { currentLocation, circleSearchActive } = useGameStore();
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [staticSrc, setStaticSrc] = useState(null);
  const [staticLoaded, setStaticLoaded] = useState(false);
  const iframeRef = useRef(null);
  const staticImgRef = useRef(null);
  const prevLocationRef = useRef(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // We only run this effect when currentLocation changes
  useEffect(() => {
    if (!currentLocation || !apiKey || !iframeRef.current) return;

    const { lat, lng, heading = 210, pitch = 10 } = currentLocation;
    const locationKey = `${lat}-${lng}`;
    const locationChanged = prevLocationRef.current !== locationKey;

    if (locationChanged || !prevLocationRef.current) {
      setLoading(true);
      setHasLoaded(false); // Hide iframe during load
      setStaticLoaded(false);
      
      const newSrc = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&fov=100`;
      iframeRef.current.src = newSrc;
      
      // Also pre-fetch the static image for Circle to Search
      setStaticSrc(`/api/streetview?lat=${lat}&lng=${lng}&heading=${heading}&pitch=${pitch}&fov=100`);
      
      prevLocationRef.current = locationKey;
    }
  }, [currentLocation, apiKey]);

  // Notify parent when static image is ready
  const handleStaticLoad = useCallback(() => {
    setStaticLoaded(true);
    if (onStaticImageReady && staticImgRef.current) {
      onStaticImageReady(staticImgRef.current);
    }
  }, [onStaticImageReady]);

  if (!currentLocation) return null;

  if (!apiKey) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#f87171', padding: '2rem', textAlign: 'center' }}>
          Google Maps API Key missing.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, backgroundColor: '#1a1a2e', overflow: 'hidden' }}>
      {/* Interactive iframe — always visible, pointer events disabled during circle search */}
      <iframe
        ref={iframeRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: 'calc(100vh + 300px)',
          transform: 'translateY(-285px)',
          zIndex: 1,
          border: 'none',
          backgroundColor: '#1a1a2e',
          opacity: hasLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: circleSearchActive ? 'none' : 'auto',
        }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => {
          setLoading(false);
          setHasLoaded(true);
        }}
      ></iframe>

      {/* Same-origin static image — hidden, only used for canvas cropping data */}
      {staticSrc && (
        <img
          ref={staticImgRef}
          src={staticSrc}
          alt=""
          crossOrigin="anonymous"
          onLoad={handleStaticLoad}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
      
      {/* Block Google logo/links at top and bottom */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '55px', zIndex: 10, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55px', zIndex: 10, pointerEvents: 'none' }}></div>
    </div>
  );
}
